<h2 align="center"> 
    Basic Cypress DOJO
</h2>

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

---

## 📝 Sobre
Projeto de teste e2e com Cypress Básico - DOJO

---

## 🛠 Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Cypress](https://www.cypress.io/)

---

## 📂 Como baixar o projeto

Para executar o projeto é necessário a instalação do **Nodejs** no ambiente onde os testes serão executados, o download pode ser feito [aqui](https://nodejs.org/en/), e após a instação pode ser validado abrindo o terminal e executando o comando abaixo que em caso de sucesso retornará a versão instalada ex: **v12.18.3**

```bash
node -v
```

No terminal, execute os comandos abaixo:
```bash
# Clone o projeto
git clone https://github.com/Hotmart-Org/basic-cypress-dojo.git
```
```bash
# Acesse o diretório onde o projeto foi clonado
cd basic-cypress-dojo
```
```bash
# Execute o comando abaixo para instalar as dependências do projeto
npm install
```
## 🔌  Executando o projeto

Após a instalação de todos os pacotes, é possível executar a interface do cypress com o comando abaixo:
```bash
# Abrir a interface do Cypress
npx cypress open
```
Com a interface aberta, basta clicar no arquivo **spec.ts** da sua escolha ou clicar em **Run integration specs** para executar todos os testes. Será aberto o navegador onde você poderá acompanhar os testes, o passo a passo do que está sendo executado bem como os logs.
```bash
# Executando os testes em modo headless
npm run test
```
### Mais possibilidades de execução
```bash
# Executando por spec
npx cypress run --spec "cypress/integration/cac-tat.spec.ts" 
```
---

## ⚙ Estrutura do Projeto
```
├───.github
│   └───workflows           (Criado de forma automática pelo vianaBot para que toda branch esteja linkada a uma issue do Jira)
├───cypress
│   ├───fixtures            
│   ├───integration         (Os testes vivem aqui)
│   ├───plugins
│   ├───screenshots
│   ├───support
|   |   ├───commands.js     (Comandos que incapsulam detalhes de implementação)
│   └───videos
```