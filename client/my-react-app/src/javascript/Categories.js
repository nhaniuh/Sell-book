
const backend = import.meta.env.VITE_BACKEND_HOST

async function getBook(category) {
    try{
       const response = await fetch(`${backend}/category/${category}`)
       const data = await response.json()
       return data
    }catch(err){
        console.log('Lỗi tại hàm getBook'+err)
    }
}

export {getBook}