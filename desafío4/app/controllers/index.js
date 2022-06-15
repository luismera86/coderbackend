
// Array de productos



let productos = []


// Lista de controllers

const getProductos = (req, res) =>{
    res.json(productos)
}

const getProductoId = (req, res) => {

    const id = Number(req.params.id)
    if( id ) {
        const productoParam = productos.filter( producto => {
            return producto.id === id
        })
        res.json(productoParam)
    } else {
        res.json(productos)
    }
   
}

const postProducto = (req, res) => {
    
    if (productos.length === 0) {
        const id = 1
        const { title, price, thunbail } = req.body
        productos.push({ title, price, thunbail, id }) 
        res.status(201).send('Producto cargado con exito')
            
    }else if (productos.length > 0) {
        const idSuma = productos[productos.length - 1].id
        const id = idSuma + 1
        const { title, price, thunbail } = req.body
        productos.push({ title, price, thunbail, id }) 
        res.status(201).send('Producto cargado con exito')
    }
}

const putProducto = (req, res) => {
    const id = Number(req.params.id)

    if(!isNaN(id)){
    const { title, price, thunbail } = req.body
    
    productos.forEach(producto => {
        if(producto.id === id) { 
            producto.title = title
            producto.price = price
            producto.thunbail = thunbail
        }
        
    })
    res.status(201).send('El producto se modifico con excito')
} else {
    res.status(404).send('El producto no existe')
} 
   
}

const deleteProducto = (req, res) => {

    const id = Number(req.params.id)

    if(!isNaN(id)) {
        const nuevoArray = productos.filter(productos => productos.id != id)
        productos = []
        productos.push(nuevoArray)
        res.status(201).send('Producto eliminado con exito')
    } else {
        res.status(404).send('No se pudo eliminar el producto')
    }
}

module.exports = {
    getProductos,
    getProductoId,
    postProducto,
    putProducto,
    deleteProducto
}