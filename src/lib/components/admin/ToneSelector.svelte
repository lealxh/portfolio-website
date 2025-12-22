<script lang="ts">
  import type { Tone } from '$lib/types/personality';

  interface Props {
    tone: Tone;
    errors: Record<string, string>;
  }

  let { tone = $bindable(), errors }: Props = $props();

  let newTrait = $state('');

  function addTrait() {
    if (newTrait.trim() && !tone.personality_traits.includes(newTrait.trim())) {
      tone.personality_traits = [...tone.personality_traits, newTrait.trim()];
      newTrait = '';
    }
  }

  function removeTrait(index: number) {
    tone.personality_traits = tone.personality_traits.filter((_, i) => i !== index);
  }
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
  <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Tono y Personalidad</h2>

  <div class="space-y-4">
    <!-- Style -->
    <div>
      <label for="tone_style" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Estilo
      </label>
      <select
        id="tone_style"
        bind:value={tone.style}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        <option value="profesional">Profesional</option>
        <option value="casual">Casual</option>
        <option value="técnico">Técnico</option>
        <option value="amigable">Amigable</option>
        <option value="formal">Formal</option>
      </select>
      {#if errors['tone.style']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors['tone.style']}</p>
      {/if}
    </div>

    <!-- Formality -->
    <div>
      <label
        for="tone_formality"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Formalidad
      </label>
      <select
        id="tone_formality"
        bind:value={tone.formality}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        <option value="muy-formal">Muy Formal</option>
        <option value="semi-formal">Semi-formal</option>
        <option value="informal">Informal</option>
        <option value="coloquial">Coloquial</option>
      </select>
      {#if errors['tone.formality']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors['tone.formality']}</p>
      {/if}
    </div>

    <!-- Language -->
    <div>
      <label
        for="tone_language"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Idioma
      </label>
      <select
        id="tone_language"
        bind:value={tone.language}
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="es-cl">Español (Chile)</option>
        <option value="es-latam">Español (LATAM)</option>
      </select>
      {#if errors['tone.language']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors['tone.language']}</p>
      {/if}
    </div>

    <!-- Personality Traits -->
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Rasgos de Personalidad
      </label>

      <div class="mb-2 flex gap-2">
        <input
          type="text"
          bind:value={newTrait}
          onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTrait())}
          class="block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Ej: empático, conciso, humorístico"
        />
        <button
          type="button"
          onclick={addTrait}
          class="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        {#each tone.personality_traits as trait, index}
          <span
            class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            {trait}
            <button
              type="button"
              onclick={() => removeTrait(index)}
              class="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              ×
            </button>
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>
