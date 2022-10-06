import CustomError from "./CustomError.class.js";

class DBClient {
   

    async connect() {
      throw new CustomError(500, "Not implemented")
    }

    async disconnect() {
        throw new CustomError(500, "Not implemented")
    }
}

export default DBClient