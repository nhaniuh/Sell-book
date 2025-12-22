const backend = import.meta.env.VITE_BACKEND_HOST

export default async function login(data){
    try{
        const response = await fetch(`http://${backend}:5000/login`,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        const dataResponse = await response.json()
        if(dataResponse.message){
            localStorage.setItem('token',dataResponse.token)
            localStorage.setItem('id',dataResponse.id)
        }
        // console.log(dataResponse)
        return dataResponse
    }catch(err){
        console.log(err)
    }
}