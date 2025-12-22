const backend = import.meta.env.VITE_BACKEND_HOST

async function getLengthCart(id) {
    try{
        const response = await fetch(`http://${backend}:5000/getInfor/${id}`)
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm getLengthCart'+err)
    }
}

export {getLengthCart}