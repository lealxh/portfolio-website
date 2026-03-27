import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { N8N_WEBHOOK_URL } from '$env/static/private';

const TIMEOUT_MS = 15000;

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.message || typeof body.message !== 'string') {
      throw error(400, 'Message is required');
    }

    if (body.message.trim().length === 0) {
      throw error(400, 'Message cannot be empty');
    }

    if (body.message.length > 1000) {
      throw error(400, 'Message too long (max 1000 characters)');
    }

    const sessionId = body.session_id || crypto.randomUUID();

    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL not configured');
      throw error(500, 'Chatbot service not configured');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatInput: body.message.trim(),
          sessionId: sessionId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseText = await n8nResponse.text();

      if (!n8nResponse.ok) {
        console.error('n8n error:', {
          status: n8nResponse.status,
          statusText: n8nResponse.statusText,
          text: responseText
        });
        throw error(502, 'Chatbot service unavailable');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('Failed to parse n8n response:', {
          error: jsonError,
          responseText: responseText.slice(0, 1000)
        });
        throw error(502, 'Invalid response format from chatbot');
      }

      return json({
        session_id: data.sessionId || sessionId,
        response: data.response || 'Lo siento, no pude procesar tu mensaje.'
      });

    } catch (e: any) {
      clearTimeout(timeoutId);

      if (e.name === 'AbortError') {
        console.error('Request timeout to n8n');
        throw error(504, 'Request timeout. Please try again.');
      }

      throw e;
    }

  } catch (e: any) {
    if (e.status) throw e;

    console.error('Chat API error:', e);
    throw error(500, 'Internal server error');
  }
};
