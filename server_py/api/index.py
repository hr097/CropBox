# from http.server import BaseHTTPRequestHandler
from sanic import Sanic
from sanic.response import json

app = Sanic()

# class handler(BaseHTTPRequestHandler):

#     def do_GET(self):
#         self.send_response(200)
#         self.send_header('Content-type','application/json')
#         self.end_headers()
#         self.wfile.write('Hello, world!'.encode('utf-8'))
#         return


@app.route('/')
@app.route('/testing')
async def index(request, path=""):
    return json({'hello': path})

