const button = document.getElementById('button')
const select = document.getElementById('select')

const convertValues = async () => {
    const inputReais = document.getElementById('input-reais').value
    const reaisValue = document.getElementById('reais-value')
    const textValue = document.getElementById('text-value')

    //Faz uma solicitação para uma API que fornece informações de câmbio (Dólar, Euro, Bitcoin em relação ao Real Brasileiro) e aguarda a resposta. O resultado é convertido em formato JSON, e os dados são armazenados na variável data.
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json())

    //Extrai a taxa de câmbio do Dólar dos EUA do objeto data e armazena na variável dolar.
    const dolar = data.USDBRL.high
    //Extrai a taxa de câmbio do Euro do objeto data e armazena na variável euro.
    const euro = data.EURBRL.high
    //Extrai a taxa de câmbio do Bitcoin do objeto data e armazena na variável bitcoin.
    const bitcoin =  data.BTCBRL.high

    //Formata o valor em reias
    reaisValue.innerHTML = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
    }).format(inputReais)

    //Seleção da moeda
    if (select.value === "US$ Dólar"){
    textValue.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(inputReais / dolar)}

    if (select.value === "€ Euro"){
      textValue.innerHTML = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
      }).format(inputReais / euro)}

    if (select.value === "Bitcoin"){
    textValue.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BTC",
  }).format(inputReais * bitcoin)}
};

const changeCurrency = () => {
  const currencyName = document.getElementById('currency-name')
  const currencyImg = document.getElementById('currency-img')

if (select.value === 'Bitcoin'){
    currencyName.innerHTML = 'Bitcoin'
    currencyImg.src = "./assets/bitcoin.png"
  }

if (select.value === 'US$ Dólar'){
    currencyName.innerHTML = 'Dolar Americano'
    currencyImg.src = "./assets/estados-unidos.png"
  }

  if (select.value === '€ Euro'){
    currencyName.innerHTML = 'Euro'
    currencyImg.src = "./assets/euro.png"
  }

  convertValues()
}

button.addEventListener('click', convertValues)
select.addEventListener('change', changeCurrency)
