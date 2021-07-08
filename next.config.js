const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  images: {
    domains: [
      'vestiums-uploaded-images-staging.s3.amazonaws.com',
      'vestiums-uploaded-images-staging.s3.eu-west-3.amazonaws.com',
    ],
  },
};

const plugins = [
  withAntdLess({
    // optional
    modifyVars: { "@primary-color": "#F8A71B" },
    // optional
    lessVarsFilePath: "./src/styles/variables.less",
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},
  
    // Other Config Here...
    reactStrictMode: true,
  
    webpack(config) {
      return config;
    },
  }),
];

module.exports = withPlugins(plugins, nextConfig);
