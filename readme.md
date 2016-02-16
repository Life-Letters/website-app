# Website App

A lean Angular app to support the Life Letters website. 

It provides the following functionality:

- injects a navbar that reflects the user's logged in status
- handles social sharing buttons
- provides other common elements, such as the footer



## Development

Install

    npm install
    bower install

When working with the other angular projects, it recommended to 
link them to ensure you're working with the latest copy:

    # In submodule dir
    bower link

    # In this dir
    bower link angular-users

Do this for:

		angular-users
    web-common



## Heroku

Used during the setup of the project:

		heroku buildpacks:add https://github.com/Life-Letters/heroku-buildpack-nodejs-grunt-compass-bower-configurable -a life-website-app-staging