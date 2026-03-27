export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id?: string;
  role: MessageRole;
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  session_id?: string;
  message: string;
}

export interface ChatResponse {
  session_id: string;
  response: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  isOpen: boolean;
}
