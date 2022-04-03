import {useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, setError, setLogin, showLoader, setUserData, setExpired } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
export const useHttp = () => {
    const dispatch = useDispatch()
	const {server} = useSelector(s => s.app)
	const navigate = useNavigate()
	const request = useCallback(async (url, method = 'GET', body = null, headers = {}, file = false) => {
		try {

			let dejavu = false

			const credentials = "include"

			if(url !== '/answer/update') {
			 	dispatch(showLoader())
			}

			if(body && !file) {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}


			const request = async () => {
				headers['authorization'] = `Bearer ${localStorage.getItem('t')}`
				let response = await fetch(`${server.slice(0,server.length - 1)}${url}`, {method,body,headers,credentials})
				
				if(response.status === 423) {
					navigate('/')
				}

				if(response.status === 403) {
					dispatch(setExpired(true))
					dispatch(setUserData(null))
					dispatch(setLogin(null))
					await fetch(`${server}auth/logout`, {method:"GET",credentials:"include"})
					// navigate('/login')
				}

				if(response.status === 401) {
					if(dejavu) {
						dispatch(setUserData(null))
						dispatch(setLogin(null))
						await fetch(`${server}auth/logout`, {method:"GET",credentials})
						navigate('/login')
						return
					}
					dejavu = true
					let res = await fetch(`${server}auth/refresh`, {method,credentials})
					res = await res.json()
					dispatch(setLogin(res.accessToken))
					response = await request()
				}

				return response
			}

			let response = await request()
			
			const data = await response.json()
			if(!response.ok) {
				throw new Error(data.message || 'Cto to ne tak')
			}
            dispatch(hideLoader())
			return data
		} catch(e) {
			console.log(e.message)
            dispatch(hideLoader())
			dispatch( setError(e.message?e.message:`cto to poshlo ne tak http`) ) 
			return false
			// statements
		}
	}, [dispatch])

	return request
}