const path = require('path');
const fs = require('fs');
function resolve(dir) {
    return path.join(__dirname, '.', dir);
}
const loadModule = require.resolve;
const file = resolve('.env');
let env = 'prod';
if(fs.existsSync(file)) {
    env = fs.readFileSync(resolve('.env'), 'utf-8');
}
const transformJsCDNUrl = config => {
    config.module
        .rule('compileBabel1111')
        .test(/\.(js|mjs|jsx|ts|tsx)$/)
        .exclude.add(/core-js/)
        .end()
        .use('babel-loader')
        .loader(loadModule('babel-loader'))
        .options({
            presets: [
                [
                    loadModule('@babel/preset-typescript'),
                    {
                        isTSX: true,
                        allExtensions: true,
                    },
                ],
                loadModule('@babel/preset-env'),
            ],
            plugins: [
                // myPlugin,
            ],
        })
        .end();
};
module.exports = {
    publicPath: '',
    static: true,
    fePort: 8885,
    chainBaseConfig: config => {
        transformJsCDNUrl(config);
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .exclude.add(resolve('node_modules'))
            .end()
            .use('vue-loader')
            .loader('vue-loader')
            .options({
                compilerOptions: {
                    preserveWhitespace: false,
                },
            });
        
    },
    customeHeadScript: [
        {
            content: `var server_url = ''`,
        },
        {
            describe: {
                attrs: {
                    src: 'https://cdn.jsdelivr.net/npm/vue@2',
                },
            },
            content: '',
        }
    ],
    css: () => {
        const pxtoviewport = require('postcss-px-to-viewport');
        return {
            loaderOptions: {
                postcss: {
                    plugins: [
                        pxtoviewport({
                            viewportWidth: 375,
                        }),
                    ],
                },
            },
        };
    },
};
