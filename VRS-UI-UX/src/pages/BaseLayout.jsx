import {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { ToastType } from "../assets/components/Toast";
import "bootstrap/dist/css/bootstrap.min.css";


import gov_logo from "../assets/logo/gov-logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePhone,faEnvelope,faBuilding} from "@fortawesome/free-solid-svg-icons";
import {faFacebook,faSnapchat,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";
import { Outlet } from "react-router";
import { ToastComponent } from "../assets/components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../app/alertSlice";
export const BaseLayout = () => {
    
    const dispatch = useDispatch();

    const alert = useSelector(state => state.alert);
    
    return <>
    {alert.active?
    <div className={`toast-container position-fixed bottom-0 end-0 p-3`}>

    {   
        alert.active?
        alert.alerts.map((alrt) => { return <ToastComponent showToast={alert.active} message = {alrt.text} toastType={alrt.type}/>
        }):
        <></>  
    }
    </div>:<></>
    }

    {/* Header Section Begins */}
        
        <div className="container w-100">
        <div className="row">
            <div className="col-3">
                <a href="/" className="navbar-brand center">
                    <img src={gov_logo} style={{width:'110px',height:'80px'}}/>
                </a>
            </div>
            <div className="col-6 text-center">
                <small className="text text-danger">
                    Government of Nepal <br/>
                    Ministry of Physical Infrastructure and Transport
                </small>
                <h4 className="text text-danger">Department of Transport Management</h4>
                <span className="text text-danger fs-6">Minbhawan, Kathmandu</span>
            </div>
            <div className="col-3 a">
                <FontAwesomeIcon icon={faSquarePhone} /> : <span className="text text-danger"> 01-4574921 </span>
                <br/> <FontAwesomeIcon icon={faBuilding}/> : <span className="text text-danger"> 01-4574922 </span>
                <br/><FontAwesomeIcon icon={faEnvelope}/> : <span className="text text-danger"> <a className="text text-danger" href="mailto:info@dotm.gov.np">info@dotm.gov.np</a></span>
                
            </div>

        </div>
        </div>
        <nav className=" bg-primary  w-100 navbar navbar-expand-lg">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
      <div className="navbar-nav text">
        <a className="navbar-brand active text-white" href="/">Home</a>

        <a className="nav-link text-white"href="#">Organization</a>
        <a className="nav-link text-white" href="#">Driving License</a>
        
        <a className="nav-link text-white" href="#">Transport Law</a>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Forms
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item " href="#">License Registration</a></li>
            <li><a className="dropdown-item " href="#">Vehicle Registration</a></li>
          </ul>
          </li>
        <Link className="nav-link text-white" href="#">FAQ</Link>
        <Link className="nav-link text-white" to={'/login'}>Login</Link>
      </div>
        </div>
        </div>
        </nav>
       
    {/*  Header Section Ends*/}
        
    {/* Middle Section Begins */}

        <Outlet/>

    {/* Middle Section Ends */}

    {/* Footer Section Begins */}

    {/* Footer Section Ends */}
    <footer className="text text-bg-light mt-4 container-fluid">
        <div className="row">
        <div className="col-4 text text-center">
                <div className="col-12 ">
                    <img src={gov_logo}style={{width:'110px',height:'80px'}}/>
                    <h2>DOTM</h2>
                </div>
                <div className="col-12">
                    <strong>Email: </strong>
                    <a href="mailto:info@dotm.gov.np" className="text-decoration-none text-dark"> info@dotm.gov.np</a>
                </div>
        </div>

        <div className="col-4 text text-center">
                <div className="col-12">
                    <h3>Find us on</h3>
                </div>
                <div className="col-12">
                    <a href="https://facebook.com" target="_blank" className="link-dark">
                        <FontAwesomeIcon icon={faFacebook}/>
                    </a>
                    <a href="https://twitter.com" target="_blank" className="link-dark ms-2">
                    <FontAwesomeIcon icon={faTwitter}/>
                    </a>
                    <a href="https://instagram.com" target="_blank" className="link-dark ms-2">
                    <FontAwesomeIcon icon={faInstagram}/>
                    </a>

                    <a href="https://snapchat.com" target="_blank" className="link-dark ms-2">
                    <FontAwesomeIcon icon={faSnapchat}/>
                    </a>
                </div>
        </div>

        <div className="col-4 text text-center">
                <div className="col-12">
                    <h3>Subscribe to newsletter</h3>
                </div>
                <div className="col-12">
                    <div className="input-group">
                        <input  type='email' placeholder="Enter email ..." className="form-control"/>
                        <button className="btn btn-outline-light btn-primary">Subscribe</button>
                    </div>
                </div>
        </div>

        <div className="col-12 text-center">
            &copy; dotm , 2022. All rights reserved.
        </div>
    </div>
</footer>
    </>
}