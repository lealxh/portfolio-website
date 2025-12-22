import { getActivePersonality } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const personality = await getActivePersonality();

    return {
        personality
    };
};
