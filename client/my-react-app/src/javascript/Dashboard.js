const token = localStorage.getItem('token')
async function checkAdmin() {
    try {
        const response = await fetch('/checkAdmin', {
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