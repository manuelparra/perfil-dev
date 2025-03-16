module.exports = function (grunt) {
  require("time-grunt")(grunt);
  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin",
  });

  // configuración de grunt.js
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["src/assets/less"],
        },
        files: [
          {
            expand: true,
            cwd: "src/assets/less",
            src: "*.less",
            ext: ".css",
            dest: "src/assets/css",
          },
        ],
      },
    },
    watch: {
      files: ["src/assets/less/*.less"],
      tasks: ["css"],
    },
    browserSync: {
      dev: {
        bsFiles: {
          // browser files
          src: [
            "./src/assets/css/*.css",
            "./src/assets/js/*.js",
            "./src/*.html",
          ],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: ["./", "./src/"], // directorio base para nuestro servidor
          },
        },
      },
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "src/assets/img",
            src: "**/*.{png,gif,jpg,jpeg,svg}",
            dest: "public/assets/img",
          },
        ],
      },
    },
    clean: {
      build: {
        src: ["public/"], // limpia la carepta de deploy
      },
    },
    filerev: {
      options: {
        algorithm: "md5",
        length: 15,
      },
      files: {
        src: ["public/assets/css/*.css", "public/assets/js/*.js"],
      },
    },
    concat: {
      options: {
        separator: ";",
      },
      dist: {},
    },
    useminPrepare: {
      html: "src/index.html",
      options: {
        dest: "public",
        flow: {
          steps: {
            css: ["cssmin"],
            js: ["uglify"],
          },
          post: {
            css: [
              {
                name: "cssmin",
                createConfig: function (context, block) {
                  var generated = context.options.generated;
                  generated.options = {
                    keepSpecialComments: 0,
                    rebase: false,
                  };
                },
              },
            ],
          },
        },
      },
    },
    copy: {
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./src", /// directorio de trabajo actual
            src: ["*.html"],
            dest: "public",
          },
        ],
      },
      xml: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./src", /// directorio de trabajo actual
            src: ["sitemap.xml"],
            dest: "public",
          },
        ],
      },
      fonts: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "src/assets/fonts",
            src: "**/*",
            dest: "public/assets/fonts",
          },
        ],
      },
      license: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./",
            //src: ['README.md', 'LICENSE'],
            src: ["LICENSE"],
            dest: "public/",
          },
        ],
      },
      svg: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "src/assets/img",
            src: "arrow.svg",
            dest: "public/assets/img",
          },
        ],
      },
      ico: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "src/assets/img",
            src: "favicon.ico",
            dest: "public/assets/img",
          },
        ],
      },
    },
    usemin: {
      html: ["public/index.html", "public/404.html"],
      options: {
        dest: "public",
        assetsDirs: ["public", "public/assets/css", "public/assets/js"],
      },
    },
    htmlmin: {
      site: {
        options: {
          removeCommets: true,
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true,
            cwd: "public", // directorio de trabajo actual
            src: ["*.html"],
            dest: "public",
          },
        ],
      },
    },
  });

  // load npm tasks
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // registro de tareas
  grunt.registerTask("css", ["less"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("doimgemin", ["imagemin"]);
  grunt.registerTask("build", [
    "clean", // borramos el contenido de public/
    "css", // generamos los .css a partir del .less
    "imagemin", // optmizamos imagenes y las copiamos a public
    "useminPrepare", // preparmos la configuración de usemin
    "concat",
    "cssmin",
    "uglify",
    "filerev", // agregamos cadena aleatoria a los nombres de los archivos css y js
    "copy", // copiamos los html y las fonts a public/ y public/assets/fonts
    "usemin", // reemplazamos las referencias por los archivos generados por filerev
    "htmlmin", // minificamos los html de la carpeta public/
  ]);
};
