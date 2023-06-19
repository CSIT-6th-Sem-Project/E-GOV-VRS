from rest_framework import serializers
from django.contrib.auth.models import User
from django.core import validators
from .models import *
import pathlib
from .verifier import citizenship_doc_verification
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email')


class NIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = NationalIdentityCard
        fields = ('nin','contact')

class VRSExtendedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleVRS_Extended
        fields = "__all__"

class VRSSerializer(serializers.ModelSerializer):
    create_at = serializers.DateTimeField(format="%b %d, %Y")
    user = UserSerializer()
    vrs_xtd = VRSExtendedSerializer(many=True)
    class Meta:
        model = SingleVRS
        fields = "__all__"

class VRSViewSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleVRS
        fields = '__all__'

class SingleVRSRegistrationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  SingleVRS
        fields = "__all__"

    def validate_vrs_cit_id(self,value):
        if(not NationalIdentityCard.objects.filter(user__id=self.context['request'].user.id,citizen_card__cid=value).exists()):
            raise serializers.ValidationError("Given Citizen ID doesnot match with your Card")
        return value
    
    def validate_vrs_engine_no(self,value):
        if(SingleVRS.objects.filter(vrs_engine_no=value).exists()):
            raise serializers.ValidationError("This model engine number is already in register process")
        
        return value
    
    def validate_vrs_chasis_no(self,value):
        if(SingleVRS.objects.filter(vrs_chasis_no=value).exists()):
            raise serializers.ValidationError("This model chasis number is already in register process")
        return value
    
    def validate_vrs_custom_declaration_no(self,value):
        if(SingleVRS.objects.filter(vrs_custom_declaration_no=value).exists()):
            raise serializers.ValidationError("This number is already in register process")
        return value
    
    def validate_citizen_doc_img(self,image):
        valid , message = citizenship_doc_verification(image,self.context['request'].user)
        if not valid:
            raise serializers.ValidationError(message)
        
        return image

class RegisterSerializer(serializers.ModelSerializer):
    password_regx = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}'
    user_regx = r'^[0-9]{10}$'
    
    password = serializers.CharField(write_only=True, required=True, validators=[validators.RegexValidator(regex=password_regx,message="Not a valid Password")])
    password2 = serializers.CharField(write_only=True, required=True)
    nin = serializers.IntegerField(write_only=True,required=True)
    username = serializers.CharField(write_only=True,required=True,validators=[validators.RegexValidator(regex=user_regx,message="Enter a valid Phone Number")])

    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password','password2','nin')
        

    def validate(self, attrs,*args,**kwargs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Password fields doesnot match.")
        
        if not NationalIdentityCard.objects.filter(contact=attrs['username'],nin = attrs['nin']).exists():
            raise serializers.ValidationError("Mobile Number doesnot match with your National Identity's")
        
        return super().validate(attrs)
    
    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Already Registered Number.")
        return value
    
    def validate_nin(self,value):
        if not NationalIdentityCard.objects.filter(nin = value).exists():
            raise serializers.ValidationError("NIN is not valid.")
        return value
    
    def create(self, validated_data):
        # /Creates a new user
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        # saves new user to their NID linked card
        nic = NationalIdentityCard.objects.get(nin=validated_data['nin'])
        nic.user = user
        nic.save()

        return user