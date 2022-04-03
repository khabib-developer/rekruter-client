import React, {useEffect, useState} from 'react'
import { BackgroundLoader } from '../../components/pre-loader/BackDrop'
import { SideBarAd } from '../../components/sideBar/sidebar'
import {useAdmin} from '../../hooks/admin.hook'
import {NewUsers} from './newUsers'
import {ActiveUsers} from './activeUsers'
import {PassiveUsers} from './passiveUsers'
import {AdminUsers} from './admins'
import {History} from './history'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../redux/actions'

export function isJson(str) {
    if(!str) return false
	try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const Admin = () => {
    const {enter, getUsers} = useAdmin()
    const [permission, setpermission] = useState(false)

    const {data, state} = useSelector(s => s.app)
    const dispatch = useDispatch()

    const [selected, setselected] = useState(1)

    const [users, setusers] = useState([])

    useEffect(() => {
        
        if(data&&data.state === state.user) {

            // dispatch( setInfo("Новый пользователь") )

            (async function anonym() {
                const res = await enter()
                if(res) {
                    const res = await getUsers()
                    setusers(res)
                }
            }())
        }
    }, [data])


    useEffect(() => {
        (async function anonym() {
            const res = await enter()
            if(res) {
                const res = await getUsers()
                setusers(res)
                setpermission(res)
            }
        }())
    }, [])

    if(permission) {
        return (
            <div style={{height:"100vh"}}>
                <div className='main'>
                    <SideBarAd selected={selected} setselected={setselected} />
                    <main style={{marginLeft:"300px"}}>
                        {
                           selected===1?<NewUsers users={users.filter(e => e.status===null)} setusers={setusers} />:
                           selected===2?<ActiveUsers users={users.filter(e => isJson(e.status)&&( JSON.parse(e.status).date > Date.now() ) )} setusers={setusers} />:
                           selected===3?<PassiveUsers users={users.filter(e => isJson(e.status)&&( JSON.parse(e.status).date < Date.now() ) )} setusers={setusers} />:
                        //    selected===4?<AdminUsers users={users.filter(e => e.status===null)} setusers={setusers} />:
                           selected===5?<History />:null
                        }
                    </main>
                </div>
            </div>
        )
    }

    return <BackgroundLoader />
    

}
