export const PriceFormat = (amount:number) =>{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

//ar-AR
//EGP