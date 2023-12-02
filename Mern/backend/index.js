const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const db = require('./config/db.js');
const product = require('./routes/product.js');
const user = require('./routes/user.js');
const cloudinary = require('cloudinary');


dotenv.config();
// ortam değişkenlerine erişmek için kullanacağımız bir modüldür.
// hassas veya platforma özel bilgileri, process.env (.envden aktarılır) ile yerelde saklayabiliriz

cloudinary.config({
    cloud_name: 'de9upaogi',
    api_key: '848447585291296',
    api_secret: 'TJHC80ECAGm31Rp-KbAS6yZx9aA'
});
// Kendi cloudinary hesabımdan girdim.


const app = express();

// Middleware
app.use(cors());
// CORS, bir web uygulamasının başka kaynaklara erişimi sırasında erişim izni kontrolünü sağlayan mekanizmadır.

app.use(bodyParser.json({ limit: "30mb", extended: true }));
// limit ile JSON verisinin boyutunu sınırlanır, büyük veri yüklerine karşı koruma sağlar.

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// URL kodlu verileri işler. JSON verileri yerine form verilerini işlemek için kullanılır.
// Gönderilen POST verilerini URL kodlu olarak ayrıştıran ve req.body üzerinde kullanılabilir hale getirir.

app.use(cookieParser());
// çerezleri okumak ve yönetmek için kullanılan bir middlewaredir.
// istemciden gelen her istekte req.cookies nesnesine erişebilir. Bu nesne, istemcinin gönderdiği tüm çerezleri içerir.

app.use('/', product);
// / yolu için product adlı bir yönlendirici kullanılacağını belirtir.
app.use('/', user);

db();
// veritabanini uygulamaya dahil ettim.

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}/products`)
})

// bodyParser.json(), gelen requestlerin gövdesini JSON formatında ayrıştırmak için kullanılır.
// -Bu, sunucunun JSON verilerini almasını ve işlemesini sağlar
//config:Yapılandrma