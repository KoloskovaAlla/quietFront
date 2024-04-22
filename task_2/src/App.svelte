<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import CurrencyFromInput from './components/CurrencyFromInput.svelte'
  import CurrencyToInput from './components/CurrencyToInput.svelte'
  import AmountInput from './components/AmountInput.svelte'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  // Создаем диспетчер событий для обновления значений полей ввода
  const dispatch = createEventDispatcher();

  // Инициализируем начальные значения полей ввода
  let fromCurrency = '';
  let toCurrency = '';
  let amount = '';

  // Функция для обработки изменений в поле ввода валюты
  function handleCurrencyChange(event, field) {
    const newValue = event.target.value;
    // Отправляем обновленное значение поля ввода родительскому компоненту
    dispatch('update', { field, value: newValue });
  }

  // Функция для обработки изменений в поле ввода суммы конвертации
  function handleAmountChange(event) {
    const newValue = event.target.value;
    // Отправляем обновленное значение поля ввода родительскому компоненту
    dispatch('update', { field: 'amount', value: newValue });
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
    // Вызываем функцию для получения курсов обмена с базовой валютой USD
    exchangeRates = await fetchExchangeRates('USD');
    console.log(exchangeRates);
  });

</script>



<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <div class="card">
    <CurrencyFromInput label="From" bind:value={fromCurrency} on:update={handleCurrencyChange} />
    <CurrencyToInput label="To" bind:value={toCurrency} on:update={handleCurrencyChange} />
    <AmountInput label="Amount" bind:value={amount} on:update={handleAmountChange} />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
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
</style>
