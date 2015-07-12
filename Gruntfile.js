// wrapper
module.exports = function(grunt) {
    // @see https://github.com/sindresorhus/load-grunt-tasks
    // require('load-grunt-tasks')(grunt);

    // 프로젝트 환경설정
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/*.js', '../wave_front/js/*.js']
        },
        copy: {
            dist: {
                files: [
                    {expand: true, src: ['dist/*.min.js'], dest: '../wave_front/js/', filter: 'isFile'}
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['clean:dist', 'jshint', 'concat', 'uglify', 'copy']
        }
    });

    // 플러그인 로드
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // task
    grunt.registerTask('default', []);
    grunt.registerTask('build', ['clean:dist', 'jshint', 'concat', 'uglify', 'copy']);
};