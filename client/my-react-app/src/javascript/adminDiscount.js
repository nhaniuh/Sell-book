const backend = import.meta.env.VITE_BACKEND_HOST
async function addDiscount(inforDiscount) {
    try{
        const response = await fetch(`http://${backend}:5000/addDiscount`,{
            method: "PUT",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                name: inforDiscount.name,
                code: inforDiscount.code,
                percent: inforDiscount.percent,
                startDate: inforDiscount.startDate,
                endDate: inforDiscount.endDate
            })
        })
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm addDiscount'+err)
    }
}
async function  getDiscount() {
    try{
        const response = await fetch(`http://${backend}:5000/getDiscount`)
        return response.json()
    }catch(err){
        console.log('Lỗi tại hàm getDiscount'+err)
    }
}

async function deleteDiscount(id_Discount) {
    try{
        const response = await fetch(`http://${backend}:5000/deleteDiscount`,{
            method: "DELETE",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id_Discount
            })
        })
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm deleteDiscount'+err)
    }
}
export {addDiscount,getDiscount,deleteDiscount}