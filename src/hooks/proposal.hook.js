import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProposal, setStockProposal, setSuccess } from "../redux/actions"
import { useAnswer } from "./answer.hook"
import { useHttp } from "./http.hook"


export const useProposal = () => {
    const request = useHttp()
    const dispatch = useDispatch()
    const {get} = useAnswer()

    const {stockProposals} = useSelector(s => s.ui)

    const createBid = useCallback(async body => {
        const res = await request('/vacancy/createBid', 'POST', body)
        if(res)
            dispatch(setSuccess('Uspeshno otpravleno'))
    }, [ request, dispatch])

    const getBid = useCallback(async () => {
        const answer = await get()
        dispatch(setStockProposal( answer ) )
        dispatch(setProposal( answer ) )
        return answer
    }, [dispatch, get])

    const updateBid = useCallback(async (body, answer) => {
        if(answer) {
            // const res = await request('/vacancy/getBid', 'GET')
            const answer =  await request('/answer/update', 'POST', body)
            dispatch(setStockProposal( answer ) )
        } else {
            // const res =  await request('/vacancy/updateBid', 'POST', body)
            // const answer = await get()
            // dispatch(setStockProposal( res.concat(answer).sort( (a, b) => +b.date - +a.date ) ) )
        }
    }, [dispatch, request])

    const remove = useCallback(async (id) => {
        await request(`/answer/remove/${id}`, 'GET')

        dispatch(setStockProposal( stockProposals.filter(e => e.id !== id).sort( (a, b) => +b.date - +a.date ) ) )
        
    }, [dispatch, request, stockProposals])

    return {createBid, getBid, remove, updateBid}
}