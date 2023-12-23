const fs = require('fs');

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];

    console.log(bd)
    bd.push(dados);

    escreverArquivo(bd);
    return dados;
}

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[]

    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro;
        }

        return usuario;
    })

    return usuarios;
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];

    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if(!usuario) {
        throw new Error ("Usuário não encontrado");
    }

    return usuario;
}

const atualizarUsuario = (cpf:string, dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];

    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf;
    });

    if(!usuario) {
        throw new Error ("Usuário não encontrado");
    }

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf
    });

    escreverArquivo(exclusao);

    return usuario;
}