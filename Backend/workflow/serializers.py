from rest_framework import serializers
from workflow.models import Photo
from django.contrib.sites.shortcuts import get_current_site


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'user', 'image_url']
        read_only_fields = ('user',)

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        else:
            return None
