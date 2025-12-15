<script lang="ts">
  import { chatStore } from '$lib/stores/chat';
  import ChatButton from './chat/ChatButton.svelte';
  import ChatModal from './chat/ChatModal.svelte';

  let isOpen = $derived($chatStore.isOpen);
</script>

{#if isOpen}
  <ChatModal />
{/if}

<ChatButton />
