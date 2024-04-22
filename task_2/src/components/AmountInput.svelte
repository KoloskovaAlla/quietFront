<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label; // Добавляем связывание для передачи свойства label из родительского компонента

  // Создаем диспетчер событий для обновления значения суммы
  const dispatch = createEventDispatcher();

  // Инициализируем начальное значение суммы
  let value = '';

  // Функция для обработки изменений в поле ввода суммы
  function handleChange(event) {
    // Получаем новое значение из поля ввода
    const newValue = event.target.value;
    // Отправляем обновленное значение родительскому компоненту
    dispatch('updateAmount', newValue);
  }
</script>

<label>
  {label}:
  <input type="text" placeholder="Enter amount" bind:value={value} on:input={handleChange} />
</label>