const sortTypeArr = Object.freeze([
    { name: "Popular", value: { name: "popular", type: 'desc' } },
    { name: "New Arrival", value: { name: "new_arrival", type: 'desc' } },
    { name: "Top Sales", value: { name: "sales", type: 'desc' } },
    { name: "Low - High", value: { name: "price", type: 'asc' } },
    { name: "High - Low", value: { name: "price", type: 'desc' } },
])

export default sortTypeArr