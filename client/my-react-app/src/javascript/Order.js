const id = localStorage.getItem('id')
const backend = import.meta.env.VITE_BACKEND_HOST

async function getOrders() {
    try{
        const response = await fetch(`${backend}/${id}`)
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm getOrders'+err)
    }
}

export {getOrders}