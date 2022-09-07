const { logger } = require("../utils/logger")


const error404 = (req, res, next) => {
    let error = new Error()
    error.status = 404
    res.status(404).send('ERROR 404 PAGINA NO ENCONTRADA')
    
    logger.log('warn', 'Error 404')
}

module.exports = error404