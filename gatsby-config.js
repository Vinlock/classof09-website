require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Class of '09 10 Year High School Reunion`,
    description: '',
    siteUrl: process.env.APP_URL,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ECR Class of 2009 10 Year Reunion`,
        short_name: `Class of 2009`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Exo',
            variants: ['800'],
          },
          {
            family: 'Montserrat',
            variants: ['900'],
          },
          {
            family: 'Work Sans',
            variants: ['700']
          },
          {
            family: 'Oxygen',
          },
          {
            family: 'Nunito',
            variants: ['800']
          },
          {
            family: 'Yanone Kaffeesatz',
          },
          {
            family: 'Roboto',
            variants: ['300', '400', '500', '700', '900']
          },
          {
            family: 'Cabin',
            variants: [ '400', '700']
          },
          {
            family: 'Darker Grotesque',
            variant: [ '600' ]
          },
          {
            family: 'Open Sans',
            variant: [ '300', '400' ]
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
        generateMatchPathRewrites: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
  ],
};
