import React, { useState } from 'react'
import FileList from './FileList'
import UploadForm from './UploadForm'
import './style/UserDashboard.scss'

const UserDashboard = () => {
    const[search, setSearch] = useState("")
    const[open,setOpen] = useState(false)
    return (
        <section>
            <FileList/>
            <UploadForm/>
        </section>
    )
}

export default UserDashboard