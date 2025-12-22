const backend = import.meta.env.VITE_BACKEND_HOST

export default async function register(data) {
    try {
        const user = await fetch(`http://${backend}:5000/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await user.json()
        
    } catch (err) {
        console.log('Loi')
    }
}