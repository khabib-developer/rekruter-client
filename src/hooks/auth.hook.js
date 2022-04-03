import {useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setErrors, setLogin, setSuccess, setUserData, showLoader } from '../redux/actions'
import { useHttp } from './http.hook';
export const useAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {login} = useSelector(s => s.app)
    const request = useHttp()
    const body = useSelector(s => s.form)  

	const redirectToProfile = useCallback(async (e, register = false) => {
        try {
            e.preventDefault()
            
            if(body.phone.length !== 13)
                return dispatch(setErrors({...body.error, phone:true}))

            if(body.password.length < 4)
                return dispatch(setErrors({...body.error, phone:true}))

            dispatch(setErrors([]))

            dispatch(showLoader())
            body.error = undefined
            body.typeOfAuth = undefined

            const url=register?'/auth/register':'/auth/login'
            const data = await request(url, 'POST' , body)
            
            if(register&&data) {
                return data
            }

            if(data) {
                dispatch(setLogin(data.accessToken))
                navigate('/profile')
            }

            
        } catch (catchError) {
            console.log(catchError)
            dispatch(setErrors({...body.error, auth:catchError}))
        }
        
	}, [dispatch, navigate, request, body])

    const activateAction = useCallback(async (body) => {
        return await request('/auth/activate', 'POST' , body)
    }, [request])

    const isUser = useCallback(async () => {
        if(login) {
            const isUser = await request('/auth/isUser', 'GET')
            dispatch(setUserData(isUser))
            return isUser
        }
        return false
    }, [login, request, dispatch])

    const update = useCallback(async body  => {
        const res = await request('/auth/update', 'post', body)
        dispatch(setUserData(res.user))
        dispatch(setLogin(res.accessToken))
        dispatch(setSuccess('Uspeshno izmeneno'))
    }, [dispatch, request])

    const logout = useCallback(async () =>  await request('/auth/logout', 'get'), [request])


	return {redirectToProfile, isUser, update, activateAction, logout}
}