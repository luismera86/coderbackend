// Inserta array de mensajes

db.mensajes.insertMany([
    {
        userMail: 'usuario1@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario2@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario3@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario4@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario5@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario6@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario7@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario8@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario9@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },
    {
        userMail: 'usuario10@usuario.com',
        timeChat: 4214324,
        userMessage: 'Hola'
    },

])

// Consulta de mensajes
db.mensajes.find()

// Consulta la cantidad de documentos de la collection

db.mensajes.estimatedDocumentCount()