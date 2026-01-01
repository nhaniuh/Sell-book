const backend = import.meta.env.VITE_BACKEND_HOST

export default async function register(data) {
    try {
        const user = await fetch(`${backend}/register`, {
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