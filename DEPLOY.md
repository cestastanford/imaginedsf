Steps for Deployment
====================
Follow these instructions to deploy this code to a live WordPress installation.

1.  With npm installed, run `npm i && npm run prod-build`.
2.  Install the Advanced Custom Fields Pro plugin and activate it.
3.  Install and activate the `./imaginedsf-custom-theme` theme.
4.  Import the `./pages.xml` file using the default WordPress importer.
5.  Create the three nav menus in Appearance -> Menus, and assign them to the three theme locations.  Note: to create links to custom post type archive pages, at least one post must exist.
6.  Visit the Settings -> Permalinks page to flush the Permalink rules.
7.  Import any other WordPress content backups.
8.  Go!
