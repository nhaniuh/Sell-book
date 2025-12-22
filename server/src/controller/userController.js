// const { model } = require('mongoose')
const User = require('../model/userModel')
const Book = require('../model/bookModel')
const Orders = require('../model/ordersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
async function data(req, res) {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status.send(err)
    }
}

async function dataBook(req, res) {
    try {
        const book1 = await Book.find({ categories: { $regex: 'thiếu nhi', $options: 'i' } })
            .limit(8)
            .populate('discount', 'code percent name isActive');

        const book2 = await Book.find({ categories: { $regex: 'lịch sử', $options: 'i' } })
            .limit(8)
            .populate('discount', 'code percent name isActive');

        const book3 = await Book.find({ categories: { $regex: 'chính trị', $options: 'i' } })
            .limit(8)
            .populate('discount', 'code percent name isActive');

        const book4 = await Book.find({ categories: { $regex: 'viễn tưởng', $options: 'i' } })
            .limit(8)
            .populate('discount', 'code percent name isActive');

        const book5 = await Book.find({ categories: { $regex: 'địa lý', $options: 'i' } })
            .limit(8)
            .populate('discount', 'code percent name isActive');

        const book6 = await Book.find({ categories: { $regex: 'văn học', $options: 'i' } })
            .limit(8)
            .populate('discount', 'code percent name isActive');

        res.json({ book1, book2, book3, book4, book5, book6 });
    } catch (err) {
        res.status(500).send('Lỗi tại controller dataBook: ' + err);
    }
}

async function register(req, res) {
    try {
        const { name, email, password, gender } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        await User.create({
            name,
            email,
            password: hashPassword,
            gender,
        });

        res.json({ message: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: false, user: 'user ko ton tai' })
        }
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.json({ message: false })
        }
        const payload = { email: user.email }
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
        res.json({ message: true, token, id: user.id })
    } catch (err) {
        res.status(500).send(err)
    }
}

async function postLogin(req, res) {
    try {
        const { email } = req.user
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: false })
        }
        res.json({ message: true, user })
    } catch (err) {
        res.status(500).send('Controller' + err)
    }
}

async function getInfor(req, res) {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const countOrder = await Orders.countDocuments({ customerId: id })
        res.json({ user, countOrder })
    } catch (err) {
        res.status(500).send('Lỗi getInfor', err)
    }
}

async function changePassword(req, res) {
    try {
        const { id, password, newPassword } = req.body
        const user = await User.findById(id)
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.json({ message: false })
        }
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(newPassword, salt)
        await User.findByIdAndUpdate(id, { password: newPass })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại changePassword' + err)
    }
}

async function updateGender(req, res) {
    try {
        const { gender, id } = req.body
        await User.findByIdAndUpdate(id, { gender })
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại controller updateGender' + err)
    }
}
async function getDetail_Book(req, res) {
    try {
        const { id } = req.params
        const book = await Book.findById(id).populate('discount', 'code percent name isActive')
        res.json(book)
    } catch (err) {
        res.status(500).send('Lỗi tại controller genDetail_Book' + err)
    }
}

async function getCart(req, res) {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        let books = []
        let total = 0
        for (let i = 0; i < user.cart.length; i++) {
            const book = await Book.findById(user.cart[i].id_book)
            total += Number(user.cart[i].totalPrice)
            books.push({ book, quantity: user.cart[i].quantity, totalPrice: user.cart[i].totalPrice })
        }
        res.json({ books, total })
    } catch (err) {
        res.status(500).send('Lỗi tại getCart' + err)
    }

}

async function addCart(req, res) {
    try {
        const { id_user, id_book, quantity } = req.body;

        if (!id_user || !id_book || !quantity) {
            return res.status(400).json({ message: 'Thiếu thông tin đầu vào' });
        }

        const user = await User.findById(id_user);
        const book = await Book.findById(id_book);
        if(quantity>book.inventory){
            return res.json({text: "Không đủ số lượng hàng"})
        }
        if (!user || !book) {
            return res.status(404).json({ message: 'Không tìm thấy user hoặc book' });
        }

        const price = parseFloat(book.price.toString().replace(/[^\d.]/g, ''));
        let updateCart = [];
        let found = false;

        for (let item of user.cart) {
            if (String(item.id_book) === String(id_book)) {
                const newQty = Number(item.quantity) + Number(quantity);
                const newTotal = Number(item.totalPrice) + price * Number(quantity);
                updateCart.push({ id_book, quantity: newQty, totalPrice: newTotal });
                found = true;
            } else {
                updateCart.push(item);
            }
        }

        if (!found) {
            updateCart.push({ id_book, quantity, totalPrice: price * quantity });
        }

        await User.findByIdAndUpdate(id_user, { cart: updateCart });
        if (!found) {
            return res.json({ message: true, text: "Đã thêm vào giỏ hàng" })
        }
        res.json({ message: true, text: "Đã thêm vào giỏ hàng",valid:true });

    } catch (err) {
        res.status(500).send('Lỗi tại controller addCart: ' + err.message);
    }
}


async function removeCart(req, res) {
    try {
        const { id_user, id_book } = req.body
        const user = await User.findById(id_user)
        const newCart = user.cart.filter((item) => { return item.id_book !== id_book })
        await User.findByIdAndUpdate(id_user, { cart: newCart })
        res.json({ message: true })
    } catch (err) {
        res.status(500).json('Lỗi tại controller removeCart' + err)
    }
}

async function getPayment(req, res) {
    try {
        const { id_book, id_user } = req.body
        const user = await User.findById(id_user)
        const book = await Book.findById(id_book).populate('discount', 'code percent name isActive')
        res.json({ user, book })
    } catch (err) {
        res.status(500).send('Lỗi tại controller getPayment' + err)
    }
}

async function payment(req, res) {
    try {
        const { id_book, id_user, quantity, infor } = req.body;

        // Cập nhật thông tin user
        await User.findByIdAndUpdate(id_user, {
            $set: {
                phoneNumber: infor.phoneNumber,
                address: infor.address
            }
        });
        const book = await Book.findById(id_book).populate('discount', 'percent code name isActive');
        if(Number(quantity)>Number(book.inventory)){
            console.log(quantity, book.inventory)
            return res.json("Ko đủ số lượng tồn kho")
        }
        await Book.findByIdAndUpdate(id_book,{$set:{inventory:book.inventory-quantity}})
        // Tạo mã đơn hàng
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const datePart = `${yyyy}${mm}${dd}`;

        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const countToday = await Orders.countDocuments({
            createdAt: { $gte: startOfDay, $lt: endOfDay },
        });

        const orderNumber = `ORD${datePart}-${(countToday + 1)
            .toString()
            .padStart(4, "0")}`;

        // Tính tổng tiền
        let totalPrice
        let currentDiscount
        if (book.discount&&book.discount.isActive) {
            totalPrice = ((Number(book.price) * Number(quantity)) - ((Number(book.price) * Number(quantity)) * Number(book.discount.percent) / 100)) * 1000;
            currentDiscount = book.discount.code + " - " + book.discount.percent
        } else {
            totalPrice = Number(book.price) * Number(quantity) * 1000
            currentDiscount = null
        }

        // Tạo đơn hàng
        const newOrder = await Orders.create({
            orderNumber,
            customerId: id_user,
            bookId: book._id,
            priceBook: book.price,
            quantity,
            totalPrice,
            phoneNumber: infor.phoneNumber,
            address: infor.address,
            method: infor.method,
            currentDiscount
        });

        // Gắn đơn hàng vào user
        await User.findByIdAndUpdate(id_user, {
            $push: { orders: newOrder._id }
        });

        res.json({ message: true });
    } catch (err) {
        res.status(500).send("Lỗi tại controller payment: " + err);
    }
}

async function getOrder(req, res) {
    try {
        const { id } = req.params
        const orders = await Orders.find({ customerId: id }).populate("bookId", "name").sort({ createAt: -1 })
        res.json(orders)
    } catch (err) {
        res.status(500).send('Lỗi tại phần controller getOrder' + err)
    }
}

async function authoGoogle(req, res) {
    try {
        const client = new OAuth2Client('893162782594-ukjabpfjmm7d3bst281g5e8luheujm05.apps.googleusercontent.com')
        const { token } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "893162782594-ukjabpfjmm7d3bst281g5e8luheujm05.apps.googleusercontent.com"
        })
        const payload = ticket.getPayload()
        const { email, name, picture } = payload
        const appToken = jwt.sign({ email, name }, "12345", { expiresIn: '1h' })
        const checkEmail = await User.findOne({ email })
        if (!checkEmail) {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash('', salt)
            const newUser = await User.create({
                name,
                email,
                avatar: picture,
                password,
                gender: ""
            })
            res.json({ message: true, token: appToken, id: newUser._id })
        } else {
            res.json({ message: true, token: appToken, id: checkEmail._id })
        }
    } catch (err) {
        res.status(500).send('Lỗi tại authGoogle' + err)
    }
}
async function getAdminUser(req, res) {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).send('Lỗi tại controller getAdminUser' + err)
    }
}
async function adminDeleteUser(req, res) {
    try {
        const { _id } = req.body
        await User.findByIdAndDelete(_id)
        res.json({ message: true })
    } catch (err) {
        res.status(500).send('Lỗi tại controller' + err)
    }
}
async function uploadFile(req, res) {
    try {
        const imageUrl = `/uploads/${req.file.filename}`;

        await User.findByIdAndUpdate(req.params.id_User, {
            avatar: imageUrl
        });

        res.json({ success: true, avatar: imageUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { data, dataBook, register, login, postLogin, getInfor, changePassword, updateGender, getDetail_Book, getCart, addCart, removeCart, getPayment, payment, getOrder, authoGoogle, getAdminUser, adminDeleteUser,uploadFile }