import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth.hook';
import { useSelector } from 'react-redux'
import { NavbarProfile } from '../../components/profile.navbar'
import { SideBar } from '../../components/sideBar'
import { CreateVacancy, style } from '../../components/tabcontent/create-vacancy'
import { CRM } from '../../components/tabcontent/crm'
import { CreateReferenceForm } from '../../components/tabcontent/form'
import { MyVacancy } from '../../components/tabcontent/myVacancy'
import { Statistic } from '../../components/tabcontent/statistic'
import { useProposal } from '../../hooks/proposal.hook'
import { useForm } from '../../hooks/form.hook';
import { useVacancy } from '../../hooks/vacancy.hook';
import { Archive } from '../../components/tabcontent/archive';
import { Navbar } from '../../components/navbar';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Timer } from '../../components/tabcontent/accessTime';

export const Employer = () => {
    const {sideBarShow, tab, proposals} = useSelector(s => s.ui)
    const {user, state, data} = useSelector(s => s.app)

    const [publishModal, setPublish] = useState(false)
    const [tg_data, setTgData] = useState(false)

    const handleCloseModal = () => setTgData(false);

    const handleOpenPublish = () => setPublish(true);
    const handleClosePublish = () => setPublish(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    const width = !matches?"100%":sideBarShow?'calc(100% - 250px)':'100%'

    const {getBid} = useProposal()

    const {update} = useAuth()

    const {getForm} = useForm()

    const {get} = useVacancy()

    useEffect(() => {
        (async function anonym() {
            await get()
            await getForm()
            // await getBid()
            if(!user.telegram_id) {
                setTimeout(() => {
                    handleOpenPublish()
                }, 1000)
            }
        })()
    }, [])

    useEffect(() => {
        if(data && data.state === state.telegram) {
            handleClosePublish()
            setTgData(data)
        }
    }, [data])

    const notNeed = () => {
        update({telegram_id:"notNeed"})
        handleClosePublish()
    }

    const handleTelegram = () => {
        update({telegram_id:tg_data.telegram_id})
        handleCloseModal()
    }

    return (
        <>
            {
                matches?
                <>
                    <NavbarProfile />
                    <SideBar />
                </>:
                <>
                    <Navbar />
                </>
            }
            
            <div className='bg-light w-100' style={{minHeight:'100vh',paddingTop:matches?'76px':"0px"}}>
                <div className='wrapper row mx-0 px-0 py-4 d-flex justify-content-lg-end' style={{overflow:'scroll',minHeight:"80vh"}}>
                    
                    {tab===2?<CRM width={width} proposals={proposals} />:
                    tab===5?<Statistic width={width} />:
                        <div style={{width, transition:'all .4s ease'}} className='d-flex justify-content-center px-0'>
                            <div className='content bg-white' style={{width:matches?"90%":"95%"}}>
                                {tab===1?<CreateVacancy />:null}
                                {tab===3?<CreateReferenceForm />:null}
                                {tab===4?<MyVacancy />:null}
                                {tab===6?<Archive />:null}
                                {tab===7?<Timer />:null}
                            </div>
                        </div>
                    }
                    
                </div>
                

            </div>

            <Modal
                open={publishModal}
                onClose={handleClosePublish}
                aria-labelledby="modal-modal-title-publish"
                aria-describedby="modal-modal-description-publish"
            >
                <Box sx={{...style, padding:'16px', width: '400px'}}>
                    <div>
                        <span>Бот для уведомление </span>
                        <a href={`https://t.me/pay_khabib_bot?start=${user.id}`} 
                            className='text-decoration-none text-info' target="_blank" rel="noreferrer" >
                            Переходите по ссылке 
                        </a>
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button className="text-secondary" onClick={handleClosePublish}>Напомнить позже </Button>
                            <Button className="text-secondary" onClick={notNeed}>Не надо</Button>
                        </ButtonGroup>
                    </div>
                </Box>

            </Modal>

            <Modal
                open={!!tg_data}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title-publish"
                aria-describedby="modal-modal-description-publish"
            >
                <Box sx={{...style, padding:'16px', width: '400px'}}>
                    <div>
                        {
                            tg_data?
                            <>
                            <div>
                                Это вы ?
                            </div>
                            <div>
                                <span>Имя</span>: {tg_data.first_name}
                            </div>
                            <div>
                                {tg_data.username?<><span>Username</span>: {tg_data.username}</>:null}
                            </div>
                            </>:null
                        }
                        
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button className="text-secondary" onClick={handleTelegram}>Да</Button>
                            <Button className="text-secondary" onClick={handleCloseModal}>Нет</Button>
                        </ButtonGroup>
                    </div>
                </Box>

            </Modal>

        </>
    )
}