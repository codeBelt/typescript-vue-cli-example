const generateTemplateFiles = require('generate-template-files');

generateTemplateFiles([
    {
        option: 'Vuex Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/vuex-store/',
        },
        stringReplacers: ['__store__', '__model__'],
        output: {
            path: './src/stores/__store__(kebabCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
        onComplete: (results) => {
            // console.log(`results`, results);
        },
    },
]);
