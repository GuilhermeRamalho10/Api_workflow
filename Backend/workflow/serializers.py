from rest_framework import serializers
from workflow.models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'user']
        read_only_fields = ('user',)
