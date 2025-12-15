<script lang="ts">
  import ArrowUpIcon from './icons/ArrowUpIcon.svelte';

  let { text = 'Volver arriba' } = $props();
</script>

<a
  href="#hero"
  class="inline-flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
>
  <ArrowUpIcon />
  {text}
</a>
