from controllers import download_controller

def register_download_routes(app):
    app.add_url_rule('/download/<filename>', view_func=download_controller.download_file, methods=['GET'])

