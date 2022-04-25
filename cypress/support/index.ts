import './commands'

declare global {
    namespace Cypress {
      interface Chainable {
        PreencherCamposObrigatoriosESubmeter(): void;
      }
    }
  }
