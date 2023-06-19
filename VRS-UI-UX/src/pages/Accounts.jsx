import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Spinner } from "../assets/components/Spinner"
import {toast} from "react-toastify"

import { UsersVRSCard } from "../assets/components/UsersVRSCard"
export const Accounts = () => {
    const auth_user = useSelector(state => state.auth.user)
    const auth_token = useSelector(state => state.auth.token)
    const [vrs,setVRS] = useState([])
    const fetchVRS = async () => {
        const headers = {
            'Authorization':`Token ${auth_token}`
        }
        await axios({
            method:'GET',
            url:`${import.meta.env.VITE_API_URL}/users-vrs`,
            data:{},
            headers:headers
            }).then((resp)=>{
            setVRS(resp.data)
        }).catch((error) => {
            toast.warning("Some error occurred when fetching information")       
        })
    }
    useEffect(()=>{    
        if(auth_token){
            fetchVRS()
        }
    },[auth_token])
    return <>
    <div className="container-fluid">
        <div className="row mt-2">
        <div className="col-12 bg-body-tertiary">
            <div className="text fs-2 text-center">
                Profile Center
            </div>
        </div>
       
        <div className="col-12 my-2">
            <div className="col-12 bg-primary">
                <div className="text fs-4 text-white">
                    Vehicle Regsitrations
                </div>
            </div>
            <div className="col-12 bg-body-tertiary">
                List of Registrations
            </div>
            {vrs.length != 0?
            
                <div style={{height:'500px',overflowY:'scroll'}}> 
            {vrs.map((vr) => {
                return <>
                <UsersVRSCard vr={vr} token={auth_token}/>
                </>
            })}
            {/* </div> */}
            </div>:<Spinner/>}
        </div>
        <div className="col-5 p-2">
            <div className="border border-sm p-2">
                <label className="form-label mt-1">Full Name</label> 
                <input disabled value = {`${auth_user.first_name} ${auth_user.last_name}`} type='text' className="form-control"/>
                <label className="form-label mt-2">Contact</label>
                <input className="form-control mb-2" disabled value={auth_user.username}/>
                <label className="form-label">Email</label>
                <input className="form-control" disabled value={auth_user.email}/>
            </div>
        </div>
        <div className="col-7 p-2">
            <div className="border border-sm p-2">
            <div className="col-12 bg-body-tertiary p-2">
                    <div className="text text-center fs-6">
                        Change Password
                    </div>
            </div>
            <div className="col-12 p-2">
                <form >
                <input className='form-control' placeholder="Old Password"/>
                <input className='form-control my-2' placeholder="New Password"/>
                <input className='form-control' placeholder="Confirm Password"/>
                <input className="btn btn-primary w-100 mt-2" type="submit" value="Update"/>
                </form>
            </div>
            </div>
        </div>
        </div>

    </div>
    </>
}