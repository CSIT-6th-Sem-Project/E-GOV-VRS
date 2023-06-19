from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *
router = DefaultRouter()

router.register(r'single-vrs',VRSViewSet)

urlpatterns = [
    path("",include(router.urls)),
    path("register",RegisterAPIView.as_view(),name="register_api"),
    path("get-carousel",CarouselView.as_view(),name="carousel_api"),
    path("get-notice",NoticeView.as_view(),name="notice_api"),
    path("user-list",UserListView.as_view(),name="user_list_api"),
    path("nin-list",NINListview.as_view(),name='nin_list_api'),
    path("get-transport-law",TransPortLawView.as_view(),name="transport_law_api"),
    path("get-registration-amount", RegistrationAmountView.as_view(),name="registration_amount"),
    path("vrs-single-register",SingleVRSRegisterView.as_view(),name="vrs_single_register"),
    path("users-vrs",UsersSingleVRS.as_view(),name="users_vrs"),
    path("verify-khalti-payment",Verify_Khalti_Payment.as_view(),name="vrs_verify_payment"),
    path("generate-transaction-pdf",generate_transaction_pdf,name="generate_transaction_pdf"),
   
]