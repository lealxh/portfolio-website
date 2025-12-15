import { writable, derived } from 'svelte/store';

/**
 * Message type definition
 */
export type ChatMessage = {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
};

/**
 * Chat state interface
 */
export interface ChatState {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
}

/**
 * Initial chat state with welcome message
 */
const initialState: ChatState = {
    isOpen: false,
    messages: [
        {
            id: 1,
            text: '¡Hola! Soy el asistente virtual de José. ¿En qué puedo ayudarte hoy?',
            sender: 'assistant',
            timestamp: new Date()
        }
    ],
    isTyping: false
};

/**
 * Main chat store
 * This store manages all chat-related state: visibility, messages, and typing indicator
 */
export const chatStore = writable<ChatState>(initialState);

/**
 * Derived store for chat visibility (for backward compatibility)
 */
export const isChatOpen = derived(chatStore, $chat => $chat.isOpen);

/**
 * Helper function to open the chat
 */
export function openChat() {
    chatStore.update(state => ({ ...state, isOpen: true }));
}

/**
 * Helper function to close the chat
 */
export function closeChat() {
    chatStore.update(state => ({ ...state, isOpen: false }));
}

/**
 * Helper function to add a user message
 */
export function addUserMessage(text: string) {
    chatStore.update(state => ({
        ...state,
        messages: [
            ...state.messages,
            {
                id: state.messages.length + 1,
                text,
                sender: 'user',
                timestamp: new Date()
            }
        ]
    }));
}

/**
 * Helper function to add an assistant message
 */
export function addAssistantMessage(text: string) {
    chatStore.update(state => ({
        ...state,
        messages: [
            ...state.messages,
            {
                id: state.messages.length + 1,
                text,
                sender: 'assistant',
                timestamp: new Date()
            }
        ],
        isTyping: false
    }));
}

/**
 * Helper function to set typing indicator
 */
export function setTyping(isTyping: boolean) {
    chatStore.update(state => ({ ...state, isTyping }));
}

/**
 * Helper function to reset chat (clear messages and close)
 */
export function resetChat() {
    chatStore.set(initialState);
}
