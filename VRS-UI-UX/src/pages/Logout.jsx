import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router";
import {toast} from "react-toastify";
import { unsetAuth } from "../app/authSlice";
import { removeAuth } from "../assets/components/fetchStoreAuth";

export const Logout = ({token}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const logout = () => {
        let auth_headers = {
            Authorization: `Token ${token}`
        }
        const id = toast.loading("Logging out ...",{autoClose: 5000,closeOnClick:true,closeButton:true})
        axios.post(`${import.meta.env.VITE_API_URL}/auth/logout/`,{},{
            headers:auth_headers
        }).then((resp) => {
            if (resp.status == 204){

                dispatch(unsetAuth())
                
                if(removeAuth()){
                    toast.update(id,{ render: "Logged out Successfully", type: "success", isLoading: false,autoClose:5000 });
                    navigate("/login");
                }
            }else{
                toast.update(id, { render: "Some error occurred...please try again", type: "warning", isLoading: false,autoClose:5000  });
            }
        }).catch((error) => {
            toast.update(id, { render: "Logout operation failed", type: "error", isLoading:false,autoClose:5000  });
        })
    }

    return <> <button className="dropdown-item" onClick={logout}>Logout</button> </>
}