/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {

        // rotas

        cy.server();
        cy.route('POST', '**//api/1/databases/userdetails/collections/newtable?**')
         .as('postNewTable');

        cy.route('POST', '**//api/1/databases/userdetails/collections/usertable?**')
         .as('postUserTable');

        cy.route('GET', '**//api/1/databases/userdetails/collections/newtable?**')
         .as('getNewTable');        


        // baseUrl + Register.html
        cy.visit('Register.html');    
        
        //type
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));

        //check -> radios e checkboxes
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        // selects -> select e combox
        cy.get('select[id=Skills]').select('APIs');
        cy.get('select[id=countries]').select('The Bahamas');
        cy.get('select[id=country]').select('Japan', {force: true});
        cy.get('select[id=yearbox]').select('1991');
        cy.get('select[ng-model=monthbox]').select('January');
        cy.get('select[id=daybox]').select('17');

        cy.get('input[id=firstpassword]').type('Agilizei@2020');
        cy.get('input[id=secondpassword]').type('Agilizei@2020');

        // attachFile -> input file
        cy.get('input[id=imagesrc]').attachFile('imagem.png');
        
        // Click
        cy.get('button[id=submitbtn]').click();

        cy.wait('@postNewTable').then((resNewTable) => {
           // chai
           expect(resNewTable.status).to.eq(200);
        })

        cy.wait('@postUserTable').then((resUserTable)=> {
            expect(resUserTable.status).to.eq(200);
        })

        cy.wait('getNewTable').then((resNewTable) => {
            expect(resNewTable.status).to.eq(200);
        })

        cy.url().should('contain', 'WebTable');

    });
});

//elementos
// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select[id=Skills]
// select[id=countries]
// select[id=country]
// select[id=yearbox]
// select[ng-model=monthbox]
// select[id=daybox]
// input[id=firstpassword]
// input[id=secondpassword]
// button[id=submitbtn]
// input[id=imagesrc]