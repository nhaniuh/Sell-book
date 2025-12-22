const backend = import.meta.env.VITE_BACKEND_HOST

export default async function postLogin() {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            const response = await fetch(`http://${backend}:5000/postLogin`, {
                headers: {
                   'Authorization': 'Bearer '+token
                }
            })
            const dataResponse = await response.json()
            return dataResponse
        }
    }catch(err){
        console.log(err)
    }
}