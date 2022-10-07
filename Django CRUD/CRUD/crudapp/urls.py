from django.urls import path
 
# importing views from views..py
from .views import create_view, detail_view, delete_view, list_view
 
urlpatterns = [
    path('create/', create_view ),
    path('', list_view ),
    path('<int:id>/delete/', delete_view ),
    path('<int:id>/', detail_view ),
]