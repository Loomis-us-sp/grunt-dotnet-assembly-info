var path = require('path'),
    msbuild = require('./msbuild.js'),
    assemblyInfo = require('./assemblyInfo.js');

module.exports = function(grunt) {
    grunt.registerTask('assemblyinfo', 'Sets .NET assembly information.', function() {
        var options = this.options({ filename: 'AssemblyInfo.cs' });
        var attrs;

        if (!options.info || (attrs = Object.keys(options.info)).length < 1) 
            grunt.warn('No assembly info options set.');

        console.log('  Setting ' + options.filename + ' with:');
        console.log();
        attrs.forEach(function(attr) { console.log('  ' +  attr + ': ' + options.info[attr]); });
        console.log();

        var files = [];
        options.files.forEach(function(file) {
            switch (path.extname(file.trim())) {
                case '.sln': files = files.concat(msbuild.getSolutionFiles(file, options.filename)); break;
                case '.csproj': files = files.concat(msbuild.getProjectFiles(file, options.filename)); break;
                default: files.push(file);
            }
        });

        console.log('Files:');
        console.log();
        files.forEach(function(file) { console.log(file); });
        console.log();

        assemblyInfo.setFileAttrbutes(files, options.info);
    });
};
