const fs = require('fs');

const leituraJson =  function (): unknown {
    return JSON.parse(fs.readFileSync('../bd.json'));
}

const escritaJson = function (dados: any): void {
    fs.writeFileSync('../bd.json', JSON.stringify(dados));
}

const dados = leituraJson() as string[];

dados.push("Super Silas");

escritaJson(dados);

console.log(leituraJson());