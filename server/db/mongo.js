/**
 * The mongodb connection will make the appliation restart if
 * the mongodb is not yet ready to receive connections, this is
 * delegated to the docker-compose with the property 'restart:always'
 * that's why I'm doing a console.error if the connection failed. Once
 * the mongodb accepts connections the application will no longer restart
 * and will create the db instance properly.
 */

import mongoose from "mongoose"

export default (conn) => {
    mongoose.connect(conn, {
        useNewUrlParser: true,
        useFindAndModify: false
    })

    const db = mongoose.connection

    db.on("error", err => {
        console.error(err)
        process.exit(1)
    })

    return db
}