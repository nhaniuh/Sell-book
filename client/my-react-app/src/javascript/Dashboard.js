const token = localStorage.getItem('token')
const backend = import.meta.env.VITE_BACKEND_HOST

async function checkAdmin() {
    try {
        const response = await fetch(`${backend}/checkAdmin`, {
            headers: {
                'Authorization': 'Bear ' + token
            }
        })
        const dataResponse = await response.json()
        return dataResponse 
    } catch (err) {
        console.log('Bạn chưa có tài khoản'+err)
    }
}

export {checkAdmin}