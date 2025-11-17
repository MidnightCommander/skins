class McUtils {

    /**
     * Parse standard ini file content
     * @param data
     */
    static parseINIString(data)
    {
        const regex = {
            section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
            param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
            comment: /^\s*#.*$/
        };
        const value = {};
        const lines = data.split(/[\r\n]+/);
        let section = null;
        lines.forEach(function(line){
            let match;
            if(regex.comment.test(line)){
                return;
            }else if(regex.param.test(line)){
                match = line.match(regex.param);
                if(section){
                    value[section][match[1]] = match[2];
                }else{
                    value[match[1]] = match[2];
                }
            }else if(regex.section.test(line)){
                match = line.match(regex.section);
                value[match[1]] = {};
                section = match[1];
            }else if(line.length === 0 && section){
                section = null;
            }
        });
        return value;
    }


    /**
     * Convert colors from rgbXXX, grayXX and dictionary color names to web #XXXXXX format
     *
     * @param {string} mcColor
     * @return {string}
     */
    static parseMcColor(mcColor)
    {
        // named and colorXXX colors
        if(mcColor in McConst.colors)
            return McConst.colors[mcColor];

        // rgbXXX format
        if(mcColor.toLowerCase().startsWith('rgb')){
            // $r = str_pad(dechex(round(255 * $key{3} / 5)), 2, STR_PAD_LEFT);
            const r = mcColor[3];
            const g = mcColor[4];
            const b = mcColor[5];
            return McConst.colors['color' + (16 + 36 * parseInt(r) + 6 * parseInt(g) + parseInt(b))];
        }

        // grayXX format
        if(mcColor.toLowerCase().startsWith('gray')){
            const number = mcColor.substring(4);
            return McConst.colors['color' + (232 + parseInt(number))];
        }

        // #XXXXXX format (for true color skins)
        if(mcColor.startsWith('#')){
            return mcColor;
        }
    }

    /**
     * Convert web color to rgbXXX format
     *
     * @param {string} webColor Color in #XXXXXX format
     * @return {string}
     */
    static web2rgb(webColor)
    {
        const int = parseInt(webColor.substring(1), 16);
        const r = int >> 16 & 0xFF;
        const g = int >> 8 & 0xFF;
        const b = int & 0xFF;
        const rr = Math.round(r * 5 / 255);
        const gg = Math.round(g * 5 / 255);
        const bb = Math.round(b * 5 / 255);
        return `rgb${rr}${gg}${bb}`;
    }


    /**
     * Download string as file
     *
     * @param {string} filename Desired file name
     * @param {string} content Content of the file
     */
    static download(filename, content)
    {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}