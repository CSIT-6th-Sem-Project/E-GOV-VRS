


export const FAQ = () => {

    return <>
        <div className="container-fluid my-2">
            <div className="row">
                <div className="col-12 bg-body-tertiary">
                    <div className="text text-center m-1 text-primary h3">
                        बारम्बार सोधिने प्रश्नहरू
                    </div>
                </div>
                <div className="col-12 my-1">
                    <div className="border-top border-primary">
                        <div className="col-12">
                            <small className="m-3">
                        नेपालको यातायात व्यवस्थापन तथा यस विभाग र कार्यालयहरुको कार्य तथा कार्यप्रणाली बारेमा सेवाग्राहीहरुले राखेका जिज्ञासाहरुको समाधान तथा अन्य जानकारीहरु यस पेजमा राखीएको छ । तपाइका पनि कुनै किसिमका सुझाव गुनासो वा जिज्ञासा भएमा यस वेभसाइट मार्फत वा सिधा विभाग र कार्यालयहरूमा पठाउन सक्नुहुनेछ । तपाइको जिज्ञासा समाधान गर्न हामी लागी पर्नेछैा‌ ।
                            <div className="mt-3 text-primary">
                            यस पेजमा विषयगत आधारमा प्रश्नहरु समुहीकृत गरी तीनका जवाफहरु क्रमश राखीएका छन् कतिपय विषयहरु अपडेट गर्दै राख्ने क्रममा रहेका छन् । 
                            </div>
                            </small>
                        </div>
                        <div className="col-12">
                            <a className="btn btn-primary mt-2 w-100" data-bs-toggle="collapse" href="#collapseFAQ1" role="button" aria-expanded="false" aria-controls="collapseExample">
                        सवारी चालक अनुमतीपत्र हराएमा के गर्न सकिन्छ ?
                            </a>
                            <div className="collapse my-2" id="collapseFAQ1">
                            <div className="card card-body text text-start">
                           <div className="text text-primary">
                            यदि केही गरी आफ्नो सवारी चालक अनुमती पत्र हराएमा 
                            </div>
                            {/* <ul type="none"> */}
                            <li> सवारी चालक अनुमतीपत्र र नागिरकताको फोटोकपीका साथ सम्बन्धित व्यक्ति आफै यातायात व्यवस्था कार्यालयको कम्प्युटर फाँट वा सवारी चालक     अनुमती पत्र अभिलेख शाखामा सम्पर्क गर्ने ।
                            </li>
                            <li> सम्बन्धित ट्राफिक प्रहरी कार्यालयबाट चालक अनुमतीपत्र हराएको हो भनी दिएको निवेदन ।   
                            </li>
                            {/* </ul> */}
                            </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <a className="btn btn-primary mt-2 w-100" data-bs-toggle="collapse" href="#collapseFAQ2" role="button" aria-expanded="false" aria-controls="collapseExample">
                             सवारी चालक अनुमतिपत्रको अभिलेख सच्याउनका लागि के गर्नुपर्छ ?
                            </a>
                            <div className="collapse my-2" id="collapseFAQ2">
                                <div className="card card-body text text-start">
                                सवारी चालक अनुमतिपत्रको कुनै अभिलेख वा विवरणमा केही छुट भएको वा थप गर्नुपर्ने वा गल्ती भएको भए सवारी चालक अनुमतिपत्र जारी गर्ने सम्बन्धित कार्यालयमा संवन्धित व्यक्ति आफैं त्यस्तो सच्याउनुपर्ने व्यहोराको पुष्टयाइ सहित तोकिएको ढाँचामा निवेदन पेश गर्नुपर्नेछ । सम्बन्धित कार्यालयले प्राप्त निवेदन हेरी अभिलेख थप गर्न वा सच्चाउन सकिनेछ ।              
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <a className="btn btn-primary mt-2 w-100" data-bs-toggle="collapse" href="#collapseFAQ3" role="button" aria-expanded="false" aria-controls="collapseExample">
                            सवारी चालक अनुमतिपत्रको नवीकरण कहिले गर्नुपर्छ र शुल्क जरिवाना के कति लाग्छ ?
                            </a>
                            <div className="collapse my-2" id="collapseFAQ3">
                                <div className="card card-body text text-start">
                                    <div className="mb-3">
                                    हाल अवधि समाप्त भएको मितिले ९० दिनभित्र पनि अनुमतिपत्र नवीकरण नगराएमा सो मिति समाप्त भएको एक वर्षसम्म १००%, दुइ वर्षसम्म २००%, तीन वर्षसम्म ३००%, चार वर्षसम्म ४००% र पाँच वर्षसम्म ५००% थप जरिवाना र दस्तुरसमेत लिई यस्तो चालक अनुमतिपत्र नवीकरण गरिनेछ । यस्तो नवीकरण पाँच वर्ष लागि कायम रहनेछ ।
                                    </div>
                                    <div className="mb-3 text text-danger">
                                    पाँच वर्षम्म पनि नवीकरण नगराएको चालक अनुमतिपत्र स्वतः रद्द हुनेछ र यस्तो अनुमतिपत्रको नवीकरण गरिने छैन ।
                                    </div>                       
                                    सवारी चालक अनुमतिपत्रको नवीकरण दस्तुरवापत ठूला सवारीका लागी रु ३०००/-¸ मझौला सवारीका लागी रु २५००/-¸ मोटरसाइकल, स्कुटर बाहेकका साना सवारीका लागी रु २०००/- र मोटरसाइकल, स्कुटरका लागी रु १५००/- लाग्नेछ ।तर एउटै चालक अनुमतिपत्रमा एकभन्दा बढी किसिमका सवारी चलाउने इजाजत पाएका हकमा सबैभन्दा बढी दस्तुर लाग्ने सवारीको दस्तुर मात्र लाग्नेछ ।   
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <a className="btn btn-primary mt-2 w-100" data-bs-toggle="collapse" href="#collapseFAQ4" role="button" aria-expanded="false" aria-controls="collapseExample">
                            चालक अनुमतिपत्रको प्रतिलिपि लिन के गर्नु पर्छ ? के कस्तो अवस्थामा कसरी लिन सकिन्छ र शुल्क कति लाग्छ ?
                            </a>
                            <div className="collapse my-2" id="collapseFAQ4">
                                <div className="card card-body text text-start">                                            

                                    चालक अनुमतिपत्र हराएमा, च्यातिएमा, झुत्रो भई नबुझिने भएमा वा कुनै कारणबाट नासिएमा सात दिनभित्र चालकले सम्बन्धित यातायात व्यवस्था कार्यालयमा अधिकारप्राप्त अधिकारीसमक्ष देहाय बमोजिमको दस्तुरसहित तोकिएको ढाँचामा दरखास्त दिनु पर्नेछ ।<br/>अनुमतिपत्र हराएकाको हकमा सम्बन्धित ट्राफिक प्रहरी कार्यालयको सिफारिसपत्रसमेत संलग्न गर्नुपर्नेछ ।<br/>
                                    सवारी चालक अनुमतिपत्र प्रतिलिपि दस्तुर वापत रु ५००/- (ठूला सवारी¸ मझौला सवारी¸ मोटरसाइकल, स्कुटर बाहेकका साना सवारी र मोटरसाइकल, स्कुटर लगायत सवैका लागी) लाग्नेछ ।                                            
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <a className="btn btn-primary mt-2 w-100" data-bs-toggle="collapse" href="#collapseFAQ5" role="button" aria-expanded="false" aria-controls="collapseExample">
                            चालक अनुमतिपत्रमा अरू सवारी थप समावेश गर्न के गर्नु पर्छ ? के कति शुल्क लाग्छ ?
                            </a>
                            <div className="collapse my-2" id="collapseFAQ5">
                                <div className="card card-body text text-start">
                                    <div className="mb-2">
                                    प्राप्त गरेको चालक अनुमतिपत्रमा उल्लिखित सवारीका अतिरिक्त अन्य कुनै सवारी समावेश गराउन चाहेमा चालकले आफुले समावेश गराउन चाहेको सवारीको किसिम खुलाई Online Form भरी सो फर्म सहीत तोकिएको मितिमा सम्बन्धित यातायात व्यवस्था कार्यालयमा दरखास्त दिनुपर्नेछ ।
                                    </div>
                                    <div className="mb-2">
                                        प्राप्त दरखास्त साथ संलग्न कागजातहरु रुजू गरी स्वीकृत भएमा सामान्यतया बढीमा १ हप्ताभित्र त्यस्ता निवेदकहरुको प्रयोगात्मक परीक्षा लिइन्छ । पहिले कुनै सवारी चालक अनुमतिपत्र प्राप्त गरिसकेका व्यक्तिहरुले थप सवारीका लागि अनुमतित्र प्राप्त गर्न पुन लिखित परीक्षा दिनुपर्दैन¸ यस्ता निवेदकहरुको अनुमतिपत्र लिन चाहेको सवारीको परीक्षा समितिले तोके बमोजिमको स्थान, समय र मितिमा अन्तरवार्ता सहितको प्रयोगात्मक परीक्षा (ट्रायल) लिइन्छ । प्रयोगात्मक परिक्षास्थलमा परिक्षार्थीले सवारी साधन चलाउन सक्ने नसक्ने वारेमा प्रयोगात्मक विधिवाट परिक्षा लिईन्छ । यस गतिविधिलाई सम्बन्धित यातायात व्यवस्था कार्यालय तथा यातायात व्यवस्था विभागबाट समेत सिसिटिभी मार्फ अवलोकन गरि पारदर्शी परिक्षा प्रणाली अवलम्बन गरिन्छ ।
                                    </div>
                                    <div className="text-info">
                                    चालक अनुमतिपत्रमा अरू सवारी समावेश गर्नका लागि रु ५००/- रहेको छ ।   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <a className="btn btn-primary mt-2 w-100" data-bs-toggle="collapse" href="#collapseFAQ6" role="button" aria-expanded="false" aria-controls="collapseExample">
                            सवारी चालक अनुमतिपत्र प्राप्त गर्नका लागि दरखास्त दिने व्यक्तिको योग्यता के हुनु पर्दछ ?
                            </a>
                            <div className="collapse my-2" id="collapseFAQ6">
                                <div className="card card-body text text-start">
                                <div className="mb-3 text-info">
                                    सवारी तथा यातायात व्यवस्था ऐन, २०४९ अनुसार सवारी चालक अनुमतिपत्र प्राप्त गर्नका लागि दरखास्त दिने व्यक्तिको देहाय बमोजिम अयोग्यता नभएको हुनुपर्नेछ ।
                                </div>
                                <ul type="none" className="list-group">
                                <li className="list-group-item">१) ठूलो सवारीको निम्ति २१ वर्ष नपुगेको व्यक्ति ।
                                </li>
                                <li className="list-group-item">२) मझौला तथा साना सवारीको निम्ति १८ वर्ष नपुगेको ।
                                </li> 
                                <li className="list-group-item">३) मोटरर्साईकल तथा त्यस्तै अन्य सानो २ पांग्रे सवारीको हकमा १६ वर्षउमेर नपुगेको ।
                                </li> 
                                <li className="list-group-item">४) छारे रोग भएको वा बौलाएको वा एकाएक रिङ्गटा लाग्ने वा मुर्छा हुने किसिमको रोग भएको व्यक्ति ।
                                </li>   
                                <li className="list-group-item">५) आँखाको देख्ने शक्ति कमजोर भई चश्मा प्रयोग गर्दा पनि सामान्य तवरले देख्ने शक्ति ठीक नभएको व्यक्ति ।
                                </li>
                                <li className="list-group-item">६) साधारण ध्वनी संकेत, आवाज सुन्न नसक्ने गरी बहिरो भएको व्यक्ति ।
                                </li>
                                <li className="list-group-item">७) रातो, हरियो, पहेंलो इत्यादि रङ्गहरु तुरुन्त छुट्याउन नसक्ने (Colour Blind), दृष्टिदोष भएको व्यक्ति ।
                                </li>
                                <li className="list-group-item">८) रतन्धो भएको व्यक्ति ।
                                </li>
                                <li className="list-group-item">९) हात खुट्टा शक्तिहीन भै काम दिन नसक्ने भएको व्यक्ति। तर,अपाङ्गको निमित्त खास किसिमले बनेको सवारीको निमित्त यो खण्डको बन्देज लागू हुने छैन ।
                                </li>
                                <li className="list-group-item">१०)ठूलो र मझौला र्सार्वजनिक सवारीको लागि ६० वर्षउमेर पुरा भएको कुनै पनि व्यक्ति ।
                                </li>
                                <li className="list-group-item">११)सानो सवारी चलाएको २ वर्षपुरा नभएसम्म मझौला र ठूलो सवारी चलाउन चालक अनुमतिपत्र दिईने छैन ।
                                </li>   
                                <li className="list-group-item">१२)नेपाली भाषामा साधारण लेखपढ गर्न नजान्ने ।         
                                </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
