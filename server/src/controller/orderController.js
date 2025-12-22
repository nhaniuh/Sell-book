
const Orders = require('../model/ordersModel')
const Books = require('../model/bookModel')
const User = require('../model/userModel')
async function getOrders(req, res) {
    try {
        const orders = await Orders.find().populate("customerId", "name")
        res.json(orders)
    } catch (err) {
        res.status(500).send('Lỗi tại orderController getOrders' + err)
    }
}

async function getOrder(req, res) {
    try {
        const { _id } = req.params
        const order = await Orders.findById(_id).populate("customerId", "name email").populate({ path: "bookId", select: "name discount", populate: { path: "discount", select: "name code percent" } })
        res.json(order)
    } catch (err) {
        res.status(500).send('Lỗi tại hàm controller getOrder' + err)
    }
}
async function deleteBox(req, res) {
    try {
        const { _id } = req.params
        await Orders.findByIdAndUpdate(_id, { $set: { status: cancelled } })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại controller deletebox' + err)
    }
}
async function updateOrder(req, res) {
    try {
        const { order } = req.body
        const orders = await Orders.findByIdAndUpdate(order._id, order)
        if (order.status === "cancelled") {
            const book = await Books.findById(orders.bookId)
            await Books.findByIdAndUpdate(orders.bookId, { $set: { inventory: Number(book.inventory) + Number(orders.quantity) } })
        }
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại controller updateOrder' + err)
    }
}
async function userDeleteOrder(req, res) {
    try {
        const { id_Order } = req.params
        const order = await Orders.findByIdAndUpdate(id_Order, { $set: { status: 'cancelled' } })
        const book = await Books.findById(order.bookId)
        await Books.findByIdAndUpdate(order.bookId, { $set: { inventory: Number(book.inventory) + Number(order.quantity) } })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại controller userDeleteOrder' + err)
    }
}

async function adminDeleteOrderBox(req, res) {
    try {
        const { id_Order, id_User } = req.body
        const user = await User.findById(id_User.trim())
        const newOrder = user.orders.filter((item) => { return item.toString() !== id_Order })
        await User.findByIdAndUpdate(id_User, { $set: { orders: newOrder } })
        await Orders.findByIdAndDelete(id_Order)
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại controller adminDeleteOrder ' + err)
    }
}
async function getTotalData(req, res) {
    try {
        const orders = await Orders.find()
        const totalPrice = orders.reduce((init, item) => {
            if (item.status === "delivered") {
                return init + Number(item.totalPrice)
            }
            return init
        }, 0)
        const totalBook = orders.reduce((init, item) => {
            if (item.status === "delivered") {
                return init + Number(item.quantity)
            }
            return init
        }, 0)
        const totalUser = await User.countDocuments()
        res.json({ totalBook, totalPrice, totalUser, totalOrder: orders.length })
    } catch (err) {
        res.status(500).send("Lỗi " + err)
    }
}
module.exports = { getOrders, deleteBox, getOrder, updateOrder, userDeleteOrder, adminDeleteOrderBox, getTotalData }