const ContatoService = require('../src/services/contato.service.js')
const ContatoRepository = require('../src/repository/contact.repository.js')

jest.mock('../src/repository/contact.repository.js')

describe('contacts service', () => {
    let contatoService
    let contatoRepository

    beforeEach(() => {
        contatoRepository = new ContatoRepository()
        contatoService = new ContatoService(contatoRepository)
    })

    test('get all contacts', async () => {
        const mockContacts = [
            {
                nome: 'Mateus',
                telefone: 123,
                email: 'exemplo@email.com'
            },
            {
                nome: 'Maria',
                telefone: 123,
                email: 'exemplo@email.com'
            },
            {
                nome: 'Felipe',
                telefone: 123,
                email: 'exemplo@email.com'
            },
            {
                nome: 'George',
                telefone: 123,
                email: 'exemplo@email.com'
            },
        ]

        contatoRepository.list.mockResolvedValue(mockContacts)

        const contacts = await contatoService.getAll()

        expect(contacts).toEqual(mockContacts)
        expect(contatoRepository.list).toHaveBeenCalledTimes(1)
    })

    test('get specific contact by id', async() => {
        const mockContacts = {
            id: 1,
            nome: 'Mateus',
            telefone: 1234,
            email: 'mateus@email.com'
        }

        contatoRepository.getById.mockResolvedValue(mockContacts)

        const id = 1
        const contact = await contatoService.get(id)

        console.log('log single contagft', contact);

        expect(contact).toEqual(mockContacts)
    })

    test('create contact', async() => {
        const nome = 'Mateus'
        const telefone = 1234
        const email = 'mateus@email.com'

        const mockContact = {
            nome,
            telefone,
            email
        }

        contatoRepository.create.mockResolvedValue(mockContact)

        const createdContact = await contatoService.insertContato(nome, telefone, email)

        expect(createdContact).toEqual(mockContact)
        expect(contatoRepository.create).toHaveBeenCalledWith(nome, telefone, email)
        expect(contatoRepository.create).toHaveBeenCalledTimes(1)
    })

    test('remove contact', async() => {
        const mockContact = {
            id: 1,
            nome: 'Mateus',
            telefone: 1234,
            email: 'mateus@email.com'
        }

        contatoRepository.remove.mockResolvedValue(mockContact)

        const removedContact = await contatoService.remove(mockContact.id)

        expect(mockContact).toEqual(removedContact)
        expect(contatoRepository.remove).toHaveBeenCalledWith(mockContact.id)
        expect(contatoRepository.remove).toHaveBeenCalledTimes(1)

    })
    
    test('teste falho', () => {
        expect(1+1).toEqual(4)
    })
})
