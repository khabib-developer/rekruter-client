import {  SET_CLEAR, SET_EMAIL, SET_ERRORS, SET_NAME, SET_PASSWORD, SET_PHONE, SET_TYPE } from "./types";

const initialState = {
    name:'',
    phone:'',
    email:'',
    password:'',
    type:0,
    typeOfAuth:0,
    error:{}
}

export const formreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {...state, name: action.payload}
        case SET_PHONE:
            return {...state, phone: action.payload}
        case SET_EMAIL:
            return {...state, email: action.payload}
        case SET_PASSWORD:
            return {...state, password: action.payload}
        case SET_TYPE:
            return {...state, type: action.payload}
        case SET_CLEAR:
            return {...initialState}
        case SET_ERRORS:
            return {...state, error: action.payload}
        default:  return state
    }
}