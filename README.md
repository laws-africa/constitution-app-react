# Setup Instructions

Install the Ionic CLI with npm:

$ npm install -g @ionic/cli

Clone the repository:

$ git clone https://github.com/laws-africa/constitution-app-react.git

$ cd constitution-app-react

Install modules:

$ yarn

# Serving the app

$ ionic serve

This should open your browser window on http://localhost:8100!

# Building for production

$ ionic build --prod --engine=web

Generates a 'build' folder which can be uploaded to an S3 bucket as an example.


# Setup Instructions for content refresh script (backend)

Dependencies:
    Python (3.8)

Create a Python virtual environment if you want and install the requirements

$ cd backend

$ pip install -r requirements.txt 

Run the script:

$ python main.py
