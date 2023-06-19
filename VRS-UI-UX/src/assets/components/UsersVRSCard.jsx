import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faC, faCircleCheck, faDownload, faHourglass, faWarning } from "@fortawesome/free-solid-svg-icons"
import { KhaltiTransaction } from "./KhaltiTransactions"
import { Link } from "react-router-dom"
export const UsersVRSCard = ({vr,token}) =>
{
    return <>
     <div className="card border-0 mb-2">
                    <div className="card-header w-100">
                        <div className="text text-center">
                            <div className="row">
                            <div className="col-6">
                                <span className="text text-primary">VRS Id: </span>{vr.vrsId}
                            </div>
                            <div className="col-6">
                            <span className="text text-primary">Submitted on: </span>{vr.create_at}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-primary">
                    <h5 className="card-title bg-primary text-white">Single Vehicle Registration</h5>
                    <div className="text text-start">
                        <div className="row">
                            <div className="col-12 bg-body-tertiary" >
                                Applicants information 
                            </div>
                            <div className="col-4">
                                 <span className="text text-muted">Applicants Name:</span> {`${vr.user.first_name} ${vr.user.last_name}`}
                            </div>
                            <div className="col-4">
                        <span className="text text-muted">Contact:</span> {`${vr.user.username}`}
                            </div>
                            <div className="col-4">
                        <span className="text text-muted">Citizenship ID:</span> {`${vr.vrs_cit_id}`}
                            </div>
                            <div className="col-12 bg-body-tertiary">
                                Registration Information
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Registration for:</span> {`${vr.vrs_applicant_of}`}
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Registration nature:</span> {`${vr.vrs_nature}`}
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Registration type:</span> {`${vr.vrs_type}`}
                            </div>
                            <div className="col-12 bg-body-tertiary">
                                Registration Office Details
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Registered province:</span> {`${vr.vrs_office_province}`}
                            </div>
                            <div className="col-8">
                                <span className="text text-muted">Registered office:</span> {`${vr.vrs_office}`}
                            </div>
                            <div className="col-12 bg-body-tertiary">
                                Vehicle details
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Engine Type:</span> {`${vr.vrs_engine_type}`}
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Category:</span> {`${vr.vrs_vehicle_cat}`}
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Class:</span> {`${vr.vrs_vehicle_class}`}
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Model:</span> {`${vr.vrs_vehicle_model}`}
                            </div>
                            <div className="col-4">
                                <span className="text text-muted">Manufacturer:</span> {`${vr.vrs_vehicle_mfc}`}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="card-footer w-100">
                        <div className="row">
                            <div className="col-2 text-start">
                            <span className="text text-primary">Status: </span> 
                        {vr.status =='submitted' || vr.status == 'verified' || vr.status=='registered'?
                        <FontAwesomeIcon icon={faCircleCheck} className="text text-success mx-1"/>:
                        vr.status == 'pending'?
                        <FontAwesomeIcon icon={faHourglass} className="text text-warning mx-1"/>:
                        vr.status == 'rejected'?
                        <FontAwesomeIcon icon={faWarning} className="text text-danger mx-1"/>:<></>
                        }
                        {vr.status}
                        </div>
                            
                            {vr.status == "verified"&&!vr.vrs_xtd[0].paid&&
                            <div className="col-10 d-flex justify-content-start">
                            <KhaltiTransaction vrs={vr}/>
                            </div>
                            }
                             {vr.status == "rejected" && 
                                <div className="col-5 d-flex justify-content-start">
                                <Link to={`/update-vrs?id=${vr.id}&&token=${token}`} className="btn btn-sm btn-primary">update</Link>
                                </div>
                            }
                            {vr.status=="registered"&&vr.vrs_xtd[0].paid&&
                            <>
                            <div className="col-5 text-start">
                                <span className="text text-success"><FontAwesomeIcon className="text text-success" icon={faCircleCheck}/> paid</span>
                                <a className="btn btn-sm btn-success ms-4" target="_blank" href={`${import.meta.env.VITE_API_URL}/generate-transaction-pdf?Id=${vr.vrsId}`}>
                                    <FontAwesomeIcon icon={faDownload}/> download
                                </a>
                            </div>
                            
                            </>}
                            </div>
                           
                            {vr.status == "rejected" && <div className="col-12 mt-2">
                            <div className="alert alert-danger">
                                {vr.vrs_xtd[0].comments}
                            </div>
                            </div>
                            }
                    </div>

     </div>
    </>
}