import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Instruction } from "../assets/components/Instruction"
import { useEffect, useState } from "react"
import CreateDOMPurify from "dompurify";
import axios from "axios"

const purify = CreateDOMPurify(window);
export const SignUp  = () => {

       const [form,setForm] = useState({
              fname:'',
              lname:'',
              email:'',
              phone:'',
              password:'',
              confirm_password:''
       })
       const [users,setUsers] = useState([])

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
       let initial = {
              has_error:false,
              message:'',
              valid:false
       }
       useEffect(()=>{
              fetchUsers();
       },[])
       const [errorFname,setErrorFName] = useState(initial)
       const [errorLname,setErrorLName] = useState(initial)
       const [errorEmail,setErrorEmail] = useState(initial)
       const [errorPhone,setErrorPhone] = useState(initial)
       const [errorPass,setErrorPass] = useState(initial)
       const [errorCPass,setErrorCPass] = useState(initial)

       let nameRegx = /^[a-zA-Z]{2,}$/
       
       const validateFName = (event) => {
              let fname = event.target.value;
              if(!fname.match(nameRegx)){
                     setErrorFName({has_error:true,valid:false,message:'Enter valid firstname'})
              }else{
                     setErrorFName({...initial,valid:true})
              }
       }
       const validateLName = (event) => {
              let lname = event.target.value;
              if(!lname.match(nameRegx)){
                     setErrorLName({has_error:true,valid:false,message:'Enter valid lastname'})
              }else{
                     setErrorLName({...initial,valid:true})
              }
       }

       const validateEmail = (event) => {
              let email = event.target.value;
              let emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
              if(!email.match(emailRegx)){
                     setErrorEmail({
                            has_error:true,
                            valid:false,
                            message:'Enter a valid email'
                     })
              }else{
                     setErrorEmail({...initial,valid:true})
              }
       }

       const validatePhone = (event) => {
        
              let phoneRegx = /98[0-9]{8}$/
              let phone =  event.target.value;
          
              if(!phone.match(phoneRegx)){
                  setErrorPhone({has_error:true,message:'Enter a valid phone',valid:false})
              }else{
                  fetchUsers();
                  if(users.includes(phone)){
                      // checks if number is in list ( registered or not)
                      setErrorPhone({has_error:true,
                          message:'This number is already registered',
                          valid:false})
                  }else{
                      // all validation true
                      setErrorPhone({...initial,valid:true})
                  }
              }
          }
      
      const validatePass = (event) => {
          const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/
          let password = event.target.value;
          if(!password.match(passwordRegx)){
              setErrorPass({valid:false,has_error:true,message:'Enter a valid password </br> <small> Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character</small>'})
          }else{     
              setErrorPass({...initial,valid:true})
          }
          if(form.confirm_password.length > 0 && password !== form.confirm_password){
              setErrorCPass({valid:false,has_error:true,message:'Password donot match'})
              }else if(form.confirm_password === password){
                     setErrorCPass({...initial,valid:true})
              }
       }   

       const validateCPass = (event) => {
              let cpass = event.target.value;
              if(cpass !== form.password){
                     setErrorCPass({has_error:true,valid:false,
                     message:'Password donot match'})
              }else{
                     setErrorCPass({...initial,valid:true})
              }
       }

       const handleForm = (event) => {
              const {name,value} = event.target;
              setForm({...form,
              [name]:value
              })
              
       }

return <>
       <div className="container my-2">
              <div className="row">
                     <div className="col-5">
                            <form >
                                   <fieldset>
                                          <legend>Application Registration</legend>
                                          <div className="row">
                                                 <div className="col-6">
                                                  <input onInput={handleForm} autoComplete="off" value={form.first_name}  onChange={validateFName} className={`form-control ${errorFname.has_error?"is-invalid":errorFname.valid && "is-valid"}`} name="fname" placeholder="First Name *" />
                                                  {errorFname.has_error&&<span id="validationServer01Feedback" class="invalid-feedback">
                                                        {errorFname.message}
                                                       </span>}
                                                 </div>
                                                 <div className="col-6">
                                                        <input onInput={handleForm}  autoComplete="off" value={form.last_name} onChange={validateLName} className={`form-control ${errorLname.has_error?"is-invalid":errorLname.valid && "is-valid"}`} name="lname" placeholder="Last Name *"/>
                                                        {errorLname.has_error&&<span id="validationServer02Feedback" class="invalid-feedback">
                                                        {errorLname.message}
                                                       </span>}
                                                 </div>
                                                 <div className="col-6 my-3">
                                                  <input onInput={handleForm} autoComplete="off" value={form.email} className={`form-control ${errorEmail.has_error?"is-invalid":errorEmail.valid && "is-valid"}`} onChange={validateEmail} type="email"  name="email" placeholder="Email Address*"/>
                                                  {errorEmail.has_error&&<span id="validationServer03Feedback" class="invalid-feedback">
                                                        {errorEmail.message}
                                                       </span>}
                                                 </div>
                                                 <div className="col-6 my-3">
                                                        <input onInput={handleForm} autoComplete="off" value={form.phone} onChange={validatePhone}  className={`form-control ${errorPhone.has_error?"is-invalid":errorPhone.valid && "is-valid"}`}name="phone" placeholder="(+ 977) Phone Number*"/>
                                                        {errorPhone.has_error&&<span id="validationServer04Feedback" class="invalid-feedback">
                                                        {errorPhone.message}
                                                       </span>}
                                                 </div>
                                                 <div className="col-12">
                                                        <div className="input-group">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                               <input onInput={handleForm} value={form.password} onChange={validatePass} className={`form-control ${errorPass.has_error?"is-invalid":errorPass.valid && "is-valid"}`} type="password" name="password" placeholder="Password*"/>
                                                               {errorPass.has_error&&<span dangerouslySetInnerHTML={{__html:purify.sanitize(errorPass.message)}} id="validationServer04Feedback" class="invalid-feedback">
                                                            </span>}
                                                        </div>
                                                 </div>
                                                 <div className="col-12">
                                                        <div className="input-group  my-3">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                               <input onInput={handleForm} value={form.confirm_password} onChange={validateCPass} className={`form-control ${errorCPass.has_error?"is-invalid":errorCPass.valid && "is-valid"}`} type="password" name="confirm_password" placeholder="Confirm Password*"/>
                                                               {errorCPass.has_error&&<span id="validationServer05Feedback" class="invalid-feedback">
                                                        {errorCPass.message}</span>}
                                                       </div>
                                                

                                                 </div>
                                                 <div className="col">
                                                        <input 
                                                        disabled={errorFname.valid&&errorLname.valid&&errorEmail.valid
                                                        &&errorEmail.valid&&errorPhone.valid&&errorCPass.valid&&errorPass.valid?false
                                                        :true} className="btn btn-primary my-2 w-100" value="Register" type="submit"/>
                                                 </div>
                                                 <div className="col-12">
                                                        <span>Already Registered? <Link to={'/login'}>login</Link></span>
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