  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCarSide,faUserPlus,faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons";
import director_general from "../assets/images/dotm-head.png";

import { HomeCarousel } from "../assets/components/HomeCarousel";
import { NoticeBoard } from "../assets/components/NoticeBoard";

export const Home = () =>{
    return <>
    <div className="container-fluid my-2">
        <div className="row">
            {/* Carousel Section begins  */}
            <div className="col-xs-12 col-sm-12">
                <HomeCarousel/>
            </div>
            {/* Carousel Section ends */}

             <hr className="my-1"/>
              {/* Notifications Sections begins */}
                <div className="col-sm-12 col-md-4 mt-2">
                <NoticeBoard/>
                </div>
             {/* Notifications Sections ends */}
                <div className = "col-sm-12 col-md-4 mt-2">
                    <div className="border border-success p-1">
                    <div className="bg-body-tertiary">
                        <span className="h5">About Us</span>
                    </div>
                    <div className="m-2 ">
                        <p  className="text text-muted">
                        Department of Transport Management is a central level government body established to regulate, develop, manage and facilitate the transport sector of Nepal. Department of Transport Management is currently under the Ministry of Physical Infrastructure and Transport, Government of Nepal. For overall management of transport sector vs. no .  This department was established in 2041. The Road and Traffic Management Act, 2049, the Road and Traffic Management Rules, 2054 and the legal provisions have been in force since the past.
                        </p>
                    </div>
                    </div>
                </div>
                
                <div className="col-sm-12 col-md-4 mt-2">
                    <div className="border border-info p-1">
                    <div className="bg-body-tertiary">
                        <span className="h5">Director General</span>
                    </div>
                    <img className="img-fluid m-1" style={{height:"240px"}} src={director_general}/>
                    <h5 className="text text-primary">Shri Narayan Parsad Bhattarai</h5>
                    <h5 className="text text-warning">Director General</h5>
                    </div>
                </div>
        </div>
    </div>
    </>
}