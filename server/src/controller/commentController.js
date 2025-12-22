const Comment = require('../model/commentModel')
const User = require ('../model/userModel')
async function getComment(req, res) {
    try {
        const { id_Book } = req.params
        const comments = await Comment.find({BookId: id_Book}).populate('UserId','name avatar').sort({createdAt: -1})
        res.json(comments)
    }catch(err){
        res.status(500).send('Lỗi tại controller'+err)
    }
}

async function sendComment(req,res) {
    try{
        const {email} = req.user
        const { content,id_Book} = req.body
        const user = await User.findOne({email})
        const newComment = await Comment.create({
            BookId: id_Book,
            UserId: user._id,
            content
        })
        res.json({message:true, newComment})
    }catch(err){
        res.status(500).send('Lỗi tại controller sendComment'+err)
    }
}
module.exports = {getComment,sendComment}