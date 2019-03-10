class GeneratorConfig
{
    constructor() {
        this.debug = false;
    }
}

class McStyleEntry{

    constructor(){
        this.color = '';
        this.colorBg = '';
        this.bold = false;
        this.italic = false;
        this.underline = false;
    }

    /**
     *
     * @param value string like "rgb400;rgb452;italic" or ";;underline" or "color123"
     * @return McStyleEntry
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
    constructor(config){
        this.config = config;
        this.colors = {
            'default'		:	'#000000',
            '#fff'		:	'#FFFFFF',
            '#000'		:	'#000000',
            'black'		:	'#000000',
            'blue'		:	'#0000AA',
            'green'		:	'#00AA00',
            'cyan'		:	'#00BABA',
            'red'		:	'#AA0000',
            'magenta'	:	'#AA00AA',
            'brown'		:	'#BABA00',
            'lightgray'	:	'#BABABA',
            'gray'		:	'#555555',
            'darkgray'	:	'#555555',
            'brightblue'	:	'#5555FF',
            'brightgreen'	:	'#55FF55',
            'brightcyan'	:	'#55FFFF',
            'brightred'	    :	'#FF5555',
            'brightmagenta'	:	'#FF55FF',
            'yellow'	    :	'#FFFF55',
            'white'		    :	'#FFFFFF',
            'color0' : '#000000',
            'color1' : '#800000',
            'color2' : '#008000',
            'color3' : '#808000',
            'color4' : '#000080',
            'color5' : '#800080',
            'color6' : '#008080',
            'color7' : '#c0c0c0',
            'color8' : '#808080',
            'color9' : '#ff0000',
            'color10' : '#00ff00',
            'color11' : '#ffff00',
            'color12' : '#0000ff',
            'color13' : '#ff00ff',
            'color14' : '#00ffff',
            'color15' : '#ffffff',
            'color16' : '#000000',
            'color17' : '#00005f',
            'color18' : '#000087',
            'color19' : '#0000af',
            'color20' : '#0000d7',
            'color21' : '#0000ff',
            'color22' : '#005f00',
            'color23' : '#005f5f',
            'color24' : '#005f87',
            'color25' : '#005faf',
            'color26' : '#005fd7',
            'color27' : '#005fff',
            'color28' : '#008700',
            'color29' : '#00875f',
            'color30' : '#008787',
            'color31' : '#0087af',
            'color32' : '#0087d7',
            'color33' : '#0087ff',
            'color34' : '#00af00',
            'color35' : '#00af5f',
            'color36' : '#00af87',
            'color37' : '#00afaf',
            'color38' : '#00afd7',
            'color39' : '#00afff',
            'color40' : '#00d700',
            'color41' : '#00d75f',
            'color42' : '#00d787',
            'color43' : '#00d7af',
            'color44' : '#00d7d7',
            'color45' : '#00d7ff',
            'color46' : '#00ff00',
            'color47' : '#00ff5f',
            'color48' : '#00ff87',
            'color49' : '#00ffaf',
            'color50' : '#00ffd7',
            'color51' : '#00ffff',
            'color52' : '#5f0000',
            'color53' : '#5f005f',
            'color54' : '#5f0087',
            'color55' : '#5f00af',
            'color56' : '#5f00d7',
            'color57' : '#5f00ff',
            'color58' : '#5f5f00',
            'color59' : '#5f5f5f',
            'color60' : '#5f5f87',
            'color61' : '#5f5faf',
            'color62' : '#5f5fd7',
            'color63' : '#5f5fff',
            'color64' : '#5f8700',
            'color65' : '#5f875f',
            'color66' : '#5f8787',
            'color67' : '#5f87af',
            'color68' : '#5f87d7',
            'color69' : '#5f87ff',
            'color70' : '#5faf00',
            'color71' : '#5faf5f',
            'color72' : '#5faf87',
            'color73' : '#5fafaf',
            'color74' : '#5fafd7',
            'color75' : '#5fafff',
            'color76' : '#5fd700',
            'color77' : '#5fd75f',
            'color78' : '#5fd787',
            'color79' : '#5fd7af',
            'color80' : '#5fd7d7',
            'color81' : '#5fd7ff',
            'color82' : '#5fff00',
            'color83' : '#5fff5f',
            'color84' : '#5fff87',
            'color85' : '#5fffaf',
            'color86' : '#5fffd7',
            'color87' : '#5fffff',
            'color88' : '#870000',
            'color89' : '#87005f',
            'color90' : '#870087',
            'color91' : '#8700af',
            'color92' : '#8700d7',
            'color93' : '#8700ff',
            'color94' : '#875f00',
            'color95' : '#875f5f',
            'color96' : '#875f87',
            'color97' : '#875faf',
            'color98' : '#875fd7',
            'color99' : '#875fff',
            'color100' : '#878700',
            'color101' : '#87875f',
            'color102' : '#878787',
            'color103' : '#8787af',
            'color104' : '#8787d7',
            'color105' : '#8787ff',
            'color106' : '#87af00',
            'color107' : '#87af5f',
            'color108' : '#87af87',
            'color109' : '#87afaf',
            'color110' : '#87afd7',
            'color111' : '#87afff',
            'color112' : '#87d700',
            'color113' : '#87d75f',
            'color114' : '#87d787',
            'color115' : '#87d7af',
            'color116' : '#87d7d7',
            'color117' : '#87d7ff',
            'color118' : '#87ff00',
            'color119' : '#87ff5f',
            'color120' : '#87ff87',
            'color121' : '#87ffaf',
            'color122' : '#87ffd7',
            'color123' : '#87ffff',
            'color124' : '#af0000',
            'color125' : '#af005f',
            'color126' : '#af0087',
            'color127' : '#af00af',
            'color128' : '#af00d7',
            'color129' : '#af00ff',
            'color130' : '#af5f00',
            'color131' : '#af5f5f',
            'color132' : '#af5f87',
            'color133' : '#af5faf',
            'color134' : '#af5fd7',
            'color135' : '#af5fff',
            'color136' : '#af8700',
            'color137' : '#af875f',
            'color138' : '#af8787',
            'color139' : '#af87af',
            'color140' : '#af87d7',
            'color141' : '#af87ff',
            'color142' : '#afaf00',
            'color143' : '#afaf5f',
            'color144' : '#afaf87',
            'color145' : '#afafaf',
            'color146' : '#afafd7',
            'color147' : '#afafff',
            'color148' : '#afd700',
            'color149' : '#afd75f',
            'color150' : '#afd787',
            'color151' : '#afd7af',
            'color152' : '#afd7d7',
            'color153' : '#afd7ff',
            'color154' : '#afff00',
            'color155' : '#afff5f',
            'color156' : '#afff87',
            'color157' : '#afffaf',
            'color158' : '#afffd7',
            'color159' : '#afffff',
            'color160' : '#d70000',
            'color161' : '#d7005f',
            'color162' : '#d70087',
            'color163' : '#d700af',
            'color164' : '#d700d7',
            'color165' : '#d700ff',
            'color166' : '#d75f00',
            'color167' : '#d75f5f',
            'color168' : '#d75f87',
            'color169' : '#d75faf',
            'color170' : '#d75fd7',
            'color171' : '#d75fff',
            'color172' : '#d78700',
            'color173' : '#d7875f',
            'color174' : '#d78787',
            'color175' : '#d787af',
            'color176' : '#d787d7',
            'color177' : '#d787ff',
            'color178' : '#d7af00',
            'color179' : '#d7af5f',
            'color180' : '#d7af87',
            'color181' : '#d7afaf',
            'color182' : '#d7afd7',
            'color183' : '#d7afff',
            'color184' : '#d7d700',
            'color185' : '#d7d75f',
            'color186' : '#d7d787',
            'color187' : '#d7d7af',
            'color188' : '#d7d7d7',
            'color189' : '#d7d7ff',
            'color190' : '#d7ff00',
            'color191' : '#d7ff5f',
            'color192' : '#d7ff87',
            'color193' : '#d7ffaf',
            'color194' : '#d7ffd7',
            'color195' : '#d7ffff',
            'color196' : '#ff0000',
            'color197' : '#ff005f',
            'color198' : '#ff0087',
            'color199' : '#ff00af',
            'color200' : '#ff00d7',
            'color201' : '#ff00ff',
            'color202' : '#ff5f00',
            'color203' : '#ff5f5f',
            'color204' : '#ff5f87',
            'color205' : '#ff5faf',
            'color206' : '#ff5fd7',
            'color207' : '#ff5fff',
            'color208' : '#ff8700',
            'color209' : '#ff875f',
            'color210' : '#ff8787',
            'color211' : '#ff87af',
            'color212' : '#ff87d7',
            'color213' : '#ff87ff',
            'color214' : '#ffaf00',
            'color215' : '#ffaf5f',
            'color216' : '#ffaf87',
            'color217' : '#ffafaf',
            'color218' : '#ffafd7',
            'color219' : '#ffafff',
            'color220' : '#ffd700',
            'color221' : '#ffd75f',
            'color222' : '#ffd787',
            'color223' : '#ffd7af',
            'color224' : '#ffd7d7',
            'color225' : '#ffd7ff',
            'color226' : '#ffff00',
            'color227' : '#ffff5f',
            'color228' : '#ffff87',
            'color229' : '#ffffaf',
            'color230' : '#ffffd7',
            'color231' : '#ffffff',
            'color232' : '#080808',
            'color233' : '#121212',
            'color234' : '#1c1c1c',
            'color235' : '#262626',
            'color236' : '#303030',
            'color237' : '#3a3a3a',
            'color238' : '#444444',
            'color239' : '#4e4e4e',
            'color240' : '#585858',
            'color241' : '#626262',
            'color242' : '#6c6c6c',
            'color243' : '#767676',
            'color244' : '#808080',
            'color245' : '#8a8a8a',
            'color246' : '#949494',
            'color247' : '#9e9e9e',
            'color248' : '#a8a8a8',
            'color249' : '#b2b2b2',
            'color250' : '#bcbcbc',
            'color251' : '#c6c6c6',
            'color252' : '#d0d0d0',
            'color253' : '#dadada',
            'color254' : '#e4e4e4',
            'color255' : '#eeeeee',
        }
    }

    generate(parsedIni){
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
                resultCss += this.createCss(sectionName, key, entry);
                resultCss += "\n\n";
            }
        }

        // header
        let cssHeader = '';
        cssHeader += 'pre.skin {' + "\n";
        cssHeader += this.createAttributes(McStyleEntry.createFromString(parsedIni['core']['_default_']));
        cssHeader += '}' + "\n";

        return cssHeader + resultCss;
    }

    /**
     *
     * @param entry
     * @return {string}
     */
    createAttributes(entry)
    {
        let css = '';
        if(entry.color){
            css += 'color: ' + this.parseMcColor(entry.color) + ';' + "\n";
        }
        if(entry.colorBg){
            css += 'background-color: ' + this.parseMcColor(entry.colorBg) + ';' + "\n";
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
     *
     * @param sectionName
     * @param key
     * @param entry McStyleEntry
     * @return string
     */
    createCss(sectionName, key, entry)
    {
        let css = '';
        css += 'td pre.skin .' + sectionName + '_' + key + '{' + "\n";
        css += this.createAttributes(entry);
        css += '}' + "\n";
        return css;
    }

    /**
     * convert colors from rgbXXX, grayXX and dictionary color names to web #XXXXXX format
     * @param mcColor
     * @return {*}
     */
    parseMcColor(mcColor)
    {
        if(mcColor in this.colors)
            return this.colors[mcColor];

        if(mcColor.toLowerCase().startsWith('rgb')){
            // $r = str_pad(dechex(round(255 * $key{3} / 5)), 2, STR_PAD_LEFT);
            const r = Math.round(255 * mcColor[3] / 5).toString(16).padStart(2, '0');
            const g = Math.round(255 * mcColor[4] / 5).toString(16).padStart(2, '0');
            const b = Math.round(255 * mcColor[5] / 5).toString(16).padStart(2, '0');
            return '#' + r + g + b;
        }

        if(mcColor.toLowerCase().startsWith('gray')){
            const number = mcColor.substring(4);
            return this.colors['color' + (232 + parseInt(number))];
        }
    }



}