/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Gustavo', {
      delay: 10
    })
    cy.get('#lastName').type('Martins', {
      delay: 10
    })
    cy.get('#email').type('gustavosm994@gmail.com', {
      delay: 10
    })
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, cum reiciendis ducimus odit animi, libero aliquam nisi ad est aperiam sint,aut aliquid explicabo eos itaque.', {
      delay: 5
    })
    cy.get('button.button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('gustavosm99')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, cum reiciendis ducimus odit animi, libero aliquam nisi ad est aperiam sint,aut aliquid explicabo eos itaque.')
    cy.get('button.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('campo de telefone deve aceitar somente números', () => {
    cy.get('input#phone').type('lorem').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('gustavosm994@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit.')
    cy.get('#phone-checkbox').invoke('attr', 'type').should('be.equal', 'checkbox')
    cy.get('#phone-checkbox').check()
    cy.get('button.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Gustavo').should('have.value', 'Gustavo').clear().should('have.value', '')
    cy.get('#lastName').type('Martins').should('have.value', 'Martins').clear().should('have.value', '')
    cy.get('#email').type('gustavosm994@gmail.com').should('have.value', 'gustavosm994@gmail.com').clear().should('have.value', '')
    cy.get('#open-text-area').type('Lorem ipsum').should('have.value', 'Lorem ipsum').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked').and('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona o arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})