import stripe
from rest_framework import status
from rest_framework import decorators
from rest_framework.response import Response
from helpers.permissions import BlockAnonymousUser
from users.models import TokenAuthentication
from payments import models, serializers
from rest_framework.permissions import IsAuthenticated


stripe.api_key = 'sk_test_51MbhChCKptFyMftQ8kCnyTBkqki6A9eOEXLaSjVgtRLn89VByvMXtZTeutK2r9A7zEvQcRNxADDMlRghcYtLMtDi00ZKd8aDPo'

@decorators.api_view(['POST'])
@decorators.permission_classes([IsAuthenticated])
@decorators.authentication_classes([TokenAuthentication])

def payment(request):
    stripe_payment = stripe.PaymentIntent.create(
        amount=request.data['amount'],
        currency=request.data['currency'],
        receipt_email=request.user.email,
    )
    serializer = serializers.PaymentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    models.Payment.objects.create(
        user_id=request.user.pk, amount=stripe_payment['amount'],
        receipt_email=request.user.email
    )
    data = {
        'stripe_payment': stripe_payment,
        'saved_payment': serializer.data
    }
    return Response(status=status.HTTP_200_OK, data=data)
