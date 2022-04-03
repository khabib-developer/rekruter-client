import { HIDE_LOADER, SET_DATA, SET_ERROR, SET_EXPIRED, SET_FORM, SET_INFO, SET_JOBS, SET_LOGIN, SET_RESUME, SET_STATE, SET_SUCCESS_MSG, SET_UPDATE_RESUME, SET_USER_DATA, SET_VACANCY, SET_WARNING, SHOW_LOADER } from "./types";

const login = localStorage.getItem('t')!=='null'?localStorage.getItem('t'):null

const initialState = {
    // server:'https://73ca-212-115-112-48.ngrok.io/',
    server:'http://localhost:5001/',
    loading: true,
    error: null,
    login,
    user:null,
    jobs:{
        jobs1: [],
        jobs2: [],
        jobs3: []
    },
    vacancy:[],
    form:[],
    success:null,
    warning:null,
    info:null,
    resume:false,
    updateResume:false,
    state:null,
    data:null,
    expired:false
}

export const appreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATE:
            return {...state, state: action.payload}
        case SET_DATA:
            return {...state, data: action.payload}
        case SHOW_LOADER:
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        case SET_ERROR:
            return {...state, error:action.payload}
        case SET_LOGIN:
            return {...state, login:action.payload}
        case SET_USER_DATA:
            return {...state, user: action.payload}
        case SET_SUCCESS_MSG:
            return {...state, success:action.payload}
        case SET_WARNING:
            return {...state, warning:action.payload}
        case SET_INFO:
            return {...state, info:action.payload}
        case SET_JOBS: 
            return {...state, jobs: action.payload}
        case SET_RESUME: 
            return {...state, resume:action.payload}
        case SET_FORM: 
            return {...state, form:action.payload}
        case SET_VACANCY: 
            return {...state, vacancy:action.payload}
        case SET_UPDATE_RESUME:
            return {...state, updateResume:action.payload}
        case SET_EXPIRED:
            return {...state, expired:action.payload}
        default:  return state
    }
}