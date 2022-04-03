import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function isJSON(str) {
    try {
        JSON.parse(str)
    } catch (error) {
        return false
    }
    return true
}

export const Timer = () => {

    const {user} = useSelector(s => s.app)

    const [days, setdays] = useState(0)
    const [hours, sethours] = useState(0)
    const [mins, setmins] = useState(0)
    const [secs, setsecs] = useState(0)


    useEffect(() => {
        const {timer} = update()
        const t = setInterval(timer, 1000)
        return () => clearInterval(t)
    })

    const update = useCallback(() => {
        const timer = () => {
            const now = Date.now()
            const future = isJSON(user.status)?JSON.parse(user.status).date:Date.now()
            const diff = future - now

            const day  = Math.floor( diff / (1000*60*60*24) );
            const hour = Math.floor( diff / (1000*60*60) );
            const min  = Math.floor( diff / (1000*60) );
            const sec  = Math.floor( diff / 1000 );


            setdays( day )
            sethours( hour - day  * 24 )
            setmins( min  - hour * 60 )
            setsecs( sec  - min  * 60 )
        }
        return {timer}
    }, [user.status])

    if(days===0&&hours===0&&mins===0&&secs===0) {
        return (
            <div className="d-flex justify-content-center align-items-center timer-wrapper text-muted">
                Загрузка...
            </div>
        )
       
    }

    if(days<0) {
        return (
            <div className="d-flex justify-content-center align-items-center timer-wrapper text-muted">
                Ваша время истекло 
            </div>
        )
        
    }

    return (
        <div className="d-flex justify-content-center align-items-center timer-wrapper">
            <div className="timer">
                <div>{days}<span>Дни</span></div>
                <div>{hours}<span>Часы</span></div>
                <div>{mins}<span>Минуты</span></div>
                <div>{secs}<span>Секунды</span></div>
            </div>
        </div>
    )
}