// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Akkadian Translation Project',
  tagline: 'Akkadian translation documentation website.',
  favicon: 'img/favicon_io/favicon.ico', // to be changed later

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Akkadian_Documentation_Repo2026/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vvivi012', // Usually your GitHub org/user name.
  projectName: 'Akkadian_Documentation_Repo2026', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
       
          // Remove this to remove the "edit this page" links.
          /*editUrl:
            'https://github.com/vvivi012/Akkadian_Documentation_Repo2026',*/
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },

          // Remove this to remove the "edit this page" links--should remove after publishing site
          /*editUrl:
            'https://github.com/vvivi012/Akkadian_Documentation_Repo2026',*/
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Akkadian Translation Project',
        logo: {
          alt: 'Ex. Star Logo',
          src: 'img/star.svg',
          srcDark: 'img/star_white.svg',
        },
        items: [
          /*{
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial (to get rid of)',
          },
          {to: '/blog', label: 'Blog (to get rid of?)', position: 'left'},*/
          {
            href: 'https://github.com/vvivi012/Akkadian_Documentation_Repo2026',
            label: 'GitHub',
            position: 'right',
          },
          {to: '/about', label: 'About', position: 'left'},
          /*{type: 'docSidebar', sidebarId: 'creationSidebar', label: 'Creating the System', position: 'left'},*/
          {type: 'docSidebar', sidebarId: 'educationSidebar', label: 'Creating the System + Educational Content', position: 'left'},
          {to: '/past-workshops', label: 'Past Workshops', position: 'left'},
          {type: 'docSidebar', sidebarId: 'otherSidebar', label: 'Other Resources', position: 'left'}
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'About Us',
                to: '/about',
              },
            ],
          },
          {
            title: 'Contact Us',
            items: [
              {
                label: 'Stack Overflow (editable but idk what to put)',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord (should we make like. a carrd or something)',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X (i dont even know)',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog (please dont click this)',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/vvivi012/Akkadian_Documentation_Repo2026',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Akkadian Translation Project. Built with Docusaurus. (do we have copyright?)`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
