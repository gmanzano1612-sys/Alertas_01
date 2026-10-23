from django.db import models

class Alerta(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    nivel = models.CharField(
        max_length=50, 
        choices=[('Bajo', 'Bajo'), ('Medio', 'Medio'), ('Alto', 'Alto')], 
        default='Medio'
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo