const productEnum={


    sortTypeArr : Object.freeze([
        { name: "Popular", value: { name: "popular", type: 'desc' } },
        { name: "New Arrival", value: { name: "new_arrival", type: 'desc' } },
        { name: "Top Sales", value: { name: "sales", type: 'desc' } },
        { name: "Low - High", value: { name: "price", type: 'asc' } },
        { name: "High - Low", value: { name: "price", type: 'desc' } },
    ]),
    itemType : Object.freeze([
        {name:'Plant',value: 'plant'},
        {name:'Flower',value: 'flower'}, 
        {name:'Cactus',value: 'cactus'}, 
        {name:'Seed',value: "seed"}, 
        {name:'Equirement',value: "equirement"}, 
        {name:'Material',value: "material"},
    ])
}
// module.exports.sortTypeArr=sortTypeArr
// module.exports.itemType =itemType
export default productEnum