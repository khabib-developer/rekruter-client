import { SET_ANSWER, SET_DRAWER, SET_MODAL_ANSWER, SET_PROPOSAL, SET_SIDEBAR_VIEW, SET_STOCK_PROPOSAL, SET_TAB } from "./types"

const initialState = {
    sideBarShow:true,
    tab:5,
    drawer: false,
    proposals:[],
    stockProposals:[],
    answer:[],
    answerModal:null
}

export const ui = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_VIEW:
            return {...state, sideBarShow: action.payload}
        case SET_TAB:
            return {...state, tab: action.payload}
        case SET_DRAWER:
            return {...state, drawer: action.payload}
        case SET_PROPOSAL:
                return {...state, proposals: action.payload}
        case SET_STOCK_PROPOSAL:
            return {...state, stockProposals: action.payload}
        case SET_ANSWER:
            return {...state, asnwer: action.payload}
        case SET_MODAL_ANSWER:
            return {...state, answerModal: action.payload}
        default:  return state
    }
}