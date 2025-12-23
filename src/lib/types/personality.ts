import { z } from 'zod';

// ============================================================================
// Zod Schemas - Define validation and infer types
// ============================================================================

export const toneSchema = z.object({
    style: z.enum(['profesional', 'casual', 'técnico', 'amigable', 'formal']),
    formality: z.enum(['muy-formal', 'semi-formal', 'informal', 'coloquial']),
    language: z.enum(['es', 'en', 'es-cl', 'es-latam']),
    personality_traits: z.array(z.string()).default([])
});

export const responseLimitsSchema = z.object({
    max_length: z.enum(['short', 'medium', 'long']),
    include_cta: z.boolean(),
    cta_type: z.enum(['discovery_call', 'contact_form', 'linkedin', 'custom']).optional(),
    cta_text: z.string().optional(),
    cta_url: z.string().url().optional()
});

export const rulesSchema = z.object({
    must_do: z.array(z.string()).min(1, 'Al menos una regla requerida'),
    must_not_do: z.array(z.string()).min(1, 'Al menos una restricción requerida'),
    response_limits: responseLimitsSchema,
    sensitive_topics: z.array(z.string()).optional(),
    canned_responses: z
        .array(
            z.object({
                trigger: z.string(),
                response: z.string()
            })
        )
        .optional()
});

export const serviceSchema = z.object({
    name: z.string(),
    description: z.string(),
    price_range: z.string().optional()
});

export const projectSchema = z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    url: z.string().url().optional()
});

export const faqSchema = z.object({
    question: z.string(),
    answer: z.string()
});

export const linkSchema = z.object({
    label: z.string(),
    url: z.string().url()
});

export const contextSchema = z.object({
    about: z.string(),
    services: z.array(serviceSchema).default([]),
    projects: z.array(projectSchema).default([]),
    faqs: z.array(faqSchema).default([]),
    custom_knowledge: z.string().default(''),
    links: z.array(linkSchema).optional()
});

export const llmSettingsSchema = z.object({
    temperature: z.number().min(0).max(1).default(0.7),
    max_tokens: z.number().min(50).max(4000).default(500),
    model_preference: z.enum([
        'claude-sonnet-4-5-20250929',
        'claude-opus-4-5-20251101',
        'claude-haiku-4-5-20251001',
        'claude-sonnet-4-20250514',
        'claude-3-5-haiku-20241022'
    ]),
    top_p: z.number().min(0).max(1).optional(),
    frequency_penalty: z.number().min(-2).max(2).optional(),
    presence_penalty: z.number().min(-2).max(2).optional()
});

export const personalitySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Nombre requerido').max(100),
    role: z.string().min(1, 'Rol requerido').max(255),
    avatar_url: z.string().url().optional().nullable(),
    tone: toneSchema,
    rules: rulesSchema,
    context: contextSchema,
    system_prompt: z.string().min(50, 'El system prompt debe tener al menos 50 caracteres'),
    llm_settings: llmSettingsSchema,
    is_active: z.boolean().default(true),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional()
});

// ============================================================================
// TypeScript Types - Inferred from Zod schemas
// ============================================================================

export type Tone = z.infer<typeof toneSchema>;
export type ResponseLimits = z.infer<typeof responseLimitsSchema>;
export type Rules = z.infer<typeof rulesSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Context = z.infer<typeof contextSchema>;
export type LLMSettings = z.infer<typeof llmSettingsSchema>;
export type Personality = z.infer<typeof personalitySchema>;

// ============================================================================
// Database Types - For Supabase integration
// ============================================================================

export interface Database {
    public: {
        Tables: {
            chatbot_personality: {
                Row: {
                    id: string;
                    name: string;
                    role: string;
                    avatar_url: string | null;
                    tone: Tone;
                    rules: Rules;
                    context: Context;
                    system_prompt: string;
                    llm_settings: LLMSettings;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    role: string;
                    avatar_url?: string | null;
                    tone: Tone;
                    rules: Rules;
                    context: Context;
                    system_prompt: string;
                    llm_settings?: LLMSettings;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    role?: string;
                    avatar_url?: string | null;
                    tone?: Tone;
                    rules?: Rules;
                    context?: Context;
                    system_prompt?: string;
                    llm_settings?: LLMSettings;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
        };
    };
}

// ============================================================================
// Default Values
// ============================================================================

export const defaultPersonality: Omit<Personality, 'id' | 'created_at' | 'updated_at'> = {
    name: 'Jose AI',
    role: 'Asistente virtual de Jose Leal',
    avatar_url: null,
    tone: {
        style: 'técnico',
        formality: 'semi-formal',
        language: 'es-cl',
        personality_traits: ['accesible', 'práctico', 'directo']
    },
    rules: {
        must_do: [
            'Saludar de forma amigable pero concisa',
            'Responder preguntas técnicas con ejemplos prácticos',
            'Mencionar proyectos relevantes cuando aplique',
            'Ofrecer agendar discovery call para consultas de proyecto'
        ],
        must_not_do: [
            'Dar precios exactos sin entender el proyecto',
            'Prometer disponibilidad inmediata',
            'Responder sobre temas no relacionados con automatización/desarrollo'
        ],
        response_limits: {
            max_length: 'medium',
            include_cta: true,
            cta_type: 'discovery_call',
            cta_text: '¿Agendamos una call de 30 min para revisar tu caso?',
            cta_url: 'https://calendly.com/joseleal'
        }
    },
    context: {
        about:
            'Jose Leal es Frontend Engineer en Globant Chile y consultor de automatizaciones con n8n. Tiene más de 10 años de experiencia en desarrollo de software, especializado en React, SvelteKit y automatización de flujos de trabajo.',
        services: [
            {
                name: 'Automatización con n8n',
                description:
                    'Diseño e implementación de flujos de trabajo automatizados usando n8n, integrando APIs, bases de datos y servicios externos.',
                price_range: '300k - 2M CLP'
            },
            {
                name: 'Consultoría técnica',
                description:
                    'Asesoría en arquitectura de automatizaciones, evaluación de herramientas y optimización de procesos.',
                price_range: 'Por hora o proyecto'
            }
        ],
        projects: [],
        faqs: [
            {
                question: '¿Qué herramientas usas para automatización?',
                answer:
                    'Principalmente n8n (self-hosted), Playwright para browser automation, y APIs de servicios como Notion, Airtable, y Supabase.'
            },
            {
                question: '¿Cuánto cuesta un proyecto de automatización?',
                answer:
                    'Depende de la complejidad. Proyectos simples desde 300k CLP, proyectos complejos pueden llegar a 2M CLP. Lo mejor es agendar una call para entender tu caso específico.'
            }
        ],
        custom_knowledge:
            'Jose está en Chile (zona horaria CLT). Trabaja como side job mientras mantiene su empleo en Globant. Prefiere proyectos con scope claro y timeline definido.'
    },
    system_prompt: `Eres {{name}}, {{role}}.

Tu personalidad:
- Tono: {{tone.style}}, {{tone.formality}}
- Rasgos: {{tone.personality_traits}}

Reglas importantes:
DEBES:
{{#each rules.must_do}}
- {{this}}
{{/each}}

NO DEBES:
{{#each rules.must_not_do}}
- {{this}}
{{/each}}

Contexto:
{{context.about}}

Servicios disponibles:
{{#each context.services}}
- {{this.name}}: {{this.description}}
{{/each}}`,
    llm_settings: {
        temperature: 0.7,
        max_tokens: 500,
        model_preference: 'claude-sonnet-4-5-20250929'
    },
    is_active: true
};
