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
    }

    /**
     * Create an instance from string
     *
     * @param value string like "rgb400;rgb452;italic" or ";;underline" or "color123"
     * @return {McStyleEntry}
     */
    static createFromString(value)
    {
        const parts = value.split(';');

        const entry = new McStyleEntry();

        // foreground color
        if(parts.length > 0)
            entry.color = parts[0];

        // background color
        if(parts.length > 1)
            entry.colorBg = parts[1];

        // if style specified
        if(parts.length > 2)
        {
            const style = parts[2];
            if(style.toLowerCase() === "bold")
                entry.bold = true;
            if(style.toLowerCase() === "italic")
                entry.italic = true;
            if(style.toLowerCase() === "underline")
                entry.underline = true;
        }

        return entry;
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
        const skipSections = ['skin', 'Lines', 'widget-common', 'widget-panel', 'widget-scollbar', 'widget-editor'];
        let resultCss = '';

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
                const value = section[key];
                const entry = McStyleEntry.createFromString(value);
                this.processAliases(entry, parsedIni);
                resultCss += this.renderCssSelector(sectionName, key, entry);
                resultCss += "\n\n";
            }
        }

        // header
        let cssHeader = '';
        cssHeader += 'pre.skin {' + "\n";
        const entry = McStyleEntry.createFromString(parsedIni['core']['_default_']);
        this.processAliases(entry, parsedIni);
        cssHeader += this.renderSelectorProperties(entry);
        cssHeader += '}' + "\n";

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
        if(entry.color){
            css += 'color: ' + McUtils.parseMcColor(entry.color) + ';' + "\n";
        }
        if(entry.colorBg){
            css += 'background-color: ' + McUtils.parseMcColor(entry.colorBg) + ';' + "\n";
        }
        if(entry.bold){
            css += 'font-weight: bold' + "\n";
        }
        if(entry.italic){
            css += 'font-style: italic' + "\n";
        }
        if(entry.underline){
            css += 'text-decoration: underline' + "\n";
        }
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
        css += `td pre.skin .${sectionName}_${key} {\n`;
        css += this.renderSelectorProperties(entry);
        css += '}\n';
        return css;
    }

}


