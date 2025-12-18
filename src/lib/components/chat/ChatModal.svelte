<script lang="ts">
  import { onMount } from 'svelte';
  import { chatStore } from '$lib/stores/chat';
  import ChatQuickActions from './ChatQuickActions.svelte';

  let message = $state('');
  let messagesContainer: HTMLDivElement;

  // Reactive references to store values
  let messages = $derived($chatStore.messages);
  let isLoading = $derived($chatStore.isLoading);
  let error = $derived($chatStore.error);

  // Inicializar el chat cuando se monta el componente
  onMount(() => {
    chatStore.init();
  });

  // Auto-scroll cuando llegan nuevos mensajes
  $effect(() => {
    if (messages.length > 0 && messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  });

  async function sendMessage() {
    if (!message.trim() || isLoading) return;

    const messageToSend = message;
    message = ''; // Limpiar input inmediatamente

    await chatStore.sendMessage(messageToSend);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      chatStore.close();
    }
  }

  function dismissError() {
    chatStore.clearError();
  }
</script>

<div
  class="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-0 sm:items-end sm:justify-end sm:p-4"
  onclick={handleBackdropClick}
  onkeydown={(e) => e.key === 'Escape' && chatStore.close()}
  role="dialog"
  aria-modal="true"
  aria-labelledby="chat-title"
  tabindex="-1"
>
  <div
    class="flex h-[90vh] w-full flex-col border-t border-border-primary bg-white shadow-2xl dark:bg-bg-secondary sm:h-[600px] sm:max-w-md sm:rounded-2xl sm:border"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-border-primary p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
          <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div>
          <h3 id="chat-title" class="text-sm font-semibold text-text-primary">José Leal</h3>
          <p class="text-xs text-text-muted">
            {isLoading ? 'Escribiendo...' : 'En línea'}
          </p>
        </div>
      </div>
      <button
        onclick={() => chatStore.close()}
        class="text-text-muted transition-colors hover:text-text-primary"
        aria-label="Cerrar chat"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Messages -->
    <div
      bind:this={messagesContainer}
      class="flex-1 space-y-4 overflow-y-auto p-4 scroll-smooth"
    >
      {#each messages as msg, index (index)}
        <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div
            class="max-w-[80%] {msg.role === 'user'
              ? 'bg-accent text-white'
              : 'bg-bg-tertiary text-text-primary'} rounded-2xl px-4 py-2 shadow-sm"
          >
            <p class="whitespace-pre-wrap text-sm leading-relaxed">
              {msg.content}
            </p>
            {#if msg.timestamp}
              <span
                class="text-xs {msg.role === 'user'
                  ? 'text-white/80'
                  : 'text-text-muted'} mt-1 block"
              >
                {new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            {/if}
          </div>
        </div>
      {/each}

      <!-- Loading indicator -->
      {#if isLoading}
        <div class="flex justify-start">
          <div class="rounded-2xl bg-bg-tertiary px-4 py-3 shadow-sm">
            <div class="flex gap-1">
              <div
                class="h-2 w-2 animate-bounce rounded-full bg-text-muted"
                style="animation-delay: 0ms"
              ></div>
              <div
                class="h-2 w-2 animate-bounce rounded-full bg-text-muted"
                style="animation-delay: 150ms"
              ></div>
              <div
                class="h-2 w-2 animate-bounce rounded-full bg-text-muted"
                style="animation-delay: 300ms"
              ></div>
            </div>
          </div>
        </div>
      {/if}

      <!-- Error message -->
      {#if error}
        <div class="flex justify-center">
          <div
            class="max-w-[90%] rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300"
          >
            <div class="flex items-start gap-2">
              <svg
                class="mt-0.5 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div class="flex-1">
                <p>{error}</p>
              </div>
              <button
                onclick={dismissError}
                class="flex-shrink-0 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                aria-label="Cerrar error"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Quick Actions -->
    <ChatQuickActions />

    <!-- Input -->
    <div class="border-t border-border-primary p-4">
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={message}
          onkeypress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
          class="flex-1 rounded-full bg-bg-tertiary px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Mensaje de chat"
        />
        <button
          onclick={sendMessage}
          disabled={!message.trim() || isLoading}
          class="flex h-10 w-10 items-center justify-center rounded-full bg-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar mensaje"
        >
          <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>

      <!-- Character counter (opcional) -->
      {#if message.length > 800}
        <p class="mt-1 text-right text-xs {message.length > 1000 ? 'text-red-500' : 'text-text-muted'}">
          {message.length}/1000
        </p>
      {/if}
    </div>
  </div>
</div>
