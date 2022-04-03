import { HIDE_LOADER, SET_ANSWER, SET_CLEAR, SET_DATA, SET_DRAWER, SET_EMAIL, SET_ERROR, SET_ERRORS, SET_EXPIRED, SET_FORM, SET_INFO, SET_JOBS, SET_LOGIN, SET_MODAL_ANSWER, SET_NAME, SET_PASSWORD, SET_PHONE, SET_PROPOSAL, SET_RESUME, SET_SIDEBAR_VIEW, SET_STATE, SET_STOCK_PROPOSAL, SET_SUCCESS_MSG, SET_TAB, SET_TYPE, SET_UPDATE_RESUME, SET_USER_DATA, SET_VACANCY, SET_WARNING, SHOW_LOADER } from "./types"
// import phone from "phone";


export function hideLoader() {
    return {type: HIDE_LOADER}
}

export function showLoader() {
    return {type: SHOW_LOADER}
}


export const setError = (payload) => ({type: SET_ERROR, payload})

export const setExpired = (payload) => ({type: SET_EXPIRED , payload})

export const setVacancy = (payload) => ({type: SET_VACANCY, payload})

export const setForm = (payload) => ({type: SET_FORM, payload})

export const setState = (payload) => ({type: SET_STATE, payload})

export const setData = (payload) => ({type: SET_DATA, payload})

export const setWarning = (payload) => ({type: SET_WARNING, payload})

export const setInfo = (payload) => ({type: SET_INFO, payload})

export const setResume = (payload) => ({type: SET_RESUME, payload})

export const setUpdateResume = (payload) => ({type: SET_UPDATE_RESUME, payload})

export const setLogin = payload => {
    localStorage.setItem('t', payload)
    return {type:SET_LOGIN,payload}
}

export const setSuccess = payload => ({type:SET_SUCCESS_MSG,payload})
export const setJobs = payload => ({type:SET_JOBS,payload})

//forms
export const setName = (payload) => ({type: SET_NAME, payload})

export const setPhone = (e, err) => {
    return dispatch => {
        const v = e.target.value
        const regex = /\D/
        if(v.length < 14) {
            if(v.length === 13) {
                if(!(v.slice(0,4) === "+998" && !v.slice(1).match(regex))) {
                    return dispatch(setErrors({...err, phone:true}))
                }
                dispatch(setErrors({...err, phone:false}))
                // console.log(v.slice(0,4))
                // if(!phone(v).isValid) {
                //     console.log(phone(v))
                // }
                // console.log(phone(v))
                //     dispatch(setErrors({...err, phone:true}))
                // else 
                //     dispatch(setErrors({...err, phone:false}))
            }
            dispatch({type: SET_PHONE, payload:v})
        }
    }
    
}
export const setPassword = (payload) => ({type: SET_PASSWORD, payload})
export const setEmail = (payload) => ({type: SET_EMAIL, payload})
export const setType = (payload) => ({type: SET_TYPE, payload})
export const setErrors = (payload) => ({type: SET_ERRORS, payload})
export const setUserData = (payload) => ({type: SET_USER_DATA, payload})
export const clearForm = () => ({type:SET_CLEAR})


//UI

export const setSideBarView = (payload) => ({type: SET_SIDEBAR_VIEW, payload})
export const setTab = (payload) => ({type: SET_TAB, payload})
export const setDrawer = payload => ({type: SET_DRAWER, payload})
export const setProposal = payload => ({type: SET_PROPOSAL, payload})
export const setAnswer = payload => ({type: SET_ANSWER, payload})
export const setModalAnswer = payload => ({type: SET_MODAL_ANSWER, payload})
export const setStockProposal = payload => ({type: SET_STOCK_PROPOSAL, payload})


