import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { N8N_WEBHOOK_URL } from '$env/static/private';

const TIMEOUT_MS = 15000; // 15 segundos de timeout

/**
 * POST /api/chat
 *
 * Endpoint para recibir mensajes del chatbot y forwardearlos a n8n.
 *
 * Flow:
 * 1. Valida el input del usuario
 * 2. Genera o valida el session_id
 * 3. Forward el mensaje a n8n webhook
 * 4. Retorna la respuesta de Claude al frontend
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    // ============================================
    // VALIDACIÓN DE INPUT
    // ============================================

    if (!body.message || typeof body.message !== 'string') {
      throw error(400, 'Message is required');
    }

    if (body.message.trim().length === 0) {
      throw error(400, 'Message cannot be empty');
    }

    if (body.message.length > 1000) {
      throw error(400, 'Message too long (max 1000 characters)');
    }

    // ============================================
    // SESSION ID
    // ============================================

    // Si no viene session_id, generar uno nuevo
    const sessionId = body.session_id || crypto.randomUUID();

    // ============================================
    // VERIFICAR N8N_WEBHOOK_URL
    // ============================================

    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL not configured');
      throw error(500, 'Chatbot service not configured');
    }

    // ============================================
    // FORWARD A N8N CON TIMEOUT
    // ============================================

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: body.message.trim(),
          timestamp: body.timestamp || new Date().toISOString()
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // ============================================
      // MANEJAR RESPUESTA DE N8N
      // ============================================

      if (!n8nResponse.ok) {
        console.error('n8n error:', {
          status: n8nResponse.status,
          statusText: n8nResponse.statusText,
          text: await n8nResponse.text()
        });
        throw error(502, 'Chatbot service unavailable');
      }

      const data = await n8nResponse.json();

      // ============================================
      // RETORNAR RESPUESTA AL FRONTEND
      // ============================================

      return json({
        session_id: sessionId,
        response: data.response,
        user_type: data.user_type
      });

    } catch (e: any) {
      clearTimeout(timeoutId);

      // Timeout error
      if (e.name === 'AbortError') {
        console.error('Request timeout to n8n');
        throw error(504, 'Request timeout. Please try again.');
      }

      // Re-throw otros errores
      throw e;
    }

  } catch (e: any) {
    // Si ya es un error de SvelteKit, re-lanzar
    if (e.status) throw e;

    // Error genérico
    console.error('Chat API error:', e);
    throw error(500, 'Internal server error');
  }
};
