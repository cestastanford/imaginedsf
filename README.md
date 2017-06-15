# Imagined San Francisco

This is the repository for the WordPress-based Imagined San Francisco site.  Check out DEVELOP.md for instructions on contributing!

## Steps for Development Environment Setup

1.  With npm installed, run `npm i && npm run dev-watch`.
2.  With Docker installed, run `docker-compose up`.
3.  Install the Advanced Custom Fields Pro plugin and activate it.
4.  Activate the Imagined San Francisco Custom Theme.
5.  Create the site pages and menus as described in `pages-menus.md`, or apply a site SQL dump.
6.  Visit the Settings -> Permalinks page to flush the Permalink rules.
7.  Visit `http://localhost:12345`!

## Steps for Deployment

1.  With npm installed, run `npm i && npm run prod-build`.
2.  Install the Advanced Custom Fields Pro plugin and activate it.
3.  Install and activate the `./imaginedsf-custom-theme` theme.
4.  Create the site pages and menus as described in `pages-menus.md`, or apply a site SQL dump.
5.  Visit the Settings -> Permalinks page to flush the Permalink rules.

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
