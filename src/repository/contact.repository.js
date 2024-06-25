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

    async remove(_id) {
        const dbConnection = await sqliteConnection()

        const contact = await this.getById(_id)

        const query = `
            DELETE FROM contatos WHERE id = '${_id}'
        `

        await dbConnection.exec(query)
        dbConnection.close()
        return contact
    }

}

module.exports = Contato