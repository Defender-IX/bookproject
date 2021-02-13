from django.shortcuts import render, redirect
from django.views.generic import View
from django.http import JsonResponse, HttpResponse

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .forms import RegisterUserForm
import json


class ValidateRegisterForm(View):
    def post(self, request):
        form = RegisterUserForm()
        if request.method == 'POST' and request.is_ajax():
            form = RegisterUserForm(request.POST)

            if form.is_valid():
                form.save()

                username = request.POST['username']
                password = request.POST['password1']
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)

                return JsonResponse( {'success': True} )
            else:
                return JsonResponse( {'success': False} )

        return HttpResponse('/')


class ValidateRegisterFields(View):
    def post(self, request):
        if request.is_ajax():

            username = request.POST['username']
            email = request.POST['email']
            password1 = request.POST['password1']
            password2 = request.POST['password2']
            data = {}

            if username:
                if not str(username).isalnum():
                    data['username_error'] = 'Должны быть только буквы'
                if User.objects.filter(username=username).exists():
                    data['username_error'] = 'Такой ник уже есть'

            if email:
                if User.objects.filter(email=email).exists():
                    data['email_error'] = 'Такой email уже существует'

            if password2:
                if password2 != password1:
                    data['password2_error'] = 'Пароли не совпадают'

            return JsonResponse(data)
        return HttpResponse('/')


class ValidateLoginForm(View):
    def post(self, request):
        if request.method == 'POST' and request.is_ajax():

            if form.is_valid():
                form.save()

                username = request.POST['login_username']
                password = request.POST['login_password']
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)

                return JsonResponse( {'success': True} )
            else:
                return JsonResponse( {'success': False} )

        return HttpResponse('/')


class ValidateLoginFields(View):
    def post(self, request):
        if request.is_ajax():

            username = request.POST['username']
            email = request.POST['email']
            password1 = request.POST['password1']
            password2 = request.POST['password2']
            data = {}

            if username:
                if not str(username).isalnum():
                    data['username_error'] = 'Должны быть только буквы'
                if User.objects.filter(username=username).exists():
                    data['username_error'] = 'Такой ник уже есть'

            if email:
                if User.objects.filter(email=email).exists():
                    data['email_error'] = 'Такой email уже существует'

            if password2:
                if password2 != password1:
                    data['password2_error'] = 'Пароли не совпадают'

            return JsonResponse(data)
        return HttpResponse('/')


# def register(request):
#     form = RegisterUserForm()
#     if request.method == 'POST':
#         form = RegisterUserForm(request.POST)
#         if form.is_valid():
#             form.save()
#             # auth_login(request)
#             # return redirect('/')
#         else:
#             print('errrrror')
#
#     context = {'form': form}
#     return render(request, 'accounts/register.html', context)


# def auth_login(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#
#         user = authenticate(request, username=username, password=password)
#
#         if user is not None:
#             login(request, user)
#             # return redirect('/')
#
#     return render(request, 'accounts/login.html')
