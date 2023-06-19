import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../app/alertSlice";

export const ToastType = {
    success:'success',
    warning:'warning',
    danger:'danger',
    info:'info',
}

export const ToastComponent = ({showToast,id,message,toastType}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const toastLive = document.getElementById(`liveToast-${message}`);
       
        if(showToast){
            const toast = new bootstrapBundleMin.Toast(toastLive);
            toast.show();
            setTimeout(()=>{
                dispatch(removeAlert(id))
            },6000)
        }

    },[showToast])
    
    return <>
        
        <div id={`liveToast-${message}`} data-bs-delay="6000" className={`toast show border border-${toastType} text-${toastType}`}role="alert" aria-live="assertive" aria-atomic="true">
        <div className={`toast-header text-${toastType}`}>
        
        {toastType == ToastType.success?<FontAwesomeIcon icon={faCheckCircle}/>
        :toastType == ToastType.warning?<FontAwesomeIcon icon={faExclamationTriangle}/>:
        toastType == ToastType.danger?<FontAwesomeIcon icon={faExclamationCircle}/>:
        toastType == ToastType.info?<FontAwesomeIcon icon={faInfoCircle}/>:<></>
        }
        <strong className="me-auto ms-1 text-capitalize">{toastType}</strong>
        <small>1 sec ago</small>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={()=>{dispatch(removeAlert(id))}}></button>
        </div>
        <div className="toast-body">
         {message}
        </div>
        </div>
        
    </>
}