/* eslint-disable no-undef */
describe('Blog', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Ville',
            username: 'Ville S',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to application')
    })

})

describe('login', function () {
    it('succeeds with correct credentials', function () {
        cy.get('#username').type('Ville S')
        cy.get('#password').type('password')
        cy.contains('Login').click()
        cy.contains('Ville S is logged in')
        cy.contains('Logout').click()
    })

    it('fails with wrong credentials', function () {
        cy.get('#username').type('wrongusername')
        cy.get('#password').type('wrongpassword')
        cy.contains('Login').click()
        cy.get('.error')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
})

describe('new blog can be created', function () {
    it('logged user can create blog', function () {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('Ville S')
        cy.get('#password').type('password')
        cy.contains('Login').click()
        cy.contains('Create new blog').click()
        cy.get('#title').type('new blog')
        cy.get('#author').type('blogger')
        cy.get('#url').type('blog.com')
        cy.get('#create').click()
        cy.visit('http://localhost:3000')
        cy.contains('new blog blogger')
    })

    it('blog can be liked', function () {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
    })
})

describe('blog can be removed', function () {
    beforeEach(function () {
        const user = {
            name: 'cypress',
            username: 'cypressuser',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('blogs can be removed by creator', function () {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('cypressuser')
        cy.get('#password').type('secret')
        cy.contains('Login').click()
        cy.contains('Create new blog').click()
        cy.get('#title').type('cypressblog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('web')
        cy.get('#create').click()
        cy.visit('http://localhost:3000')
        cy.contains('View').click()
        cy.contains('Remove')
    })
})

describe('blog cant be removed', function () {
    it('blog is not removable if creator is not logged in', function () {
        const user = {
            username: 'Ville S',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.visit('http://localhost:3000')
        cy.get('#username').type('Ville S')
        cy.get('#password').type('password')
        cy.contains('Login').click()
        cy.contains('View').click()
        cy.get('.blog').should('not.contain', 'Remove')
    })
})

describe('blogs are sorted by likes', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('cypressuser')
        cy.get('#password').type('secret')
        cy.contains('Login').click()
        cy.contains('View').click()
        cy.contains('Like').click()
    })
    it('blogs are sorted by likes', function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('testblog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('asd.com')
        cy.get('#create').click()
        cy.visit('http://localhost:3000')
        cy.contains('cypressblog cypress').contains('View').click()
        cy.contains('Like').click()
        cy.contains('testblog cypress').contains('View').click()
        cy.wait(2000)
        cy.get('.blog').find('#like').then(($like) => {
            const val1 = parseFloat($like.text()[0])
            const val2 = parseFloat($like.text()[1])
            expect(val1).to.be.greaterThan(val2)
        })
    })
})
