import requests

def convert_pptx_to_pdf(input_path, output_path):
    with open(input_path, 'rb') as f:
        files = {
            'file': (input_path, f, 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
        }
        data = {
            'convert-to': 'pdf'
        }
        response = requests.post(
            'http://127.0.0.1:2004/request',
            files=files,
            data=data,
            timeout=60
        )

    if response.status_code != 200:
        raise Exception(f"Conversion failed: {response.status_code} - {response.text}")

    with open(output_path, 'wb') as out_file:
        out_file.write(response.content)