#!/usr/bin/env node
const sherlljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const begin = () => {
    console.log(
        chalk.blue(
            figlet.textSync('Leone  C l i', {
                font: 'ANSI Shadow',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
}


const questions = ()=>{
    const querys = [
        { name: 'FILE', type: 'input', message: 'Cómo se va llamar tu fichero? (sin la extencion)'},
        {
            name: 'EXTENSION',
            type: 'list',
            message: 'Qué extensión tiene tu fichero',
            choices: ['.rb','.js','.kt','.java', '.ts', '.php'],
            filter: function(val){
                // solo toma el valor sin el punto
                return val.split('.')[1]
            }
        },
    ];
    return inquirer.prompt(querys);
}
/**
 * process.cwd(): el directorio donde nos encontramos
 * shelljs.touch: crea el fichero
 * @param nameFile
 * @param extension
 */
const createFile = (nameFile, extension)=>{
    const pathFile = `${process.cwd()}/${nameFile}.${extension}`;
    sherlljs.touch(pathFile);
    return pathFile;
}

const created = filePath =>{
    console.log(
        chalk.white.bgGreen.bold(
            `! Muy bien ! fichero creado ${filePath}`
        ));

}
const main = async ()=> {
    //mostrar la informacion de la libreria en la cabecera, Titulo en figlet
    begin();
    //preguntas necesarias para crear el fichero, nombre y la extencion
    const response = await questions();
    const {FILE, EXTENSION } = response;
    console.log(response);
    //creamos el fichero
    const pathFichero = createFile(FILE, EXTENSION);
    //añadir mensaje que fichero se ha creado correctamente
    created(pathFichero);
};

main();
