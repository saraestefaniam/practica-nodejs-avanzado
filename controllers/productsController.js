export function productsPage (req, res, next) {
    res.locals.products = [
        {name: 'Laptop', owner: 'user1', price: 855, photo: '', tags: ['work', 'mobile']},
        {name: 'Protein bars', owner: 'user2', price: 15, photo: '', tags: ['lifestyle']},
        {name: 'Universal bettery', owner: 'user1', price: 95, photo: '', tags: ['motor', 'mobile']},
        {name: 'iPhone 16 pro max', owner: 'user3', price: 1200, photo: '', tags: ['mobile']}
    ]
    res.render('productsView')
}