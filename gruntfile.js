/**
 * Gruntfile setup
 * @Version: 1.0.0
 * @authors: icao
 **/

module.exports = function (grunt) {
  require('time-grunt')(grunt);  //carga de time-grunt para medir tiempo de ejecucion de tasks
  require('jit-grunt')(grunt); //carga de jit-grunt para reducir tiempo en la invocacion de plugins
  
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    //
    // ─── SASS ────────────────────────────────────────────────────────
    //
    sass: {
      // Tarea
      dist: {
        // Taget
        options: {
          // Target Options
          style: "expanded", // expanded(CSS sin comprimir), compressed(CSS comprimido)
          noCache: true
        },
        files: [
          {
            expand: true,
            cwd: "src/css", // Directorio fuente
            src: ["*.sass"], // Compila todos los archivos con expension .sass, o .scss
            dest: "dist/css", // Directorio Destino
            ext: ".css" // Agrega la extension .css a lo compilado
          }
        ]
      }
    },
    //
    // ─── AUTOPREFIX ──────────────────────────────────────────────────
    //
    autoprefixer: {
      options: {
        browsers: ["last 2 versions", "ie 8", "ie 9", "> 1%"]
      },
      main: {
        expand: true,
        flatten: true,
        src: "dist/css/estilos.css", // directorio o archivo origen
        dest: "dist/css" // directorio destino
      }
    },
    //
    // ─── CSSMIN ──────────────────────────────────────────────────────
    //
    cssmin: {
      my_target: {
        files: [
          {
            expand: true,
            cwd: "dist/css", // directorio fuente
            src: ["*.css", "!*.min.css"], // minifica todo archivo .css, excepto los archivos con extension .min.css
            dest: "dist/css", // Directorio Destino
            ext: ".min.css" // extension de archivos salida
          }
        ]
      }
    },
    //
    // ─── UGLIFY ──────────────────────────────────────────────────────
    //
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          // archivo salida main.min.js :  archivo1, archivo2, etc
          "dist/js/script.min.js": ["src/js/script.js"]
        }
      }
    },
    //
    // ─── IMAGEMIN ────────────────────────────────────────────────────
    //
    imagemin: {
      // Task
      dynamic: {
        options: {
          // Target options
          progressive: true
        }, // Another target
        files: [
          {
            expand: true, // Enable dynamic expansion
            cwd: "src/images", // Src matches are relative to this path
            src: ["*.{png,PNG,jpg,JPG,gif}"], // Actual patterns to match
            dest: "dist/images" // Destination path prefix
          }
        ]
      }
    },

    //
    // ─── COPY ────────────────────────────────────────────────────────
    //
    copy: {
      main: {
        expand: true,
        cwd: "src/", //  carpeta origen
        // src: ['**', '!css/*.sass'], // copia todo, excepto los archivos con extension .sass
        src: [
          "**",
          "!css/*.sass",
          "!js/*.js",
          "js/*.min.js"
        ], // copia todo, excepto los archivos con extension .sass y no minificados(.js y .css)
        dest: "dist/" // carpeta destino
      }
    },
    //
    // ─── WATCH ───────────────────────────────────────────────────────
    //
    watch: {
      sass: {
        files: ["src/css/*.sass"],
        //tasks: ['sass', 'autoprefixer', 'cssmin'] // Visualiza las tareas de 'sass' y 'cssmin'
        tasks: ["changed:sass", "changed:autoprefixer", "changed:cssmin"] // Visualiza las tareas de 'sass' y 'cssmin' , adicional el changed
      },
      copy: {
        files: ["src/**"],
        //tasks: ['copy:main']
        tasks: ["changed:copy:main"]
      }
    },
    //
    // ─── BROWSERSYNC ─────────────────────────────────────────────────
    //
    browserSync: {
      dev: {
        bsFiles: {
          src: ["dist/*.html", "dist/css/*.css", "dist/*.js"]
        },
        options: {
          watchTask: true,
          //Servidor estatico
          server: "./dist",
          logPrefix: "icao website GRUNT",
          //host: "192.168.1.1",
          //port: 9000,
          // Por Default lo lanza en Chrome
          browser: "opera" //Especificando abrirlo en Opera (navegador)
        }
      }
    }
  });
  //
  // ────────────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: C A R G A   D E   N P M   T A S K S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────
  //
  //   grunt.loadNpmTasks('grunt-newer')
  //   grunt.loadNpmTasks('grunt-changed')
  //   grunt.loadNpmTasks('grunt-contrib-watch')
  //   grunt.loadNpmTasks('grunt-contrib-copy')
  //   grunt.loadNpmTasks('grunt-contrib-sass')
  //   grunt.loadNpmTasks('grunt-autoprefixer')
  //   grunt.loadNpmTasks('grunt-contrib-cssmin')
  //   grunt.loadNpmTasks('grunt-contrib-uglify')
  //   grunt.loadNpmTasks('grunt-contrib-imagemin');
  //   grunt.loadNpmTasks('grunt-browser-sync')
  //
  // ────────────────────────────────────────────────────────────────
  //   :::::: D E F I N E   T A S K S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  //
  //
  // ─── Grunt = Solo para desarrollo ------─────────────────────────────────
  //
  grunt.registerTask('default', ['browserSync', 'copy', 'sass', 'autoprefixer', 'cssmin', 'watch']);
  //
  // ─── Grunt Build = Projecto optimizado para subir a servidor -─────────────────
  //
  grunt.registerTask('build', ['browserSync', 'copy','uglify', 'sass', 'autoprefixer', 'cssmin', 'imagemin', 'watch']);
};

// TODO: Corregir el gruntfile, organizar mejor la prioridad de las tareas, optimizar bien los comandos de grunt default y grunt build. Los archivos primero se compilan, se copian y se minifican una vez ya en el dist, corregirlo para que se compilen los archivos primero ya minificados al dist y despues copiar todo el proyecto restante, verificar como lo hace despues el imagemin. 
// El proceso optimo ahorita es el grunt build, hacer que ese sea el de desarrollo sin minificarl as imagenes, en el build parar el watch y agregar el imagemin task
//Con todas las modificaciones ya no estaran archivos sin minificar en el dist