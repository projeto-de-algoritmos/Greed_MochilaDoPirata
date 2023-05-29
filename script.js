document.getElementById('runButton').addEventListener('click', function() {
  // Obter os valores de entrada do usuário
  var input = document.getElementById('items').value.split(' ').map(function(item) {
    return parseFloat(item);
  });

  // Inicializar arrays para lucro, peso, fração, x e capacidade
  var lucro = [];
  var peso = [];
  var fracao = [];
  var x = [];
  var capacidade = parseFloat(document.getElementById('capacity').value);
  var resultado = 0;

  // Preencher os arrays de lucro e peso a partir da entrada do usuário
  for (var i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      peso.push(input[i]);
    } else {
      lucro.push(input[i]);
    }
  }

  // Calcular a fração de lucro/peso para cada item
  for (var i = 0; i < input.length / 2; i++) {
    fracao.push(lucro[i] / peso[i]);
  }

  // Ordenar as frações em ordem decrescente
  fracao.sort(function(a, b) {
    return b - a;
  });

  // Ordenar os arrays de peso e lucro de acordo com a ordem das frações
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      if (lucro[j] / peso[j] === fracao[i]) {
        var tempLucro = lucro[i];
        var tempPeso = peso[i];
        lucro[i] = lucro[j];
        peso[i] = peso[j];
        lucro[j] = tempLucro;
        peso[j] = tempPeso;
      }
    }
  }

  // Selecionar o item ou fração dele até que a capacidade seja atingida
  for (var i = 0; i < input.length / 2; i++) {
    capacidade -= peso[i];
    if (capacidade >= 0) {
      x.push(1);
    } else {
      x.push(Math.abs(capacidade + peso[i]) / peso[i]);
      break;
    }
  }

  // Limpar a tabela de resultados
  var tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = '';

  // Calcular o resultado e exibir os valores na tabela
  for (var i = 0; i < input.length / 2; i++) {
    if (x[i] === undefined) {
      break;
    } else {
      resultado += lucro[i] * x[i];
      var newRow = document.createElement('tr');
      newRow.innerHTML = '<td>' + lucro[i] + '</td><td>' + peso[i] + '</td><td>' + fracao[i].toPrecision(3) + '</td><td>' + (x[i] % 1 === 0 ? x[i] : x[i].toPrecision(4)) + '</td><td>' + resultado.toPrecision(4) + '</td>';
      tableBody.appendChild(newRow);
    }
  }

  // Exibir o resultado final
  var resultElement = document.getElementById('result');
  resultElement.innerText = resultado.toPrecision(4);
});
