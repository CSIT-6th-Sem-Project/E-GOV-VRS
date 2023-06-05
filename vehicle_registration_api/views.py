from django.shortcuts import render
from rest_framework import generics,permissions,status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import *
import requests,re

from bs4 import BeautifulSoup
# Create your views here.


url = "https://www.dotm.gov.np"

class CarouselView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def parse_content(self):

        response = requests.get(url).content.decode()
        soup = BeautifulSoup(response, "lxml")
        carousel = soup.css.select(".owl-carousel .item")
        carousel_dict = {}
        for index, c in enumerate(carousel, 1):
            temp = {}
            temp['desc'] = c.find('input')['value']
            temp['img'] = url + re.findall("/files/images/.*[jpg|jpeg|png]", c['style'].lower())[0]
            carousel_dict[str(index)] = temp


        return carousel_dict


    def get(self,request):
        carousel = self.parse_content()
        return Response(data=carousel,status=status.HTTP_200_OK)


class NoticeView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    def parse_content(self):
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

        return notice_dict

    def get(self,request):
        notice = self.parse_content()

        return Response(data=notice,status=status.HTTP_200_OK)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)