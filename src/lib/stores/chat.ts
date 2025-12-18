import { writable, get } from 'svelte/store';
import type { ChatMessage, ChatState, ChatResponse } from '$lib/types/chat';

// ============================================
// CONSTANTES
// ============================================

const STORAGE_KEY = 'portfolio-chat-session';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Obtiene o crea un session_id en localStorage
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem(STORAGE_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  return sessionId;
}

// ============================================
// ESTADO INICIAL
// ============================================

const initialState: ChatState = {
  messages: [
    {
      role: 'assistant',
      content: '¡Hola! Soy José Leal, Frontend Engineer y especialista en automatización. ¿En qué puedo ayudarte?',
      timestamp: new Date().toISOString()
    }
  ],
  isLoading: false,
  error: null,
  sessionId: '',
  isOpen: false
};

// ============================================
// STORE CREATION
// ============================================

function createChatStore() {
  const { subscribe, set, update } = writable<ChatState>(initialState);

  return {
    subscribe,

    /**
     * Inicializa el chat store (obtiene/crea session_id)
     */
    init: () => {
      update((state) => ({
        ...state,
        sessionId: getOrCreateSessionId()
      }));
    },

    /**
     * Abre el modal del chat
     */
    open: () => {
      update((state) => ({ ...state, isOpen: true }));
    },

    /**
     * Cierra el modal del chat
     */
    close: () => {
      update((state) => ({ ...state, isOpen: false }));
    },

    /**
     * Agrega un mensaje al historial
     */
    addMessage: (message: ChatMessage) => {
      update((state) => ({
        ...state,
        messages: [...state.messages, message],
        error: null
      }));
    },

    /**
     * Setea el estado de loading
     */
    setLoading: (isLoading: boolean) => {
      update((state) => ({ ...state, isLoading }));
    },

    /**
     * Setea un error
     */
    setError: (error: string | null) => {
      update((state) => ({ ...state, error, isLoading: false }));
    },

    /**
     * Limpia el error actual
     */
    clearError: () => {
      update((state) => ({ ...state, error: null }));
    },

    /**
     * Envía un mensaje al chatbot
     *
     * Flow:
     * 1. Agrega mensaje del usuario al UI
     * 2. Setea loading
     * 3. Llama al API /api/chat
     * 4. Agrega respuesta del asistente
     * 5. Maneja errores
     */
    sendMessage: async (text: string) => {
      if (!text.trim()) return;

      const state = get(chatStore);

      // Agregar mensaje del usuario inmediatamente
      update((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            role: 'user',
            content: text.trim(),
            timestamp: new Date().toISOString()
          }
        ],
        isLoading: true,
        error: null
      }));

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: state.sessionId,
            message: text.trim()
          })
        });

        if (!response.ok) {
          // Intentar extraer mensaje de error del servidor
          let errorMessage = 'No pude procesar tu mensaje. Intenta de nuevo.';

          try {
            const errorData = await response.json();
            if (errorData.message) {
              errorMessage = errorData.message;
            }
          } catch {
            // Si no se puede parsear el error, usar mensaje genérico
            if (response.status === 400) {
              errorMessage = 'Mensaje inválido. Intenta con un texto más corto.';
            } else if (response.status === 502) {
              errorMessage = 'El servicio de chat no está disponible. Intenta más tarde.';
            } else if (response.status === 504) {
              errorMessage = 'La solicitud tardó demasiado. Intenta de nuevo.';
            }
          }

          throw new Error(errorMessage);
        }

        const data: ChatResponse = await response.json();

        // Agregar respuesta del asistente
        update((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              role: 'assistant',
              content: data.response,
              timestamp: new Date().toISOString()
            }
          ],
          isLoading: false
        }));

      } catch (e: any) {
        console.error('Chat error:', e);

        update((state) => ({
          ...state,
          isLoading: false,
          error: e.message || 'Ocurrió un error inesperado. Intenta de nuevo.'
        }));
      }
    },

    /**
     * Resetea el chat completamente
     * - Elimina session_id
     * - Limpia mensajes
     * - Genera nueva sesión
     */
    reset: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }

      set({
        ...initialState,
        sessionId: getOrCreateSessionId()
      });
    }
  };
}

// ============================================
// EXPORT
// ============================================

export const chatStore = createChatStore();

// Backward compatibility exports
export const openChat = chatStore.open;
export const closeChat = chatStore.close;
export const addUserMessage = (text: string) => chatStore.addMessage({ role: 'user', content: text });
export const addAssistantMessage = (text: string) => chatStore.addMessage({ role: 'assistant', content: text });
export const setTyping = chatStore.setLoading;
export const resetChat = chatStore.reset;
