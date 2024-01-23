export function txtclise( text:string , max : number = 80){
    if(text.length >= 80  )return `${text.slice(0, max)}...`;
    else
    return text;
}