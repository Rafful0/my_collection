from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Jogo
# Create your views here.

def list_games(request):
    if request.method == "POST":
        dados = json.loads(request.body)

        if not 0 <= dados["avaliacao"] <= 10:
            return JsonResponse({"erro": "avaliacao deve estar entre 0 e 10"}, status=400)
        if not 1900 <= dados["ano"] <= 2026:
            return JsonResponse({"erro": "ano deve estar entre 1900 e 2026"}, status=400)

        jogo = Jogo.objects.create(**dados)
        return JsonResponse({"id": jogo.id}, status=201)

    return JsonResponse(list(Jogo.objects.values()), safe=False)

def resume(request):
    jogos = list(Jogo.objects.values())

    if len(jogos) == 0:
        return JsonResponse({"total": 0, "media_avaliacao": 0, "melhor": None})

    soma = 0
    melhor = jogos[0]
    for jogo in jogos:
        soma = soma + jogo["avaliacao"]
        if jogo["avaliacao"] > melhor["avaliacao"]:
            melhor = jogo

    return JsonResponse({
        "total": len(jogos),
        "media_avaliacao": round(soma / len(jogos), 2),
        "melhor": melhor["nome"],
    })