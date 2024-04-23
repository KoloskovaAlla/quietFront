<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import CurrencyFromInput from './components/CurrencyFromInput.svelte';
  import CurrencyToInput from './components/CurrencyToInput.svelte';
  import AmountInput from './components/AmountInput.svelte';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();
  
  let fromCurrency = '';
  let toCurrency = '';
  let amount = '';
  let fromRate;
  let toRate;
  let convertedAmount = 0;

  function recalculate() {
    if (!exchangeRates) return;

    fromRate = exchangeRates.rates[fromCurrency];
    toRate = exchangeRates.rates[toCurrency];

    if (!fromRate || !toRate) {
      console.error('Exchange rates not available for selected currencies');
      return;
    }

    convertedAmount = (amount / fromRate) * toRate;    
  }

  function handleFromCurrencyChange(event) {
    console.log('первая валюта')
    fromCurrency = event.detail;
    recalculate();
  }

  function handleToCurrencyChange(event) {
    toCurrency = event.detail;
    recalculate();
  }

  function handleAmountChange(event) {    
    amount = event.detail;
    recalculate();
  }

  async function fetchExchangeRates(baseCurrency) {
    const url = `https://open.er-api.com/v6/latest/${baseCurrency}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return null;
    }
  }

  let exchangeRates;

  onMount(async () => {
    exchangeRates = await fetchExchangeRates('USD');
  });
</script>

<main>
  <div class="card">
    <CurrencyFromInput label="From" bind:value={fromCurrency} on:change{handleFromCurrencyChange} />
    <CurrencyToInput label="To" bind:value={toCurrency} on:change={handleToCurrencyChange} />
    <AmountInput label="Amount" bind:value={amount} on:change={handleAmountChange} />
  </div>

  <div class="card">
    <p class="result">Converted amount: {convertedAmount.toFixed(2)} {toCurrency}</p>
  </div>

  <div class="card">
    <Counter />
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  .input-container {
    display: flex;
    align-items: center; /* Выравниваем элементы по вертикали */
  }
  .amount-label {
    display: inline-block;
    width: 70px; /* Задайте ширину по вашему усмотрению */
    text-align: right;
    margin-right: 10px; /* Расстояние между меткой и полем ввода */
  }
</style>