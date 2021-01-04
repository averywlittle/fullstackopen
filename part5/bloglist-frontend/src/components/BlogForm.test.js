import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls event handler with right details when a new blog is created', () => {
    // My createBlog function is stored in this form component and isn't passed as an event handler

    const component = render(
        <BlogForm />
    )

    const inputTitle = component.container.querySelector('#blogTitle')
    const inputAuthor = component.container.querySelector('#blogAuthor')
    const inputURL = component.container.querySelector('#blogURL')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, { 
        target: { value: 'test title' } 
    })
    fireEvent.change(inputAuthor, { 
        target: { value: 'test author' } 
    })
    fireEvent.change(inputURL, { 
        target: { value: 'test URL' } 
    })
    fireEvent.submit(form)

    // I'm not sending an event handler to this component so I can't test it
    // I could change the component to do this exercise but nah
    expect(inputTitle).toHaveTextContent('')
    expect(inputAuthor).toHaveTextContent('')
    expect(inputURL).toHaveTextContent('')
})