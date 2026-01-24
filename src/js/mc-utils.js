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
     * Convert colors from rgbXXX, grayXX and dictionary color names to web #RRGGBB format
     *
     * @param {string} mcColor
     * @return {string}
     */
    static parseMcColor(mcColor)
    {
        // "colorXXX" identifiers
        if (mcColor.startsWith('color')){
            const i = parseInt(mcColor.substring(5), 10);
            return McConst.palette[i][1];
        }

        // palette colors using their names like "black", "red", "rgb123", "gray23" etc.
        for(let i = 0; i < 256; i++){
            if(McConst.palette[i][0] == mcColor)
                return McConst.palette[i][1];
        }

        // #RRGGBB format (for true color skins)
        if(mcColor.startsWith('#')){
            return mcColor;
        }
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