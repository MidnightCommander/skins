class ColorsComponent
{
    constructor(){
        this.template = `
            
        `;
        this.onColorClick = function (colorKey, color) {

        }
    }

    render(){
        let result = '';
        for(let i = 0; i < 256; i++){
            if(i % 36 == 16)
                result += `<br>`;
            const key = 'color' + i;
            const name = McConst.palette[i][0];
            const color = McConst.palette[i][1];
            const onclickrgblabel = i < 16 ? "RGB in this palette" : "Standard RGB";
            const onclicktext = `Indexed name: ${key}\\nFriendly name: ${name}\\n${onclickrgblabel}: ${color}`;
            const tooltiptext = `${key} – ${name} – ${color}`;
            result += `<div onclick="alert('${onclicktext}')" title="${tooltiptext}" style="background-color: ${color}; display: inline-block; cursor: pointer; width: 18px; height: 18px; margin-right: 4px"></div>`;
        }
        return result;
    }
}
