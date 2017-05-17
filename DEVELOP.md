Steps for Development
====================
Follow these instructions to start a local development environment.

1.  With npm installed, run `npm i && npm run dev-watch`.
2.  With Docker installed, run `docker-compose up`.
3.  Install the Advanced Custom Fields Pro plugin and activate it.
4.  Activate the Imagined San Francisco Custom Theme.
5.  Import the `./pages.xml` file using the default WordPress importer.
6.  Create the three nav menus in Appearance -> Menus, and assign them to the three theme locations.  Note: to create links to custom post type archive pages, at least one post must exist, and you'll need to make them visible in the menu creation page through the Screen Options tab.
7.  Visit the Settings -> Permalinks page to flush the Permalink rules.
8.  Import any other WordPress content backups.
9.  Visit the development address!

Notes:
------
Changes to Advanced Custom Fields will be automatically reflected in the `./imaginedsf-custom-theme/acf-json/` directory.  Changes made from the WordPress admin to pages that are referenced in the code should be saved by re-exporting Pages to `./pages.xml` using the default WordPress XML exporter.
