import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Instruction } from "../assets/components/Instruction"
export const SignUp  = () => {
return <>
       <div className="container my-2">
              <div className="row">
                     <div className="col-5">
                            <form className="">
                                   <fieldset>
                                          <legend>Application Registration</legend>
                                          <div className="row">
                                                 <div className="col-6">
                                                  <input className="form-control" name="fname" placeholder="First Name *"/>
                                                 </div>
                                                 <div className="col-6">
                                                        <input className="form-control" name="lname" placeholder="Last Name *"/>
                                                 </div>
                                                 <div className="col-6 my-3">
                                                  <input type="email" className="form-control" name="email" placeholder="Email Address*"/>
                                                 </div>
                                                 <div className="col-6 my-3">
                                                        <input className="form-control" name="phone" placeholder="Phone Number*"/>
                                                 </div>
                                                 <div className="col-12">
                                                        <div className="input-group">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                               <input className="form-control" type="password" name="password" placeholder="Password*"/>
                                                        </div>
                                                 </div>
                                                 <div className="col-12">
                                                        <div className="input-group  my-3">
                                                               <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                                               <input className="form-control" type="password" name="cpassword" placeholder="Confirm Password*"/>
                                                        </div>
                                                 <span className="block text text-primary">*requires minimum 8 characters, uppercase, lowercase, number and symbol</span>

                                                 </div>
                                                 <div className="col">
                                                        <input className="btn btn-primary my-2 w-100" value="Register" type="submit"/>
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