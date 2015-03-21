var os = require('os'),
    path = require('path')
    ;

var packageJson = require ('./package.json');
var lvl2workshopJson = packageJson['lvl2.workshop'];

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-build-atom-shell');

    var tmpDir = os.tmpdir();
    var homeDir = process.env.HOME || process.env.USERPROFILE;

    var shellbuild = {
        productName: lvl2workshopJson.target.binaryName,
        projectName: lvl2workshopJson.target.appId,
        tag: lvl2workshopJson.shell.tag,
        nodeVersion: lvl2workshopJson.shell.nodeVersion,
        buildDir: lvl2workshopJson.shell.downloadDir.replace('#{HOME}', homeDir),
        targetDir: lvl2workshopJson.shell.targetDir,
        stdout: null,
        stderr: null
    };

    shellbuild.productName = (process.platform == 'darwin') ? shellbuild.productName+'.app' : shellbuild.productName;
    var executableName = (process.platform == 'win32') ? shellbuild.productName+'.exe' : shellbuild.productName;




    // Project configuration.
    grunt.initConfig({
        'build-atom-shell': shellbuild
    });

    grunt.registerTask('shell:build', ['build-atom-shell']);
    grunt.registerTask('shell:rebuild', ['rebuild-atom-shell']);
    grunt.registerTask('shell:rebuild-native-modules', ['rebuild-native-modules']);

};