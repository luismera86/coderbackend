class CustomError extends Error {
  constructor(statusCode, message ) {
    this.message = message
    this.statusCode = statusCode
  }
}

export default CustomError
