<script lang="ts">
  import type { Context } from '$lib/types/personality';

  interface Props {
    context: Context;
    errors: Record<string, string>;
  }

  let { context = $bindable(), errors }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
  <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Contexto del Negocio</h2>

  <div class="space-y-6">
    <!-- About -->
    <div>
      <label for="about" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Acerca de ti/tu negocio
      </label>
      <textarea
        id="about"
        bind:value={context.about}
        rows="4"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        placeholder="Describe brevemente quién eres, tu experiencia, especialidades..."
      ></textarea>
      {#if errors['context.about']}
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors['context.about']}</p>
      {/if}
    </div>

    <!-- Custom Knowledge -->
    <div>
      <label
        for="custom_knowledge"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Conocimiento adicional
      </label>
      <textarea
        id="custom_knowledge"
        bind:value={context.custom_knowledge}
        rows="3"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        placeholder="Información adicional que el chatbot debe conocer (horarios, ubicación, preferencias, etc.)"
      ></textarea>
    </div>

    <!-- Services -->
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Servicios
      </label>
      <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Lista de servicios que ofreces. El chatbot podrá referenciarlos en las conversaciones.
      </p>

      <div class="space-y-3">
        {#each context.services as service, index}
          <div
            class="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
          >
            <div class="mb-2 flex items-center justify-between">
              <input
                type="text"
                bind:value={service.name}
                class="flex-1 rounded-lg border-0 bg-transparent text-sm font-medium text-gray-900 focus:ring-0 dark:text-white"
                placeholder="Nombre del servicio"
              />
              <button
                type="button"
                onclick={() => {
                  context.services = context.services.filter((_, i) => i !== index);
                }}
                class="text-red-600 hover:text-red-800 dark:text-red-400"
              >
                Eliminar
              </button>
            </div>
            <textarea
              bind:value={service.description}
              rows="2"
              class="mb-2 block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Descripción del servicio"
            ></textarea>
            <input
              type="text"
              bind:value={service.price_range}
              class="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Rango de precio (opcional)"
            />
          </div>
        {/each}
      </div>

      <button
        type="button"
        onclick={() => {
          context.services = [...context.services, { name: '', description: '', price_range: '' }];
        }}
        class="mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        + Agregar Servicio
      </button>
    </div>

    <!-- FAQs -->
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Preguntas Frecuentes
      </label>
      <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Preguntas comunes y sus respuestas. El chatbot las usará como referencia.
      </p>

      <div class="space-y-3">
        {#each context.faqs as faq, index}
          <div
            class="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
          >
            <div class="mb-2 flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 dark:text-white">FAQ #{index + 1}</span
              >
              <button
                type="button"
                onclick={() => {
                  context.faqs = context.faqs.filter((_, i) => i !== index);
                }}
                class="text-red-600 hover:text-red-800 dark:text-red-400"
              >
                Eliminar
              </button>
            </div>
            <input
              type="text"
              bind:value={faq.question}
              class="mb-2 block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Pregunta"
            />
            <textarea
              bind:value={faq.answer}
              rows="2"
              class="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Respuesta"
            ></textarea>
          </div>
        {/each}
      </div>

      <button
        type="button"
        onclick={() => {
          context.faqs = [...context.faqs, { question: '', answer: '' }];
        }}
        class="mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        + Agregar FAQ
      </button>
    </div>
  </div>
</div>
