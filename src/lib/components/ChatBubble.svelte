<script lang="ts">
  let showTooltip = $state(false);
  let showChat = $state(false);
  let message = $state('');

  type Message = {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
  };

  let messages = $state<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy el asistente virtual de José. ¿En qué puedo ayudarte hoy?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);

  let isTyping = $state(false);

  function sendMessage() {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    messages = [...messages, userMessage];
    message = '';

    // Simulate assistant typing
    isTyping = true;
    setTimeout(() => {
      const responses = [
        'Gracias por tu mensaje. José suele responder en menos de 24 horas. También puedes contactarlo directamente por email o LinkedIn.',
        'Interesante pregunta. Puedo ayudarte con información general sobre los proyectos de José. ¿Hay algo específico que te gustaría saber?',
        'José está especializado en Frontend Engineering y Automatización. ¿Te gustaría conocer más sobre algún proyecto en particular?',
        'Para consultas específicas o propuestas de proyectos, te recomiendo contactar a José directamente por email: lealxh@gmail.com'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      messages = [...messages, assistantMessage];
      isTyping = false;
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
      showChat = false;
    }
  }
</script>

{#if showChat}
  <div class="fixed inset-0 bg-black/50 z-40 flex items-end sm:items-end justify-center sm:justify-end p-0 sm:p-4" onclick={handleBackdropClick}>
    <div
      class="bg-white dark:bg-dark-100 border-t sm:border border-gray-300 dark:border-text-muted/20 sm:rounded-2xl w-full sm:max-w-md h-[90vh] sm:h-[600px] flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-300 dark:border-text-muted/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-text-primary">Asistente Virtual</h3>
            <p class="text-xs text-text-muted">En línea</p>
          </div>
        </div>
        <button onclick={() => showChat = false} class="text-gray-500 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-primary transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        {#each messages as msg (msg.id)}
          <div class="flex {msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[80%] {msg.sender === 'user' ? 'bg-accent' : 'bg-gray-200 dark:bg-dark-200'} rounded-2xl px-4 py-2">
              <p class="text-sm {msg.sender === 'user' ? 'text-white' : 'text-gray-900 dark:text-white'}">{msg.text}</p>
              <span class="text-xs {msg.sender === 'user' ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'} mt-1 block">
                {msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        {/each}

        {#if isTyping}
          <div class="flex justify-start">
            <div class="bg-gray-200 dark:bg-dark-200 rounded-2xl px-4 py-3">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-gray-500 dark:bg-text-muted rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-gray-500 dark:bg-text-muted rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-gray-500 dark:bg-text-muted rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Quick Actions -->
      <div class="px-4 py-2 border-t border-gray-300 dark:border-text-muted/20">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            onclick={() => { message = '¿Qué proyectos has desarrollado?'; sendMessage(); }}
            class="text-xs px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-dark-200 dark:hover:bg-dark text-gray-700 dark:text-text-secondary rounded-full whitespace-nowrap transition-colors"
          >
            Ver proyectos
          </button>
          <button
            onclick={() => { message = '¿Cuál es tu experiencia?'; sendMessage(); }}
            class="text-xs px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-dark-200 dark:hover:bg-dark text-gray-700 dark:text-text-secondary rounded-full whitespace-nowrap transition-colors"
          >
            Experiencia
          </button>
          <button
            onclick={() => { message = '¿Cómo puedo contactarte?'; sendMessage(); }}
            class="text-xs px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-dark-200 dark:hover:bg-dark text-gray-700 dark:text-text-secondary rounded-full whitespace-nowrap transition-colors"
          >
            Contacto
          </button>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 border-t border-gray-300 dark:border-text-muted/20">
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={message}
            onkeypress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            class="flex-1 bg-gray-100 dark:bg-dark-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-text-muted px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onclick={sendMessage}
            disabled={!message.trim()}
            class="w-10 h-10 rounded-full bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<div
  class="fixed bottom-6 right-6 z-50"
  role="group"
  onmouseenter={() => showTooltip = true}
  onmouseleave={() => showTooltip = false}
>
  {#if showTooltip && !showChat}
    <div
      class="absolute bottom-full right-0 mb-2 px-3 py-2 bg-white dark:bg-dark-100 border border-gray-300 dark:border-text-muted/20 rounded-lg text-sm text-gray-700 dark:text-text-secondary whitespace-nowrap"
    >
      Habla conmigo
    </div>
  {/if}

  <button
    onclick={() => showChat = true}
    class="w-14 h-14 rounded-full bg-accent hover:bg-accent-hover border-0 flex items-center justify-center transition-all duration-200 hover:scale-110"
    aria-label="Abrir chat"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="w-6 h-6 text-white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  </button>
</div>
