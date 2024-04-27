document.getElementById('formulario').addEventListener('submit', cadastraVaga)

function cadastraVaga(a){
    var placaVeiculo = document.getElementById('placaVeiculo').value;
    var nomeProprietario = document.getElementById('nomeProprietario').value;
    var numeroApartamento = document.getElementById('numeroApartamento').value;
    var blocoApartamento = document.getElementById('blocoApartamento').value;
    var modeloVeiculo = document.getElementById('modeloVeiculo').value;
    var corVeiculo = document.getElementById('corVeiculo').value;
    var numeroVaga = document.getElementById('numeroVaga').value;

    informacoes = {
        placa: placaVeiculo,
        nome: nomeProprietario,
        numero: numeroApartamento,
        bloco: blocoApartamento,
        modelo: modeloVeiculo,
        cor: corVeiculo,
        vaga: numeroVaga
    }

    if(localStorage.getItem('estacionamento') === null){
        var carros = [];
        carros.push(informacoes);
        localStorage.setItem('estacionamento', JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('estacionamento'));
        carros.push(informacoes);
        localStorage.setItem('estacionamento', JSON.stringify(carros));
        alert("Cadastro realizado com sucesso!")
    }

    resultadoCadastro();

    a.preventDefault();
}

function apagarVaga(placa){
    var carros = JSON.parse(localStorage.getItem('estacionamento'));

    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }

        localStorage.setItem('estacionamento', JSON.stringify(carros));
    }

    resultadoCadastro();

}

function resultadoCadastro(){
    var vagas = JSON.parse(localStorage.getItem('estacionamento'));
    var vagasResultado = document.getElementById('resultados');

    vagasResultado.innerHTML = '';

    for(var i = 0; i < vagas.length; i++){
        var placa = vagas[i].placa;
        var nome = vagas[i].nome;
        var numero = vagas[i].numero;
        var bloco = vagas[i].bloco;
        var modelo = vagas[i].modelo;
        var cor = vagas[i].cor;
        var vaga = vagas[i].vaga;

        vagasResultado.innerHTML += 
                              '<tr><td>Placa do veículo:' + placa + 
                              '</td><td>Nome do proprietário:' + nome + 
                              '</td><td>Número do apartamento:' + numero +
                              '</td><td>Bloco do apartamento:' + bloco +
                              '</td><td>Modelo do veículo:' + modelo +
                              '</td><td>Cor do veículo:' + cor +
                              '</td><td>Número da vaga de estacionamento:' + vaga +
                              '<button class="remover" onclick="apagarVaga(\'' + placa + '\')">Remover</button>' +
                              '</tr>'
    }
}