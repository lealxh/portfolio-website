<script lang="ts">
  import type { LLMSettings } from '$lib/types/personality';

  interface Props {
    settings: LLMSettings;
    errors: Record<string, string>;
  }

  let { settings = $bindable(), errors }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
  <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Configuración del LLM</h2>

  <div class="space-y-4">
    <!-- Model Preference -->
    <div>
      <label
        for="model_preference"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Modelo Preferido
      </label>
      <select
        id="model_preference"
        bind:value={settings.model_preference}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        <option value="claude-3-sonnet">Claude 3.5 Sonnet (Recomendado)</option>
        <option value="claude-3-haiku">Claude 3 Haiku (Más rápido)</option>
        <option value="gpt-4o">GPT-4o</option>
        <option value="gpt-4o-mini">GPT-4o Mini</option>
      </select>
      {#if errors['llm_settings.model_preference']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors['llm_settings.model_preference']}
        </p>
      {/if}
    </div>

    <!-- Temperature -->
    <div>
      <label for="temperature" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Temperature: {settings.temperature}
      </label>
      <input
        type="range"
        id="temperature"
        bind:value={settings.temperature}
        min="0"
        max="1"
        step="0.1"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
      <div class="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Preciso (0.0)</span>
        <span>Creativo (1.0)</span>
      </div>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Controla la creatividad de las respuestas. Valores bajos son más predecibles, valores altos
        más creativos.
      </p>
      {#if errors['llm_settings.temperature']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors['llm_settings.temperature']}
        </p>
      {/if}
    </div>

    <!-- Max Tokens -->
    <div>
      <label for="max_tokens" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Tokens Máximos: {settings.max_tokens}
      </label>
      <input
        type="range"
        id="max_tokens"
        bind:value={settings.max_tokens}
        min="50"
        max="4000"
        step="50"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
      <div class="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>50</span>
        <span>4000</span>
      </div>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Límite de tokens en la respuesta. ~100 tokens ≈ 75 palabras. Recomendado: 300-800 para
        chatbot.
      </p>
      {#if errors['llm_settings.max_tokens']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors['llm_settings.max_tokens']}
        </p>
      {/if}
    </div>

    <!-- Advanced Settings (Optional) -->
    <details class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
      <summary class="cursor-pointer text-sm font-medium text-gray-900 dark:text-white">
        Configuración Avanzada (Opcional)
      </summary>

      <div class="mt-4 space-y-4">
        <!-- Top P -->
        <div>
          <label for="top_p" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Top P: {settings.top_p ?? 'No configurado'}
          </label>
          <input
            type="range"
            id="top_p"
            bind:value={settings.top_p}
            min="0"
            max="1"
            step="0.05"
            class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Controla la diversidad de tokens considerados. Dejar vacío usa el default del modelo.
          </p>
        </div>

        <!-- Frequency Penalty -->
        <div>
          <label
            for="frequency_penalty"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Frequency Penalty: {settings.frequency_penalty ?? 'No configurado'}
          </label>
          <input
            type="range"
            id="frequency_penalty"
            bind:value={settings.frequency_penalty}
            min="-2"
            max="2"
            step="0.1"
            class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Penaliza la repetición de tokens frecuentes. Valores positivos reducen repetición.
          </p>
        </div>

        <!-- Presence Penalty -->
        <div>
          <label
            for="presence_penalty"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Presence Penalty: {settings.presence_penalty ?? 'No configurado'}
          </label>
          <input
            type="range"
            id="presence_penalty"
            bind:value={settings.presence_penalty}
            min="-2"
            max="2"
            step="0.1"
            class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Penaliza tokens ya presentes. Valores positivos fomentan nuevos temas.
          </p>
        </div>
      </div>
    </details>
  </div>
</div>
