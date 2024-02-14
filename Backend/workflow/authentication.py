from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from workflow.models import Token

class TokenURLAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token_key = request.GET.get('token')
        if not token_key:
            return None

        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Token inválido ou expirado')

        # Se o token for encontrado e válido, retorna o usuário associado a esse token
        return (token.user, None)  # Retorna uma tupla de (user, auth), onde auth é None
