from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from workflow.views import PhotoViewSet


router = routers.DefaultRouter()
router.register(r'photos', PhotoViewSet, basename='photo')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
