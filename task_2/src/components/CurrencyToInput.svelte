<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value; 
  export let label; 
 
  const dispatch = createEventDispatcher();
 
  function handleChange(event) {
    const newValue = event.target.value;  
    dispatch('change', newValue);
  }
</script>

<label>
  {label}: <!-- Отображаем label перед полем ввода -->
  <input type="text" placeholder="Enter currency" bind:value={value} on:change={handleChange} />
</label>