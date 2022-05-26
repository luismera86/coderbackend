class Usuario {
    constructor (nombre, apellido, mascotas, libros,){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }

    
    getFullName () {
        console.log(`Nombre de usuario es ${this.nombre} ${this.apellido} `);
    }

    
    addMascota(mascota) {
        this.mascotas = [...this.mascotas, mascota];

        
    }

   
    countMascotas() {
        console.log(`Tiene ${this.mascotas.length} mascotas`);
    }

    getNombresMascotas() {
        console.log(`Las mascotas se llaman ${this.mascotas}`);
    }

    
    addLibro(libro, autor) {
        const newLibro = [...this.libros, {nombre: libro, autor: autor}];
        this.libros = newLibro;


    }

  
    getBooks() {
        console.log(this.libros.map((libro) => libro.nombre));
    }
    
    getNombresAutores (){
        console.log(this.libros.map((autor) => autor.autor));
    }
}


const user = new Usuario ('Luis', 'Mera', [], []);


user.getFullName();

user.addLibro('Código Limpio', 'Robert C. Martin');
user.addLibro('Ingeniería de Software', 'Roger S.Pressman');
user.addLibro('No me hagas pensar', 'Steve Krug');


user.addMascota('Deby');
user.addMascota('Mia');
user.addMascota('Pinky');
user.addMascota('Kenta');


user.countMascotas();

user.getNombresMascotas();

user.getBooks();
user.getNombresAutores();