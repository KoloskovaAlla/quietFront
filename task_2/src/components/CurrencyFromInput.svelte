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

<label>
  {label}: 
  <input type="text" placeholder="Enter currency" bind:value={value} on:input={handleChange} />
</label>