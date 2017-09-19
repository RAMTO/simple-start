module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserSync: {
            bsFiles: {
                src : [
                    'dist/css/*.css',
                    'dist/*.html',
                    'dist/*.js'
                ]
            },
            options: {
                watchTask: true,
                port: 3000,
                server: {
                    baseDir: "dist"
                }
            }
        },

        mustache_html: {
            development: {
                options: {
                    src: 'src/templates',
                    dist: 'dist',
                    type: 'mustache'
                },
                globals: {
                    analytics_id: 'UA-123456-1'
                }
            }
        },

        copy: {
            images: {
                expand: true,
                cwd: 'src/images/',
                src: '**/*.{png,jpg,gif,ico,svg}',
                dest: 'dist/images/'
            },
            scripts: {
                expand: true,
                cwd: 'src/js/',
                src: '**/*.{js,jsx}',
                dest: 'dist/js/'
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts/',
                src: '**/*.{eot,woff,woff2,ttf,svg}',
                dest: 'dist/fonts/'
            }
        },

        codekit: {    
            target: {
                src : 'src/templates/*.kit',
                dest : 'dist/'
            }
        },

        sass: {
            options:{
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/style.css': 'src/scss/style.scss'
                }
            }
        },

        autoprefixer:{
            dist:{
                files:{
                    'dist/css/style.css':'dist/css/style.css'
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'autoprefixer']
            },
            js: {
                files: '**/*.js',
                tasks: ['copy:scripts']
            },
            kit: {
                files: '**/*.kit',
                tasks: ['codekit']
            },
            mustache: {
                files: 'src/**/*.mustache',
                tasks: ['mustache_html']
            }
        }

    });
    
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build', ['mustache_html', 'sass', 'autoprefixer']);
    grunt.registerTask('default', ['browserSync', 'watch']);
}