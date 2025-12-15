<script lang="ts">
  import { openChat } from '$lib/stores/chat';

  let showTooltip = $state(false);
</script>

<div
  class="fixed bottom-6 right-6 z-50"
  role="group"
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}
>
  {#if showTooltip}
    <div
      class="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg border border-border-primary bg-white px-3 py-2 text-sm text-text-secondary shadow-md dark:bg-bg-secondary"
    >
      Habla conmigo
    </div>
  {/if}

  <button
    onclick={openChat}
    class="flex h-14 w-14 items-center justify-center rounded-full border-0 bg-accent shadow-lg transition-all duration-200 hover:scale-110 hover:bg-accent-hover"
    aria-label="Abrir chat"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="h-6 w-6 text-white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  </button>
</div>
