import React from "react";
import Quiz from '../../client/src/components/Quiz';
import questions from '../fixtures/questions.json'

describe('<Quiz />', ()=>{
    const mockState = questions
    beforeEach(()=>{
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: mockState,
        
        })
    })
    

    it('Should mount the Quiz component', ()=>{
        cy.mount(<Quiz />)
        cy.get('button').should('be.visible')
    })



    it('should render the quiz page, with a mock question and answers', ()=>{
        cy.mount(<Quiz />);
        cy.get('button').click()
        cy.get('[data-cy=question]').should('be.visible').and('not.be.empty')
        cy.get('[data-cy=answers]').should('be.visible')
    })

    it('should render the quiz is completed when the quiz is finished with the users score', ()=> {
        cy.mount(<Quiz />)
        cy.get('button').first().click()
        cy.get('[data-cy=question]').then(($question) => {
            if ($question.is(':visible') && $question.text().trim() !== '') {
                cy.wrap(mockState).each(() => {
                    cy.get('[data-cy=answer]').first().click()
                })
                cy.get('[data-cy=feedback]').should('be.visible')
            } else {
                throw new Error('Quiz did not start and questions did not render')
            }
        })
        cy.get('[data-cy=score]').should('be.visible')
        cy.get('button').first().click()
        cy.get('[data-cy=question]').should('be.visible').and('not.be.empty')
        cy.get('[data-cy=answers]').should('be.visible')
        
    })
})