function createItemRow() {
  var row = document.createElement('tr');
  var weightCell = document.createElement('td');
  var valueCell = document.createElement('td');
  var ratioCell = document.createElement('td');
  
  var weightInput = document.createElement('input');
  weightInput.type = 'number';
  weightInput.min = '0';
  
  var valueInput = document.createElement('input');
  valueInput.type = 'number';
  valueInput.min = '0';
  
  weightCell.appendChild(weightInput);
  valueCell.appendChild(valueInput);
  row.appendChild(weightCell);
  row.appendChild(valueCell);
  row.appendChild(ratioCell);
  
  return row;
}

function updateRatioValues() {
  var rows = document.querySelectorAll('#itemTable tbody tr');
  rows.forEach(function(row) {
    var weightInput = row.querySelector('input[type="number"]');
    var valueInput = weightInput.nextElementSibling.querySelector('input[type="number"]');
    var ratioCell = valueInput.nextElementSibling;
    
    var weight = parseFloat(weightInput.value) || 0;
    var value = parseFloat(valueInput.value) || 0;
    var ratio = (value / weight).toFixed(2) || 0;
    
    ratioCell.textContent = ratio;
  });
}

function calculateKnapsack() {
  var rows = document.querySelectorAll('#itemTable tbody tr');
  var itemCount = rows.length;
  
  var weights = [];
  var values = [];
  
  rows.forEach(function(row) {
    var weightInput = row.querySelector('input[type="number"]');
    var valueInput = weightInput.nextElementSibling.querySelector('input[type="number"]');
    
    var weight = parseFloat(weightInput.value) || 0;
    var value = parseFloat(valueInput.value) || 0;
    
    weights.push(weight);
    values.push(value);
  });
  
  var maxWeight = 10; // Peso máximo da mochila
  
  // Implementação do algoritmo da Mochila
  var dp = new Array(itemCount + 1);
  for (var i = 0; i <= itemCount; i++) {
    dp[i] = new Array(maxWeight + 1).fill(0);
  }
  
  for (var i = 1; i <= itemCount; i++) {
    for (var j = 1; j <= maxWeight; j++) {
      if (weights[i - 1] <= j) {
        dp[i][j] = Math.max(values[i - 1] + dp[i - 1][j - weights[i - 1]], dp[i - 1][j]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  
  var bestValue = dp[itemCount][maxWeight];
  var calculations = 'Cálculos intermediários:<br>';
  
  var i = itemCount;
  var j = maxWeight;
  while (i > 0 && j > 0) {
    if (dp[i][j] != dp[i - 1][j]) {
      calculations += 'Item ' + i + ': peso=' + weights[i - 1] + ', valor=' + values[i - 1] + '<br>';
      i--;
      j -= weights[i];
    } else {
      i--;
    }
  }
  
  document.getElementById('bestValue').textContent = bestValue;
  document.getElementById('calculations').innerHTML = calculations;
}

var itemCountSelect = document.getElementById('itemCount');
var itemTableBody = document.querySelector('#itemTable tbody');
var calculateButton = document.getElementById('calculateButton');

itemCountSelect.addEventListener('change', function() {
  var itemCount = parseInt(itemCountSelect.value);
  
  itemTableBody.innerHTML = '';
  for (var i = 0; i < itemCount; i++) {
    itemTableBody.appendChild(createItemRow());
  }
  
  updateRatioValues();
});

itemTableBody.addEventListener('input', function() {
  updateRatioValues();
});

calculateButton.addEventListener('click', function() {
  calculateKnapsack();
});
