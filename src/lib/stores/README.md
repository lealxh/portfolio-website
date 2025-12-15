# Chat Store

Este store maneja todo el estado relacionado con el chat del portfolio.

## Estructura del Store

```typescript
interface ChatState {
  isOpen: boolean;          // ¿Está abierto el chat?
  messages: ChatMessage[];  // Array de mensajes
  isTyping: boolean;        // ¿Está el asistente escribiendo?
}

type ChatMessage = {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};
```

## Uso Básico

### Abrir/Cerrar el Chat

```svelte
<script>
  import { openChat, closeChat } from '$lib/stores/chat';
</script>

<button onclick={openChat}>Abrir Chat</button>
<button onclick={closeChat}>Cerrar Chat</button>
```

### Leer el Estado

```svelte
<script>
  import { chatStore } from '$lib/stores/chat';
</script>

{#if $chatStore.isOpen}
  <p>El chat está abierto</p>
{/if}

{#each $chatStore.messages as message}
  <div>{message.text}</div>
{/each}
```

### Agregar Mensajes

```svelte
<script>
  import { addUserMessage, addAssistantMessage } from '$lib/stores/chat';
  
  function handleSend(text: string) {
    addUserMessage(text);
    
    // Simular respuesta del asistente
    setTimeout(() => {
      addAssistantMessage('Respuesta del asistente');
    }, 1000);
  }
</script>
```

### Indicador de Typing

```svelte
<script>
  import { setTyping, chatStore } from '$lib/stores/chat';
  
  function simulateTyping() {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 2000);
  }
</script>

{#if $chatStore.isTyping}
  <p>El asistente está escribiendo...</p>
{/if}
```

## Funciones Disponibles

| Función | Parámetros | Descripción |
|---------|------------|-------------|
| `openChat()` | - | Abre el chat |
| `closeChat()` | - | Cierra el chat |
| `addUserMessage(text)` | `text: string` | Agrega un mensaje del usuario |
| `addAssistantMessage(text)` | `text: string` | Agrega un mensaje del asistente |
| `setTyping(isTyping)` | `isTyping: boolean` | Activa/desactiva el indicador de typing |
| `resetChat()` | - | Resetea el chat completamente |

## Stores Derivados

### `isChatOpen`

Store derivado de solo lectura que indica si el chat está abierto:

```svelte
<script>
  import { isChatOpen } from '$lib/stores/chat';
</script>

{#if $isChatOpen}
  <ChatModal />
{/if}
```

## Ejemplo Completo

```svelte
<script lang="ts">
  import { 
    chatStore, 
    openChat, 
    closeChat,
    addUserMessage, 
    addAssistantMessage,
    setTyping 
  } from '$lib/stores/chat';
  
  let input = '';
  
  function handleSubmit() {
    if (!input.trim()) return;
    
    // Agregar mensaje del usuario
    addUserMessage(input);
    input = '';
    
    // Simular respuesta del asistente
    setTyping(true);
    setTimeout(() => {
      addAssistantMessage('¡Gracias por tu mensaje!');
    }, 1500);
  }
</script>

{#if $chatStore.isOpen}
  <div class="chat-window">
    <button onclick={closeChat}>✕</button>
    
    {#each $chatStore.messages as message}
      <div class={message.sender}>
        {message.text}
      </div>
    {/each}
    
    {#if $chatStore.isTyping}
      <div class="typing-indicator">...</div>
    {/if}
    
    <input bind:value={input} on:submit={handleSubmit} />
  </div>
{:else}
  <button onclick={openChat}>Abrir Chat</button>
{/if}
```

## Escalabilidad Futura

Este store está diseñado para ser fácilmente extendido. Algunas funcionalidades que se pueden agregar:

- **Persistencia**: Guardar mensajes en localStorage
- **API Integration**: Conectar con un backend real
- **Typing Detection**: Detectar cuando el usuario está escribiendo
- **Read Receipts**: Marcar mensajes como leídos
- **Multi-user**: Soporte para múltiples conversaciones
- **Attachments**: Soporte para archivos adjuntos
