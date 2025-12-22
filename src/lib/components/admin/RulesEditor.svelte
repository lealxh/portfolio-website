<script lang="ts">
  import type { Rules } from '$lib/types/personality';

  interface Props {
    rules: Rules;
    errors: Record<string, string>;
  }

  let { rules = $bindable(), errors }: Props = $props();

  let newMustDo = $state('');
  let newMustNotDo = $state('');

  function addMustDo() {
    if (newMustDo.trim()) {
      rules.must_do = [...rules.must_do, newMustDo.trim()];
      newMustDo = '';
    }
  }

  function removeMustDo(index: number) {
    rules.must_do = rules.must_do.filter((_, i) => i !== index);
  }

  function addMustNotDo() {
    if (newMustNotDo.trim()) {
      rules.must_not_do = [...rules.must_not_do, newMustNotDo.trim()];
      newMustNotDo = '';
    }
  }

  function removeMustNotDo(index: number) {
    rules.must_not_do = rules.must_not_do.filter((_, i) => i !== index);
  }
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
  <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Reglas de Comportamiento</h2>

  <div class="space-y-6">
    <!-- Must Do -->
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        El chatbot DEBE:
      </label>

      <div class="mb-2 flex gap-2">
        <input
          type="text"
          bind:value={newMustDo}
          onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addMustDo())}
          class="block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Ej: Saludar de forma amigable"
        />
        <button
          type="button"
          onclick={addMustDo}
          class="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Agregar
        </button>
      </div>

      <ul class="space-y-2">
        {#each rules.must_do as rule, index}
          <li class="flex items-start gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <span class="text-green-600 dark:text-green-400">✓</span>
            <span class="flex-1 text-sm text-gray-900 dark:text-white">{rule}</span>
            <button
              type="button"
              onclick={() => removeMustDo(index)}
              class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            >
              ×
            </button>
          </li>
        {/each}
      </ul>
      {#if errors['rules.must_do']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors['rules.must_do']}</p>
      {/if}
    </div>

    <!-- Must Not Do -->
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        El chatbot NO DEBE:
      </label>

      <div class="mb-2 flex gap-2">
        <input
          type="text"
          bind:value={newMustNotDo}
          onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addMustNotDo())}
          class="block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Ej: Dar precios sin contexto"
        />
        <button
          type="button"
          onclick={addMustNotDo}
          class="rounded-lg bg-red-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Agregar
        </button>
      </div>

      <ul class="space-y-2">
        {#each rules.must_not_do as rule, index}
          <li class="flex items-start gap-2 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <span class="text-red-600 dark:text-red-400">✗</span>
            <span class="flex-1 text-sm text-gray-900 dark:text-white">{rule}</span>
            <button
              type="button"
              onclick={() => removeMustNotDo(index)}
              class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            >
              ×
            </button>
          </li>
        {/each}
      </ul>
      {#if errors['rules.must_not_do']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors['rules.must_not_do']}</p>
      {/if}
    </div>

    <!-- Response Limits -->
    <div class="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">Límites de Respuesta</h3>

      <div>
        <label
          for="max_length"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Longitud máxima
        </label>
        <select
          id="max_length"
          bind:value={rules.response_limits.max_length}
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="short">Corta (~100 palabras)</option>
          <option value="medium">Media (~200 palabras)</option>
          <option value="long">Larga (~300+ palabras)</option>
        </select>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          id="include_cta"
          bind:checked={rules.response_limits.include_cta}
          class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <label for="include_cta" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Incluir Call-to-Action
        </label>
      </div>

      {#if rules.response_limits.include_cta}
        <div class="space-y-3 pl-6">
          <div>
            <label
              for="cta_type"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de CTA
            </label>
            <select
              id="cta_type"
              bind:value={rules.response_limits.cta_type}
              class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="discovery_call">Discovery Call</option>
              <option value="contact_form">Formulario de Contacto</option>
              <option value="linkedin">LinkedIn</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          <div>
            <label
              for="cta_text"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Texto del CTA
            </label>
            <input
              type="text"
              id="cta_text"
              bind:value={rules.response_limits.cta_text}
              class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="¿Agendamos una call?"
            />
          </div>

          <div>
            <label
              for="cta_url"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              URL del CTA
            </label>
            <input
              type="url"
              id="cta_url"
              bind:value={rules.response_limits.cta_url}
              class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="https://calendly.com/..."
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
