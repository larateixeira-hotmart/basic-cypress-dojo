/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  context(
    `Dado que usuário está na página inicial do site`,
     () => {

        const THREE_SECONDS_IN_MS = 3000
      
        beforeEach(function() {
          cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        })
            
        it(`Quando ele preencher os campos obrigatórios e enviar o formulário
            Então deve ser exibido uma mensagem de sucesso 
            E a mesma deve sumir após 3 segundos`, function() {
              const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
      
          cy.clock()
      
          cy.get('#firstName').type('Paulo')
          cy.get('#lastName').type('José')
          cy.get('#email').type('paulojose@exemplo.com')
          cy.get('#open-text-area').type(longText, { delay: 0 })
          cy.contains('button', 'Enviar').click()
      
          cy.get('.success').should('be.visible')
      
          cy.tick(THREE_SECONDS_IN_MS)
      
          cy.get('.success').should('not.be.visible')
        })
      
        it(`Quando ele preencher o formulário com um email com formatação inválida
            Então deve ser exibido uma mensagem de erro
            E a mesma deve sumir após 3 segundos`, function() {
          cy.clock()
      
          cy.get('#firstName').type('Paulo')
          cy.get('#lastName').type('José')
          cy.get('#email').type('paulojose@exemplo,com')
          cy.get('#open-text-area').type('Teste')
          cy.contains('button', 'Enviar').click()
      
          cy.get('.error').should('be.visible')
      
          cy.tick(THREE_SECONDS_IN_MS)
      
          cy.get('.error').should('not.be.visible')
        })
            
        it(`Quando ele clicar na opção de telefone no meio de contato preferencial
            E submeter o formulário sem preencher o campo telefone
            Então deve ser exibido uma mensagem de erro
            E a mesma deve sumir após 3 segundos`, function() {
          cy.clock()
      
          cy.get('#firstName').type('Paulo')
          cy.get('#lastName').type('José')
          cy.get('#email').type('paulojose@exemplo.com')
          cy.get('#phone-checkbox').click()
          cy.get('#open-text-area').type('Teste')
          cy.contains('button', 'Enviar').click()
      
          cy.get('.error').should('be.visible')
      
          cy.tick(THREE_SECONDS_IN_MS)
      
          cy.get('.error').should('not.be.visible')
        })
      
        it(`Quando ele preencher e limpar os campos nome, sobrenome
            Então os campos devem estar vazios`, function() {
          cy.get('#firstName')
            .type('Paulo')
            .should('have.value', 'Paulo')
            .clear()
            .should('have.value', '')
          cy.get('#lastName')
            .type('José')
            .should('have.value', 'José')
            .clear()
            .should('have.value', '')
        })
      
        it(`Quando ele submeter o formulário sem preencher os campos obrigatórios
            Então deve exibir mensagem de erro
            E a mesma deve sumir após 3 segundos`, function() {
          cy.clock()
      
          cy.contains('button', 'Enviar').click()
      
          cy.get('.error').should('be.visible')
      
          cy.tick(THREE_SECONDS_IN_MS)
      
          cy.get('.error').should('not.be.visible')
        })
      
        it(`Quando ele enviar o formuário com sucesso usando um comando customizado
            Então deve ser exibido mensagem de sucesso
            E a mesma deve sumir após 3 segundos`, function() {
          cy.clock()
      
          cy.PreencherCamposObrigatoriosESubmeter()
      
          cy.get('.success').should('be.visible')
      
          cy.tick(THREE_SECONDS_IN_MS)
      
          cy.get('.success').should('not.be.visible')
        })
      
        it(`Quando ele selecionar um produto (YouTube) por seu texto
            Então o valor do campo deve ser "youtube"`, function() {
          cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        })
      
        it(`Quando ele selecionar um produto (Mentoria) por seu valor (value)
            Então o valor do campo deve ser "mentoria"`, function() {
          cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
        })
      
        it(`Quando ele selecionar um produto (Blog) por seu índice
            Então o valor do campo deve ser "blog"`, function() {
          cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        })
      
        it(`Quando ele marcar o tipo de atendimento como "Feedback"
            Então o valor do campo de ser "feedback"`, function() {
          cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        })
      
        it(`Quando ele marcar cada tipo de atendimento
            Então o atendimento deve estar marcado`, function() {
          cy.get('input[type="radio"]')
            .should('have.length', 3)
            // o each recebe uma função de callback, que recebe o elemento que passamos ali no cy.get
            .each(function($radio) {
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked')
            })
        })
      
        it(`Quando ele marcar ambos checkboxes e depois desmarcar o último
            Então o primeiro checkbox deve estar marcado
            E o segundo checkbox deve estar desmarcado`, function() {
          cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })
      
        it(`Quando ele selecionar um arquivo
            Então o nome do arquivo deve ser o selecionado`, function() {
          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
              console.log($input)
              expect((<HTMLInputElement>$input[0]).files[0].name).to.equal('example.json')
            })
        })
      
        it(`Quando ele selecionar um arquivo simulando um drag-and-drop
            Então o nome do arquivo deve ser o selecionado`, function() {
          cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
              expect((<HTMLInputElement>$input[0]).files[0].name).to.equal('example.json')
            })
        })
      
        it(`Quando ele selecionar um arquivo utilizando uma fixture para a qual foi dada um alias
            Então o nome do arquivo deve ser o selecionado`, function() {
          cy.fixture('example.json').as('sampleFile')
          cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
              expect((<HTMLInputElement>$input[0]).files[0].name).to.equal('example.json')
            })
        })
      
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
          cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })
      
        it('Ele acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
          cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
      
          cy.contains('Talking About Testing').should('be.visible')
        })
      
        it('Ele exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
          cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
          cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
        })
      
        it(`Quando ele preencher a area de texto usando o comando invoke
            Então o campo deve estar com o valor preenchido`, function() {
          const longText = Cypress._.repeat('0123456789', 20)
      
          cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
        })

        Cypress._.times(3, function() {
          it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
            cy.get('#phone')
              .type('abcdefghij')
              .should('have.value', '')
          })
        })
      
        it('Ele faz uma requisição HTTP', function()  {
          cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          // tem uma funçào callback e como argumento tenho a resposta da requisição
            .should(function(response) {
              console.log(response)
              // vamos desestruturar o objeto
              const { status, statusText, body } = response
              expect(status).to.equal(200)
              expect(statusText).to.equal('OK')
              expect(body).to.include('CAC TAT')
            })
        })            
    }
  );
})
  