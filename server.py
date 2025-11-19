from flask import Flask, send_from_directory, request
app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file.save('data.json')
    return 'Fișier actualizat cu succes!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)