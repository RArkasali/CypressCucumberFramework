require('cypress-xpath');
const fs = require("fs");
const path = require('path');
const directoryPath = "./repositories/";
const props = [];

export class RepositoryParser
{

constructor()
{
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    } 
    //listing all files using forEach
    let count = 0;

    files.forEach(function (file) {
        const data = fs.readFileSync(directoryPath + file);
        const lines = data.toString().split('\r\n');
        count += lines.length;

    lines.forEach((line) => {
        const items = line.split(':');
        const left = items[0].split('=');
        const prop = new Property(left[0], left[1], items[1]);
        props.push(prop)
    })
})
})
}

GetElement(name)
{
    const selected = props.find(o => o.name === name);
    if (selected.type === 'Xpath')
        return selected.value
}

Property(name,type,value){
    this.name = name;
    this.type = type;
    this.value = value;
}
}

const parser = new RepositoryParser();
console.log(parser.GetElement('txtSearch'));
