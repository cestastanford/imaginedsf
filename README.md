# Imagined San Francisco

This is the repository for the WordPress-based Imagined San Francisco site.

## Steps for Development Environment Setup

1. Install [Node/NPM](https://nodejs.org/en/) and [Docker Desktop](https://www.docker.com/products/docker-desktop).
2.  Open a shell and run `npm install` to install front-end dependencies.  Once it's done, run `npm run dev-watch` to start the development front-end asset bundler.  Leave this process running in its shell.
3.  Open another shell and run `docker-compose up` to start the development WordPress server.  Leave this process runnung in its shell.
4.  Get the Advanced Custom Fields PRO plugin, unzip it, and move it to `dev-env/wordpress/wp-content/plugins`.
5.  Set up a development database.  Get a SQL database dump of the site's WordPress content, make sure it's named `db.sql`, and place it in `dev-env/dumps`.  Then, in a new shell, run the following command:
```shell
cp setup-dev-db.sql dev-env/dumps/setup-dev-db.sql && \
    docker-compose exec mysql sh -c "mysql -u wordpress -pwordpress wordpress < /dumps/db.sql" && \
    docker-compose exec mysql sh -c "mysql -u wordpress -pwordpress wordpress < /dumps/setup-dev-db.sql" && \
    rm dev-env/dumps/setup-dev-db.sql
```
6.  Visit [http://localhost:12345](http://localhost:12345)!  To log into the admin panel, visit [http://localhost:12345/wp-admin](http://localhost:12345/wp-admin) and use the username `dev` and password `dev`.

## Steps for Deployment

1.  Assuming you've followed the above instructions to set up a development environment, ctrl-C out of any `dev-watch` you have running and run `npm run prod-build`.
2.  When that's done, using FTP or WordPress's theme manager, install your local `imaginedsf-custom-theme` as the active WordPress theme for the site.

## Menus & Pages

Since it's challenging to save menus and pages out of the WordPress database but not worth hard-coding them into the theme, here's a list of the pages and menus that should be added to a fresh installation.  Note: there must be at least one post of a post type to add that post type's archive page to a menu, and you'll need to make the options visible in the menu creation page through the Screen Options tab.

### Pages

- Homepage
    + Slug: 'homepage'
    + Template: Homepage
    + Make sure this page is set as the Front Page in Reading Settings
- Introduction
    + Slug: 'introduction'
    + Template: Introduction Parent
    + Content will be ignored
- Intro Video
    + Slug: 'intro-video'
    + Template: Introduction
    + Parent: Introduction
- Read About the Project
    + Template: Introduction
    + Parent: Introduction
- Bibliography
- Credits
- Feedback


### Menus

- Primary
    + "Introduction" -> Page: Introduction
    + "Interactive Maps" -> Post Type Archive: Maps
    + "Political Narratives" -> Post Type Archive: Narratives

- Secondary
    + "Feedback" -> Page: Feedback
    + "Credits" -> Page: Credits
    + "Bibliography" -> Page: Bibliography

- Introduction
    + "Read About the Project" -> Page: Read About the Project
    + "Intro Video" -> Page: Intro Video
