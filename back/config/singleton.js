const mongoose = require("mongoose")

class MongoSingleton {
    static connection

    constructor() {

        const MONGODB_CONNECT = 
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

        mongoose.connect(MONGODB_CONNECT)
          .then(() => console.log(`✔ Conected to database(EDUCADEMI)`))
          .catch((e) => console.log(e))
    }

    static getConnection(config){
        if(this.connection) {
            console.log("Already exist a data base connection")
            return this.connection
        }

        this.connection = new MongoSingleton(config)

        return this.connection
    }
}

module.exports = MongoSingleton