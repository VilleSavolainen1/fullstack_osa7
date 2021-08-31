import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './newBlog'


describe('blog is rendered', () => {
    const blog = {
        title: 'new',
        url: 'test.com',
        author: 'Ville',
        likes: 0,
        user: {
            username: 'me',
        }
    }
    const user = {
        username: 'me'
    }
    const createdNewBlog = false
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} user={user} createdNewBlog={createdNewBlog} />
        )
    })
    test('title and author is rendered', () => {
        <Blog blog={blog} user={user} createdNewBlog={createdNewBlog} />


        expect(component.container).toHaveTextContent('new')
    })

    test('at start url and likes are not displayed', () => {
        const div = component.container.querySelector('.show')
        expect(div).toHaveStyle('display: none')
    })

    test('url and likes are displayed when view button is clicked', () => {

        const button = component.getByText('View')
        fireEvent.click(button)

        const show = component.container.querySelector('.show')
        const url = component.container.querySelector('.url')
        const likes = component.container.querySelector('.likes')
        expect(show).not.toHaveStyle('display: none')
        expect(url).toHaveTextContent('test.com')
        expect(likes).toHaveTextContent('0')
    })

    test('clicking view button calls event handler twice', () => {
        const mockHandler = jest.fn()

        const anotherComponent = render(
            <Blog blog={blog} user={user} testClick={mockHandler} createdNewBlog={createdNewBlog} setCreatedNewBlog={mockHandler} />
        )

        const button = anotherComponent.container.querySelector('.like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('new blog is created', () => {
    test('new blog is created', () => {
        const createBlog = jest.fn()

        const component = render(
            <NewBlog createNewBlog={createBlog} />
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'new blog' }
        })

        fireEvent.change(author, {
            target: { value: 'ville' }
        })

        fireEvent.change(url, {
            target: { value: 'blog.com' }
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls[0][0].title).toBe('new blog')
        expect(createBlog.mock.calls[0][0].author).toBe('ville')
        expect(createBlog.mock.calls[0][0].url).toBe('blog.com')
    })
})
