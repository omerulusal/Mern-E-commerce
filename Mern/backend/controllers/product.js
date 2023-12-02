const Product = require('../models/product.js');
// 'Product' modeli(models teki product.js (schemadan) ) ile ilgili tüm ürünleri veritabanından alır.
const ProductFilter = require('../utils/productFilter.js');
// ProductFilter, utils icerisndeki olusturdugum ProductFilter adlı classtır
const cloudinary = require('cloudinary').v2;

const allProducts = async (req, res) => {
    try {
        
        // MongoDB sorgusu yapmadan önce sadece gerekli alanları çek
        const products = await Product.find({}, 'id name description price stock category rating images user reviews');
        // Bu kısımda ürün belgelerimde bulunan gerekli alanları listeledim.

        if (products.length === 0) {
            // Veri bulunamadıysa 404 hatası gönder
            res.status(404).json({
                error: "Ürün bulunamadı"
            });
        } else {
            // Veri bulunduysa 200 durum koduyla birlikte gönder
            res.status(200).json({
                products
            });
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        res.status(500).json({
            error: "Sunucu hatası oluştu"
        });
    }
};


const adminProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        products
    })
}

const detailProducts = async (req, res) => {
    const product = await Product.findById(req.params.id);
    // gelen istegin id paramteresine göre bulup product degiskenine atadım
    res.status(200).json({
        product
    })
}

// admin section
const createProduct = async (req, res, next) => {
    let images = [];
    // birden fazla görsel olacagından dizi olusturdum.
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    // gelen istegin images verisi string ise images dizisine bu istegi ekler
    // aksi halde bu istegi bir degiskene atar

    let allImage = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        })
        allImage.push({
            public_id: result,
            url: result.secure_url
        })
        // yukleme islemi yaparken beklemeli bir fonksiyon olucak
    }
    req.body.images = allImage
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        // yeni olusturuldugum icin 201 olarak dondurdum
        product
    })
}

const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // gelen istegin id paramteresine göre bulup product degiskenine atadım
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id)
    }
    await product.remove();
    res.status(200).json({
        message: "Urun Basarıyla silindi"
    })
}

const updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    let images = [];
    // birden fazla görsel olacagından dizi olusturdum.
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id)
        }
    }

    let allImage = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        })
        allImage.push({
            public_id: result,
            url: result.secure_url
        })
        // yukleme islemi yaparken beklemeli bir fonksiyon olucak
    }
    req.body.images = allImage


    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({
        product
    })
}


const createReview = async (req, res, next) => {
    const { productId, comment, rating } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        comment,
        rating: Number(rating)
    }
    let product = await Product.findById(req.params.id);

    product.reviews.push(review)

    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.rating = avg / product.reviews.length;
    // bu avg islemi verilen puan ortalamasını alır.
    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        message: "Yorumun Basarıyla Eklendi"
    })
}
// CRUD YAPISINI OLUSTURDUM (olustur,oku,sil,guncelle)
module.exports = { allProducts, detailProducts, createProduct, deleteProduct, updateProduct, createReview, adminProducts }
// en sonda modulu routestaki product js te cagıracagım