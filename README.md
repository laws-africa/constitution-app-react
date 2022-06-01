# Local development

Install the Ionic CLI with npm:

```
$ npm install -g @ionic/cli
```

Clone the repository:

```
$ git clone https://github.com/laws-africa/constitution-app-react.git
$ cd constitution-app-react
```

Install dependencies with yarn:

```
$ yarn
```

## Serving the app

```
$ ionic serve
```

This should open your browser window on http://localhost:8100!

## Updating content (backend)

Dependencies: Python (3.8)

Create a Python virtual environment if you want and install the requirements

```
$ cd backend
$ pip install -r requirements.txt 
```

Run the script:

```
$ python main.py
```

# Production deployment

The app is hosted by GitHub pages. It is built automatically from the master branch by the GitHub action script at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

To mimic this process, use:

```
$ ionic build --prod --engine=web
```

This generates a `build` folder which contains the entire public website.

# Generate translation json file with i18next-parser
```
yarn global add i18next-parser
i18next 'src/**/*.{js,tsx}'
```

