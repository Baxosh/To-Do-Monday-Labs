from django.db import models
    
class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'todo_todos'

    def _str_(self):
        return self.title