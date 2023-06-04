import { useEffect, useState } from "react"
import { Spinner } from "./Spinner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setAlert } from "../../app/alertSlice";
import { ToastType } from "./Toast";
export const NoticeBoard = () => {
    const dispatch = useDispatch();
    let [ Notices , setNotices] = useState([]);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get-notice?format=json").then(
            (response) => {
                setNotices(response.data);
            }
        ).catch((error) => {
            setNotices([{href:'#',desc:'no notices'}]);
            
        })
    },[])

    return <>
    {Notices.length != 0?
     <div className="border border-danger p-1">

<div className="bg-body-tertiary">
    <span className="h5">Notifications and Activities</span>
</div>
<ul className="list-group my-1" style={{height:'304px',overflowY:'scroll'}}>
    {Object.keys(Notices).map((index) => {
    return (
    <li className="list-group-item">
    <a href={Notices[index].href} className="text-decoration-none">
            <FontAwesomeIcon icon={faAngleDoubleRight}/>
            <span className="ms-2">{Notices[index].desc}</span>
        </a>
    </li>)
    })
    }
</ul>
</div>:
    <Spinner/>
    }
    </>
}