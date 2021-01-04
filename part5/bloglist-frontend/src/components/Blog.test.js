import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
        'test title'
    )
})