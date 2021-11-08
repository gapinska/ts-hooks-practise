import * as React from "react";
import {Formik, Form, Field} from "formik";
import {useEffect, useReducer, useRef} from "react";

interface State {
    title: string,
    description: string,
    format: string,
    level: string
}

const initialState: State = {
    title: "",
    description: "",
    format: "",
    level: ""
}

type StateKeys = keyof State

export enum ActionType {
    ON_CHANGE= 'on_change',
    ON_SUBMIT= 'on_submit'
}

interface OnChangeAction {
    type: ActionType.ON_CHANGE
    payload: { name: StateKeys, value: string }
}

interface OnSubmitChange {
    type: ActionType.ON_SUBMIT
}

type Action = OnChangeAction | OnSubmitChange


function formReducer(state = initialState, action: Action): State  {
    switch (action.type) {
        case ActionType.ON_CHANGE:
            return {...state, [action.payload.name]: action.payload.value}
        case ActionType.ON_SUBMIT:
            return {...initialState}
        default:
            return state
    }
}

export function SignInForm() {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ActionType.ON_CHANGE,
            payload: {
                name: e.target.name as StateKeys,
                value: e.target.value
            }
        })
    }

    const handleSubmit = (e: React.SyntheticEvent)=> {
        e.preventDefault()
        console.log(state)

    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                padding: 10,
            }}
        >
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    format: "",
                    level: "",
                }}
                onSubmit={() => {
                }} //todo
            >
                {() => (
                    <Form onSubmit={handleSubmit} style={{width: "100%", maxWidth: 500}}>
                        <h3 className="h3 mb-3 font-weight-normal">Submit a Session!</h3>
                        <div className="mb-3" style={{paddingBottom: 5}}>
                            <label htmlFor="inputTitle">Title</label>
                            <Field
                                id="inputTitle"
                                className="form-control"
                                required
                                autoFocus
                                name="title"
                                innerRef={inputRef}
                                onChange={handleChange}
                                value={state.title}
                            />
                        </div>
                        <div className="mb-3" style={{paddingBottom: 5}}>
                            <label htmlFor="inputDescription">Description</label>
                            <Field
                                type="textarea"
                                id="inputDescription"
                                className="form-control"
                                required
                                name="description"
                                onChange={handleChange}
                                value={state.description}
                            />
                        </div>
                        <div className="mb-3" style={{paddingBottom: 5}}>
                            <label htmlFor="inputFormat">Format</label>
                            <Field
                                name="format"
                                id="inputFormat"
                                className="form-control"
                                required
                                onChange={handleChange}
                                value={state.format}
                            />
                        </div>
                        <div className="mb-3" style={{paddingBottom: 5}}>
                            <label htmlFor="inputLevel">Level</label>
                            <Field
                                name="level"
                                id="inputLevel"
                                className="form-control"
                                required
                                onChange={handleChange}
                                value={state.level}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
