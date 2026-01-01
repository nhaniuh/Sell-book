const backend = import.meta.env.VITE_BACKEND_HOST

async function userDeleteOrder(id_Order) {
    try{
        const response = await fetch(`${backend}/userDeleteOrder/${id_Order}`,{
            method: 'DELETE'
        })
        return await response.json()
    }catch(err){
        console.log("Lỗi tại hàm userDeletOrder"+err)
    }
}

export {userDeleteOrder}