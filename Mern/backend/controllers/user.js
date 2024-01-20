const User = require('../models/user.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const register = async (req, res) => {
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatar",
        width: 130,
        // resmi optimize ettim
        crop: "scale"
    });

    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    // kullaniciyi emailine göre bulmasını istedim.
    if (user) {
        // eger gelen user zaten varsa hata gondericegim
        return res.status(500).json({
            message: 'Boyle bir kullanici zaten var!'
        })
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // sifreyi cryptoladim
    if (password.length <= 6) {
        return res.status(500).json({
            message: 'Sifre 6 karakterden kucuk olamaz!'
        })
    }

    const newUser = await User.create({
        name, email, password: passwordHash, avatar: {
            public_id: avatar.public_id,
            url: avatar.secure_url
        }
    })
    // yeni useri, name email ve cryptolu sifreye ve resmine gore olusturdum.

    const token = await jwt.sign({ id: newUser._id }, "SECRETTOKEN", { expiresIn: "1h" });
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
    res.status(201).cookie("token", token, cookieOptions).json({
        newUser,
        token
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // useri disaridan gelen emaile gore bul
    if (!user) {
        return res.status(400).json({
            message: "Boyle bir kullanici bulunamadi!"
        });
    }

    const comporePassword = await bcrypt.compare(password, user.password)
    // user varsa sifre kontrolu olucak. (disaridan gelen veri ile kayitli olanı kıyaslıyorum)
    if (!comporePassword) {
        return res.status(500).json({ message: "Sifre Hatali!" });
    }
    const token = await jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: "1h" });
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
    res.status(200).cookie("token", token, cookieOptions).json({
        user,
        token
    })
}

const logout = async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now())
    }
    res.status(200).cookie("token", null, cookieOptions).json({
        message: "Cikis islemi basarili"
    })
}

const forgotPassword = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    // kişi şifresini unutmuşsa kişinin gonderdigi email degerini User modelinden bulmaya calışırım. 
    if (!user) {
        return res.status(500).json({
            message: "Bu mail adresine ait bir kullanici yoktur."
        });
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    await user.save({ validateBeforeSave: false })
    const passwordUrl = `${req.protocol}://${req.get('host')}/reset/${resetToken}`
    const message = `Sifreni sifirlamak icin kullanicagin token: ${passwordUrl}`
    try {
        // bu try yapisini nodemailer sitesinden kopyaladim
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: 'gmail',
            secure: true,
            auth: {
                user: "youremail@gmail.com",
                pass: "password",
            },
            secure: true,
        });
        const mailData = {
            from: 'youremail@gmail.com',
            to: req.body.email,
            subject: "Sifre sifirlama",
            text: message,
        }
        await transporter.sendMail(mailData);
        res.status(200).json({ message: 'Mailinizi Kontrol ediniz!' });
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
    }
}

const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return res.status(500).json({ message: "Gecersiz Token" });
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    await user.save();
    const token = jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: '1h' });
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
    res.status(200).cookie("token", token, cookieOptions).json({
        user,
        token
    })
}

const userDetail = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        user
    })
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    userDetail,
}