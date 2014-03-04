'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var VipGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Vip generator.'));

    // dir
    this.dir = this.dest._base.split(path.sep).pop();

    var prompts = [{
      type: 'rawlist',
      name: 'projectType',
      message: 'select project init type',
      choices: ['pc', 'mobile']
    },{
      //type: 'confirm',
      name: 'projectName',
      message: 'enter the project name',
      default: 'vip-project'
    }, {
      name: 'author',
      message: 'enter author',
      default: 'http://www.vip.com'
    }];

    this.prompt(prompts, function (props) {

      this.projectType = props.projectType;
      this.projectName = props.projectName;
      this.author = props.author;

      done();
    }.bind(this));
  },

  dir: function(){
    this.mkdir('demo');
    this.mkdir('images');
    this.mkdir('assets');

    // css && sass
    this.mkdir('assets/css');
    this.mkdir('assets/sass');
    this.mkdir('assets/sass/mods');

    // images
    this.mkdir('assets/images');
    this.mkdir('assets/images/icons');
    if( this.projectType === 'mobile' ){
      this.mkdir('assets/images/icons2x');
    }

    // js
    this.mkdir('assets/js');
    this.mkdir('assets/js/app');
    this.mkdir('assets/js/app/mods');
    this.mkdir('assets/js/app/tmpl');

    this.mkdir('assets/js/dest');
    this.mkdir('assets/js/gallery');
    this.mkdir('assets/js/module');
  },

  app: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('.bowerrc', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },

  sass: function(){
    if( this.projectType === 'mobile' ){
      this.copy('sass/vip.png', 'assets/images/icons/vip.png');
      this.copy('sass/vip2x.png', 'assets/images/icons2x/vip.png');
      this.copy('sass/_icons2x.scss', 'assets/sass/mods/_icons2x.scss');
    } else {
      this.copy('sass/vip2x.png', 'assets/images/icons/vip.png');
    }
    this.copy('sass/config.rb', 'config.rb');
    this.copy('sass/project.scss', 'assets/sass/' + this.projectName + '.scss');
    this.copy('sass/_functions.scss', 'assets/sass/mods/_functions.scss');
    this.copy('sass/_icons.scss', 'assets/sass/mods/_icons.scss');
    this.copy('sass/_icons-sprite.scss', 'assets/sass/mods/_icons-sprite.scss');
    this.copy('sass/_reset.scss', 'assets/sass/mods/_reset.scss');
  },

  js: function(){
    this.copy('js/config.js', 'assets/js/config.js');
    this.copy('js/index.js', 'assets/js/app/index.js');
  },

  demo: function(){
    this.copy('index.html', 'demo/index.html');
  },
  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = VipGenerator;
