let id_User = localStorage.getItem('id')
const backend = import.meta.env.VITE_BACKEND_HOST

async function Orderdeletebox(id_Order) {
    try{
        const response = await fetch(`http://${backend}:5000/adminDeleteOrderBox`,{
            method: 'DELETE',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                id_User,
                id_Order
            })
        })
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi trong hàm orderdeletebox'+err)
    }
}

export {Orderdeletebox}