const backend = import.meta.env.VITE_BACKEND_HOST

async function editBook(book) {
    try{
        const response = await fetch(`http://${backend}:5000/editBook`,{
            method: 'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                book
            })
        })
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi khi gọi hàm editBook'+err)
    }
}

async function getDiscount() {
    try{
        const response = await fetch(`http://${backend}:5000/getDiscount`)
        return response.json()
    }catch(err){
        console.log('Lỗi tại hàm getDiscount'+err)
    }
}
export {editBook,getDiscount}