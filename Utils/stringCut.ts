export const CutString = (word:string) =>{
    if(word.length<25){
        return word;
    }

    return word.substring(0,25)+"...";
}