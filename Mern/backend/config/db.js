const mongoose = require('mongoose')
const db = () => {
    mongoose.connect('mongodb+srv://omer:DUzkJZXIIn5CHK3m@cluster0.o0ko3au.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        // baglantı basarılı olursa calısır aksi halde catch e girer.
        console.log('mongoDB connected!!!!!')
    }).catch((err) => {
        console.log(err)
    })
}



module.exports = db
// export default function gibi calısır.