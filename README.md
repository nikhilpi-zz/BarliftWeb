# Barlift - Web Dashboard
The purpose of this web app is to create deals, buy deal of the day slots and view consumer and competetive analytics. BarLift uses your location to send you relevant, high quality deals when you're out at night. Barlift was built in Nuvention Web at Northwestern University in 2015.

## Architecture
The dashboard is a Angular.js app served by a node stack. Data is stored using a Parse.com app and reached over the REST api. Theming was done using INSPINIA, a purchased CSS package. The app was hosted on heroku.
#### Dependencies:
* [Angular.js](https://angularjs.org/)
* [Node.js](https://nodejs.org/)
* [Parse.com](https://parse.com/)
* [INSPINIA](https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S)

#### File Structure:
```python
app/
  css/            #CSS stylesheets to be lazy loaded when needed
  fonts/          #Font awesome sheets
  images/         #Image assets
  js/             #JS scripts to be lazy loaded when needed
  scripts/        #Main Angular app
    controllers/  #View controllers, each section of the app had its own controller
    directives/   #Reusable modules like forms and deal cards
    services/     #Facotories that hooked up to Parse classes
  styles/         #Inspinia CSS and custom css
  tests/          #the test that were never written...
  views/          #All the html templates
``` 

## Running it
#### Install
Developing the app requires npm and grunt
1. Clone the repo
2. `$ npm install`
3. `$ grunt install`
4. `$ grunt serve`

#### Building
__local development__: `$ grunt serve`

__build web app__: `$ grunt build`

__run build locally__: `$ grunt serve:dist`

#### Deployment
Deployment is simply done by pushing the app to heroku using git
