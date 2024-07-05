const sqliteConnection = require('../db/connection.js')

class Contato {

    async list() {
        const dbConnection = await sqliteConnection()
        const query = `
            SELECT * FROM contatos
        `
        const results = await dbConnection.all(query)
        dbConnection.close()
        return results
    }

    async getById(id) {
        const dbConnection = await sqliteConnection()

        const query = `
            SELECT
                *
            FROM
                contatos
            WHERE
                id = '${id}'
        `

        const results = await dbConnection.get(query)
        dbConnection.close()
        return results
    }

    async getByName(name) {
        const dbConnection = await sqliteConnection()

        const query = `
            SELECT
                nome,
                telefone,
                email
            FROM
                contatos
            WHERE
                nome ILIKE '%${name}%'
        `
        const results = await dbConnection.all(query)
        dbConnection.close()
        return results
    }

    async getByPhone(phone) {
        const dbConnection = await sqliteConnection()

        const query = `
            SELECT
                nome,
                telefone,
                email
            FROM
                contatos
            WHERE
                telefone ILIKE '%${phone}%'
        `
        const results = await dbConnection.all(query)
        dbConnection.close()
        return results
    }

    async getByEmail(email) {
        const dbConnection = await sqliteConnection()

        const query = `
            SELECT
                nome,
                telefone,
                email
            FROM
                contatos
            WHERE
                email ILIKE '%${email}%'
        `
        const results = await dbConnection.all(query)
        dbConnection.close()
        return results
    }

    async create(name, phone, email) {
        const dbConnection = await sqliteConnection()
        const query = `
            INSERT INTO contatos (nome, telefone, email)
            VALUES ('${name}', '${phone}', '${email}')
        `

        await dbConnection.run(query)

        const lastContactInsertedId = await dbConnection.get('SELECT last_insert_rowid() as id')
        const insertedId = lastContactInsertedId.id
        const lastInsertedContact = await dbConnection.get(`SELECT * FROM contatos WHERE id = '${insertedId}'`)

        dbConnection.close()
        return lastInsertedContact
    }

    async update(id, name, phone, email) {
        const dbConnection = await sqliteConnection()
        const query = `
            UPDATE contatos 
            SET nome = '${name}', 
                telefone = '${phone}', 
                email = '${email}'
            WHERE id = '${id}'
        `
        await dbConnection.exec(query)
        dbConnection.close()
    }

    async remove(id) {
        const dbConnection = await sqliteConnection()

        const query = `
            DELETE FROM contatos WHERE id = '${id}'
        `

        await dbConnection.exec(query)
        dbConnection.close()
    }

}

module.exports = Contato