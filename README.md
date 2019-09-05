# Imagined San Francisco

This is the repository for the WordPress-based Imagined San Francisco site.

## Steps for Development Environment Setup

1. Install [Node/NPM](https://nodejs.org/en/) and [Docker Desktop](https://www.docker.com/products/docker-desktop).
2.  Open a shell and run `docker-compose up` to start the development WordPress server.  You'll know that it's finished setup and is active when you see a terminal output that looks like `wp_1  | [Thu Sep 05 23:42:54.868804 2019] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'`.  Leave this process runnung in its shell.
3.  Open another shell and run `npm install` to install front-end dependencies.  Once it's done, run `npm run dev-watch` to start the development front-end asset bundler.  Leave this process running in its shell.
4.  Get the Advanced Custom Fields PRO plugin, unzip it, and move it to `dev-env/wp-plugins`.
5.  Set up a development database.  Get a SQL database dump of the site's WordPress content, make sure it's named `db.sql`, and place it in `dev-env/dumps`.  Then, in a new shell, run the following two commands:
```shell
docker-compose exec mysql sh -c "mysql -u wordpress -pwordpress wordpress < /dumps/db.sql"
docker-compose exec mysql sh -c "mysql -u wordpress -pwordpress wordpress < /setup-dev-db.sql"
```
6.  Visit [http://localhost:12345](http://localhost:12345)!  To log into the admin panel, visit [http://localhost:12345/wp-admin](http://localhost:12345/wp-admin) and use the username `dev` and password `dev`.

## Steps for Deployment

1.  Assuming you've followed the above instructions to set up a development environment, ctrl-C out of any `dev-watch` you have running and run `npm run prod-build`.
2.  When that's done, using FTP or WordPress's theme manager, install your local `imaginedsf-custom-theme` as the active WordPress theme for the site.
