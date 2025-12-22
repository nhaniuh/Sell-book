const backend = import.meta.env.VITE_BACKEND_HOST

async function getBook(key) {
    try{
        const response = await fetch(`http://${backend}:5000/search/${key}`)
        const data = await response.json()
        return data
    }catch(err){
        console.log('Lỗi tại hàm getBook'+err)
    }
}

export {getBook}