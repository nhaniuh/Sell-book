const backend = import.meta.env.VITE_BACKEND_HOST

async function getCart(id) {
    try{
        const cart = await fetch(`${backend}/getCart/${id.id}`)
        const dataCart=  await cart.json()
        return dataCart
    }catch(err){
        console.log('Lỗi tại hàm getCart'+err)
    }
}

async function removeCart(id_user,id_book) {
    try{
        const response = await fetch(`${backend}/removeCart`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
               id_user: id_user.id,
               id_book
            })
        })
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm removeCart'+err)
    }
}
export {getCart, removeCart}