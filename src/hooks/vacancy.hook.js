import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { setVacancy } from "../redux/actions"
import { useHttp } from "./http.hook"


export const useVacancy = () => {
    const dispatch = useDispatch()
    const request = useHttp()
    
    const create = useCallback(async body => await request('/vacancy/create', 'POST', body), [request])

    const read = useCallback(async offset => await request(`/vacancy/read/${offset}`, 'GET'), [request])

    const get = useCallback(async () => {
        const res = await request(`/vacancy/get`, 'GET')
        dispatch(setVacancy(res))
    }, [dispatch, request])

    return {create, read, get}
}