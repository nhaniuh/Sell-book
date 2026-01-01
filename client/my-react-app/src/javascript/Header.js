const backend = import.meta.env.VITE_BACKEND_HOST

export default async function postLogin() {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            const response = await fetch(`${backend}/postLogin`, {
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