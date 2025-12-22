import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from './types/personality';

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

// ============================================================================
// API Functions for Chatbot Personality
// ============================================================================

/**
 * Get the active chatbot personality configuration
 */
export async function getActivePersonality() {
    const { data, error } = await supabase
        .from('chatbot_personality')
        .select('*')
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching active personality:', error);
        return null;
    }

    return data;
}

/**
 * Get all chatbot personalities
 */
export async function getAllPersonalities() {
    const { data, error } = await supabase
        .from('chatbot_personality')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Error fetching personalities:', error);
        return [];
    }

    return data;
}

/**
 * Get a specific personality by ID
 */
export async function getPersonalityById(id: string) {
    const { data, error } = await supabase
        .from('chatbot_personality')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching personality:', error);
        return null;
    }

    return data;
}

/**
 * Create a new personality
 */
export async function createPersonality(personality: Database['public']['Tables']['chatbot_personality']['Insert']) {
    const { data, error } = await supabase
        .from('chatbot_personality')
        .insert(personality)
        .select()
        .single();

    if (error) {
        console.error('Error creating personality:', error);
        throw error;
    }

    return data;
}

/**
 * Update an existing personality
 */
export async function updatePersonality(
    id: string,
    updates: Database['public']['Tables']['chatbot_personality']['Update']
) {
    const { data, error } = await supabase
        .from('chatbot_personality')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating personality:', error);
        throw error;
    }

    return data;
}

/**
 * Delete a personality
 */
export async function deletePersonality(id: string) {
    const { error } = await supabase.from('chatbot_personality').delete().eq('id', id);

    if (error) {
        console.error('Error deleting personality:', error);
        throw error;
    }
}

/**
 * Set a personality as active (and deactivate others)
 */
export async function setActivePersonality(id: string) {
    // First, deactivate all personalities
    await supabase.from('chatbot_personality').update({ is_active: false }).neq('id', id);

    // Then activate the selected one
    const { data, error } = await supabase
        .from('chatbot_personality')
        .update({ is_active: true })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error setting active personality:', error);
        throw error;
    }

    return data;
}
