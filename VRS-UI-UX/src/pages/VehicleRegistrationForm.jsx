import { useState } from "react";
import { render } from "react-dom"
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateDOMPurify from "dompurify";
import { ButtonSpinner } from "../assets/components/ButtonSpinner";
import {toast} from "react-toastify";
import { useNavigate } from "react-router";

export const Single_VRS = () => {
    const purify = CreateDOMPurify(window);
    let auth_token = useSelector(state => state.auth.token)
    let auth_user = useSelector(state=>state.auth.user)
    const navigate = useNavigate();

    const province_id = {
        province_1:15,
        bagmati_province:17,
        madesh_province:16,
        karnali_province:20,
        lumbini_province:19,
        sudurpaschim_province:21,
        gandaki_province:18

    }
    
    const custom_office_list = ["Bhadrapur Custom Office / भद्रपुर भन्सार कार्यलय ","    Bhairahawa Custom Office / भैरहवा भन्सार कार्यालय ","    Biratnagar Custom Office / बीराटनगर भंसार कार्यालय ","    Birgunj Custom Office / बिरगंज भन्सार कार्यालय ","    Butwal Custom Office / बुटवल भन्सार कार्यालय","    Dry Port Custom Office / सुख्खा बन्दरगाह भन्सार कार्यालय","    Gandaki Custom Office / गण्डकी भन्सार कार्यालय","    Gaucharan Custom Office / गौचरन भन्सार कार्यालय","    Gaur Custom Office / गौर भन्सार कार्यालय ","    Jaleswor Custom Office / जलेश्वर भन्सार कार्यालय ","    Janakpur Custom Office / जनकपुर भन्सार कार्यालय ","    Kailali Custom Office / कैलाली भन्सार कार्यालय ","    Kakadbhitta Custom Office / काकडभिट्टा भन्सार कार्यालय","    Kanchanpur Custom Office / कन्चनपुर भन्सार कार्यालय ","    Koilabaas Custom Office / कोइलाबास भन्सार कार्यालय ","    Krishnagar Custom Office / कृष्णनगर भन्सार कार्यालय","    Lama Bagar Customs Office / लामा बगर भन्सार कार्यालय ","    Lumbini Custom Office / लुम्बिनी भन्सार कार्यालय","    Mahakali Customs Office / महाकालि भन्सार कार्यालय","    Mahottari Custom Office / महोत्तरी भन्सार कार्यालय ","    Malangwa Custom Office / मलंगवा भन्सार कार्यालय ","    Mechi Custom Office / मेची भंसार कार्यालय ","    Mor Custom Office / मोर  भन्सार कार्यालय ","    Morang Custom Office / मोरङ्ग भन्सार कार्यालय ","    Mustang Customs Office / मुस्ताङ भन्सार कार्यालय ","    Nepalganj Custom Office / नेपालगंज भंसार कार्यालय ","    Olangchungola Customs Office / ओलन्ग्चुन्गोला भन्सार कार्याल","    Pashupatinagar Custom Office / पशुपतिनगर भन्सार कार्यालय","    Rajapur Custom Office / राजापुर भन्सार कार्यालय ","    Rajbiraj Custom Office / राजबिराज भन्सार कार्यालय ","    Rajbiraj Custom Office / राजविराज भन्सार कार्यालय ","    Rani Custom Office / रानी भन्सार कार्यालय ","    Rasuwa custom office/ रसुवा भन्सार कार्यालय","    Sagarmatha Custom Office / सगरमाथा भन्सार कार्यालय","    Sarlahi Custom Office / सर्लाही भन्सार कार्यालय ","    Siraha Custom Office / सिराहा भंसार कार्यालय ","    Sunauli Custom Office / सूनौली भंसार कार्यलय ","    Sunsari Custom Office / सुनसरी भंसार कार्यालय ","    Taatopaani Custom Office / तातोपानि भन्सार कार्यालय ","    Tandi Custom Office / टाडी भन्सार कार्यालय","    Tribhuwan Airport Custom Office / त्रिभूबन विमानस्थल भंसार कार्यलय","Tribhuwan Custom Office / त्रिभुवन भन्सार कार्यालय"]
    const [transport_office_list,setListOffice] = useState("")
    
    const fetchTransportOffice = async (e) => {
        await axios.get(`https://onlineevrsreg.dotm.gov.np/Nepal_VRSREG/loadOfficeNames?stateId=${province_id[e.target.value]}`).
        then((resp) => {
            setListOffice(resp.data.result)
        }).catch((err)=>setListOffice(""))
    }
    
    const insurance_company_list = [
        "Siddhartha Insurance Company",
        "Sikhar Insurance Company",
        "Ajod Insurance Company Limited","    Everest Insurance Company Limited","    General Insurance Company Nepal Limited","    IME General Insurance Company Limited","    Himalayan General Insurance Company Limited","    Lumbini General Insurance Company Limited","    National Insurance Company Limited","    Neco Insurance Company Limited","    Nepal Insurance Company Limited","    NLG Insurance Company Limited","    Oriental Insurance Company Limited","    Prabhu Insurance Company Limited","    Premier Insurance Company (Nepal) Limited","    Prudential Insurance Company Limited","    Rastriya Beema Company Limited","    Sagarmatha Insurance Company Limited","    Sanima General Insurance Company Limited","    United Insurance Company (Nepal) Limited","    American Life Insurance Company Limited (MetLife)","    Asian Life Insurance Company Limited","    Citizen Life Insurance Company Limited","    Gurans Life Insurance Company Limited","    I.M.E. Life Insurance Company Limited","    Jyoti Life Insurance Company Limited","    Life Insurance Corporation (Nepal) Limited","    Mahalaxmi Life Insurance Company Limited","    National Life Insurance Company Limited","    Nepal Life Insurance Company Limited","    Prabhu Life Insurance Company Limited","    Prime Life Insurance Company Limited","    Rastriya Beema Sansthan","    Reliable Nepal Life Insurance Limited","    Reliance Life Insurance Limited","    Sanima Life Insurance Company Limited","    Sun Nepal Life Insurance Company Limited","    Surya Life Insurance Company Limited","    Union Life Insurance Company Limited","    Sagarmatha insurance company pvt. ltd."
        ]
    
    const vehicle_category = {
        lmv_two_wheeler:"दुई पाङ्ग्रे सानो सवारी / LMV TWO WHEELER",
        lmv_small:"सानो सवारी / LMV",
        lmv_middle:"मझौला सवारी / MMV",
        lmv_big:"ठूलो सवारी / HMV",
        lmv_three_wheeler:"तीन पांग्रेर / LMV THREE WHEELER"
    }

    const vehicle_class = {
        lmv_two_wheeler: ["Motorcycle / मोटरसाइकल","Scooter / स्कुटर"],
        lmv_small: ["Ambulance / एम्बुलेन्स","Car / कार","Delivery Van / डेलिभरी भ्यान","Jeep / जीप","Micro Bus / माइक्रोबस","Pick_up / पिकअप","Powertiller / पावर टेलर","Taxi / ट्याक्सी"]
        ,lmv_middle:["Backhoe Loader /ब्याकहो लोडर","Minibus / मिनीबस","Minitruck / मिनी ट्रक","Tractor / ट्याक्टर"],
        lmv_big:["Bus / वस","Crane / क्रेन","Dozer / डोजर","Excavator / इस्काभेटर","Fire brigade / दमकल","Gas Bullet / ग्यास बुलेट","Grader / ग्रेडर","Hearse / हियर्स","Loader / लोडर","Lorry / लरी","Mini Tripper / मिनी ट्रिपर","Mixture / मिक्सचर","Other Than Argi Vehicles / कृषि प्रयोजन बाहेकको सवारी","Road Roller / रोड रोलर","Tripper / टिप्पर","Truck / ट्रक","Truck Mixture / ट्रक मिक्सचर"],
        lmv_three_wheeler:["Autorickshaw / अटो रिक्सा","Tempo / टेम्पो"]
    }

    const [current_class,setCurrentClass] = useState([])

    const province_district_list ={
        province_1 : [
            "Bhojpur","Dhankuta","Ilam","Jhapa","Khotang","Morang","Okhaldhunga","Panchthar","Sankhuwasabha","Solukhumbu","Sunsari","Taplejung","Terhathum","Udayapur"
        ],
       madesh_province:[
        "Bhojpur","Dhankuta","Ilam","Jhapa","Khotang","Morang","Okhaldhunga","Panchthar","Sankhuwasabha","Solukhumbu","Sunsari","Taplejung","Terhathum","Udayapur"
        ],
        bagmati_province:[
            "Bhaktapur","Chitwan","Dhading","Dolakha","Kathmandu","Kavrepalanchok","Lalitpur","Makawanpur","Nuwakot","Ramechhap","Rasuwa","Sindhuli","Sindhupalchok"
        ],
        gandaki_province:[
            "Baglung","Gorkha","Kaski","Lamjung","Manang","Mustang","Myagdi","Nawalpur","Parbat","Syangja","Tanahu"
        ],
        lumbini_province:[
            "Arghakhanchi","Banke","Bardiya","Dang","Gulmi","Kapilvastu","Parasi","Palpa","Pyuthan","Rolpa","Rukum","Rupandehi"
        ],
        karnali_province:[
            "Dailekh","Dolpa","Humla","Jajarkot","Jumla","Kalikot","Mugu","Rukum","Salyan","Surkhet"
        ],
        sudurpaschim_province:[
            "Achham","Baitadi","Bajhang","Bajura","Dadeldhura","Darchula","Doti","Kailali","Kanchanpur"
        ]
    }

    const applicant_of_list = {
        individual : "व्यक्तिगत / INDIVIDUAL",
        organization: "संगठन / ORGANIZATION",
        government: "सरकारी/ GOVERNMENT",
        importer:  "आयातकर्ता / IMPORTER",
        company:"कम्पनी / COMPANY"
    }

    const vrs_nature_list = {
        permanent : "स्थायी / PERMANENT",
        provisional :"अस्थायी / PROVISIONAL",
    }

    const vrs_type_list = {
        private:"निजी(प)(च)/PRIVATE(PA)(CHA)",
        government:"सरकारी(ब)झ)/GOVERNMENT(BA)(JHA)",
        public:"सार्वजनिक (ख, ज, थ, ह) / PUBLIC (KHA, JA, THA, HA)",
        tourist:"पर्यटन(प)(य)/TOURIST(PA)(YA)",
        corporation:"निगम(म)/CORPORATION(MA)",
       local_government:"स्थानीय सरकार (ग,झ, ब, ड, क्ष) / LOCAL GOVERNMENT (GA, JHA, BA, DA, KSHA)",
        diplomatic:"DIPLOMATIC"
    }

    const vrs_engine_list = {
        petrol: "Petrol type",
        electric:"Electric type",
        gas:"Gas type",
        diesel:"Diesel type",
        other:"Other type"
    }
    const vrs_province_list ={
        bagmati_province :"Bagmati Pradesh",
        gandaki_province:"Gandaki Pradesh",
        karnali_province:"Karnali Pradesh",
        lumbini_province:"Lumbini Pradesh",
        madesh_province:"Madhesh Pradesh",
        province_1:"Pradesh No. 1",
        sudurpaschim_province:"Sudurpaschim Pradesh"
    }

    const insurance_type = {
        single_party_insurance:"Single Party Insurance",
        third_party_insurance: "Third Party Insurance",
        full_insurance:"Full Insurance"
        
    }
    const vrs_reg_init = {
        // for vehicle registration initiation
        vrs_applicant_of:"individual",
        vrs_nature: "permanent",
        vrs_type:"private",
        vrs_old_owner:"",  
        // for individual information
        vrs_cit_id:"",
        // vehicle registration office details:
        vrs_office_province:"",
        vrs_office:"",
        // Insurance Policy Information
        vrs_ins_policy_num:"",
        vrs_ins_pan_num:"",
        vrs_ins_company:"",
        vrs_ins_company_addr:"",
        vrs_ins_validity_start:"",
        vrs_ins_validity_end:"",
        // vehicle information:
        vrs_engine_type:"",
        vrs_mfg_year:"",
        vrs_vehicle_cat:"",
        vrs_vehicle_class:"",
        vrs_engine_no:"",
        vrs_engine_power:"",
        vrs_chasis_no:"",
        vrs_vehicle_model:"",
        vrs_vehicle_mfc: "",
        vrs_cylinder_no:"",
        vrs_seat_capacity: "",
        vrs_vehicle_color:"",
        vrs_vehicle_wt:"",
        // Custom Information:
        vrs_custom_clearance_date:"",
        vrs_custom_declaration_no:"",
        vrs_custom_office:"",
        vrs_custom_payment:"",
        vrs_custom_payment_amt:""


    }

    
    const preview_init = {
        citizen_doc_img:undefined,
        engine_img:undefined,
        chasis_img:undefined,
        custom_related_img:undefined,
        vehicle_img:undefined,
        bill_img:undefined,
    }

    const vrs_image_upload_list ={
        engine_img:"ENGINE PHOTO/ ईन्जिन फोटो",
        chasis_img:"CHASIS PHOTO / चेसिस फोटो",
        custom_related_img:"CUSTOMS RELATED DOCUMENT / भन्सार विवरणको कागजात ",
        vehicle_img:"VEHICLE IMAGE / सवारीको फोटो ",
        bill_img:"SELL/PURCHASE BILL / बिक्रि/खरिद बिल ",
    }
    
    const [registrationForm,setRegistrationForm] = useState(vrs_reg_init)
    
    const permanent_address_init = {
        vrs_applicant_province:"",
        vrs_applicant_district:"",
        vrs_applicant_local:"",
        vrs_applicant_ward:"",
        vrs_applicant_phone:"",
    }
    const [addressForm,setAddressForm ] = useState(permanent_address_init)

    const [same_as_permanent,setPermanent]= useState(false);

    const [ imgFile, setImgFile ] = useState(preview_init);
    
    const [ preview,setPreview]= useState(preview_init);

    const [ district_list_1,setDistrictList1] = useState([])

    const error_init = {
        has_error:false,
        message:"",
        valid:false
    }

    const error_message = {
        phone:"Enter a valid phone",
        cid:"Enter a valid citizenship number",
        ward:"Enter a valid ward no",
        local_level:"Enter a valid local level",
        vrs_old_owner:"Enter a valid owner phone number",
        vrs_engine :"Enter a valid value",
        color: "Enter a valid color"
    }

    const regEX = {
        citRegx:/^[0-9]{5,}$/,
        phoneRegx:/^[0-9]{10}/,
        stringRegx:/^[a-zA-Z][a-zA-Z 0-9]+$/,
        wardRegx:/^[0-9]{1,2}$/,
        numREx:/^[0-9]+$/,
        colorRegx:/^[a-zA-Z ]+$/
    }
    
   const error_address = {  
    vrs_applicant_district:error_init,
        vrs_applicant_phone:error_init,
        vrs_applicant_local:error_init,
        vrs_applicant_ward:error_init
    }

    const [error,setError] = useState({
        vrs_cit_id: error_init,
        vrs_old_owner:error_init,
        
        vrs_engine_power:error_init,
        vrs_engine_no:error_init,
        vrs_chasis_no:error_init,
        vrs_vehicle_color:error_init,
        
        citizen_doc_img:error_init,
        engine_img:error_init,
        chasis_img:error_init,
        custom_related_img:error_init,
        vehicle_img:error_init,
        bill_img:error_init,

        ...error_address,
    })
    
   const custom_office_payment = {
    full_custom:"Full Custom",
    bank_guarantee: "Bank Guarantee",
    cash_deposit: "Cash Deposit",
    custom_exempted: "Custom Exempted"
   }


   
    // selects and previews the image documents
    const onSelectImageFile = (e) => {
        const size = (e.target.files[0].size / 1024 / 1024).toFixed(2);

        if (!e.target.files || e.target.files.length === 0 || size > 4) {
            setImgFile({...imgFile,[e.target.name]:undefined})
            setPreview({...preview,[e.target.name]:undefined})
            setError({...error,[e.target.name]:{
                has_error:true,
                valid:false,
                message:"choose a valid file (.png,.jpg,.jpeg) type , size < 4mb"
            }})
            return
        }
        
        setImgFile({...imgFile,
            [e.target.name]:e.target.files[0]}
            )

        const objectUrl = URL.createObjectURL(e.target.files[0])
        setPreview({...preview,[e.target.name]:objectUrl})
        
        setError({...error,[e.target.name]:valid_state})

        return () => URL.revokeObjectURL(objectUrl);
    }
    // handles overall users registration form
    const handelREGForm = (event) => {
        const {name,value} = event.target;
        setRegistrationForm({
            ...registrationForm,
            [name]:value
        })
    }

    // handles overall users address form
    const handelAddressForm = (event) => {
        const {name,value} = event.target;
        
        setAddressForm({
            ...addressForm,
            [name]:value
        })
    }
    
    const valid_state = {valid:true,has_error:false,message:""};


const handleError = (errors) => {
    Object.keys(errors).map((index) =>{
        toast.error(errors[index][0]);
        setError({...error,[index]:{
            has_error:true,
            valid:false,
            message:errors[index][0]
        }})
    })
}
// validates form value
   const validateInfo = (event,regx,message) => {
    let {name,value} = event.target;
        if(!value.match(regx)){
            setError({...error,[name]:{
                has_error:true,
                message:message,
                valid:false
            }})
        }else{
        setError({...error,[name]:valid_state})
        }
   }

   const[spinner,setSpinner] = useState(false)
   const submitVRSForm = async (e) =>  {
    e.preventDefault();
    setSpinner(true)
    
    const  headers = {
        'content-type':'multipart/form-data',
         'Authorization':`Token ${auth_token}`
    }
    
    await axios({
        method: 'POST',
        url:`${import.meta.env.VITE_API_URL}/vrs-single-register`,
        data: {...registrationForm,...addressForm,...imgFile,user:auth_user.id},
        headers:headers
        }).then((resp)=>{
            if(resp.status == 201 && resp.statusText=='Created'){
                toast.success("Form Submitted Successfully ... Pending For Verification");
                navigate("/accounts");
            }
    }).catch((err)=>{
        if(err.code == "ERR_BAD_REQUEST"){
            if(err.response.status == 400){
                handleError(err.response.data)
            }
        }
    }).finally(() =>{
        setSpinner(false)
    })
   
}
    
    return <>
        <div className="container-fluid my-2">
        <div className="row">
                <div className="col-12 bg-primary ">
                    <div className="text text-center text-light">
                        SINGLE VEHICLE REGISTRATION /एक्कल सवारी दर्ता
                    </div>
                </div>
        </div>
            <form onSubmit={submitVRSForm}>
            
            {/* registration details */}
            <div className="shadow shadow-sm my-2">
                <div className="row m-2 p-2">
                <div className="col-12 bg-primary">
                    <div className="text text-center text-light">
                        REGISTRATION DETAILS / दर्ता विवरण
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 mt-3">
                    <label className="form-label">VEHICLE REGISTRATION IN THE NAME OF / सवारीधनीको नाम <span className="text text-danger">*</span></label>
                    <select required value={registrationForm.vrs_nationality} className="form-select"  name="vrs_applicant_of" onInput={handelREGForm}>
                    {Object.keys(applicant_of_list).map((index)=>{
                        return (<option value={index} >{applicant_of_list[index]}</option>)
                    })}    
                    </select>                
                </div>

                <div className="col-md-6 col-sm-12 mt-3">
                    <label className="form-label">VEHICLE REGISTRATION NATURE / सवारी दर्ताको प्रकार <span className="text text-danger">*</span></label>
                    <select required className="form-select" value={registrationForm.vrs_nature} name="vrs_nature" onInput={handelREGForm}>
                    {Object.keys(vrs_nature_list).map((index)=>{
                        return (<option value={index} >{vrs_nature_list[index]}</option>)
                    })}    
                    </select>          
                </div>

                <div className="col-md-12 col-sm-12 mt-3">
                    <label className="form-label">VEHICLE REGISTRATION TYPE / सवारी दर्ताको किसिम <span className="text text-danger">*</span></label>
                    <select required className="form-select" value={registrationForm.vrs_type} name="vrs_type" onInput={handelREGForm}>
                    {Object.keys(vrs_type_list).map((index)=>{
                        return (<option value={index}>{vrs_type_list[index]}</option>)
                    })}    
                    </select>  
                </div>

                <div className="col-12 mt-3">
                    <label className="form-label">OLD OWNER PHONE NUMBER / पुरानो मालिक आईडी</label>
                    <input className={`form-control ${error.vrs_old_owner.has_error?"is-invalid":error.vrs_old_owner.valid&&"is-valid"}`} type="text" name="vrs_old_owner" onInput={handelREGForm} onChange={(e)=>{
                        validateInfo(e,regEX.phoneRegx,error_message.vrs_old_owner)
                    }}value={registrationForm.vrs_old_owner}/>      
                    {error.vrs_old_owner.has_error&&<span className="is-invalid">
                        {error.vrs_old_owner.message}
                    </span>}
                </div>
                </div>
            </div>

            {/* individual details */}
            <div className="shadow shadow-sm my-2">
                <div className="row m-2 p-2">
                    <div className="col-12 bg-primary">
                        <div className="text text-center text-light">
                         INDIVIDUAL DETAILS / व्यक्तिगत विवरण
                        </div>
                    </div>
                    <div className="col-12 my-2">
                        <label className="form-label">CITIZENSHIP / ID NO / नागरिकता / आईडी नं <span className="text text-danger">*</span></label>
                        <input  required autoComplete="off" type="text" onChange= {(e)=>{
                            validateInfo(e,regEX.citRegx,error_message.cid)
                        }} onInput={handelREGForm} value={registrationForm.vrs_cit_id} className={`form-control ${error.vrs_cit_id.has_error?"is-invalid":error.vrs_cit_id.valid && "is-valid"}`} name="vrs_cit_id"/>
                        {error.vrs_cit_id.has_error&&<span id="validationServer01Feedback" className="invalid-feedback">
                        {error.vrs_cit_id.message}
                         </span>}
                    </div>
                    <div className="col-7 my-2">
                        <label htmlFor="formFileMultiple" className="form-label">CITIZENSHIP / ID NO DOCUMENT / नागरिकता / आईडी कुनै कागजात <span className="text text-danger">*</span><br/>
                        <span className="text text-primary d-block"> * include both front and back part in same image</span>
                        </label>
                        <input required accept="image/*" name="citizen_doc_img" className={`form-control ${error.citizen_doc_img.has_error?"is-invalid":error.citizen_doc_img.valid && "is-valid"}`} type="file" onChange={onSelectImageFile} />
                        {error.citizen_doc_img.has_error&&<span className="invalid-feedback">
                        {error.citizen_doc_img.message}
                         </span>}
                    </div>
                    <div className="col-5 my-2">
                            <label className="text text-primary d-block">document image</label>
                            {imgFile.citizen_doc_img&&<img src={preview.citizen_doc_img} className="img-fluid" style={{width:'120px',height:'120px',objectFit:'cover'}}/>}
                            
                    </div>
                </div>
            </div>

            {/* present address details */}
            <div className="shadow shadow-sm my-2">
                    <div className="row m-2 p-2">
                        <div className="col-12 bg-primary">
                            <div className="text text-center text-light">
                            PRESENT ADDRESS / हालको ठेगाना
                            </div>
                        </div>
                        <div className="col-12 border-md border-danger border my-3">
                            <input required autoComplete="off" className="form-check-input" type="checkbox" name="same_as_permanent" value={same_as_permanent} onInput={()=>{
                                {same_as_permanent?setPermanent(false):setPermanent(true)}
                                setAddressForm(permanent_address_init)
                                setError({...error,vrs_applicant_district:error_init,
                                    vrs_applicant_phone:error_init,
                                    vrs_applicant_local:error_init,
                                    vrs_applicant_ward:error_init})
                            }}/>
                            <label className="form-check-label text text-danger ms-2"> Same as permanent address</label>
                        </div>
                        
                        {!same_as_permanent&&<>
                            
                            
                        <div className="col-sm-12 col-md-6 my-1">
                            <label className="form-label">PROVINCE / प्रदेश <span className="text text-danger">*</span></label>
                                <select required className="form-select" value={addressForm.vrs_applicant_province} name="vrs_applicant_province" onInput={handelAddressForm} onChange={(event) => {
                                    setDistrictList1(province_district_list[event.target.value])
                                }}>
                                    <option value="" selected disabled>Select Province</option>
                                {Object.keys(vrs_province_list).map((index)=>{
                                     return (<option value={index}  disabled={index=='select'?true:false}>{vrs_province_list[index]} </option>)
                            })}    
                                </select>  
                        </div>
                          
                            <div className="col-sm-12 col-md-6 my-1">
                            <label className="form-label">DISTRICT / जिल्ला <span className="text text-danger">*</span></label>
                            <select required className="form-select" value={addressForm.vrs_applicant_district} name="vrs_applicant_district" onInput={handelAddressForm}>
                            <option value="" selected disabled>Select district</option>
                            {(district_list_1).map((district)=>{
                                return (<option value={district}>{district}</option>)
                            })}    
                            </select> 
                            
                            </div>  
                          
                          <div className="col-sm-12 col-md-6 my-1">
                            <label className="form-label">LOCAL LEVEL / स्थानय तह <span className="text text-danger">*</span></label>
                            <input  required autoComplete="off" type="text" onChange= {(e)=>{validateInfo(e,regEX.stringRegx,error_message.local_level)}} onInput={handelAddressForm} value={addressForm.vrs_applicant_local} className={`form-control ${error.vrs_applicant_local.has_error?"is-invalid":error.vrs_applicant_local.valid && "is-valid"}`} name="vrs_applicant_local"/>
                        {error.vrs_applicant_local.has_error&&<span id="validationServer04Feedback" className="invalid-feedback">
                        {error.vrs_applicant_local.message}
                         </span>}
                          </div> 
                          
                          <div className="col-sm-12 col-md-6 my-1">
                            <label className="form-label">WARD NO. / वडा. नं.<span className="text text-danger">*</span></label>
                            <input  required autoComplete="off" type="text" onChange= {(e)=>{validateInfo(e,regEX.wardRegx,error_message.ward)}} onInput={handelAddressForm} value={addressForm.vrs_applicant_ward} className={`form-control ${error.vrs_applicant_ward.has_error?"is-invalid":error.vrs_applicant_ward.valid && "is-valid"}`} name="vrs_applicant_ward"/>
                        {error.vrs_applicant_ward.has_error&&<span id="validationServer05Feedback" className="invalid-feedback">
                        {error.vrs_applicant_ward.message}
                         </span>}
                          </div>    
                          
                          <div className="col-12 my-1">
                            <label className="form-label">MOBILE NO. / मोबाईल नम्बर <span className="text text-danger">*</span></label>
                            <input  required autoComplete="off" type="text" onChange= {(e)=>{validateInfo(e,regEX.phoneRegx,error_message.phone)}} onInput={handelAddressForm} value={addressForm.vrs_applicant_phone} className={`form-control ${error.vrs_applicant_phone.has_error?"is-invalid":error.vrs_applicant_phone.valid && "is-valid"}`} name="vrs_applicant_phone"/>
                        {error.vrs_applicant_phone.has_error&&<span id="validationServer03Feedback" className="invalid-feedback">
                        {error.vrs_applicant_phone.message}
                         </span>}
                          </div>       
                        </>
                        }
                    </div>
            </div>

            {/* Vehicle Registration Office */}
            <div className="shadow shadow-sm my-2">
                    <div className="row m-2 p-2">
                    <div className="col-12 bg-primary">
                            <div className="text text-center text-light">
                            VEHICLE REGISTRATION OFFICE / सवारी साधन दर्ता कार्यालय
                            </div>
                        </div>
                    <div className="col-sm-12 col-md-6 my-1">
                            <label className="form-label">PROVINCE / प्रदेश <span className="text text-danger">*</span></label>
                            <select required className="form-select" value={registrationForm.vrs_office_province} name="vrs_office_province" onChange ={fetchTransportOffice}onInput={handelREGForm}>
                                <option value="" selected disabled>Select Province</option>
                                {Object.keys(vrs_province_list).map((index)=>{
                                     return (<option value={index}>{vrs_province_list[index]} </option>)
                            })}    
                            </select>  
                    </div>
                    <div className="col-sm-12 col-md-6 my-1">
                        <label className="form-label">OFFICE NAME / कार्यालयको नाम <span className="text text-danger">*</span></label>
                        {transport_office_list==""?<input required autocomplete='off' className="form-control" type="text" name="vrs_office" value={registrationForm.vrs_office} onInput={handelREGForm}/>:
                        <select required className="form-select"  name="vrs_office" value={registrationForm.vrs_office} onInput={handelREGForm} dangerouslySetInnerHTML={{__html:purify.sanitize(transport_office_list)}}>

                        </select>
                    }
                    </div>
                    </div>
            </div>

            {/* Vehicle Details */}
            <div className="shadow shadow-sm my-2">
                <div className="row m-2 p-2">
                    <div className="col-12 bg-primary">
                        <div className="text text-center text-light">
                                VEHICLE DETAILS / सवारीको विवरण
                        </div>
                    </div>
                    <div className="col-6 my-1">
                            <label className="form-label">FUEL TYPE / इन्धनको किसिम <span className="text text-danger">*</span></label>
                            <select required className="form-select" name="vrs_engine_type" value={registrationForm.vrs_engine_type} onInput={handelREGForm}>
                                <option value="" selected disabled>Select Engine</option>
                                {Object.keys(vrs_engine_list).map((index)=>{
                                    return <>
                                        <option value={index}>{vrs_engine_list[index]}</option>
                                    </>
                                })}
                            </select>
                    </div>
                    <div className="col-6 my-1">
                            <label className="form-label">MFG.YEAR AND MONTH [AD] / उत्पादन वर्ष (ई.स.)<span className="text text-danger">*</span></label>
                            <input required type="month" name="vrs_mfg_year"className="form-control" min={"Jan 1950"} max={"june 2023"} value={registrationForm.vrs_mfg_year} onInput={handelREGForm}/>
                    </div>  
                    <div className="col-6 my-1">
                            <label className="form-label">CATEGORY / श्रेणि <span className="text text-danger">*</span></label>
                            <select required className="form-select" name="vrs_vehicle_cat" onChange={(e) =>  {
                                setCurrentClass(vehicle_class[e.target.value])
                            }}value={registrationForm.vrs_vehicle_cat} onInput={handelREGForm}>
                                <option value=""selected disabled>Select Category</option>
                                {
                                    Object.keys(vehicle_category).map((cat)=>{
                                        return <>
                                        <option value={cat}>{vehicle_category[cat]}</option>
                                        </>
                                    })
                                }

                            </select>
                    </div> 
                    <div className="col-6 my-1">
                            <label className="form-label">CLASS / वर्ग <span className="text text-danger">*</span></label>
                            <select required className="form-select" name="vrs_vehicle_class" value={registrationForm.vrs_vehicle_class} onInput={handelREGForm}>
                                <option value ="" selected disabled>Select class</option>
                                {current_class.map((cl) => {
                                    return <>
                                    <option value={cl}>{cl}</option></>
                                })
                                }
                            </select>
                    </div> 
                    <div className="col-6 my-1">
                            <label className="form-label">CC/WATT RANGE/सीसी सीमा/वाट <span className="text text-danger">*</span></label>
                            <input  required autoComplete="off" type="text" onChange= {(e)=>{
                            validateInfo(e,regEX.numREx,error_message.vrs_engine_power)
                        }} onInput={handelREGForm} value={registrationForm.vrs_engine_power} className={`form-control ${error.vrs_engine_power.has_error?"is-invalid":error.vrs_engine_power.valid && "is-valid"}`} name="vrs_engine_power"/>
                        {error.vrs_engine_power.has_error&&<span className="invalid-feedback">
                        {error.vrs_engine_power.message}
                         </span>}
                    </div> 
                    <div className="col-6 my-1">
                            <label className="form-label">ENGINE / MOTOR NO. / ईन्जिन / मोटर नं. <span className="text text-danger">*</span></label>
                            <input required type="number" className="form-control" name="vrs_engine_no" value={registrationForm.vrs_engine_no} onInput={handelREGForm}/>
       
                    </div>
                    <div className="col-6 my-1">
                            <label className="form-label">CHASSIS / FRAME NO. / च्यासिस फ्रेम नं<span className="text text-danger">*</span></label>
                            <input required type="number" className="form-control" name="vrs_chasis_no" value={registrationForm.vrs_chasis_no} onInput={handelREGForm}/>

                    </div>
                    <div className="col-6 my-1">
                            <label className="form-label">MODEL / मोडेल  <span className="text text-danger">*</span></label>
                            <input required autoComplete="off" className="form-control" name="vrs_vehicle_model" value={registrationForm.vrs_vehicle_model} onInput={handelREGForm}/>
                    </div>   
                    <div className="col-6 my-1">
                            <label className="form-label">MANUFACTURER / निर्माता <span className="text text-danger">*</span></label>
                            <input required autoComplete="off" type="text" className="form-control" name="vrs_vehicle_mfc" value={registrationForm.vrs_vehicle_mfc} onInput={handelREGForm}/>

                    </div>  
                    <div className="col-6 my-1">
                            <label className="form-label">NO. OF CYLINDERS / सिलिण्डर संख्या <span className="text text-danger">*</span></label>
                            <input required autoComplete="off" type="number" className="form-control" name="vrs_cylinder_no" value={registrationForm.vrs_cylinder_no} onInput={handelREGForm}/>
                    </div>  
                    <div className="col-6 my-1">
                            <label className="form-label">SEAT CAPACITY / सिट क्षमता <span className="text text-danger">*</span></label>
                            <input required autoComplete="off" className="form-control" type="number" name="vrs_seat_capacity" value={registrationForm.vrs_seat_capacity} onInput={handelREGForm}/>
                    </div> 
                    <div className="col-6 my-1">
                            <label className="form-label">COLOR / रङ्ग<span className="text text-danger">*</span></label>
                            <input  required autoComplete="off" type="text" onChange= {(e)=>{
                            validateInfo(e,regEX.colorRegx,error_message.color)
                        }} onInput={handelREGForm} value={registrationForm.vrs_vehicle_color} className={`form-control ${error.vrs_vehicle_color.has_error?"is-invalid":error.vrs_vehicle_color.valid && "is-valid"}`} name="vrs_vehicle_color"/>
                        {error.vrs_vehicle_color.has_error&&<span className="invalid-feedback">
                        {error.vrs_vehicle_color.message}
                         </span>}                    </div>  
                    <div className="col-12 my-1">
                            <label className="form-label">GROSS VEHICLE WEIGHT/ कुल सवारि भार (kg) <span className="text text-danger">*</span></label>
                            <input requried autoComplete="off" className="form-control" name="vrs_vehicle_wt" value={registrationForm.vrs_vehicle_wt} onInput={handelREGForm}/>
                    </div>  
                </div>
            </div>

            {/* Vehicle Insurance */}
            <div className="shadow shadow-sm my-2">
                <div className="row m-2 p-2">
                    <div className="col-12 bg-primary">
                        <div className="text text-center text-light">
                        VEHICLE INSURANCE DETAILS / सवारी बीमाको विवरण (optional)
                        </div>
                    </div>

                    <div className="col-6 my-1">
                            <label className="form-label">POLICY NUMBER / बीमाङ्क संख्या </label>
                            <input type="number" className="form-control" name="vrs_ins_policy_num" value={registrationForm.vrs_ins_policy_num} onInput={handelREGForm}/>
                    </div>
                    
                    <div className="col-6 my-1">
                            <label className="form-label">PAN/VAT NUMBER / स्थायी लेखा नं.</label>
                            <input type="number" min={"1950"} max={"2023"} className="form-control" name="vrs_ins_policy_num" value={registrationForm.vrs_ins_pan_num} onInput={handelREGForm}/>
                    </div>  
                    
                    <div className="col-6 my-1">
                            <label className="form-label">INSURANCE COMPANY NAME / बीमा कम्पनिको नाम </label>
                            <select  className="form-select" name="vrs_ins_company" value={registrationForm.vrs_ins_company} onInput={handelREGForm}>
                                <option value= "" selected disabled>Select Company</option>  
                                {insurance_company_list.map((company) =>{
                                    return <><option value={company}>{company}</option></>
                                })}  
                            </select>
                    </div> 
                    
                    <div className="col-6 my-1">
                            <label className="form-label">TYPE / किसिम</label>
                            <select className="form-select" name="vrs_ins_type">
                            <option value="" selected disabled>Select type</option>
                            {Object.keys(insurance_type).map((value) => {
                                return <option value={value}>{insurance_type[value]}</option>
                            })}
                            </select>
                    </div> 
                    
                    <div className="col-12 my-1">
                            <label className="form-label"> INSURANCE COMPANY ADDRESS / बीमा कम्पनिको ठेगाना </label>
                            <input className="form-control" name="vrs_ins_company_addr" value={registrationForm.vrs_ins_company_addr} onInput={handelREGForm}/>
                    </div> 
                    
                    <div className="col-6 my-1">
                            <label className="form-label">INSURANCE VALID FROM [A.D.] (DD-MM-YYYY) / बीमा शुरु मिति(ए.डी.) (मिति - महिना-वर्ष)</label>
                            <input className="form-control" type="date" name="vrs_ins_validity_start" value={registrationForm.vrs_ins_validity_start} onInput={handelREGForm}/>
                    </div>
                    
                    <div className="col-6 my-1">
                            <label className="form-label">INSURANCE VALID UPTO [A.D.] (DD-MM-YYYY) / बीमा अन्तिम मिति(ए.डी.) (मिति - महिना-वर्ष)<span className="text text-danger">*</span></label>
                            <input className="form-control" type="date" name="vrs_ins_validity_end" value={registrationForm.vrs_ins_validity_end} onInput={handelREGForm}/>
                    </div>   
                </div>
            </div>

            {/* Custom Details */}
            <div className="shadow shadow-sm my-2">
                <div className="row m-2 p-2">
                    <div className="col-12 bg-primary">
                        <div className="text text-center text-light">
                        CUSTOMS DETAILS / भन्सार विवरण
                        </div>
                    </div>

                    <div className="col-6 my-1">
                            <label className="form-label">CUSTOMS OFFICE NAME / भन्सार कार्यालयको नाम <span className="text text-danger">*</span></label>
                            <select required className="form-select" name="vrs_custom_office" value={registrationForm.vrs_custom_office} onInput={handelREGForm}>
                               <option value="" selected disabled>Select Office</option>
                               { custom_office_list.map((office)=>{
                                    return <>
                                        <option value={office}>{office}</option>
                                    </>
                                })  } 
                            </select>
                    </div>
                    
                    <div className="col-6 my-1">
                            <label className="form-label">MODE OF PAYMENT / भुक्तानीको विधि<span className="text text-danger">*</span></label>
                            <select required className="form-select" name="vrs_custom_payment" value={registrationForm.vrs_custom_payment} onInput={handelREGForm}>
                                <option value='' selected disabled>Select payment</option>
                                {
                                    Object.keys(custom_office_payment).map((index) =>{
                                        return <>
                                            <option value ={index}>{custom_office_payment[index]}</option>
                                        </>
                                    })                          
                                    }
                            </select>
                    </div>  
                    
                    <div className="col-12 my-1">
                            <label className="form-label">DECLARATION (BPP) NO. / प्रज्ञापन-पत्र नम्बर<span className="text text-danger">*</span></label>
                            <input requried type="number" autoComplete="off" className="form-control" name="vrs_custom_declaration_no" value={registrationForm.vrs_custom_declaration_no} onInput={handelREGForm}/>
                    </div> 
                    
                    <div className="col-12 my-1">
                            <label className="form-label">CUSTOM CLEARANCE DATE [A.D.] (DD-MM-YYYY) / भन्सार जाँचपास मिति(ए.डी.) (मिति-महिना-वर्ष)<span className="text text-danger">*</span></label>
                            <input required autoComplete="off" className="form-control" type="date" name="vrs_custom_clearance_date" value={registrationForm.vrs_custom_clearance_date} onInput={handelREGForm}/>
                    </div> 
                    <div className="col-12 my-1">
                            <label className="form-label">TOTAL AMOUNT / जम्मा रकम<span className="text text-danger">*</span></label>
                            <input type="number" required autoComplete="off" className="form-control" name="vrs_custom_payment_amt" value={registrationForm.vrs_custom_payment_amt} onInput={handelREGForm}/>
                    </div>              
                </div>
            </div>

            {/* Image upload Section */}
            <div className="shadow shadow-sm my-2">
                <div className="row m-2 p-2">
                    <div className="col-12 bg-primary">
                        <div className="text text-center text-light">
                        UPLOAD DOCUMENTS / कागजात अपलोड <br/>
                        Maximum upload file size 4mb / Allowed Types : png, jpg, jpeg
                        </div>
                    </div>
                    {/* Engine photo */}
                    {Object.keys(vrs_image_upload_list).map((index) =>{
                        
                        return <><div className="col-7 my-2">
                        <label htmlFor="formFileMultiple" className="form-label">{vrs_image_upload_list[index]}<span className="text text-danger">*</span><br/>
                        
                        </label>
                        <input required accept=".png, .jpg, .jpeg, .jfif" name={index} className={`form-control ${error[index].has_error?"is-invalid":error[index].valid && "is-valid"}`} type="file" onChange={onSelectImageFile} />
                        {error[index].has_error&&<span className="invalid-feedback">
                        {error[index].message}
                         </span>}
                        </div>
                        <div className="col-5 my-2">
                            <label className="text text-primary d-block"> document image</label>
                            {imgFile[index]&&<img src={preview[index]} className="img-fluid" style={{width:'120px',height:'120px',objectFit:'cover'}}/>}
                            
                        </div></>
                    })}
                   
                </div>
            </div>
            <div className="col-12 my-2">
                {spinner?<ButtonSpinner msg="Register Process Initiating..."/>
                :<input type="submit" className="btn btn-primary w-100"/>
                }
                </div>
            </form>
        </div>
    </>
}
