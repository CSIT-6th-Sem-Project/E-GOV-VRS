import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Instruction } from "../assets/components/Instruction"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
let initial = {
    value:'',
    has_error:false,
    message:''
}

export const Login  = () => {
   
    
const [loginForm,setLoginForm] = useState({
        phone:initial,
        password:initial,
    })

    
    
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
                                                        
                                                        <input type="text" required className="form-control" placeholder="(+ 977) Mobile Number" name="phone"/>
                                                    </div>
                                                    <span className="text text-primary">*mobile number you registered your appplication with</span>
                                                    {/* {loginForm.password.has_error? */}
                                                    <div className="input-group my-3">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                            <input type="password" required className="form-control" placeholder="Password" name="password"/>                                                        </div>
                                                    {/* } */}
                                                    <div className="col-12">
                                                        <input className="btn btn-primary w-100" name="submit" type="submit" value="Login"/>
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