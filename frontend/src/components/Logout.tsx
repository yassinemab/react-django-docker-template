import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

export default function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        document.cookie = ""
        dispatch(setUser({active: false, name: "", email: "", id: 0}))
        navigate("/")
    })

  return (
    <div className='centered-container'></div>
  )
}
