describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
        "username": "averywlittle",
        "name": "Avery Little",
        "password": "testpassword",
        "blogs": []
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log into application')
        cy.contains('username')
        cy.contains('password')
    })

    it('user can log in', function() {
        cy.get('#username').type('averywlittle')
        cy.get('#password').type('testpassword')
        cy.get('#login-button').click()

        cy.contains('Avery Little logged in')
    })

    it('login fails with wrong credentials', function() {
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()

        cy.get('.error').contains('Wrong credentials')
    })

    describe('When logged in', function() {
        beforeEach(function() {
            // login w/out UI
            const credentials = {
                "username": "averywlittle",
                "password": "testpassword"
            }
            cy.request('POST', 'http://localhost:3001/api/login/', credentials)
                .then(response => {
                    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })
        })

        it('A blog can be created', function() {
            cy.contains('Avery Little logged in')

            cy.get('.toggle-blog-open').click()

            cy.get('#blogTitle').type('test blog')
            cy.get('#blogAuthor').type('test')
            cy.get('#blogURL').type('test')
            cy.get('.blog-form-button').click()

            cy.contains('test blog test')
        })

        it('A blog can be liked', function() {
            cy.contains('Avery Little logged in')

            cy.get('.toggle-blog-open').click()

            cy.get('#blogTitle').type('test blog')
            cy.get('#blogAuthor').type('test')
            cy.get('#blogURL').type('test')
            cy.get('.blog-form-button').click()

            cy.get('.show-blog-details-button').click()
            cy.get('.blog-like-button').click()

            cy.contains('likes: 1')
        })

        it('A blog can be deleted', function() {
            cy.contains('Avery Little logged in')

            cy.get('.toggle-blog-open').click()

            cy.get('#blogTitle').type('test blog')
            cy.get('#blogAuthor').type('test')
            cy.get('#blogURL').type('test')
            cy.get('.blog-form-button').click()

            cy.get('.show-blog-details-button').click()
            cy.get('.blog-delete-button').click()

            cy.get('.blog').should('not.exist')
        })

        it.only('Blogs are sorted in the correct order', function() {
            cy.contains('Avery Little logged in')

            cy.get('.toggle-blog-open').click()

            cy.get('#blogTitle').type('test blog A')
            cy.get('#blogAuthor').type('test A')
            cy.get('#blogURL').type('test A')
            cy.get('.blog-form-button').click()

            cy.get('.show-blog-details-button').click()
            cy.get('.blog-like-button').click()

            // How to get past duplicate classes https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Querying-by-Text-Content
            cy.get('#blogTitle').type('test blog b')
            cy.get('#blogAuthor').type('test b')
            cy.get('#blogURL').type('test b')
            cy.get('.blog-form-button').click()
            
            cy.get('.blog-list').contains('test blog b').contains('view').click()
            cy.get('.blog-list').contains('likes: 0').contains('like').as('likeButton').click()
                .then(() => {
                    // Have to wait so that it doesn't send two put reqs with likes: 0 in the body
                    cy.get('@likeButton').click()
                        .then(() => {

                            // Need to wait for the like PUT req to return
                            cy.wait(1000)
                                
                            // Compare sorting of blogs. The first blog in the list should be test blog b
                            cy.get('.blog-list')
                            .children()
                            .first()
                            .should('contain.text', 'test blog b');
                        })
                })
        })
    })
})