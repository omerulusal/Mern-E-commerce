const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // Yaptıgım Bu şema, ürünün sahip olabileceği alanları ve gereksinimlerini belirtir.
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        // image'i dizi olarak vermemin nedeni urunun birden fazla resmi olabilir.
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                // type taki veri, başka bir MongoDB belgesinin kimliğini içerecek.
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema)
// 'product' adlı bir MongoDB modeli oluşturulur ve bu model dışarıya aktarılır. 


// en sonda modulu controllerdaki product js e importlayacagım