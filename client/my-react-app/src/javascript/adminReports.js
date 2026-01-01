const backend = import.meta.env.VITE_BACKEND_HOST

async function getTotalData() {
    try{
        const response = await fetch(`${backend}/getTotalData`)
        return response.json()
    }catch(err){
        console.log('Lỗi tại hàm getTotalData tại file adminReports'+err)
    }
}

export {getTotalData}