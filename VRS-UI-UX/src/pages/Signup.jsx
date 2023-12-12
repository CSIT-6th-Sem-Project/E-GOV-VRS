import { faEnvelope, faIdCard, faLock, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { Instruction } from "../assets/components/Instruction"
import { useEffect, useState } from "react"
import CreateDOMPurify from "dompurify";
import axios from "axios"
import { ButtonSpinner } from "../assets/components/ButtonSpinner"
import {toast} from "react-toastify"
import { Spinner } from "../assets/components/Spinner"

// for filtering raw html
const purify = CreateDOMPurify(window);

export const SignUp  = () => {
       const[spinner,setSpinner] = useState(false)
       
       //  form state
       const [form,setForm] = useState({
              first_name:'',
              last_name:'',
              email:'',
              username:'',
              password:'',
              password2:'',
              nin:''
       })
       // state that maintains a list of registered users when fetched from api
       const [users,setUsers] = useState([])

       // state that maintains a list of NIN numbers
       const [ninList,setNinList] = useState([])

       const navigate = useNavigate();

       // fetches Users and NIN list from api
       const fetchUsers = () => {
              // fetch DB saved users list ( already registered )
              axios.get(`${import.meta.env.VITE_API_URL}/user-list`).then(
                  (resp) => {
                      // converting JS objects to list to only store phone numbers;
                      let users_phone = []
                      resp.data.map(user => users_phone.push(user.username))
                      setUsers(users_phone)
                  }
              ).catch((error)=>console.log(error))
  
          }
       
       const fetchNIN = () => {
               // fetches DB saved NIN list
               axios.get(`${import.meta.env.VITE_API_URL}/nin-list`).then((response)=>{
                     let nin_list = []
                      response.data.map(resp => nin_list.push(resp.nin))
                      setNinList(nin_list)
              }).catch((error) => console.log(error))
       } 

       let initial = {
              has_error:false,
              message:'',
              valid:false
       }

       useEffect(()=>{
              fetchUsers();
              fetchNIN();
       },[])

       // all errors state
       const [errorEmail,setErrorEmail] = useState(initial)
       const [errorPhone,setErrorPhone] = useState(initial)
       const [errorPass,setErrorPass] = useState(initial)
       const [errorCPass,setErrorCPass] = useState(initial)
       const [errorNID,setErrorNID] = useState(initial)
       const [errorFname,setErrorFName] = useState(initial)
       const [errorLname,setErrorLName] = useState(initial)


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

       // valdiates Phone
       const validatePhone = (event) => {
        
              let phoneRegx = /98[0-9]{8}$/
              let phone =  event.target.value;
              if(!phone.match(phoneRegx)){
                  setErrorPhone({has_error:true,message:'Enter a valid phone',valid:false})
              }else{
                     // fetches already registered users to check
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

       //    returns true if all field  are valid
      const valid = () => {
       return errorNID.valid&&errorFname.valid&&errorLname.valid&&errorEmail.valid
       &&errorEmail.valid&&errorPhone.valid&&errorCPass.valid&&errorPass.valid;
      }

       //    validated Password field
      const validatePass = (event) => {
          const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/
          let password = event.target.value;
          if(!password.match(passwordRegx)){
              setErrorPass({valid:false,has_error:true,message:'Enter a valid password </br> <small> Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character</small>'})
          }else{     
              setErrorPass({...initial,valid:true})
          }
       
          //    validate password and confirm password same time if users change password field even after confirm password field is filled perfectly.

          
          if(form.password2.length > 0 && password !== form.password2){
              setErrorCPass({valid:false,has_error:true,message:'Password donot match'})
              }else if(form.password2.length > 0 && form.password2 === password){
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

       const validateNID = (event) => {
              const regxNID = /[0-9]{10}/
              
              let nid = event.target.value;
              if(!nid.match(regxNID)){
                     setErrorNID({has_error:true,valid:false,message:'invalid NIN number'})
              }else{
                     fetchNIN();
                     if(ninList.includes(Number(nid))){
                            setErrorNID({...initial,valid:true})
                     }else{
                            setErrorNID({has_error:true,valid:false,message:'invalid NIN number'})
                     }       
              }
       }

       // function to read form inputs
       const handleForm = (event) => {
              const {name,value} = event.target;
              setForm({...form,
              [name]:value
              })
              
       }

       const handleSubmitError = (error) => {
              if(error.code == "ERR_BAD_REQUEST"){
                     if(error.response.status==400){
                            let errors = error.response.data;
                            Object.keys(errors).map((index) =>{
                                   errors[index].map((message)=>toast.error(message))
                            })
                     }
              }else if(error.code=="ERR_NETWORK"){
                     toast.warn(error.message)  
              }else{
                     toast.warn("Some unexpected error occurred")
              }
       }
       // submit for register
       const submitForm =(e)=>{
              e.preventDefault();
              if(valid()){
                     const headers = {
                            'Access-Control-Allow-Origin':'http://localhost:8000'
                     }
                     setSpinner(true)
                     axios.post(`${import.meta.env.VITE_API_URL}/register`,
                     {...form,nin:Number(form.nin)},{headers:headers}).then((response) => { 
                            // check if users was registered
                            if(response.status == 201 && response.statusText=='Created'){
                                   setSpinner(false)
                                   toast.success("Registered Successfully")
                                   navigate("/login")       
                            }
                     }).catch((error)=>{
                           handleSubmitError(error);
                     }).finally(()=>{
                            setSpinner(false)
                         })
              }
       }

return <>
       <div className="container-fluid my-2">
              { ninList.length> 0 && users.length > 0?
              <div className="row">
                     <div className="col-sm-12 col-md-5">
                            <form onSubmit={submitForm}>
                                   <fieldset>
                                          <legend>Application Registration</legend>
                                          <div className="row">
                                                 <div className="col-md-6 col-12 mt-3">
                                                  <input onInput={handleForm} autoComplete="off" value={form.first_name}  onChange={validateFName} className={`form-control ${errorFname.has_error?"is-invalid":errorFname.valid && "is-valid"}`} name="first_name" placeholder="First Name *" />
                                                  {errorFname.has_error&&<span id="validationServer01Feedback" className="invalid-feedback">
                                                        {errorFname.message}
                                                       </span>}
                                                 </div>
                                                 <div className="col-md-6 col-12 mt-3">
                                                        <input onInput={handleForm}  autoComplete="off" value={form.last_name} onChange={validateLName} className={`form-control ${errorLname.has_error?"is-invalid":errorLname.valid && "is-valid"}`} name="last_name" placeholder="Last Name *"/>
                                                        {errorLname.has_error&&<span id="validationServer02Feedback" className="invalid-feedback">
                                                        {errorLname.message}
                                                       </span>}
                                                 </div>
                                                 <div className="col-12 my-3">
                                                        <div className="input-group">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope}/></span>
                                                  <input onInput={handleForm} autoComplete="off" value={form.email} className={`form-control ${errorEmail.has_error?"is-invalid":errorEmail.valid && "is-valid"}`} onChange={validateEmail} type="email"  name="email" placeholder="Email Address*"/>
                                                  {errorEmail.has_error&&<span id="validationServer03Feedback" className="invalid-feedback">
                                                        {errorEmail.message}
                                                       </span>}
                                                       </div>
                                                 </div>
                                                 <div className="col-12 mb-3">
                                                        <div className="input-group">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faPhone}/></span>       
                                                        <input onInput={handleForm} autoComplete="off" value={form.username} onChange={validatePhone}  className={`form-control ${errorPhone.has_error?"is-invalid":errorPhone.valid && "is-valid"}`}name="username" placeholder="(+ 977) Phone Number*"/>
                                                        {errorPhone.has_error&&<span id="validationServer04Feedback" className="invalid-feedback">
                                                        {errorPhone.message}
                                                       </span>}
                                                       </div>
                                                 </div>
                                                 <div className="col-12 mb-3">
                                                        <div className="input-group">
                                                        <span className="input-group-text"><FontAwesomeIcon icon={faIdCard}/></span>       
                                                        <input onInput={handleForm} autoComplete="off" value={form.nin} onChange={validateNID}  className={`form-control ${errorNID.has_error?"is-invalid":errorNID.valid && "is-valid"}`} name="nin" placeholder="National Identity Number (NIN)*"/>
                                                        {errorNID.has_error&&<span id="validationServer9Feedback" className="invalid-feedback">
                                                        {errorNID.message}
                                                       </span>}
                                                       </div>
                                                 </div>
                                                 <div className="col-12">
                                                        <div className="input-group">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                               <input onInput={handleForm} value={form.password} onChange={validatePass} className={`form-control ${errorPass.has_error?"is-invalid":errorPass.valid && "is-valid"}`} type="password" name="password" placeholder="Password*"/>
                                                               {errorPass.has_error&&<span dangerouslySetInnerHTML={{__html:purify.sanitize(errorPass.message)}} id="validationServer04Feedback" className="invalid-feedback">
                                                            </span>}
                                                        </div>
                                                 </div>
                                                 <div className="col-12">
                                                        <div className="input-group  my-3">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                               <input onInput={handleForm} value={form.password2} onChange={validateCPass} className={`form-control ${errorCPass.has_error?"is-invalid":errorCPass.valid && "is-valid"}`} type="password" name="password2" placeholder="Confirm Password*"/>
                                                               {errorCPass.has_error&&<span id="validationServer05Feedback" className="invalid-feedback">
                                                        {errorCPass.message}</span>}
                                                       </div>
                                                

                                                 </div>
                                                 <div className="col">
                                                 {spinner?
                                                        <ButtonSpinner msg="Registering..."/>:
                                                        <input 
                                                        disabled={valid()?false
                                                        :true} className="btn btn-primary my-2 w-100" value="Register" type="submit"/>
                                                 }
                                                 </div>
                                                 <div className="col-12">
                                                        <span>Already Registered? <Link to={'/login'}>login</Link></span>
                                                 </div>
                                          </div>
                                   </fieldset>
                            </form>
                     </div>

                     <div className="col-sm-12 col-md-7 ">
                         <Instruction/>  
                     </div>
              </div>:<Spinner/>
              }
       </div>
       </>
}


