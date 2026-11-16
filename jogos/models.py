from django.db import models

# Create your models here.
class Jogo(models.Model):
    nome = models.CharField(max_length=100)
    genero = models.CharField(max_length=100)
    ano = models.IntegerField()
    avaliacao = models.FloatField()

    def __str__(self):
        return self.nome