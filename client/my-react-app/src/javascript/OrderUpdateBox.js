const backend = import.meta.env.VITE_BACKEND_HOST

async function orderUpdate(order) {
    try{
        const response = await fetch(`http://${backend}:5000/updateOrder`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                order
            })
        })
        return await response.json()
    }catch(err){
        console.log('Lỗi tại hàm orderUpdate'+err)
    }
}

export {orderUpdate}