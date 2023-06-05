import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Instruction } from "../assets/components/Instruction"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import CreateDOMPurify from "dompurify";

let initial = {
    has_error:false,
    message:'',
    valid:false
}

export const Login  = () => {

// for purifying html in strings
const [ users,setUsers] = useState([])
const purify = CreateDOMPurify(window);
// fetches all users information
const fetchUsers = () => {
    axios.get("http://localhost:8000/api/user-list").then(
        (resp) => {
            // converting JS objects to list to only store phone numbers;
            let users_phone = []
            resp.data.map(user => users_phone.push(user.username))
            setUsers(users_phone)
        }
    ).catch((error)=>console.log(error))
}
const [loginForm,setLoginForm] = useState({
    phone:'',
    password:'',
})
useEffect(() => {
  fetchUsers();
},[])



const [errorPhone,setErrorPhone] = useState(initial);
const [errorPass,setErrorPass] = useState(initial);


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

return <>
       <div className="container my-2">
              <div className="row">
                    
                     <div className="col-5">
                            <form method="POST">
                                   <fieldset>
                                        
                                          <legend>Application Login</legend>
                                          <div className="row">
                                                <div className="col-12">
                                                    <div className="input-group my-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>      
                                                        <input  autoComplete="off" type="text" onChange= {validatePhone} onInput={handleForm} value={loginForm.phone} required className={`form-control ${errorPhone.has_error?"is-invalid":errorPhone.valid && "is-valid"}`} placeholder="(+ 977) Mobile Number" name="phone"/>
                                                        {errorPhone.has_error&&<span id="validationServer01Feedback" class="invalid-feedback">
                                                        {errorPhone.message}
                                                       </span>}
                                                    </div>
                                                    
                                                    <span className="text text-primary">*mobile number you registered your appplication with</span>
                                                   
                                                    <div className="input-group my-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                            <input  type="password" onChange= {validatePassword} onInput={handleForm} value={loginForm.password} required className={`form-control ${errorPass.has_error?"is-invalid":errorPass.valid && "is-valid"}`} placeholder="Password" name="password"/>                                                        
                                                            
                                                            {errorPass.has_error&&<span dangerouslySetInnerHTML={{__html:purify.sanitize(errorPass.message)}} id="validationServer02Feedback" class="invalid-feedback">
                                                            
                                                            </span>}
                                                    </div>
                                                    <div className="col-12">
                                                        <input disabled={errorPass.valid&&errorPhone.valid?false:true}className="btn btn-primary w-100" name="submit" type="submit" value="Login"/>
                                                    </div>                                               
                                                </div>
                                                 <div className="col-12">
                                                        <span>Not Registered? <Link to={'/register'}>register</Link></span>
                                                 </div>
                                          </div>
                                   </fieldset>
                            </form>
                     </div>

                     <div className="col-7">
                         <Instruction/>  
                     </div>
              </div>
       </div>
       </>
}