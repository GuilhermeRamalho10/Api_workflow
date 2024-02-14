from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from workflow.models import Photo
from workflow.serializers import PhotoSerializer
from django.shortcuts import get_object_or_404


class PhotoViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        photos = Photo.objects.filter(user=request.user)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = PhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Photo.objects.filter(user=request.user)
        photo = get_object_or_404(queryset, pk=pk)
        serializer = PhotoSerializer(photo)
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
