<script lang="ts">
  import { personalitySchema, type Personality } from '$lib/types/personality';
  import { updatePersonality, createPersonality } from '$lib/supabase';
  import ToneSelector from './ToneSelector.svelte';
  import RulesEditor from './RulesEditor.svelte';
  import ContextEditor from './ContextEditor.svelte';
  import LLMSettingsEditor from './LLMSettingsEditor.svelte';

  interface Props {
    personality?: Personality;
    onSave?: () => void;
  }

  let { personality, onSave }: Props = $props();

  let formData = $state(
    personality || {
      name: '',
      role: '',
      avatar_url: null,
      tone: {
        style: 'profesional' as const,
        formality: 'semi-formal' as const,
        language: 'es-cl' as const,
        personality_traits: []
      },
      rules: {
        must_do: [],
        must_not_do: [],
        response_limits: {
          max_length: 'medium' as const,
          include_cta: true
        }
      },
      context: {
        about: '',
        services: [],
        projects: [],
        faqs: [],
        custom_knowledge: ''
      },
      system_prompt: '',
      llm_settings: {
        temperature: 0.7,
        max_tokens: 500,
        model_preference: 'claude-3-sonnet' as const
      },
      is_active: true
    }
  );

  let errors = $state<Record<string, string>>({});
  let isSaving = $state(false);
  let saveMessage = $state('');

  async function handleSubmit() {
    errors = {};
    saveMessage = '';
    isSaving = true;

    try {
      // Remove auto-generated fields before validation
      const { id, created_at, updated_at, ...dataToValidate } = formData;

      // Validate with Zod (using omit to exclude auto-generated fields from schema)
      const validated = personalitySchema
        .omit({ id: true, created_at: true, updated_at: true })
        .parse(dataToValidate);

      // Save to Supabase
      if (personality?.id) {
        await updatePersonality(personality.id, validated);
        saveMessage = '✅ Configuración actualizada exitosamente';
      } else {
        await createPersonality(validated);
        saveMessage = '✅ Configuración creada exitosamente';
      }

      onSave?.();
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        saveMessage = '❌ Por favor corrige los errores en el formulario';
      } else {
        saveMessage = `❌ Error al guardar: ${error.message}`;
      }
    } finally {
      isSaving = false;
    }
  }
</script>

<form
  onsubmit={(e: SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  }}
  class="space-y-8"
>
  <!-- Basic Information -->
  <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Información Básica</h2>

    <div class="space-y-4">
      <div>
        <label for="name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Nombre del Chatbot
        </label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Jose AI"
          required
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        {/if}
      </div>

      <div>
        <label for="role" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Rol
        </label>
        <input
          type="text"
          id="role"
          bind:value={formData.role}
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Asistente virtual de Jose Leal"
          required
        />
        {#if errors.role}
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role}</p>
        {/if}
      </div>

      <div>
        <label
          for="avatar_url"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Avatar URL (opcional)
        </label>
        <input
          type="url"
          id="avatar_url"
          bind:value={formData.avatar_url}
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="https://example.com/avatar.png"
        />
      </div>
    </div>
  </div>

  <!-- Tone Configuration -->
  <ToneSelector bind:tone={formData.tone} {errors} />

  <!-- Rules Configuration -->
  <RulesEditor bind:rules={formData.rules} {errors} />

  <!-- Context Configuration -->
  <ContextEditor bind:context={formData.context} {errors} />

  <!-- System Prompt -->
  <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">System Prompt</h2>

    <div>
      <label
        for="system_prompt"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Prompt Base
      </label>
      <textarea
        id="system_prompt"
        bind:value={formData.system_prompt}
        rows="10"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder="Eres nombre_del_bot, rol_del_bot..."
        required
      ></textarea>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Puedes usar placeholders como {'{{name}}'}, {'{{role}}'}, {'{{tone.style}}'}, etc.
      </p>
      {#if errors.system_prompt}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.system_prompt}</p>
      {/if}
    </div>
  </div>

  <!-- LLM Settings -->
  <LLMSettingsEditor bind:settings={formData.llm_settings} {errors} />

  <!-- Active Status -->
  <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <div class="flex items-center">
      <input
        type="checkbox"
        id="is_active"
        bind:checked={formData.is_active}
        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
      />
      <label for="is_active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Configuración activa
      </label>
    </div>
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Solo una configuración puede estar activa a la vez. Al activar esta, las demás se
      desactivarán.
    </p>
  </div>

  <!-- Save Button -->
  <div class="flex items-center justify-between">
    <div>
      {#if saveMessage}
        <p
          class={saveMessage.includes('✅')
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'}
        >
          {saveMessage}
        </p>
      {/if}
    </div>
    <button
      type="submit"
      disabled={isSaving}
      class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {isSaving ? 'Guardando...' : 'Guardar Configuración'}
    </button>
  </div>
</form>
