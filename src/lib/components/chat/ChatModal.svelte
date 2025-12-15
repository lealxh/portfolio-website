<script lang="ts">
  import {
    chatStore,
    closeChat,
    addUserMessage,
    setTyping,
    addAssistantMessage
  } from '$lib/stores/chat';
  import ChatQuickActions from './ChatQuickActions.svelte';

  let message = $state('');

  // Reactive references to store values
  let messages = $derived($chatStore.messages);
  let isTyping = $derived($chatStore.isTyping);

  function sendMessage() {
    if (!message.trim()) return;

    // Add user message to store
    addUserMessage(message);
    message = '';

    // Simulate assistant typing
    setTyping(true);
    setTimeout(() => {
      const responses = [
        'Gracias por tu mensaje. José suele responder en menos de 24 horas. También puedes contactarlo directamente por email o LinkedIn.',
        'Interesante pregunta. Puedo ayudarte con información general sobre los proyectos de José. ¿Hay algo específico que te gustaría saber?',
        'José está especializado en Frontend Engineering y Automatización. ¿Te gustaría conocer más sobre algún proyecto en particular?',
        'Para consultas específicas o propuestas de proyectos, te recomiendo contactar a José directamente por email: lealxh@gmail.com'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addAssistantMessage(randomResponse);
    }, 1500);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeChat();
    }
  }
</script>

<div
  class="fixed inset-0 z-40 flex items-end justify-center bg-black/50 p-0 sm:items-end sm:justify-end sm:p-4"
  onclick={handleBackdropClick}
  role="dialog"
  aria-modal="true"
  aria-labelledby="chat-title"
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
          <h3 id="chat-title" class="text-sm font-semibold text-text-primary">Asistente Virtual</h3>
          <p class="text-xs text-text-muted">En línea</p>
        </div>
      </div>
      <button
        onclick={closeChat}
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
    <div class="flex-1 space-y-4 overflow-y-auto p-4">
      {#each messages as msg (msg.id)}
        <div class="flex {msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
          <div
            class="max-w-[80%] {msg.sender === 'user'
              ? 'bg-accent'
              : 'bg-bg-tertiary'} rounded-2xl px-4 py-2"
          >
            <p class="text-sm {msg.sender === 'user' ? 'text-white' : 'text-text-primary'}">
              {msg.text}
            </p>
            <span
              class="text-xs {msg.sender === 'user'
                ? 'text-white/80'
                : 'text-text-muted'} mt-1 block"
            >
              {msg.timestamp.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      {/each}

      {#if isTyping}
        <div class="flex justify-start">
          <div class="rounded-2xl bg-bg-tertiary px-4 py-3">
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
          class="flex-1 rounded-full bg-bg-tertiary px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Mensaje de chat"
        />
        <button
          onclick={sendMessage}
          disabled={!message.trim()}
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
    </div>
  </div>
</div>
