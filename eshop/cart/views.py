from products.models import Produs
from rest_framework import generics
from cart import models, serializers
from rest_framework.decorators import api_view 
from rest_framework import response, status

# Create your views here.
class CartList(generics.ListCreateAPIView):
    
    queryset = models.Cart.objects.all()
    serializer_class = serializers.CartSerializer
    
    
class CartListDetaliedView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = models.Cart.objects.all()
    serializer_class = serializers.CartSerializer
    
    
class PaymentCartList(generics.ListCreateAPIView):
    
    queryset = models.PaymentCart.objects.all()
    serializer_class = serializers.PaymentCartSerializer
    
    
@api_view(['GET', 'POST'])
def checkout(request):
    carts = request.data.get("carts")
    payment = request.data.get("paymentcart")
    products_id = []
    checkout_cart = []
    missing_ids = []       
    for cart in carts:
        product_id.append(cart.get('id'))
    for product_id in products_id:
        products = Produs.objects.filter(id=product_id, checkout=False)
        product_ids = product.values('id')
    if len(carts) != len(products):
        for i in product_ids:
            for x in carts:
                if i['id'] == x['id']:
                    checkout_cart.append(x)
                elif i['id'] != x['id']:
                    missing_ids.append(i)
        msg = {'missing_ids': missing_ids}
        return response.Response(msg, status=status.HTTP_404_NOT_FOUND) 
        pass
    cart = models.Cart.objects.create(user_id=request.user.pk, produs=carts)
    # acum trebu sa activeze signal pentru payment
    # sau cree aici
    payment = models.PaymentCart(cart_id=cart.id, user_id=request.user.pk)
    for product in products:
        product.checkout = True
        product.save()


# @api_view(['POST'])
# def checkout(request):
#     carts = request.data.get("carts")
#     payment = request.data.get("payment")
#     products_id = []
#     checkout_carts = []
#     missing_ids = []
    
#     for cart in carts:
#         products_id.append(cart.get('id'))
    
#     products = Produs.objects.filter(id__in=products_id, checkout=False)
#     product_ids = products.values_list('id', flat=True)

#     if len(products_id) != len(product_ids):
#         for product_id in products_id:
#             if product_id not in product_ids:
#                 missing_ids.append(product_id)
#         msg = {'missing_ids': missing_ids}
#         return response.Response(msg, status=status.HTTP_404_NOT_FOUND) 

#     cart = models.Cart.objects.create(user=request.user)
#     for cart_item in carts:
#         product = products.get(id=cart_item['id'])
#         models.CartItem.objects.create(
#             cart=cart,
#             product=product,
#             quantity=cart_item['quantity'],
#             price=product.price,
#         )
#         checkout_carts.append(cart_item)

#     payment = models.Payment.objects.create(
#         user=request.user,
#         cart=cart,
#         amount=payment.get('amount'),
#         payment_method=payment.get('payment_method')
#     )

#     for product in products:
#         product.checkout = True
#         product.save()

#     data = {
#         'checkout_cart': checkout_carts,
#         'payment': {
#             'id': payment.id,
#             'amount': payment.amount,
#             'payment_method': payment.payment_method
#         }
#     }
#     return response.Response(data, status=status.HTTP_201_CREATED)
        