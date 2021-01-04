import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'testurl.com',
        likes: 49
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'test title test author'
    )
})

// toHaveTextContent just kind of mushes stuff together... feels icky
test('renders url and likes after view button pressed', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'testurl.com',
        likes: 49
    }

    //const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'test title test authorviewtest title test author hidetesturl.comlikes: 49 likeremove'
    )
})

test('clicking like button twice causes event handler to be called twice', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'testurl.com',
        likes: 49
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} likeBlog={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})