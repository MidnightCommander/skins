

class McTpl
{
    constructor(){
    }

    render(template, variables){
        const result = template.replace(/{{(.+?)}}/g, function(match, contents, offset, input_string)
        {
            const parts = contents.split('.');
            if(parts.length === 2){
                const section = parts[0];
                const key = parts[1];
                if(section in variables){
                    if(key in variables[section]){
                        if(variables[section][key].length >= 1){
                            return variables[section][key][0];
                        }
                    }
                }
            }
            console.log('key ' + contents + 'not found');
            // mc's default depends on the section and key, we don't duplicate that here
            return ' ';
        });
        return result;
    }

}