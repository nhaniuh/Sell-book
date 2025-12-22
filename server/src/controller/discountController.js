const Discount = require('../model/discountModel')

async function addDiscount(req,res) {
    try{
        const {name,code,percent,startDate,endDate} = req.body
        await Discount.create({
            name,
            code,
            percent,
            startDate,
            endDate
        })
        res.json({message:true})
    }catch(err){
        res.status(500).send('Lỗi tại hàm controller addDiscount'+err)
    }
}

async function getDiscount(req,res) {
    try{
        const discounts = await Discount.find()
        res.json(discounts)
    }catch(err){
        res.status(500).send('Lỗi tại controller getDiscount'+err)
    }
}

async function deleteDiscount(req,res) {
    try{
        const {id_Discount} = req.body
        await Discount.findByIdAndDelete(id_Discount)
        res.json({message:true})
    }catch(err){
        res.status(500).send('Lỗi tại hàm controller deleteDiscount'+err)
    }
}

async function editDiscount(req,res) {
    try{
        const {name,_id,code,startDate,endDate,percent,isActive} = req.body
        await Discount.findByIdAndUpdate({_id},{$set: {name,code,startDate,endDate,percent,isActive}})
        res.json({message:true})
    }catch(err){
        res.status(500).send('Lỗi tại editDiscount'+err)
    }
}
module.exports = {addDiscount,getDiscount,deleteDiscount,editDiscount}