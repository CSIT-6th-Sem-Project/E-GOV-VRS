from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CarouselView,NoticeView
router = DefaultRouter()
urlpatterns = [
    path("",include(router.urls)),
    path("get-carousel",CarouselView.as_view(),name="carousel_api"),
    path("get-notice",NoticeView.as_view(),name="notice_api")
]