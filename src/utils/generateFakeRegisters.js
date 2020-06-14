/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const Leite = require('leite');
const axios = require('axios');

const leite = new Leite();

async function generateFakeRegisters() {
  const registers = Array.from({ length: 100 }, () => null);
  const usersToCreate = [];

  registers.forEach(() => {
    const user = {
      name: leite.pessoa.nome({ nomeDoMeio: true }),
      cpf: leite.pessoa.cpf({ formatado: true }),
      email: leite.pessoa.email(),
      password: String(Math.floor(Math.random() * (1000000 - 1000)) + 1000),
      address: {
        cep: leite.localizacao.cep({ formatado: true }),
        street: leite.localizacao.logradouro(),
        neighborhood: leite.localizacao.bairro(),
        city: leite.localizacao.cidade(),
        number: Math.floor(Math.random() * (10000 - 1)) + 1,
      },
    };

    usersToCreate.push(axios.post('http://localhost:5000/users', user));
  });

  await Promise.all(usersToCreate);
}

generateFakeRegisters();
