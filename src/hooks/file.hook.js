import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogin, setSuccess, setUserData} from "../redux/actions"
import { useHttp } from "./http.hook"


export const useFile = () => {
    const {user} = useSelector(s => s.app)
    const request = useHttp()
    const dispatch = useDispatch()

    const uploadFile = useCallback(async (body, url = 'image', baseUrl = 'auth') => {
        
        const res = await request(`/${baseUrl}/${url}`, 'POST', body, {}, true)

        if(user&&user.type===1) {
            dispatch(setUserData(res.user))
            dispatch(setLogin(res.accessToken))
            dispatch(setSuccess('Uspeshno soxraneno'))
            return
        }

        return res.src
        
    }, [request, dispatch, user])

    const deleteFile = useCallback(async url => {
        const res = await request('/auth/'+url, 'POST', null,{})
        dispatch(setUserData(res.user))
        dispatch(setLogin(res.accessToken))
        dispatch(setSuccess('Uspeshno soxraneno'))
    }, [request, dispatch])
    return {uploadFile, deleteFile}
}