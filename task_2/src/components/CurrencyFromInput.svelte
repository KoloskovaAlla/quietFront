<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Создаем диспетчер событий для обновления значения валюты
  const dispatch = createEventDispatcher();

  // Инициализируем начальное значение валюты
  let value = '';

  // Функция для обработки изменений в поле ввода валюты
  function handleChange(event) {
    // Получаем новое значение из поля ввода
    const newValue = event.target.value;
    // Отправляем обновленное значение родительскому компоненту
    dispatch('updateFrom', newValue);
  }
</script>

<label>
  From:
  <input type="text" placeholder="Enter currency" bind:value={value} on:input={handleChange} />
</label>