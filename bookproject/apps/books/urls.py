from django.urls import path
from . import views

app_name = 'books'
urlpatterns = [
    path('', views.catalog, name='catalog'),
    path('<slug:book>', views.single_book, name='single_book'),
    path('<slug:book_slug>/<slug:slug>', views.book_chapter, name='book_chapter'),
    path('author/<slug:author>', views.single_author, name='single_author'),
    path('category/<slug:category>', views.category, name='category'),
]
