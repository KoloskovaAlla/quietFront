<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label; 
  export let value;  
  const dispatch = createEventDispatcher();

  function handleChange(event) {  
    const newValue = event.target.value;
    dispatch('change', newValue);
  }
</script>

<div class="input-container">
<label class="amount-label">
  {label}:
  <input type="text" placeholder="Enter amount" bind:value={value} on:input={handleChange} />
</label>
</div>