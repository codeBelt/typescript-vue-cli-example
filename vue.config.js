const path = require('path');

module.exports = {
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: {
        resolve: {
            // Logic to load either the src/environments/production or src/environments/development file in the app.
            alias: {
                // environment: path.join(SRC_PATH, 'environments', 'production'),
                environment: path.join(__dirname, 'src', 'environments', process.env.NODE_ENV),
            },
        },
    },
};
