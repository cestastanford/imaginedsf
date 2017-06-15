Menus & Pages
=============
Since it's challenging to save menus and pages out of the WordPress database but not worth hard-coding them into the theme, here's a list of the pages and menus that should be added to a fresh installation.  Note: there must be at least one post of a post type to add that post type's archive page to a menu.

Pages
-----
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


Menus
-----
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
