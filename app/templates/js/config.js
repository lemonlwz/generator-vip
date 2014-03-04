seajs.config({
  alias: {
    "$": "jquery/dist/jquery.min.js"
  },
  paths: {
    "<%= _.slugify(projectName) %>": "/themes/default/static/<%= _.slugify(dir) %>/assets/js" //dev
    //"<%= _.slugify(projectName) %>": "/themes/default/static/<%= _.slugify(dir) %>/assets/js/dest" //build
  },
  preload: ["$"],
  debug: 0
});
