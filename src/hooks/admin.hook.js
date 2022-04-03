import { useCallback } from "react"
import { useHttp } from "./http.hook"


export const useAdmin = () => {
    const request = useHttp()
    
    const enter = useCallback(async () => await request('/r-admin/enter', 'GET'), [request])

    const getUsers = useCallback(async () => await request('/r-admin/getUsers', "GET"), [request])

    const updateUserWithId = useCallback(async (body) => await request('/r-admin/updateUser', "POST", body), [request])

    const updateActiveUser = useCallback(async (body) => await request('/r-admin/updateActiveUser', "POST", body), [request])

    const getUserInfo = useCallback(async (body) => await request('/r-admin/getUserInfo', "POST", body), [request])

    const getHistory = useCallback(async (body) => await request('/r-admin/getHistory', "POST", body), [request])

    return {enter, getUsers, updateUserWithId, getUserInfo, getHistory, updateActiveUser}
}