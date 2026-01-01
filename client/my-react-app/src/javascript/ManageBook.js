const backend = import.meta.env.VITE_BACKEND_HOST

async function getBook(categorie) {
    try{
        const response = await fetch(`${backend}/category/${categorie}`)
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm getBook'+err)
    }
}

export {getBook}