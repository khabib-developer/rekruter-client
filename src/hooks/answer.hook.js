import { useCallback } from "react"
import { useHttp } from "./http.hook"


export const useAnswer = () => {
    const request = useHttp()
    
    const create = useCallback(async body => await request('/answer/create', 'POST', body), [request])

    const get = useCallback(async () => await request('/answer/get', 'GET'), [request])

    const remove = useCallback(async id => await request(`/answer/remove/${id}`, 'GET'), [request])

    return {create, get, remove}
}