from django.contrib.auth import authenticate, login
from .forms import RegisterUserForm
from django.http import JsonResponse


def reister_form_ct(request):
    form = RegisterUserForm()
    if request.method == 'POST' and request.is_ajax():
        form = RegisterUserForm(request.POST)

    context = {'register_form': form}
    return context


def login_form_ct(request):
    return {'hello': 'hello'}
