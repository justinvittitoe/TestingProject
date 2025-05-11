import questions from '../fixtures/questions.json'
import {Question}  from '../support/types'

describe('<Quiz />', () => {
    it('visits the start page', () => {
        cy.visit('/')
    })
})

describe('<Quiz /> End-to-End Test', ()=> {
    beforeEach(()=> {
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: questions
        }).as('getQuestions');
    })

    it('validate the server response and renders the quiz questions', ()=>{
        cy.visit('/')
        cy.get('button').click()
        cy.wait('@getQuestions').then((interception:any) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.be.an('array');

            const responseBody = interception.response.body as Question[];

            expect(responseBody[0]).to.have.property('question');
            expect(responseBody[0]).to.have.property('answers');
            expect(responseBody[0].answers).to.be.an('array')
        });
    })
})