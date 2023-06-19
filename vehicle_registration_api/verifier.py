from PIL import Image
import pytesseract as pyt
import re
from .models import NationalIdentityCard
from django.core.exceptions import ObjectDoesNotExist

def citizenship_doc_verification(image,user):

    ocr = pyt.image_to_string(Image.open(image.open()),lang='eng')
    message = ""
    citnoREgx = r'w+:\d+'
    fullnameREgx = r'full name\.?:\w+ \w+|full name\.?:\w+ \w+ \w+'
    digit = r'\d+'

    # level 1 filter
    ocr = ocr.lower()
    # level 2 filter
    ocr = ocr.replace('.','')
    # level 3 filter
    ocr = ocr.replace("-","")
    # level 4 filter
    ocr = ocr.replace(": ",":")
    
    doc_valid  = False
    keywords = ["government of nepal","citizenship certificate"]
    
    

    for key in keywords:
        if  key in ocr:
            doc_valid = True
            break
    
    if not doc_valid:
        return (False,"Provided citizenship document is not valid or not clear")
    
    recogn_digit = re.findall(digit,ocr)
    recogn_name = re.findall(fullnameREgx,ocr)
    recogn_name = [ re.sub(r'full name\.?:','',name)for name in recogn_name ]

    id_valid = False
    name_valid = False
    
    try:
        citizen_card = NationalIdentityCard.objects.get(user=user).citizen_card
    except ObjectDoesNotExist:
        return (False ,"Documents are not valid")
    
   

    if len(recogn_name) == 0 and len(recogn_digit) == 0:
        return (False, 'document provided are not valid or image is not clear')
    
    if str(citizen_card.cid) in recogn_digit:
        id_valid = True
    else:
        message =  "documents citizenship id doesnot match in system"
    
    if citizen_card.full_name in recogn_name:
        name_valid = True
    else:
        message +="\n name in your document doesnot match with system"


    return (id_valid and name_valid , message)

