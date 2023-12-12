import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { Instruction } from "../assets/components/Instruction"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import CreateDOMPurify from "dompurify";
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import { ButtonSpinner } from "../assets/components/ButtonSpinner"
import { storeAuth } from "../assets/components/fetchStoreAuth"
import { setAuth } from "../app/authSlice"
import { Spinner } from "../assets/components/Spinner"

let initial = {
    has_error:false,
    message:'',
    valid:false
}

export const Login  = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
// for purifying html in strings
const [ users,setUsers] = useState([])
const purify = CreateDOMPurify(window);
// fetches all users information
    const fetchUsers = () => {
        
    axios.get(`${import.meta.env.VITE_API_URL}/user-list`).then(
        (resp) => {
            // converting JS objects to list to only store phone numbers;
            let users_phone = []
            resp.data.map(user => users_phone.push(user.username))
            setUsers(users_phone)
        }
    ).catch((error)=>{

    })
    
}


const [loginForm,setLoginForm] = useState({
    username:'',
    password:'',
})
useEffect(() => {
  fetchUsers();
},[])

const [errorPhone,setErrorPhone] = useState(initial);
const [errorPass,setErrorPass] = useState(initial);
const [spinner,setSpinner] = useState(false);

const validatePhone = (event) => {
        
        let phoneRegx = /98[0-9]{8}$/
        let phone =  event.target.value;
    
        if(!phone.match(phoneRegx)){
            setErrorPhone({has_error:true,message:'Enter a valid phone',valid:false})
        }else{
            fetchUsers();
            if(!users.includes(phone)){
                // checks if number is in list ( registered or not)
                setErrorPhone({has_error:true,
                    message:'This number is not registered',
                    valid:false})
            }else{
                // all validation true
                setErrorPhone({...initial,valid:true})
            }
        }
    }

const validatePassword = (event) => {
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/
    let password = event.target.value;
    if(!password.match(passwordRegx)){
        setErrorPass({valid:false,has_error:true,message:'Enter a valid password </br> <small> Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character</small>'})
    }else{
        setErrorPass({...initial,valid:true})
    }
 }   

 const handleForm = (event) => {
        const {name,value} = event.target;
        setLoginForm({
            ...loginForm,
            [name]:value
        })
    
    }
const Authenticate = (event) => {
        setSpinner(true)
        event.preventDefault();

        if(errorPass.valid && errorPhone.valid){
            axios.post(`${import.meta.env.VITE_API_URL}/auth/login/`,{},{
                auth:loginForm
            }
            ).then((response)=>{
            if(response.status == 200 && response.statusText == 'OK'){
                
                dispatch(setAuth(response.data))
                storeAuth(response.data)
                toast.success("Logged in Successfully");
                navigate("/");
            }
          }).catch((error) => {
            if(error.code=="ERR_BAD_REQUEST"){
                if(error.response.status==403){
                    toast.error("Password is Invalid")
                }
            }else if(error.code=="ERR_NETWORK"){
                toast.warn(error.message)  
            }else{
                toast.warn("Some unexpected error occurred")
            }
            }).finally(()=>{
            setSpinner(false)
         })
        }else{
            setSpinner(false)
            toast.error("username or password not valid")     
        }
    }
return <>
       <div className="container-fluid my-2">
              {users.length > 0?
              <div className="row">
                    
                     <div className="col-md-5 col-12">
                            <form onSubmit={Authenticate}>
                                   <fieldset>
                                        
                                          <legend>Application Login</legend>
                                          <div className="row">
                                                <div className="col-12">
                                                    <div className="input-group my-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>      
                                                        
                                                        <input  autoComplete="off" type="text" onChange= {validatePhone} onInput={handleForm} value={loginForm.username} required className={`form-control ${errorPhone.has_error?"is-invalid":errorPhone.valid && "is-valid"}`} placeholder="(+ 977) Mobile Number" name="username"/>
                                                        {errorPhone.has_error&&<span id="validationServer01Feedback" className="invalid-feedback">
                                                        {errorPhone.message}
                                                       </span>}
                                                    </div>
                                                    
                                                    <span className="text text-primary">*mobile number you registered your appplication with</span>
                                                   
                                                    <div className="input-group my-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                            <input  type="password" onChange= {validatePassword} onInput={handleForm} value={loginForm.password} required className={`form-control ${errorPass.has_error?"is-invalid":errorPass.valid && "is-valid"}`} placeholder="Password" name="password"/>                                                        
                                                            
                                                            {errorPass.has_error&&<span dangerouslySetInnerHTML={{__html:purify.sanitize(errorPass.message)}} id="validationServer02Feedback" className="invalid-feedback">
                                                            
                                                            </span>}
                                                    </div>
                                                    <div className="col-12">
                                                        {spinner?
                                                        <ButtonSpinner msg="Authenticating..."/>
                                                        :<input disabled={errorPass.valid&&errorPhone.valid?false:true} className="btn btn-primary w-100" name="submit" type="submit" value="Login"/>
                                                        }
                                                        </div>                                               
                                                </div>
                                                 <div className="col-12">
                                                        <span>Not Registered? <Link to={'/register'}>register</Link></span>
                                                 </div>
                                          </div>
                                   </fieldset>
                            </form>
                     </div>

                     <div className="col-md-7 col-12">
                         <Instruction/>  
                     </div>
              </div>:<Spinner/>
                }
       </div>
       </>
}