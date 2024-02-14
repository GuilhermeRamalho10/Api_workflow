from django.contrib import admin
from workflow.models import Photo, Token

class Photos(admin.ModelAdmin):
    list_display = ('title', 'image')
    list_display_links = ('title', 'image')
    search_fields = ('title',)
    list_per_page = 20

admin.site.register(Photo, Photos)

class Tokens(admin.ModelAdmin):
    list_display = ('key', 'user', 'created') 
    search_fields = ('key', 'user__username')

admin.site.register(Token, Tokens)