const backend = import.meta.env.VITE_BACKEND_HOST

async function getDetail_Book(id) {
    try{
        const response = await fetch(`${backend}/getDetail_Book/${id}`)
        const book = await response.json()
        return book
    }catch(err){
        console.log('Lỗi tại hàm getDetail_Book'+err)
    }
}
const id_user = localStorage.getItem('id')
async function addCart(id,quantity) {
    try{
        const response = await fetch(`${backend}/addCart`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id_user,
                id_book:id,
                quantity
            })
        })
        const dataResponse = await response.json()
        console.log(dataResponse.message)
        return dataResponse
    }catch(err){
        console.log('Lỗi tại addCart'+err)
    }
}
export {getDetail_Book,addCart}