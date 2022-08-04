

// Inserta array de productos

db.productos.insertMany([
    {
        title: 'Lápiz',
        price: 102,
        thumbnail: 'https://img.freepik.com/vector-gratis/lapiz_24908-54630.jpg?w=2000'
    },
    {
        title: 'Televisor',
        price: 4566,
        thumbnail: 'https://www.lg.com/co/images/televisores/md07504655/gallery/1100_01_v1.jpg'
    },
    {
        title: 'Zapatilla',
        price: 987,
        thumbnail: 'https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5d2cf9e4/products/NI_DC3728-003/NI_DC3728-003-1.JPG'
    },
    {
        title: 'Bicicleta',
        price: 3253,
        thumbnail: 'https://www.cetrogar.com.ar/media/catalog/product/R/O/RO1884.jpg?width=500&height=500&canvas=500,500&quality=80&bg-color=255,255,255&fit=bounds'
    },
    {
        title: 'Celular',
        price: 2333,
        thumbnail: 'http://medias.musimundo.com/medias/00534003-145889-145889-01-145889-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w3NjkwM3xpbWFnZS9qcGVnfGhlNy9oZjMvMTAzODQxMjkzOTI2NzAvMDA1MzQwMDMtMTQ1ODg5LTE0NTg4OV8wMS0xNDU4ODlfMDEuanBnX3NpemU1MTV8MTNkYWQzYmE5MGFjZTE1MDBkOWU0ZGNhZjcxNDBjYTdiYzg5YzU4ODk5ZDM4ZGZlZWIyODhjODBiMjlmOTI5MQ'
    },
    {
        title: 'Pelota',
        price: 200,
        thumbnail: 'https://ep01.epimg.net/verne/imagenes/2015/09/11/articulo/1441988783_165642_1442161238_sumario_normal.jpg'
    },
    {
        title: 'tablet',
        price: 1487,
        thumbnail: 'https://images.samsung.com/is/image/samsung/p6pim/ar/sm-t500nzaearo/gallery/ar-galaxy-tab-a7-t500-sm-t500nzaearo-332818011?$650_519_PNG$'
    },
    {
        title: 'Impresora',
        price: 855,
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_984266-MLA48196101433_112021-O.jpg'
    },
    {
        title: 'Remera',
        price: 500,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDaKNfGecrBv3MaDs9l83Le1iqhMREl4LmU9fiRnyOlbkWA9lwlNtw0m4PZtVTo9iReQ&usqp=CAU'
    },
    {
        title: 'Pantalon',
        price: 1100,
        thumbnail: 'https://media.istockphoto.com/photos/blue-chino-pants-with-brown-leather-belt-isolated-on-white-background-picture-id1149139165?k=20&m=1149139165&s=612x612&w=0&h=GZNt8WgiJ3tSbVmcAKbIUmFAzbulMTw1NJ7msG2Tyno='
    }
])

// Consulta de productos 
db.productos.find()

// Consulta la canatidad de documentos de la collection

db.productos.estimatedDocumentCount()

// CRUD

// Agregar un producto más en la colección de productos
db.productos.insertOne({title: 'Reloj', price: 756, thumbnail: 'https://media.istockphoto.com/photos/wall-clock-isolated-on-white-ten-past-ten-picture-id597276512?k=20&m=597276512&s=612x612&w=0&h=n2Wds5-xqleapCIVWnuLO9H-fQltLBllf1rRI2ZjKbI='})

// Realizar una consulta por nombre de producto específico:

// - Listar los productos con precio menor a 1000 pesos.
db.productos.find( {price: {$lt: 1000}} )

// -Listar los productos con precio entre los 1000 a 3000 pesos
db.productos.find({$and:[{price:{$gt: 1000}}, {price: {$lt: 3000}}]})

// -Listar los productos con precio mayor a 3000 pesos
db.productos.find( {price: {$gt: 3000}} )

// -Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find().sort({price: 1}).skip(2).limit(3)

// Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({}, {$set: {stock: 100}})

//Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})


//Borrar los productos con precio menor a 1000 pesos 
db.productos.deleteMany( {price: {$lt: 1000}} )

//Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

db.createUser(
    {
      user: "pepe",
      pwd: "asd456",
      roles: [
         { role: "read", db: "ecommerce" }
      ]
    }
  )
  