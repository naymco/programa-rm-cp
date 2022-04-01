const fse = require('fs-extra');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');


    /**
     * Autor: Alexander Santos
     * Email: asantodi@emeal.nttdata.com
     * Descripcion: Programa para mejorar el manejo de paquetes dist
     *
     * Instalación: después de descargar, hay que poner la carpeta del programa al mismo nivel que la carpeta de tu repositorio
     *          ejemplo:
     *                  ___
     *                     |__Repositorio__
     *                     |              |__orange-services
     *                     |              |__orange-prescoring
     *                     |              |__ etc
     *                     |              |
     *                     |__ Programa Dist
     *
     * donde pones generalmente los componenetes y las SPAS, después usamos npm install, debemos cambiar las rutas de acceso
     * Ejecutar: para ejecutar sólo escribe npm start <componente> <ruta> y el nombre del componente
     *          ejemplo: npm start checkoutpersonaldata ../Repositorio
     *
     * cualquier duda nos vemos por Teams
     */

const handleDist = () => {
    let component = process.argv[3]; // nombre del componente en si
    let repository = process.argv[4]; // carpeta donde se encuentra el componente de la SPA dentro de node_modules
    // console.log(process.argv)

    if (!fs.existsSync(repository)){
        console.log("no dir ", repository);
        return;
    }

    let directory =fs.readdirSync(repository);

    let componentOK = directory.find( dir => {
        return dir === component + '-library-typescript'
    } );

    if ( componentOK) {
        console.log('borrando '+ componentOK + ' de la SPA...')
        rimraf(`${repository}/SPA/pdv-spa-typescript/node_modules/${component}/dist`, {}, function (error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('carpeta borrada');
            }
        });

        copyFileDist(repository, componentOK);
        console.log('leyendo ' + componentOK);
    } else {
        console.log('no se ha encontrado ' + componentOK + ' dentro de la carpeta seleccionada.')
    }

const copyFileDist = (repository, componentOK) => {
// creo que se borra despues de copiar, probar un settimeout aquí
    console.log('comprobando archivos...');
    if ( repository && componentOK) {
        let repo = repository.replace('../', '');

        console.log(repo);

        fse.copy(`../${repo}/${componentOK}/dist`,`../${repo}/SPA/pdv-spa-typescript/node_modules/${componentOK}/dist`,  function (error){
            if(error) console.log(error);
            else console.log('SPA actualizada correctamente');
        });

    }


}

handleDist();






