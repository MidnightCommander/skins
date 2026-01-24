class GeneratorConfig
{
    constructor() {
        this.debug = false;
    }
}

/**
 * The entity represents one MC's style record. For example 'color49;black;italic'
 */
class McStyleEntry{

    constructor(){
        this.color = '';
        this.colorBg = '';
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.reverse = false;
        this.blink = false;
    }

    /**
     * Update an instance from string
     *
     * Begin with an instance created by the constructor, then update it with
     * the ultimate fallback, then the previous fallback etc., and finally
     * with the actual (possibly incomplete) values to be used.
     *
     * @param value string like "rgb400;rgb452;italic" or ";;underline" or "color123"
     */
    updateFromString(value)
    {
        const parts = value.split(';');

        // foreground color
        if(parts[0])  // if exists and nonempty
            this.color = parts[0];

        // background color
        if(parts[1])  // if exists and nonempty
            this.colorBg = parts[1];

        // if style specified
        if(parts[2])  // if exists and nonempty
        {
            this.bold = false;
            this.italic = false;
            this.underline = false;
            this.reverse = false;
            this.blink = false;

            const attrs = parts[2].split('+');
            for(const attr of attrs){
                if(attr == "bold")
                    this.bold = true;
                else if(attr == "italic")
                    this.italic = true;
                else if(attr == "underline")
                    this.underline = true;
                else if(attr == "reverse")
                    this.reverse = true;
                else if(attr == "blink")
                    this.blink = true;
            }
        }
    }
}


class CssGenerator
{

    /**
     * @param {GeneratorConfig} config The configuration
     */
    constructor(config)
    {
        /**
         * @type {GeneratorConfig}
         */
        this.config = config;
    }

    generate(parsedIni)
    {
        const skipSections = ['skin', 'lines', 'widget-panel', 'widget-scrollbar', 'widget-editor'];
        let resultCss = '';

        McPalette.set_light_mode($('#terminal-light').is(':checked'));
        McPalette.apply_palette($('#terminal-palettes').val());

        for(const sectionName in parsedIni)
        {
            if(!parsedIni.hasOwnProperty(sectionName))
                continue;
            if(skipSections.indexOf(sectionName) !== -1)
                continue;

            const section = parsedIni[sectionName];

            for(const key in section){
                if(!section.hasOwnProperty(key))
                    continue;

                const entry = new McStyleEntry();
                if (parsedIni['core'] && parsedIni['core']['_default_'])
                    entry.updateFromString(parsedIni['core']['_default_']);
                if (section['_default_'])
                    entry.updateFromString(section['_default_'])
                entry.updateFromString(section[key]);

                this.processAliases(entry, parsedIni);
                resultCss += this.renderCssSelector(sectionName, key, entry);
                resultCss += "\n\n";
            }
        }

        // header
        let cssHeader = '';

        // terminal's default colors and bg image
        cssHeader += "td.skin pre { ";
        cssHeader += "color: " + McPalette.default_fg + "; background-color: " + McPalette.default_bg + "; ";
        if($('#terminal-bgimage').is(':checked'))
            cssHeader += "background-image: url('img/alpha-stripes.png'); ";
        cssHeader += "}\n";

        cssHeader += "@keyframes blinker { 50% { color: transparent; } }\n";

        return cssHeader + resultCss;
    }

    /**
     * Converts color aliases to real color values
     *
     * @param {McStyleEntry} entry
     * @param {Object} parsedIni
     */
    processAliases(entry, parsedIni)
    {
        if('aliases' in parsedIni)
        {
            // recursively get color from aliases
            function getColorFromAlias(alias) {
                let color = alias;
                while(color in parsedIni['aliases']){
                    color = parsedIni['aliases'][color];
                }
                return color;
            }

            entry.color = getColorFromAlias(entry.color);
            entry.colorBg = getColorFromAlias(entry.colorBg);
        }
    }

    /**
     * Render css properties for given entry
     *
     * @param {McStyleEntry} entry
     * @return {string}
     */
    renderSelectorProperties(entry)
    {
        let css = '';
        let fg = McUtils.parseMcColor(entry.color, entry.bold);
        let bg = McUtils.parseMcColor(entry.colorBg, false);
        if(entry.reverse){
            // Swap fg and bg (after brightening fg subject to the bold attribute's behavior).
            // Note that the background image won't be visible through the letters, meh.
            if(fg == 'default')
                fg = McPalette.default_fg;
            if(bg == 'default')
                bg = McPalette.default_bg;
            let tmp = fg; fg = bg; bg = tmp;
        }else{
            if(fg == 'default')
                fg = McPalette.default_fg;
            if(bg == 'default')
                bg = 'transparent';  // let us see the background image
        }
        if(fg){
            css += 'color: ' + fg + ';' + "\n";
        }
        if(bg){
            css += 'background-color: ' + bg + ';' + "\n";
        }
        css += 'font-weight: ' + (entry.bold ? 'bold' : 'normal') + ';' + "\n";
        css += 'font-style: ' + (entry.italic ? 'italic' : 'normal') + ';' + "\n";
        css += 'text-decoration: ' + (entry.underline ? 'underline' : 'none') + ';' + "\n";
        css += 'animation: ' + (entry.blink ? 'blinker 1s step-start infinite' : 'none') + ';' + "\n";
        return css;
    }

    /**
     * Renders one css selector with properties
     *
     * @param {string} sectionName
     * @param {string}key
     * @param {McStyleEntry} entry
     * @return {string}
     */
    renderCssSelector(sectionName, key, entry)
    {
        let css = '';
        css += `td.skin pre span.${sectionName}-${key} {\n`;
        css += this.renderSelectorProperties(entry);
        css += '}\n';
        return css;
    }

}


