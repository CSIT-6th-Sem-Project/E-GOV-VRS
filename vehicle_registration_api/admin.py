from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(CitizenshipCard)
admin.site.register(NationalIdentityCard)
admin.site.register(SingleVRS)
admin.site.register(SingleVRS_Extended)
admin.site.register(KhaltiTransactionRecord)

