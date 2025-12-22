const backend = import.meta.env.VITE_BACKEND_HOST

async function userDeleteOrder(id_Order) {
    try{
        const response = await fetch(`http://${backend}:5000/userDeleteOrder/${id_Order}`,{
            method: 'DELETE'
        })
        return await response.json()
    }catch(err){
        console.log("Lỗi tại hàm userDeletOrder"+err)
    }
}

export {userDeleteOrder}