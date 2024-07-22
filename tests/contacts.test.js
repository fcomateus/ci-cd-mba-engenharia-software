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

        const id = mockContacts.id
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

    const casosDeTesteEmail = [
        { email: 'usuario@dominio.com', esperado: true },
        { email: 'email_com_pontos@empresa.com', esperado: true },
        { email: 'email@dominio.co.uk', esperado: true },
        { email: 'invalido@sem@arrouba.com', esperado: false },
        { email: 'sem-arrouba.com', esperado: false },
        { email: 'usuario@dominio', esperado: false },
      ];
      
      describe('Test validate e-mail', () => {
        casosDeTesteEmail.forEach(({ email, esperado }) => {
          test(`Email "${email}" should be ${esperado ? 'true' : 'false'}`, () => {
            expect(validateService.validarEmail(email)).toEqual(esperado);
          });
        });
      });
})
