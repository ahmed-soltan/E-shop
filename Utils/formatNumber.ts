export const NumberFormat = (digit:number) =>{
    return new Intl.NumberFormat('en-US').format(digit)
}
