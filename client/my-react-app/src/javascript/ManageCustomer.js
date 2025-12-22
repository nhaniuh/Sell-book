const backend = import.meta.env.VITE_BACKEND_HOST

async function getAdminUser() {
    try{
        const response = await fetch(`http://${backend}:5000/getAdminUser`)
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm getAdminUser'+err)
    }
}

export {getAdminUser}