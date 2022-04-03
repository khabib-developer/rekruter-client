import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogin, setSuccess, setUserData, setWarning } from "../redux/actions"
import { useHttp } from "./http.hook"


export const useResume = () => {
    const request = useHttp()
    const dispatch = useDispatch()
    const create = useCallback(async (body, url='create') => {
        const res = await request('/resume/'+url, 'POST', body,{}, url==='load')
        dispatch(setUserData(res.user))
        dispatch(setLogin(res.accessToken))
        dispatch(setSuccess('Uspeshno soxraneno'))
    }, [request, dispatch])

    const getUser = useCallback(async (id) => await request('/resume/user/'+id, 'GET'), [request])

    return {create, getUser}
}