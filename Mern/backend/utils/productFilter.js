class ProductFilter {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
        // query parametresi, db sorgusunu, queryStr ise kullanıcının girdiği sorgu parametrelerini temsil eder.
    }
    search() {
        // search metodu, queryStr özelliğinde bir keyword anahtar sözcüğü olup olmadığını kontrol eder. 
        // Eğer varsa, bu anahtar sözcüğü kullanarak veritabanında ürün isimlerini arar. 
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                // bir düzenli ifade ile eşleşen değerleri bulur. 
                $options: "i"
                // aramanın büyük-küçük harfe duyarlı olup olmadığını belirler.
            }
            // search işlemini name'e göre filtreledim.
        } : {}
        this.query = this.query.find({ ...keyword })
        return this;
        // search metodu, query özelliğini bulunan sonuçlarla günceller ve sınıfın kendisini döndürür.
    }
    filter() {
        //  queryStr özelliğindeki diğer sorgu parametrelerini kullanarak DB'den ürünleri filtreler. 
        const queryCopy = { ...this.queryStr }
        // queryCopy ile queryStr'ın bir kopyası olusturulur. 
        const deleteArea = ["keyword", "page", "limit"];
        // [istenmeyen anahtar sozcukler] donguye alınıp silinir.
        deleteArea.forEach(item => delete queryCopy[item]);

        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        // regex ifadeleri
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }
    pagination(resultPerPage) {
        // resultPerPage parametresi her sayfada kaç tane ürün gösterileceğini belirler.
        // DB'den dönen ürünleri sayfalara bölerek göstermek için kullanılır
        const activePage = this.queryStr.page || 1
        const skip = resultPerPage * (activePage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        // limit, her sayfada kaç tane ürün gösterileceğini belirler. skip, kaç tane ürünün atlanacağını belirler.
        return this;
    }
}
// query urunlerin tumunu, queryStr ise filtrelenmis halini temsil eder.
module.exports = ProductFilter;