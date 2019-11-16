const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript')
const withImages = require('next-images')


module.exports = withPlugins(
  [withTypescript, withCSS, withImages, withSass]
);

