# Imagined San Francisco

This is the repository for the WordPress-based Imagined San Francisco site.  It consists of a WordPress theme containing server-side configuration and code (`imaginedsf-custom-theme/`) and a Webpack project (`static-src/`) containing the front-end React app.

## Steps for Development Environment Setup

1. Install [Node/NPM](https://nodejs.org/en/) and [Docker Desktop](https://www.docker.com/products/docker-desktop).
2. Open a shell and run `docker-compose up` to start the development WordPress server.  You'll know that it's finished setup and is active when you see a terminal output that looks like `wp_1  | [Thu Sep 05 23:42:54.868804 2019] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'`.  Leave this process runnung in its shell.
3. Open another shell and run `npm install` to install front-end dependencies.  Once it's done, run `npm run dev-watch` to start the development front-end asset bundler.  Leave this process running in its shell.
4. Get the Advanced Custom Fields PRO plugin, unzip it, and move it to `dev-env/wp-plugins`.
5. Set up a development database.  Get a SQL database dump of the site's WordPress content, make sure it's named `db.sql`, and place it in `dev-env/dumps`.  Then, in a new shell, run `dev-rsc/apply-dump.sh'.`
6. Get a copy of the live site's Uploads directory (`wp-content/uploads`) and add its contents to `dev-env/wp-uploads`.
7. Visit http://localhost:12345 !  To log into the admin panel, visit http://localhost:12345/wp-admin and use the username `dev` and password `dev`.

## Steps for Deployment

1. Assuming you've followed the above instructions to set up a development environment, ctrl-C out of any `dev-watch` you have running and run `npm run prod-build`.  This bundles the front-end application and places it in the theme directory, ready for WordPress to serve as a static asset.
2. When that's done, install your local `imaginedsf-custom-theme` as the active WordPress theme for the site.  To do this over FTP/AFS, just replace the live site's `wp-content/themes/imaginedsf-custom-theme` directory with your local `imaginedsf-custom-theme` directory.  To do this via the WordPress admin panel, follow these steps:
   1. Make a zip archive of your local `imaginedsf-custom-theme` directory.
   2. In WP Admin from an Administrator account, go to Appearance -> Themes.
   3. Activate a different theme than the current `Imagined San Francisco Custom Theme` one.
   4. Click the `Imagined San Francisco Custom Theme` to see the theme details, then click the Delete link in the lower right.
   5. Click the `Add New` button at the top of the Themes screen.
   6. Click the `Upload Theme` button at the top of the Themes screen.  Navigate to your zip archive and click Install Now.
   7. Once it's finished installing, click the Activate button.

## Steps for resetting/updating the local development database

1. Ctrl-C out of any active `docker-compose up` process, then run `docker-compose down`.
2. Delete the `dev-env/db-mysql`, `dev-env/db-dumps`, and `dev-env/wp-uploads` directories.
3. Run `docker-compose up` and wait for `Command line: 'apache2 -D FOREGROUND'` to appear.
4. Get a new SQL dump of the latest database, name it `db.sql`, and move it to the now-recreated `dev-env/db-dumps` directory.  Then, in a new shell, run `dev-rsc/apply-dump.sh'.`
6. Get a copy of the live site's Uploads directory (`wp-content/uploads`) and add its contents to `dev-env/wp-uploads`.
7. Visit http://localhost:12345 !
