const backend = import.meta.env.VITE_BACKEND_HOST
async function adminDeleteUser(id_user) {
    try{
        const response = await fetch(`${backend}/adminDeleteUser`,{
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                _id : id_user
            })
        })
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm adminDeleteUser'+err)
    }
}

export {adminDeleteUser}