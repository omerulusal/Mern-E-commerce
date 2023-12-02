/* eslint-disable react/prop-types */
const Filter = ({ setPrice, setRating, setCategory }) => {
    const categoryList = ["canta", "ayakkabı", "bitki", "oyun", "kulaklık"]
    const ratingList = [1, 2, 3, 4, 5]
    return (
        <div className="w-[200px] mt-3 p-1">
            <div className="text-xl my-2 cursor-pointer">Filtreleme</div>
            <div className="flex items-center gap-2 my-2">
                <input onChange={e => setPrice(prev => ({ ...prev, min: e.target.value }))} className="border w-16 p-1 outline-none " type="number" placeholder="Min" />
                <input onChange={e => setPrice(prev => ({ ...prev, max: e.target.value }))} className="border w-16 p-1 outline-none " type="number" placeholder="Max" />
            </div>
            <div className="text-xl my-2 cursor-pointer">Kategori</div>
            {
                categoryList.map((category, i) => (
                    <div onClick={() => setCategory(category)} className="text-md cursor-pointer" key={i}>{category}</div>
                ))
            }
            <hr className="my-5" />
            <div className="text-xl my-2 cursor-pointer">Puanlama</div>
            {
                ratingList.map((rating, i) => (
                    <div onClick={() => setRating(rating)} className="text-md cursor-pointer" key={i}>{rating}</div>
                ))
            }
        </div>
    )
}

export default Filter