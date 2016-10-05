import webpackTestConf from './webpack.test.config.babel';

module.exports = config => {
    config.set({
        frameworks: ['jasmine', 'sinon'],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            {pattern: 'tests/**/*Spec.js', watched: false}
        ],
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sinon',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-sourcemap-loader'
        ],
        browsers: ['PhantomJS'],
        preprocessors: {
            'tests/**/*Spec.js': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'lcov', subdir: 'lcov'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.txt'}
            ]
        },
        webpack: webpackTestConf
    });
};
