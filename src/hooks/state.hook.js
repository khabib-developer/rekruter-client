import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setJobs, setState, setSuccess, setWarning } from "../redux/actions"
import { useHttp } from "./http.hook"


export const usePosition = () => {
    const request = useHttp()
    const dispatch = useDispatch()
    const install = useCallback(async body => {
        const res = await request('/state', 'GET')
        if(res)
            dispatch(setState(res))
    }, [ request, dispatch])

    return {install}
}