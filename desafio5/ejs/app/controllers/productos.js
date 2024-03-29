// Array de productos

let productos = []

// Lista de controllers

// Obtener la lista de productos

const getProductos = (req, res) => {
	res.render('home.ejs')

}

// Obtener la lista de productos por parámetro

const getProductoId = (req, res) => {
	const id = Number(req.params.id)
	if (id) {
		const productoParam = productos.filter(producto => {
			return producto.id === id
		})
		res.json(productoParam)
	} else {
		console.log('hola')
	}
}

// Agregar un producto por medio de un formulario

const postProducto = (req, res) => {
	if (productos.length === 0) {
		const id = 1
		const { title, price, thumbnail  } = req.body
		productos.push({ title, price, thumbnail, id })
		res.status(201).redirect('/productos')
	} else if (productos.length > 0) {
		const idSuma = productos[productos.length - 1].id
		const id = idSuma + 1
		const { title, price, thumbnail } = req.body
		productos.push({ title, price, thumbnail, id })
		res.status(201).redirect('/productos')
	}
}

// Modificar un producto

const putProducto = (req, res) => {
	const id = Number(req.params.id)

	if (!isNaN(id)) {
		const { title, price, thumbnail } = req.body

		productos.forEach(producto => {
			if (producto.id === id) {
				producto.title = title
				producto.price = price
				producto.thumbnail = thumbnail
			}
		})
		res.status(201).send('El producto se modifico con excito')
	} else {
		res.status(404).send('El producto no existe')
	}
}

// Eliminar un producto

const deleteProducto = (req, res) => {
	const id = Number(req.params.id)

	if (!isNaN(id)) {
		const nuevoArray = productos.filter(productos => productos.id != id)
		productos = []
		productos.push(nuevoArray)
		res.status(201).send('Producto eliminado con éxito')
	} else {
		res.status(404).send('No se pudo eliminar el producto')
	}
}

const productosLista = (req, res) => {
	
	res.render('productos.ejs', { productos })
}

module.exports = {
	getProductos,
	getProductoId,
	postProducto,
	putProducto,
	deleteProducto,
	productosLista
}
