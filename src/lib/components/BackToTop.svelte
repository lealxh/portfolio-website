<script lang="ts">
    import ArrowUpIcon from "./icons/ArrowUpIcon.svelte";

    let { text = "Volver arriba" } = $props();
</script>

<a
    href="#hero"
    class="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-2"
>
    <ArrowUpIcon />
    {text}
</a>
