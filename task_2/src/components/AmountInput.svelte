<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label; // Проп label
  export let value; // Проп value

  // Создаем диспетчер событий для обновления значения суммы
  const dispatch = createEventDispatcher();

  // Функция для обработки изменений в поле ввода суммы
  function handleChange(event) {
    // Получаем новое значение из поля ввода
    const newValue = event.target.value;
    // Отправляем обновленное значение родительскому компоненту
    dispatch('change', newValue);
  }
</script>

<label>
  {label}:
  <input type="text" placeholder="Enter amount" bind:value={value} on:change={handleChange} />
</label>