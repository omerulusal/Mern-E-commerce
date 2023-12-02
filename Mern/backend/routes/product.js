const express = require('express');
const { allProducts, detailProducts, createProduct, deleteProduct, updateProduct, createReview, adminProducts } = require('../controllers/product.js');
const { authhenticationMid, roleChecked } = require('../middleware/auth.js');


const router = express.Router();
// express uzerinden router olusturdum.

router.get('/products', allProducts);
// urlde /products eklendiginde controllerdaki allProducts fonksiyonu cagrılır.
router.get('/admin/products', authhenticationMid, roleChecked("admin"), adminProducts);
// admin sayfasına girmek icin erisim olması gerektiginden authhenticationMid kullanılır. 
// admin olarak urunleri gormek icin roleChecked middleware e ihtiyac var.
router.get('/products/:id', detailProducts);
// /product:(örn:3) eklendiginde tum urunler icerisinden 3 nolu id'ye sahip urunu getirir.

router.post('/product/new', createProduct, roleChecked("admin"));
// yeni urun ekleyecegimden routerda post metodunu kullandım

router.post('/product/newReview', authhenticationMid, createReview);
// urun yorumu ekleyecegimden routerda post metodunu kullandım
// bir urun olsuturmak icicn login olmak gerekir bu yuzden authhenticationMid middleware ekledim.


router.delete('/products/:id', authhenticationMid, deleteProduct, roleChecked("admin"));
// urun silecegimden routerda delete metodunu kullandım

router.put('/products/:id', authhenticationMid, updateProduct, roleChecked("admin"));
// urun guncelleyecegimden routerda put metodunu kullandım



module.exports = router;

// authhenticationMid middleware katmanıdır kullanicinin giris yapıp yapmadıgı kontrol edilir.
// roleChecked ise kullanicinin statsn belirtir. eger admin ise yukarida belirttigim alanlara erisebilir.