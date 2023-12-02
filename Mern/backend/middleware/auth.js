const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const authhenticationMid = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(500).json({ message: 'Lutfen Giris Yapiniz' });
    }
    const decodedData = jwt.verify(token, "SECRETTOKEN")
    // contorllerstaki user.jste olusturdugum SECRETTOKEN'i verdim.

    if (!decodedData) {
        return res.status(500).json({ message: 'Token Gecersizdir.' });
    }
    req.User = await User.findById(decodedData.id);
    // tokendan gelen idye gore userlari buldum.
    next();
}


const roleChecked = (...roles) => {
    // gelen istegin admin rolu icerip icermedigini kontrol ediyorum.
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({ message: "Giris icin izniniz bulunmamaktadir" });
        }
        next()
    }
}





module.exports = { authhenticationMid, roleChecked }