# Coleção de Jogos

## Integrantes

| Nome | RGM |
|---|---|
| Pedro Rafful Pinto da Cunha | 11252102108 |
| Danillo Ygor Carvalho Moraes | 11241103644 |
| Thyago dos Santos Carvalho | 11261102997 |
| Vitor de Souza Freitas | 11261103697 |

---

## Requisitos

| Python | 3.10+ | <br>
| Django | 5.2 | <br>
| django-cors-headers | <br>
| Node.js | 20.19+ |

---

## Comandos

### 1. Backend (Django)

No terminal, a partir da pasta 'colecao\'

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install "django>=5.2,<5.3" django-cors-headers
python manage.py migrate
python manage.py runserver
```

Abre em **http://127.0.0.1:8000**

### 2. Frontend (React)

Em **outro terminal**:

```powershell
cd frontend
npm install
npm run dev
```

O site abre em **http://localhost:5173**.
