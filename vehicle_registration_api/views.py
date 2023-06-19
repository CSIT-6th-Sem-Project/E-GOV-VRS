import requests
from rest_framework import generics,permissions,status
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import *
from rest_framework import viewsets
import re
from django.views.generic.base import View
from django.shortcuts import render,get_object_or_404,redirect
from django.views.generic import ListView,DetailView
from django.contrib.auth.mixins import UserPassesTestMixin
from bs4 import BeautifulSoup
import os , requests , json
from django.contrib.auth.decorators import login_required
from xhtml2pdf import pisa 
from django.template.loader import get_template
from  django.http.response import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.
from django.contrib import messages
# amount in paisa according to different class
amount_cat = {'lmv_two_wheeler':65000,
        'lmv_small':90000,
        'lmv_middle':120000,
        'lmv_big':"320000",
        'lmv_three_wheeler':"70000"
        }

url = "https://www.dotm.gov.np"


class RegisterAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class CarouselView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def parse_content(self):
        try:
            response = requests.get(url).content.decode()
            soup = BeautifulSoup(response, "lxml")
            carousel = soup.css.select(".owl-carousel .item")
            carousel_dict = {}
            for index, c in enumerate(carousel, 1):
                temp = {}
                temp['desc'] = c.find('input')['value']
                temp['img'] = url + re.findall("/files/images/.*[jpg|jpeg|png]", c['style'].lower())[0]
                carousel_dict[str(index)] = temp

        except ConnectionError:
            carouser_dict = {}

        return carousel_dict


    def get(self,request):
        carousel = self.parse_content()
        return Response(data=carousel,status=status.HTTP_200_OK)
class NoticeView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    def parse_content(self):
        try:
            notice_dict = {}
            response = requests.get(url).content.decode()
            soup = BeautifulSoup(response,'lxml')
            notices = soup.css.select(".sectionNotice")
            # print(notices)
            for index,notice in enumerate(notices,1):
                for n in notice.find_all("a"):
                    temp= {}
                    temp['desc']  = n.getText().strip("\n>> ")
                    temp['href'] = url+n.get('href')
                notice_dict[index] = temp
        except ConnectionError or ConnectionAbortedError or ConnectionResetError:
            notice_dict = {}
            
        return notice_dict

    def get(self,request):
        notice = self.parse_content()

        return Response(data=notice,status=status.HTTP_200_OK)

class TransPortLawView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    main_url = "https://dotm.gov.np/MainData/"
    indexes = {"ProcedureCodeOfConduct":"(निर्देशिका र कार्यविधि)","ActRegulations":"(ऐन र नियम)","TaxRateCircularDirection":"(करको दर र परिपत्र)","StandardCodeOfConduct":"(मापदण्ड र आचारसहिंता)"}

    def parse_content(self,response):
        soup = BeautifulSoup(response,"lxml")
        
        laws = soup.css.select(".MainNoticePageTable .mainTr")
        
        content = []
        for law in laws:
            law_dict = {}
            law_dict['name'] = law.find("div",class_="comment-text").text
            law_dict['issued'] = law.find("span",class_="text-muted").text
            law_dict['href'] = "https://dotm.gov.np"+law.find("a").get('href')
            content.append(law_dict)
        return content
    

    def get(self,request):
        law_list = {}
        for index_eng , index_np in self.indexes.items():
            response = requests.get(self.main_url+index_eng).content.decode()
            law_list[index_eng+" "+index_np] = self.parse_content(response)
        return Response(data = law_list,status=status.HTTP_200_OK)
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class NINListview(generics.ListAPIView):
    queryset = NationalIdentityCard.objects.all()
    serializer_class = NIDSerializer
    permission_classes = (permissions.AllowAny,)

class SingleVRSRegisterView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = SingleVRSRegistrationSerializer

class EmailView(View):
    def get(self,request,**kwargs):

        return render(request,'vrs_email_template.html')

# payment rate per category
class RegistrationAmountView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        return Response(data=amount_cat,status=status.HTTP_200_OK)
    
class UsersSingleVRS(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = VRSSerializer
    def get_queryset(self):
        query_set = SingleVRS.objects.filter(user=self.request.user).prefetch_related('vrs_xtd')
        return query_set

class Verify_Khalti_Payment(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self,request,*args,**kwargs):
        # neccessary paramemters to send to verify payment to khalti
        verify_url = settings.KHALTI_API_URL
        private_key = os.environ.get("KHALTI_TEST_SECRET_KEY")
        headers = {"Authorization":f"Key {private_key}"}
        token = request.data['token']
        amount = request.data['amount']
        vrsID = request.data['id']
        payload = {'token':token,'amount':amount}
        
       
        resp = requests.request("POST",verify_url,headers=headers,data=payload)
        
        if(resp.status_code == 200):
            # converting the obtained khalti json response to dictionary
            resp = resp.content.decode()
            transaction = json.loads(resp)
            # if Transaction state is completed do this
            if(transaction['state']['name']=="Completed"):
                # set the bill  state to paid
                vrs_xtnd = SingleVRS_Extended.objects.get(vrs__vrsId=vrsID)
                vrs_xtnd.paid = True
                vrs_xtnd.save()
                # set the users vrs to registered
                vrs = SingleVRS.objects.get(vrsId=vrsID,user=request.user)
                vrs.status = SingleVRS.REGISTERED
                vrs.save()
                # save json transaction obtained from khalti after successfull transaction
                khalti_transaction = KhaltiTransactionRecord.objects.create(idx=transaction['idx'],create_at=transaction['created_on'],amount=amount_cat[vrs.vrs_vehicle_cat]/100,
                                                                            user=request.user,vrs=vrs,transaction_details=resp)
                khalti_transaction.save()
                # after saving a mail will be sent to the applicant

                return Response(data={'message':"Transaction Completed Successfully","success":True},status=status.HTTP_200_OK)
            # if transaction is in other states rather than completed
            else:
                return Response(data={"message":f"Transaction is in {transaction['state']['name']} ... Please Wait !!","success":False},status=status.HTTP_200_OK)
        # in case for failed Transactions
        else:
            return Response(data={"message":"Transaction Failed ... Please Try Again !!","success":False},status=status.HTTP_400_BAD_REQUEST)

class VRSViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = VRSSerializer
    queryset = SingleVRS.objects.all()

@login_required
def generate_transaction_pdf(request):
    template_path = 'generate-transaction-pdf.html'
    vrs_xtd = get_object_or_404(SingleVRS_Extended,vrs__vrsId=request.GET["Id"])
    khalti_tx = get_object_or_404(KhaltiTransactionRecord,vrs=vrs_xtd.vrs,user=request.user)
    context = {'vrs':vrs_xtd.vrs,'amount':amount_cat[vrs_xtd.vrs.vrs_vehicle_cat],'khalti_tx':khalti_tx}

    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')

    # to view on browser we can remove attachment
    response['Content-Disposition'] = f'filename="khalti-transaction-{vrs_xtd.vrs.vrsId}-report.pdf"'

    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
        html, dest=response
    )
    # if error then show some funy view
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response

class BaseAdmin(LoginRequiredMixin,UserPassesTestMixin):
     #nly staff and admin can access this view
    def test_func(self):
        return self.request.user.is_superuser or self.request.user.is_staff

class AdminView(ListView,BaseAdmin):
    model = SingleVRS
    context_object_name = 'vrs_single_list'
    template_name = "vrs_single_list.html"
    login_url = "/admin/login"

class ReviewVRS(DetailView,BaseAdmin):
    model =  SingleVRS
    context_object_name = 'vrs'
    template_name="review_vrs.html"

    def post(self,request,*args,**kwargs):
        status = request.POST['status']
        comments = request.POST['comments']
        vrsID = request.POST['vrsID']
        uid = request.POST['uid']
        try:
            vrs = SingleVRS.objects.get(vrsId=vrsID,user__id=uid) 
            vrs.status = status
            

            if(status == SingleVRS.REJECTED):
                vrs_xtd = SingleVRS_Extended.objects.get(vrs=vrs)
                vrs_xtd.comments = comments
                vrs_xtd.save()
            vrs.save()
            messages.success(request,"Registration Reviewed Successfully...")
        
        except ObjectDoesNotExist:
            messages.error(request,"Error While Updating Information...No information about the reviewed documents in database")

            return redirect("/")
        
        return redirect("/")
