<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label; // Добавляем проп label
  export let value; // Добавляем проп value

  // Создаем диспетчер событий для обновления значения валюты
  const dispatch = createEventDispatcher();

  // Функция для обработки изменений в поле ввода валюты
  function handleChange(event) {
    // Получаем новое значение из поля ввода
    const newValue = event.target.value;
    // Отправляем обновленное значение родительскому компоненту
    dispatch('change', newValue);
    console.log(newValue)
  }
</script>

<label>
  {label}:
  <input type="text" placeholder="Enter currency" bind:value={value} on:change={handleChange} />
</label>