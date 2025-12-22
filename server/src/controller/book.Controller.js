

const Book = require('../model/bookModel')

async function removeBook(req, res) {
    try {
        const { name } = req.body
        const book = await Book.deleteOne({ name })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi' + err)
    }
}

async function getCategory(req, res) {
    try {
        const { category } = req.params
        if(category==="all"){
            const book = await Book.find().populate('discount','code name percent')
            return res.json(book)
        }
        const books = await Book.find({
            categories: { $regex: category, $options: 'i' }
        }).populate('discount','code name percent');
        res.json(books)
    }catch(err){
        res.status(500).send('Lỗi tại getCategory'+err)
    }
}

async function getBook(req,res) {
    try{
        const price=['100.000','150.000','200.000','250.000','300.000','350.000','400.000']
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=viễn tưởng khoa học ảo tưởng&langRestrict=vi&startIndex=0&maxResults=40`)
        const data = await response.json()
        const book = data.items.map((item)=>{
            const random = Math.floor(Math.random()*price.length)
            return{
                name: item.volumeInfo.title,
                author: item.volumeInfo.authors||'vô danh',
                publishedDate: item.volumeInfo.publishedDate||'không rõ',
                price : price[random],
                categories: 'viễn tưởng khoa học ảo tưởng',
                img: item.volumeInfo.imageLinks?item.volumeInfo.imageLinks.thumbnail:'Lỗi'
            }
        })
        for(let i of book){
            await Book.create(i)
        }
        const okay = await Book.find()
        res.json(okay)
    }catch(err){
        res.status(500).send('Lỗi'+err)
    }
}
async function addCategories(req,res) {
    try{
        const books = await Book.updateMany(
            {
                $or:[
                    {
                        categories: {$exists: false}
                    }
                ]
            },
            {
                $set:{
                    categories: 'Địa Lý, Khoảng Cách, Môi Trường'
                }
            }
        )
        res.json(books)
    }catch(err){
        res.status(500).send('Lỗi tại addCategories '+err)
    }
}

async function getSearchBook(req,res) {
    try{
        const {key} = req.params
        const books = await Book.find({
             $or: [
                {name: {$regex: key, $options:"i"}},
                {categories: {$regex:key,$options:"i"}}
             ]
        })
        res.json(books)
    }catch(err){
        res.status(500).send('Lỗi tại hàm getSearchBook',+err)
    }
}

async function editBook(req,res) {
    try{
        const {book} = req.body
        await Book.findByIdAndUpdate(book._id,{$set: book})
        res.json({message:true})
    }catch(err){
        res.status(500).send('Lỗi tại controller editBook'+err)
    }
}

async function adminRemoveBook(req,res) {
    try{
        const {_id} = req.params
        await Book.findByIdAndDelete({_id})
        res.json({message:true})
    }catch(err){
        res.status(500).send('Lỗi tại controller adminRemoveBook'+err)
    }
}
module.exports = { removeBook,getCategory,getBook,addCategories,getSearchBook,editBook,adminRemoveBook }