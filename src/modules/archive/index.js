//const addAptRepository = {
//  type: 'command',
//  command: 'add-apt-repository',
//  // Dependencies required to run the command.
//  commandDependencies: {
//    ubuntu: [
//      'python-software-properties',
//      'software-properties-common',
//    ],
//    debian: [
//      'python-software-properties',
//      'software-properties-common',
//    ],
//  },
//}
//
//const sudo = {
//  type: 'package',
//  name: 'sudo',
//}
//
//class Package {
//  install() {}
//}
//
//package('gcc-arm-embedded', {version: '5-2016q3-1~xenial1'})
//
//file.use(addAptRepository)
//
//file.merge(gccArmEmbeddedToolchain)
//file.merge(gnuArmEclipseQemu)
//
//
//file.merge = (plugin) => {
//  plugin(file)
//}
//
//////////////////////////////////////////////////////////////////////////////////
//
//function aptPlugin(file) {
//  // See how Puppet handles this.
//  const methods = {
//    aptGetUpdate() {
//
//    },
//    aptGetInstall() {
//      return 'apt-get install'
//    }
//  }
//  _(methods).forEach((v, k) => {
//    file[k] = v
//  })
//}
