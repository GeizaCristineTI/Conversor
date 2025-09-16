const valor = parseFloat(process.argv[2]);
const unidadeOrigem = process.argv[3].toLowerCase();
const unidadeDestino = process.argv[4].toLowerCase();

if (isNaN(valor) || !unidadeOrigem || !unidadeDestino) {
  console.log(
    "Erro: Argumentos inválidos. Use: node medidas.js <valor> <unidade_origem> <unidade_destino>"
  );
  process.exit(1);
}

const conversoes = {
  km: { milhas: 0.621371 },
  milhas: { km: 1.60934 },
  celsius: { fahrenheit: (c) => (c * 9) / 5 + 32 },
  fahrenheit: { celsius: (f) => ((f - 32) * 5) / 9 },
};

if (!conversoes[unidadeOrigem] || !conversoes[unidadeOrigem][unidadeDestino]) {
  console.log(
    "Erro: Conversão não suportada. Unidades válidas: km/milhas, celsius/fahrenheit"
  );
  process.exit(1);
}

let resultado;
if (typeof conversoes[unidadeOrigem][unidadeDestino] === "function") {
  resultado = conversoes[unidadeOrigem][unidadeDestino](valor);
} else {
  resultado = valor * conversoes[unidadeOrigem][unidadeDestino];
}

const unidadesFormatadas = {
  km: "quilômetros",
  milhas: "milhas",
  celsius: "graus Celsius",
  fahrenheit: "graus Fahrenheit",
};

console.log(
  `${valor} ${unidadesFormatadas[unidadeOrigem]} é igual a ${resultado.toFixed(
    2
  )} ${unidadesFormatadas[unidadeDestino]}.`
);
