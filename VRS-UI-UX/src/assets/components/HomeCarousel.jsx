import  Carousel  from "react-bootstrap/Carousel";
import axios from "axios";
import { useEffect,useState } from "react";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { setAlert } from "../../app/alertSlice";
import { ToastType } from "./Toast";
export const HomeCarousel= () => {
const dispatch = useDispatch();
let [Carousels,setCarousel]= useState([])
const Default_Carousels = {
    1:{desc:"२०८० वैशाख १३ गते शाखा अधिकृत श्री दिपक कुमार निरौला र श्री सन्जय बानियाँको बिदाइका झलकहरु ।",img:"/src/assets/images/banner1(6).jpg"},
    2:{desc:"२०८० वैशाख १३ गते शाखा अधिकृत श्री दिपक कुमार निरौला र श्री सन्जय बानियाँको बिदाइका झलकहरु ।",img:"/src/assets/images/banner1(7).jpg"},
    3:{desc:"मन्त्रीज्यूबाट सवारी चालक अनुमतिपत्र छपाई निरीक्षण गरिदै ।",img:"/src/assets/images/banner1(8).jpg"},
    4:{desc:"भौतिक पूर्वाधार तथा यातायात मन्त्री माननीय श्री प्रकाश ज्वालाज्यूलाई स्वागत गर्दै महानिर्देशक श्रीमान् नारायण प्रसाद भट्टराईज्यू ।",img:"/src/assets/images/banner1(9).jpg"},
    5:{desc:"2079 चैत्र १५ र १६ गते भएको सवारी कर गणना सम्बन्धी दुई दिने छलफल तथा अन्तरक्रिया कार्यक्रम ।",img:"/src/assets/images/banner1(10).jpg"},
}
useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/get-carousel?format=json`).then(
        (resp) => {  
            setCarousel(resp.data);
        }
    ).catch((error)=>{
        setCarousel(Default_Carousels);
        
    })
},[])
return <>
{Carousels.length != 0?
<Carousel>
    {
    Object.keys(Carousels).map((car,index) => {
        
            return      (<Carousel.Item key={`carousel-${index}`}>
                     <img className="w-100" style={{height:'400px',objectFit:'cover'}} src={Carousels[car].img}/>
                     <Carousel.Caption>
                        <small className="text text-warning fst-bold bg-dark">{Carousels[car].desc}</small>
                    </Carousel.Caption>
                </Carousel.Item>)
        })
    }
</Carousel>
:<Spinner/>}
</>
}