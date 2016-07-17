## Please note, this repository is deprecated.

The logic within this project has since been incorporated into the [website](https://github.com/Life-Letters/website) repository.

--

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

		heroku buildpacks:remove --index 1 -a life-website-app-staging
		heroku buildpacks:add https://github.com/Life-Letters/heroku-buildpack-yo-angular -a life-website-app-staging