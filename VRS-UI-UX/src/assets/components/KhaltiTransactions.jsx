import KhaltiCheckout from "khalti-checkout-web";
import { useEffect, useState } from "react";
import { ButtonSpinner } from "./ButtonSpinner";
import {toast} from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck,faDownload } from "@fortawesome/free-solid-svg-icons";

export const KhaltiTransaction = ({vrs}) => {
    const [spinner,setSpinner] = useState(false)
    const [msg,setMSG] = useState("");
    const [amount,setAmount] = useState({});
    const auth_token = useSelector(state => state.auth.token);
    const [paid,setPaid] = useState(vrs.vrs_xtd[0].paid)
    // categorizing amount in paisas
    const fetchAmount = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/get-registration-amount`).then((resp)=>
        setAmount(resp.data)
        ).catch((error) => {})
    }
    
    useEffect(() => {
        fetchAmount();
    },[])
    // server side validation
    const verifyPayment = async (payload) => {
        await axios({
            method:'POST',
            url:`${import.meta.env.VITE_API_URL}/verify-khalti-payment`,
            data:{
                token:payload.token,
                amount:payload.amount,
                id: vrs.vrsId
            },
            headers:{
                'Authorization':`Token ${auth_token}`
            }
            }
            ).then((resp) =>  {
                if(resp.data.success){
                    toast.success(resp.data.message);
                    setPaid(true);
                }else{
                    toast.error(resp.data.message);
                }
            }).catch((error) => {
                toast.warning("Some Error Occurred While Verifying the transaction....")
            }).finally(()=>{
                setSpinner(false)
                setMSG("payment via khalti")
                }
            )
    }

    // client side payment instantiation and validation
    var config = {
            "publicKey": `${import.meta.env.VITE_KHALTI_PUBLIC_KEY}`,
            "productIdentity": vrs.vrsId,
            "productName": "Single Vehicle Registration",
            "productUrl": "http://localhost:8000/",
            "eventHandler": {
                onSuccess (payload) {
                    toast.info("Payment done, now verifying...")
                    setMSG("verifying payment...");
                    
                    verifyPayment(payload);
                    
                },
                onError (error) {
                    setSpinner(false); 
                    toast.error("Payment Procedure Failed Please Try again...")
                },
                onClose () {
                    setSpinner(false)
                    console.log('widget is closing');
                }
            },
            "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
        };
    const instantiatePayment = () => {
        setSpinner(true);
        setMSG("payment initiating...")
        let checkout = new KhaltiCheckout(config);
        checkout.show({amount:20000});
    }

    return <>
    {paid?
        <>
        <span className="text text-success"><FontAwesomeIcon icon={faCircleCheck} className="text text-success mx-2"/>  paid</span>
        <a className="btn btn-sm btn-success ms-4" target="_blank" href={`${import.meta.env.VITE_API_URL}/generate-transaction-pdf?Id=${vrs.vrsId}`}>
            <FontAwesomeIcon icon={faDownload}/> download
        </a>
        </>
    :
    spinner?
        <ButtonSpinner msg={msg}/>:
        <button className="btn btn-success btn-sm" onClick={instantiatePayment}>payment via khalti (Rs.{amount[vrs.vrs_vehicle_cat]/100})</button>
    }
    </>
}