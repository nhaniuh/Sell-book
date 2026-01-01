const backend = import.meta.env.VITE_BACKEND_HOST

async function getOrder() {
    try{
        const response = await fetch(`${backend}/order`)
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm getOrder'+err)
    }
}

export {getOrder}