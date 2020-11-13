const fse = require('fs-extra');
const rimraf = require('rimraf');


    let component = process.argv[3];
    if (component === undefined) {
        console.log('debe especificar el nombre de un componente')
    } else {
        console.log('borrando', component)
        rimraf('../' + component + '/dist', {}, function (error, dir) {
            if (error) console.log(error);
            else console.log('archivo borrado');
        });
    }
    console.log('copiando...');

   fse.copy(`../pruebas/${component}/dist`,`../${component}/dist`,  function (error){
        if(error) console.log(error);
        else console.log('carpeta copiada correctamente');
    } );






