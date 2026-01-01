const token = localStorage.getItem('token')
const backend = import.meta.env.VITE_BACKEND_HOST

async function getComment(id_Book) {
    try{
        console.log(id_Book)
        const response = await fetch(`${backend}/getComment/${id_Book}`)
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm getComment'+err)
    }
}

async function sendComment(content,id_Book) {
    try{
        const response = await fetch(`${backend}/sendComment`,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_Book,
                content
            })
        })
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm sendComment'+err)
    }
}
export {getComment,sendComment}