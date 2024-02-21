from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from workflow.views import PhotoViewSet, LoginView
from django.conf import settings
from django.conf.urls.static import static
from setup.views import UserViewSet, GroupViewSet


router = routers.DefaultRouter()
router.register(r'photos', PhotoViewSet, basename='photo')
router.register(r'users', UserViewSet, basename='user')
router.register(r'groups', GroupViewSet, basename='group')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
