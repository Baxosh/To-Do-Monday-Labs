import React, { useState } from 'react'
import { useLoad, usePostRequest, usePutRequest } from '../hooks/request'
import Input from './common/Input'
import Checkbox from './common/Checkbox'
import { Form, Formik } from 'formik'
import { required } from '../utils/validators'
import Button from './common/Button'
import { TODO_DETAIL, TODO_LIST } from '../urls'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'


export default function CreateTodoModal({ items, ...props }) {
    const [activeItem, setActiveItem] = useState(false)
    const initialValues = {
        title: '',
        description: '',
        completed: activeItem,
    }


    const todoList = useLoad({ url: TODO_LIST })
    const createTodo = usePostRequest({ url: TODO_LIST })

    const handleSubmit = async (data) => {
        const { success } = createTodo.request({ data })

        if (success) {
            todoList.setResponse({ response: [...todoList.response, data] })
        }

        props.history.push('/')
    }



    const onSave = () => {
        props.history.replace('/')
    }

    return (
        <section className="section">
            <div className={cn('container', css(styles.mainContainer))} >
                <span className="button is-small m-2" onClick={onSave}>
                    <i className="fas fa-arrow-left"></i></span>
                <Formik onSubmit={handleSubmit} initialValues={initialValues} >
                    <Form>
                        <Input
                            label="Title"
                            name="title"
                            validate={required}
                            placeholder="Write something"
                        />
                        <Input
                            label="Description"
                            name="description"
                            component="textarea"
                            validate={required}
                            placeholder="Write something"
                        />
                        <Checkbox name="completed" label="Completed"
                            onClick={() => setActiveItem(true)} />
                        <Button type="submit" text="Save" />
                    </Form>
                </Formik>
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