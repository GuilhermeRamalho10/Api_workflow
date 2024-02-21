from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from workflow.models import Photo, Token
from workflow.serializers import PhotoSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .authentication import TokenURLAuthentication
from rest_framework.authentication import SessionAuthentication


class PhotoViewSet(viewsets.ViewSet):
    authentication_classes = [TokenURLAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        photos = Photo.objects.filter(user=request.user)
        serializer = PhotoSerializer(photos, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        serializer = PhotoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Photo.objects.filter(user=request.user)
        photo = get_object_or_404(queryset, pk=pk)
        serializer = PhotoSerializer(photo, context={'request': request})
        return Response(serializer.data)


    def update(self, request, pk=None):
        photo = get_object_or_404(Photo, pk=pk, user=request.user)
        serializer = PhotoSerializer(photo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        photo = get_object_or_404(Photo, pk=pk, user=request.user)
        photo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class LoginView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
