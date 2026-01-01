const backend = import.meta.env.VITE_BACKEND_HOST

async function editDiscount(data) {
    try{
        const response = await fetch(`${backend}/dashboard/editDiscount`,{
           method: 'PUT',
           headers: {
            'Content-type':'application/json'
           },
           body: JSON.stringify({
            _id: data.id,
            name: data.name,
            code: data.code,
            percent: data.percent,
            startDate: data.startDate,
            endDate: data.endDate,
            isActive: data.isActive
           })
        })
        return response.json()
    }catch(err){
        console.log('Lỗi tại hàm editDiscount'+err)
    }
}
export {editDiscount}