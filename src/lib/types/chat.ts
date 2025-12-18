/**
 * Chat Types - Phase 2
 * Types for the chatbot integration with n8n and Claude
 */

export type UserType = 'recruiter' | 'potential_client' | 'general';
export type MessageRole = 'user' | 'assistant';

/**
 * Message structure for the chat interface
 */
export interface ChatMessage {
  id?: string;
  role: MessageRole;
  content: string;
  timestamp?: string;
}

/**
 * Request payload sent to the API
 */
export interface ChatRequest {
  session_id?: string;
  message: string;
  timestamp?: string;
}

/**
 * Response from the API
 */
export interface ChatResponse {
  session_id: string;
  response: string;
  user_type: UserType;
}

/**
 * Complete chat state
 */
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  isOpen: boolean;
}
