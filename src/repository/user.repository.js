const sqliteConnection = require('../db/connection.js')

class Usuario {

    async getByNamePassword(name, password) {
        const dbConnection = await sqliteConnection()

        const query = `
            SELECT
                id,
                name,
                password
            FROM
                usuarios
            WHERE
                name LIKE '%${name}%'
                AND password LIKE '%${password}%'
        `
        const results = await dbConnection.all(query)
        dbConnection.close()
        return results
    }

    async create(name, password) {
        const dbConnection = await sqliteConnection()
        const query = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(200),
            password VARCHAR(200)
            )
    `
        await dbConnection.exec(query)
        
        const query2 = `
            INSERT INTO usuarios (name, password)
            VALUES ('${name}', '${password}')
        `

        await dbConnection.run(query2)

        const lastContactInsertedId = await dbConnection.get('SELECT last_insert_rowid() as id')
        const insertedId = lastContactInsertedId.id
        const lastInsertedContact = await dbConnection.get(`SELECT * FROM usuarios WHERE id = '${insertedId}'`)

        dbConnection.close()
        return lastInsertedContact
    }

    async update(id, name, password) {
        const dbConnection = await sqliteConnection()
        const query = `
            UPDATE usuarios 
            SET name = '${name}', 
                password = '${password}'
            WHERE id = '${id}'
        `
        await dbConnection.exec(query)
        dbConnection.close()
    }

    async remove(id) {
        const dbConnection = await sqliteConnection()

        const query = `
            DELETE FROM usuarios WHERE id = '${id}'
        `

        await dbConnection.exec(query)
        dbConnection.close()
    }

}

module.exports = Usuario