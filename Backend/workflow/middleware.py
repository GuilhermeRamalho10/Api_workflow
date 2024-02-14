from workflow.models import Token
from django.http import JsonResponse


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token_key = request.GET.get('token')
        if token_key:
            try:
                token = Token.objects.get(key=token_key)
                request.user = token.user
            except Token.DoesNotExist:
                return JsonResponse({'detail': 'Invalid token'}, status=401)
        response = self.get_response(request)
        return response