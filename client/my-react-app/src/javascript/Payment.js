const id_user = localStorage.getItem('id')
const backend = import.meta.env.VITE_BACKEND_HOST

async function getPayment(id_book) {
    try{
        const response = await fetch(`http://${backend}:5000/getPayment`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id_user,
                id_book
            })
        })
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm getItem'+err)
    }
}
async function payment(id_book,quantity,infor,detailPercent) {
    try{
        const response = await fetch('http://localhost:5000/payment',{
            method: 'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id_book,
                id_user,
                quantity,
                infor,
                detailPercent
            })
        })
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại hàm payment'+err)
    }
}
export {getPayment,payment}