from django.urls import path
from .views import ValidateRegisterForm, ValidateRegisterFields, ValidateLoginForm, ValidateLoginFields

app_name = 'accounts'
urlpatterns = [
    # path('validate-user/', ValidateUsername.as_view(), name="validate_user"),
    path('validate-register-form/', ValidateRegisterForm.as_view(), name="validate-register-form"),
    path('validate-register-fields/', ValidateRegisterFields.as_view(), name="validate-register-fields"),\
    path('validate-login-form/', ValidateLoginForm.as_view(), name="validate-login-form"),
    path('validate-login-fields/', ValidateLoginFields.as_view(), name="validate-login-fields"),
]
