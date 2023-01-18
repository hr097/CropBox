from sanic import Sanic
from sanic.response import json
app = Sanic()


@app.route('/')
async def index(request, path=""):
    return json({'default': path})

@app.route('/testing')
async def index(request, path=""):
    return json({'hello': path})
