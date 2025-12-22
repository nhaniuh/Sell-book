const backend = import.meta.env.VITE_BACKEND_HOST

async function getDetail_Order(id_order) {
    try{
        const response = await fetch(`http://${backend}:5000/takeOrder/${id_order}`)
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm getDetail_Order'+err)
    }
}

export {getDetail_Order}