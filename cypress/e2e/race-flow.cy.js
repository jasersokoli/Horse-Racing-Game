describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the app title', () => {
    cy.contains('h1', 'Horse Racing Game').should('be.visible')
  })

  it('generates horses when Generate Horses is clicked', () => {
    cy.contains('button', 'Generate Horses').click()
    cy.get('.horse-item').should('have.length', 20)
  })

  it('generates schedule when Generate is clicked after horses exist', () => {
    cy.contains('button', 'Generate Horses').click()
    cy.contains('button', 'Generate').click()
    cy.get('.round').should('have.length', 6)
  })

  it('disables Start until schedule is generated', () => {
    cy.contains('button', 'Generate Horses').click()
    cy.contains('button', 'Start').should('be.disabled')
    cy.contains('button', 'Generate').click()
    cy.contains('button', 'Start').should('not.be.disabled')
  })

  it('shows results after race completes', () => {
    cy.contains('button', 'Generate Horses').click()
    cy.contains('button', 'Generate').click()
    cy.contains('button', 'Start').click()
    cy.get('.round-result', { timeout: 20000 }).should('have.length', 6)
  })
})
