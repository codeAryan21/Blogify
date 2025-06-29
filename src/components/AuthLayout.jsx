import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// It is the machanism to protect the pages and layout

export default function Protected({ children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    // asking to authStatus that we are logged In or not
    const authStatus = useSelector((state) => state.auth.status)
    console.log("Auth status: ", authStatus);

    useEffect(() => {

        // if(authStatus == true){
        //     navigate('/')
        // }else if(authStatus == false){
        //     navigate('/login')
        // }


        // let authValue = authStatus == true ? true : false

        
        if(authentication && authStatus != authentication){
            navigate('/login')
        }else if(!authentication && authStatus != authentication){
            navigate('/')
        }
        setLoader(false)
    },[ navigate, authStatus, authentication])

    return (
        loader ? <h1>Loading....</h1> : <>{children}</>
    )

}