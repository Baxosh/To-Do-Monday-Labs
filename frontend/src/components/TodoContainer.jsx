import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from './common/Button'
import cn from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import { TODO_DETAIL, TODO_LIST } from '../urls'
import { useLoad } from '../hooks/request'
import { useDeleteRequest, usePutRequest } from '../hooks/request'




export default function TodoContainer(props) {
    const todoList = useLoad({ url: TODO_LIST })
    const remove = useDeleteRequest()
    const [viewCompleted, setViewCompleted] = useState(false)
    const [allTodoView, setAllTodoView] = useState('all')
    const todos = todoList.response || []


    async function handleDelete(todo) {
        if (global.confirm('Вы действительно хотите удалить?')) {
            await remove.request({ url: TODO_DETAIL.replace('{id}', todo.id) })
            todoList.request()
        }
    }

    const handleEdit = (data) => {
        props.parentFunc(data)
        props.history.replace('/update')
    }

    const handleAllTodo = (isActive) => {
        if (isActive === 'completed') {
            setViewCompleted(true)
            setAllTodoView('completed')
        }
        else if (isActive === 'unCompleted') {
            setViewCompleted(false)
            setAllTodoView('unCompleted')
        } else if (isActive === 'all') {
            setAllTodoView('all')
        }
    }

    const newItems = todos.filter(
        item => item.completed === viewCompleted
    )


    return (
        <section className="section">
            <div className={cn('container', css(styles.mainContainer))} >
                <NavLink
                    to={'/create'} >
                    <Button text="Add task" className={cn('button is-info is-small')} />
                </NavLink>
                <br />
                <br />
                <div>
                    <Button
                        text="All"
                        onClick={() => handleAllTodo('all')}
                        className={cn(`button is-primary is-rounded ${allTodoView === 'all' ? '' : 'is-outlined'}`)}
                    />
                    &nbsp;
                    <Button
                        text="Uncompleted"
                        onClick={() => handleAllTodo('unCompleted')}
                        className={cn(`button is-primary is-rounded ${allTodoView === 'unCompleted' ? '' : 'is-outlined'}`)}
                    />
                    &nbsp;
                    <Button
                        text="Completed"
                        onClick={() => handleAllTodo('completed')}
                        className={cn(`button is-primary is-rounded ${allTodoView === 'completed' ? '' : 'is-outlined'}`)}

                    />
                </div>
                <section className="section p-0">
                    <div className="container">
                        <ul>

                            {allTodoView === 'all' ?
                                todos.map(todo => (
                                    <div key={todo.id}>
                                        <hr />
                                        <div
                                            className="is-flex is-justify-content-space-between"
                                            key={todo.id}
                                        >
                                            <li className="title is-5 pt-3 pl-5">{todo.title}</li>
                                            <div>
                                                <Button onClick={() => handleEdit(todo)} text="Edit" className="button is-primary" />
                                            &nbsp;
                                            <Button onClick={() => handleDelete(todo)} text="Delete" className="button is-danger" />
                                            </div>
                                        </div>
                                    </div>
                                ))


                                : newItems.map((todo) => (
                                    <div key={todo.id}>
                                        <hr />
                                        <div
                                            className="is-flex is-justify-content-space-between"
                                            key={todo.id}
                                        >
                                            <li className="title is-5 pt-3 pl-5">{todo.title}</li>
                                            <div>
                                                <Button onClick={() => handleEdit(todo)} text="Edit" className="button is-primary" />
                                            &nbsp;
                                            <Button onClick={() => handleDelete(todo)} text="Delete" className="button is-danger" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </section >
    )
}

const styles = StyleSheet.create({

    mainContainer: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fafafa80',
        padding: '2%',
    }
})