from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.db.models.signals import post_save
from django.dispatch import receiver
from VRS_API import settings

# Create your models here.
import uuid
amount_cat = {'lmv_two_wheeler':65000,
        'lmv_small':90000,
        'lmv_middle':120000,
        'lmv_big':"320000",
        'lmv_three_wheeler':"70000"
        }

DISTRICT = (
    ('kathmandu','Kathmandu'),
    ('lalitpur','Lalitpur'),
    ('bhaktapur',"Bhaktapur")
)

MUNICIPALITY = (
    ('kamp',"Kathmandu Metropolitian City"),
    ('lamp',"Lalitpur Metropolitian City"),
    ('bhmp',"Bhaktapur Metropolitian City")
)

GENDER =  (
    ('male',"Male"),
    ('female',"Female"),
    ('others',"Others")
    )

CITIZENSHIP_TYPE = (

    ('descent',"Descent"),
    ('birth',"Birth"),
    ('honorary',"Honorary"),
    ('naturalized',"Naturalized")
)

DISTRICT_OFFICE = (
    ('DAOKTM',"District Administration Office Kathmandu"),
    ('DAOBKP',"District Administration Office Bhaktapur"),
    ('DAOLT',"District Administration Office Lalitpur")
)

class BaseModel(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    

        
    class Meta:
        abstract = True

class CardBase(BaseModel):
    first_name = models.CharField(max_length=200)
    middle_name = models.CharField(max_length=200,blank=True)
    last_name = models.CharField(max_length=200)
    sex = models.CharField(max_length=100,choices = GENDER)
    dob=models.DateField()
    birth_district = models.CharField(max_length=100,choices=DISTRICT)
    birth_municipality = models.CharField(max_length=100,choices=MUNICIPALITY)
    birth_place_ward = models.IntegerField()
    permanent_address_district = models.CharField(max_length=100,choices=DISTRICT)
    permanent_address_metropolitian = models.CharField(max_length=100,choices=DISTRICT)
    permanent_address_ward = models.IntegerField()
    issued_date = models.DateField()
    issued_from = models.CharField(max_length=300,choices=DISTRICT)
    fathers_name = models.CharField(max_length=500)
    mothers_name = models.CharField(max_length=500)
    spouse_name = models.CharField(max_length=500,blank=True,default=None)
    mobile_no = models.BigIntegerField()

    citizen_img = models.ImageField(upload_to="citizen",default='')
    
    class Meta:
        abstract = True

class CitizenshipCard(CardBase):
    cid = models.CharField(max_length=100,primary_key=True)
    citizenship_type = models.CharField(max_length=100,choices=CITIZENSHIP_TYPE)
    
    class Meta:
        ordering = ['cid']

    def __str__(self):
         return f"{self.cid}"
    
    @property
    def full_name(self):
        if self.middle_name:
            return f"{self.first_name} {self.middle_name} {self.last_name}".lower()
        else:
            return f"{self.first_name} {self.last_name}".lower()
        

    
class NationalIdentityCard(BaseModel):
    nin = models.BigIntegerField(primary_key=True)
    contact = models.IntegerField(unique=True)
    user =  models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True)
    citizen_card = models.ForeignKey(CitizenshipCard,on_delete=models.DO_NOTHING)

    class Meta:
        ordering = ["nin"]
    

    def __str__(self):
        return f"{self.nin}"
    
class SingleVRS(BaseModel):
    
    SUBMITTED = 'submitted'
    PENDING = 'pending'
    REJECTED = 'rejected'
    VERIFIED = 'verified'
    REGISTERED = 'registered'

    STATUS =  (
        (SUBMITTED,'Submitted'),
        (PENDING,'Verify Pending'),
        (REJECTED,'Rejected'),
        (VERIFIED,'Verified'),
        (REGISTERED,'Registered')
    )

    vrsId = models.UUIDField(unique=True,blank=True)
    # for vehicle registration initiation
    vrs_applicant_of = models.CharField(max_length=200)
    vrs_nature= models.CharField(max_length=200)
    vrs_type = models.CharField(max_length=200)
    vrs_old_owner = models.BigIntegerField(blank=True,null=True) 
    # for individual information
    vrs_cit_id = models.CharField(max_length=100)
    # vehicle registration office details:
    vrs_office_province= models.CharField(max_length=200)
    vrs_office =  models.CharField(max_length=200)
    # Insurance Policy Information
    vrs_ins_policy_num = models.IntegerField(blank=True,null=True)
    vrs_ins_pan_num = models.IntegerField(blank=True,null=True)
    vrs_ins_company = models.IntegerField(blank=True,null=True)
    vrs_ins_company_addr = models.CharField(blank=True,null=True,max_length=500)
    vrs_ins_validity_start = models.DateField(blank = True,null=True)
    vrs_ins_validity_end = models.DateField(blank=True,null=True)
    # vehicle information:
    vrs_engine_type = models.CharField(max_length=100)
    vrs_mfg_year = models.CharField(max_length=100)
    vrs_vehicle_cat = models.CharField(max_length=100)
    vrs_vehicle_class = models.CharField(max_length=100)
    vrs_engine_no = models.IntegerField()
    vrs_engine_power = models.IntegerField()
    vrs_chasis_no = models.IntegerField()
    vrs_vehicle_model = models.CharField(max_length=200)
    vrs_vehicle_mfc= models.CharField(max_length=200)
    vrs_cylinder_no = models.IntegerField()
    vrs_seat_capacity = models.IntegerField()
    vrs_vehicle_color = models.CharField(max_length=200)
    vrs_vehicle_wt = models.FloatField()

    # Custom Information:
    vrs_custom_clearance_date = models.DateField()
    vrs_custom_declaration_no =  models.BigIntegerField()
    vrs_custom_office = models.CharField(max_length=200)
    vrs_custom_payment = models.CharField(max_length=100)
    vrs_custom_payment_amt = models.FloatField()

    # current address information
    vrs_applicant_province = models.CharField(null=True,blank = True, max_length=100)
    vrs_applicant_district = models.CharField(null=True,blank = True , max_length=100)
    vrs_applicant_local = models.CharField(null=True,blank =True, max_length=300)
    vrs_applicant_ward = models.IntegerField(null=True,blank=True)
    vrs_applicant_phone = models.BigIntegerField(null=True,blank=True)
    #image files:
    citizen_doc_img = models.ImageField(upload_to="vrs-single/citizenship-card/")
    engine_img = models.ImageField(upload_to="vrs-single/engine/")
    chasis_img = models.ImageField(upload_to="vrs-single/chasis/")
    custom_related_img = models.ImageField(upload_to="vrs-single/custom/")
    vehicle_img=models.ImageField(upload_to="vrs-single/vehicle/")
    bill_img=models.ImageField(upload_to="vrs-single/bill/")    

    status = models.CharField(choices=STATUS,max_length=100,default=SUBMITTED)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user_vrs')
    
    def save(self, *args, **kwargs): 
        if not self.vrsId:
            self.vrsId = uuid.uuid4()
        return super(SingleVRS,self).save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.vrsId}--{self.user.username}"
    
    
class SingleVRS_Extended(BaseModel):
    vrs = models.ForeignKey(SingleVRS,on_delete=models.CASCADE,related_name="vrs_xtd")
    paid = models.BooleanField(default=False,blank=True,null=True)
    # if the registration was rejected the send some comment
    comments = models.TextField(blank=True,null=True)

    def __str__(self):
        return f"{self.vrs.vrsId}"

class KhaltiTransactionRecord(BaseModel):
    idx = models.CharField(max_length=500,unique=True)
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name="khalti_transaction_vrs_user")
    amount = models.FloatField()
    transaction_details = models.TextField()
    vrs = models.ForeignKey(SingleVRS,on_delete=models.DO_NOTHING,related_name="khalti_transaction_vrs")

    def __str__(self):
        return f"{self.idx}:{self.user.username}"



# sending mail after to the applicant after certain condition
@receiver(post_save, sender=SingleVRS)
def send_applicant_mail(sender, created , instance , **kwargs):
    from_email = settings.EMAIL_HOST_USER
    to_email = [instance.user.email]
    messages = {
        SingleVRS.SUBMITTED : f'''
                   This is to inform you that the single vehicle registration form that was submitted by you on {instance.create_at.strftime("%B %d,%Y")} has
                   been successfully "Acknowelged" by dotm system and the verification process will end within 2-3 days. Please co-operate with our procedure.
                    ''',
        SingleVRS.REJECTED:f'''
         This is to inform you that the single vehicle registration form that was submitted by you on {instance.create_at.strftime("%B %d,%Y")} has
         been "Rejected" by dotm system. The reasons are detailed below.
        ''',
        SingleVRS.VERIFIED:f''' 
        This is to inform you that the single vehicle registration form that was submitted by you on {instance.create_at.strftime("%B %d,%Y")} has
        been successfully "Verified" by dotm system and you can now pay Rs.{amount_cat[instance.vrs_vehicle_cat]/100} for the final registration via e-wallet in your "Accounts" 
        Section in our portal.
        '''
    }
    if created: # sent when applicant submits the form
        subject = "Single Vehicle Registration Form Submitted"
        vsr_x = SingleVRS_Extended.objects.get_or_create(vrs = instance)
        message = messages[SingleVRS.SUBMITTED]
         # sending mail
    else: # message if the form is rejected or verified
        if instance.status == SingleVRS.REJECTED:
            subject = "Sing Vehicle Registration Form Rejected"
            vrs_x = SingleVRS_Extended.objects.get(vrs = instance)
            subject = "Single Vehicle Registration Form Rejected"
            message = messages[SingleVRS.REJECTED]
            message += f"\n Reason:\t{vrs_x.comments}"
        if instance.status == SingleVRS.VERIFIED:
            subject = "Sing Vehicle Registration Form Verified"
            message = messages[SingleVRS.VERIFIED]
         # sending mail
    
    try:
        html_message = render_to_string('vrs_email_template.html', {'instance': instance,'message':message})
        plain_message = strip_tags(html_message)
        send_mail(subject,plain_message,from_email=from_email,recipient_list=to_email,html_message=html_message)
    except:
        pass
   
    return instance

# sending a mail after successfull payment 
@receiver(post_save,sender=KhaltiTransactionRecord)
def send_registered_mail(sender,created,instance,**kwargs):
    subject ="Payment and Registration Successfull"
    from_email = settings.EMAIL_HOST_USER
    to_email = [instance.user.email]
    if created:
        message = f'''
            This is to inform you that the single vehicle registration that was submitted on {instance.vrs.create_at.strftime("%B %d, %Y")} has been
            successfully "Registered" and all "Payments" ( Rs.{instance.amount/100} ) has been done. We hope that the registration process was of ease and any valuable feedbacks will be very useful to
            us and you in coming days.
        '''
        html_message = render_to_string('vrs_email_template.html', {'instance': instance,'message':message})
        plain_message = strip_tags(html_message)
        send_mail(subject,plain_message,from_email=from_email,recipient_list=to_email,html_message=html_message)
    return instance


       
   
        
    

