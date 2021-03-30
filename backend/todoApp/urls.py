from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('todo.urls'))
    # path('sentry/', lambda request: 1 / 0), # I'll ask
]

