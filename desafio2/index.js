/* const productos = [
    { 
        
        nombre: 'Camisa',
        precio: 20,
        thumbnail: 'https://e7.pngegg.com/pngimages/858/685/png-clipart-dress-shirt-dress-shirt-thumbnail.png',
    },
    {

        nombre: 'Pantalon',
        precio: 30,
        thumbnail: 'https://w7.pngwing.com/pngs/448/293/png-transparent-blue-denim-pants-t-shirt-mom-jeans-slim-fit-pants-trousers-jeans-tshirt-fashion-slimfit-pants-thumbnail.png',
    },
    {
        
        nombre: 'Zapatos',
        precio: 40,
        thumbnail: 'https://w7.pngwing.com/pngs/586/184/png-transparent-oxford-shoe-leather-dress-shoe-real-leather-shoes-men-s-products-blue-mens-fashion-thumbnail.png',
    }
]

const fs = require('fs')

let id = 1

class Contador {

    constructor(title, price, thumbnail) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    
    
    save(id){
        const data = fs.writeFileSync('./productos.txt', `{
            id: ${id}
            title: ${this.title}
            price: ${this.price}
            thumbnail: ${this.thumbnail}
        }` )

        console.log('Producto agregado')
    }

}



const producto1 = new Contador('Camisa', 20, 'https://w7.pngwing.com/pngs/448/293/png-transparent-blue-denim-pants-t-shirt-mom-jeans-slim-fit-pants-trousers-jeans-tshirt-fashion-slimfit-pants-thumbnail.png')

producto1.save() */

const fs = require('fs')
class Contenedor {
	constructor(fileName) {
		this.fileName = fileName
		fs.promises.writeFile(`./${fileName}`, '')
	}
	async save(objeto) {
		let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
		if (!data) {
			objeto.id = 1
			const arr = [objeto]
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr))
			return objeto.id
		} else {
			data = JSON.parse(data)
			objeto.id = data.length + 1
			data.push(objeto)
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
			return objeto.id
		}
	}

	async getById(id) {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			data = data.find(product => product.id === id)

			data ? console.log(data) : console.log(null)
		} catch {
			console.log('error, no se pudieron leer los productos')
		}
	}

    async getAll() {
        try{
            let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
            data = JSON.parse(data)
            console.log(data)
        }
        catch{

            console.log('Error no se puede leer el archivo')
        }
    }

    async deleteById(id){
        try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			data = data.filter(product => product.id != id)

			 console.log(data) 
		} catch {
			console.log('error, no se pudieron leer los productos')
		}
	
    }

    async deleteAll() {
        try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)
			data = []

			 console.log(data) 
		} catch {
			console.log('error, no se pudieron leer los productos')
		}

    }
}
const productos = new Contenedor('productos.txt')

const objeto1 = {
	nombre: 'Camisa',
	precio: 20,
	thumbnail:
		'https://e7.pngegg.com/pngimages/858/685/png-clipart-dress-shirt-dress-shirt-thumbnail.png',
}

const objeto2 = {
	nombre: 'Pantalon',
	precio: 30,
	thumbnail:
		'https://w7.pngwing.com/pngs/448/293/png-transparent-blue-denim-pants-t-shirt-mom-jeans-slim-fit-pants-trousers-jeans-tshirt-fashion-slimfit-pants-thumbnail.png',
}

const objeto3 = {
	nombre: 'Zapatos',
	precio: 40,
	thumbnail:
		'https://w7.pngwing.com/pngs/586/184/png-transparent-oxford-shoe-leather-dress-shoe-real-leather-shoes-men-s-products-blue-mens-fashion-thumbnail.png',
}

const test = async () => {
	await productos.save(objeto1)
	await productos.save(objeto2)
	await productos.save(objeto3)
	await productos.getById(1)
    await productos.getAll()
    await productos.deleteById(3)
    await productos.deleteAll()
}

test()
