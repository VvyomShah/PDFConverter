from flask import current_app, send_from_directory
from middleware.validation import validate_file_exists

@validate_file_exists
def download_file(filename):
    output_folder = current_app.config['OUTPUT_FOLDER']
    return send_from_directory(output_folder, filename, as_attachment=True)