import os
from flask import current_app, send_from_directory, jsonify

def download_file(filename):
    output_folder = current_app.config['OUTPUT_FOLDER']
    file_path = os.path.join(output_folder, filename)

    if os.path.exists(file_path):
        return send_from_directory(output_folder, filename, as_attachment=True)
    else:
        return jsonify({'message': "File not found"}, 404)