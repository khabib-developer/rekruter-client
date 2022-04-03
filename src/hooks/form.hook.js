import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setForm, setSuccess, setTab } from "../redux/actions"
import { useHttp } from "./http.hook"


export const useForm = () => {
    const {form} = useSelector(s => s.app)
    const request = useHttp()
    const dispatch = useDispatch()
    const createReference = useCallback(async body => {
        const res = await request('/form/create', 'POST', body)
        console.log(res)
        if(res) {
            dispatch(setSuccess('Uspeshno sozdano'))
            dispatch(setForm([...form, {...res}]))
            dispatch(setTab(4))
        }
    }, [ request, dispatch, form])

    const getForm = useCallback(async () => {
        const res = await request('/form/getForms', 'GET')
        dispatch(setForm(res))
    }, [request, dispatch])

    const getOne = useCallback( async (token) => await request(`/form/getForm/${token}`, 'GET'), [request]) 

    const deleteForm = useCallback(async body => {
        await request('/form/remove', 'POST', body)
        dispatch(setForm([...form.filter(e => e.token !== body.token)]))
    }, [request, dispatch, form])


    return {createReference, getForm, deleteForm, getOne}
}