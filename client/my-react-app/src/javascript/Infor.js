let id = localStorage.getItem('id')
const backend = import.meta.env.VITE_BACKEND_HOST

 async function Infor() {
    try{
        const response = await fetch(`${backend}/getInfor/${id}`)
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log(err)
    }
}

async function changePassword(data) {
    const id = localStorage.getItem('id')
    try{
        const response = await fetch(`${backend}/changePassword`,{
            method: 'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                id,
                ...data
            })
        })
        const dataResponse = await response.json()
        return dataResponse
    }catch(err){
        console.log('Lỗi tại changePassword',err)
    }
}

async function updateGender(gender) {
    try{
        const response = await fetch(`${backend}/gender`,{
            method: 'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                gender,
                id
            })
        })
        return response.json()
    }catch(err){
        console.log('Lỗi tại hàm updateGender'+err)
    }
}

async function uploadFile(avatar) {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const res = await fetch(`${backend}/upload-avatar/${id}`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    return data
}
export {Infor,changePassword,updateGender,uploadFile}