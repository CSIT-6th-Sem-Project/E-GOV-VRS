import { useEffect, useState } from "react"
import axios from "axios"
import { Spinner } from "../assets/components/Spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"

export const TransportLaw = () => {
    
    const [laws,setLaws] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/get-transport-law?format=json`).then((response) => {
                setLaws(response.data)
        }).catch(
            (error)=>{console.log(error)}
            )
    },[])

    return <>
            <div className="container-fluid my-2">
            <div className="row">
                { laws.length != 0?
                 Object.keys(laws).map((law,index) => {
                
                 return (<div className="col-12">
                        <a style={{height:'50px'}}className="btn btn-secondary mt-2 w-100" data-bs-toggle="collapse" href={`#collapseLAW${index}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                            {law}
                            </a>
                            <div className="collapse my-2" id={`collapseLAW${index}`}>
                                <div className="table-responsive-sm">
                                    <table className="table table-striped m-1 table-sm">
                                        <thead>
                                            <th scope="col">S.N.</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Issued Date</th>
                                            <th scope="col">Download</th>
                                        </thead>
                                        <tbody className="table-group-divider">
                                        {
                                            laws[law].map((lw,index)=>{
                                                return(
                                                    <>
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{lw['name']}</td>
                                                        <td>{lw['issued']}</td>
                                                        <td><a target="_blank" href={lw['href']}><FontAwesomeIcon icon={faDownload}/></a></td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div> 
                    )
                    }):<Spinner/>
                }
            </div>    
            </div>
        </>
}