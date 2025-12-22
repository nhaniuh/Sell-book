const backend = import.meta.env.VITE_BACKEND_HOST

async function removeBook(book) {
    try{
        const response = await fetch(`http://${backend}:5000/removeBook/${book._id}`,{method: 'DELETE'})
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm removeBook'+err)
    }
}

export {removeBook}