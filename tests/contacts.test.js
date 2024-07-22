const ContatoService = require('../src/services/contato.service.js')
const ValidateService = require('../src/validate/validate.service.js')
const ContatoRepository = require('../src/repository/contact.repository.js')

jest.mock('../src/repository/contact.repository.js')

describe('contacts service', () => {
    let contatoService
    let validateService
    let contatoRepository

    beforeEach(() => {
        contatoRepository = new ContatoRepository()
        validateService = new ValidateService()
        contatoService = new ContatoService(contatoRepository)
    })

    test('it should get all contacts', async () => {
        //Arrange
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
        
        // Act
        const contacts = await contatoService.getAll()

        //Assert
        expect(contacts).toEqual(mockContacts)
        expect(contatoRepository.list).toHaveBeenCalledTimes(1)
    })

    test('it should get specific contact by id', async() => {
        //Arrange
        const mockContacts = {
            id: 1,
            nome: 'Mateus',
            telefone: 1234,
            email: 'mateus@email.com'
        }

        contatoRepository.getById.mockResolvedValue(mockContacts)

        const id = mockContacts.id
        //Act
        const contact = await contatoService.get(id)

        expect(contact).toEqual(mockContacts)
    })

    test('it should validate name of contact to have only letters', async() => {
        //Arrange
        const name = 'Nome de Teste';

        //Act
        const result = contatoService.validateContactName(name);

        //Assert
        expect(result).toEqual(true);
    })

    test('it should create contact', async() => {
        //Arrange
        const nome = 'Mateus'
        const telefone = 1234
        const email = 'mateus@email.com'

        const mockContact = {
            nome,
            telefone,
            email
        }

        contatoRepository.create.mockResolvedValue(mockContact)
        //Act
        const createdContact = await contatoService.insertContato(nome, telefone, email)

        //Assert
        expect(createdContact).toEqual(mockContact)
        expect(contatoRepository.create).toHaveBeenCalledWith(nome, telefone, email)
        expect(contatoRepository.create).toHaveBeenCalledTimes(1)
    })

    test('it should remove contact', async() => {
        //Arrange
        const mockContact = {
            id: 1,
            nome: 'Mateus',
            telefone: 1234,
            email: 'mateus@email.com'
        }

        contatoRepository.remove.mockResolvedValue(mockContact)
        //Act
        const removedContact = await contatoService.remove(mockContact.id)
        //Assert
        expect(mockContact).toEqual(removedContact)
        expect(contatoRepository.remove).toHaveBeenCalledWith(mockContact.id)
        expect(contatoRepository.remove).toHaveBeenCalledTimes(1)

    })

    test('it should validate phone format', async() => {
        const mockTelephone = "85987654321"
        const result = contatoService.validatePhone(mockTelephone)
        
        expect(result).toBe(true)
    })

    test('it should throw error when search for inexistent contact by id', async () => {
        const inexistentId = 1
        try {
            await contatoService.get(inexistentId);
        } catch (e) {
            expect(e.message).toBe('Contato não encontrado');
        }
    })
})
