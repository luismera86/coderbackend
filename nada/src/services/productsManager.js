const { faker } = require('@faker-js/faker')

faker.locale = 'es'

class ProductsManager {
	products

	constructor() {
		this.products = []
		for (let i = 1; i <= 5; i++) {
			this.products.push({
				id: i,
				title: faker.commerce.product(),
				price: faker.commerce.price(),
				thumbnail: faker.image.technics(), //No sabía que poner
			})
		}
	}

	async getAll() {
		return this.products
	}
	async getById(id_prod) {
		const elemento = await this.dbMariadb.from(this.tableName).where('id', '=', id_prod)
		console.log(elemento)
		return elemento
	}

	async deleteById(id_prod) {
		await this.dbMariadb.from(this.tableName).select('*').where('id', '=', id_prod).del()
	}

	async update(id, title, price, thumbnail) {
		await this.dbMariadb.from(this.tableName).where('id', '=', id).update({
			title: title,
			price: price,
			thumbnail: thumbnail,
			// description:description,
			// code:code,
			// stock:stock,
			// timestamp:Date.now()
		})
	}
	async newProduct(title, price, thumbnail) {
		const elemento = {
			title,
			price,
			thumbnail,
			// description,
			// code,
			// stock,
			// timestamp:Date.now()
		}
		const product = await this.dbMariadb.from(this.tableName).insert(elemento)
		return product
	}
}

module.exports = ProductsManager
