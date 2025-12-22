<script lang="ts">
  import PersonalityForm from '$lib/components/admin/PersonalityForm.svelte';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';

  let { data }: { data: PageData } = $props();

  function handleSave() {
    // Reload the page to get fresh data
    goto('/admin/chatbot', { invalidateAll: true });
  }
</script>

<svelte:head>
  <title>Admin - Configuración del Chatbot</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <header class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Configuración del Chatbot
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Personaliza el comportamiento y tono de tu asistente virtual
          </p>
        </div>
        <a
          href="/"
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          ← Volver al sitio
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Info Banner -->
    <div
      class="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
    >
      <div class="flex items-start">
        <svg
          class="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800 dark:text-blue-300">
            Sistema de Personalidad Configurable
          </h3>
          <div class="mt-2 text-sm text-blue-700 dark:text-blue-400">
            <p>
              Los cambios que realices aquí se reflejarán inmediatamente en el chatbot sin necesidad
              de modificar los flujos de n8n. La configuración se guarda en Supabase y n8n la
              consume dinámicamente en cada conversación.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Card -->
    {#if data.personality}
      <div
        class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-600 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800 dark:text-green-300">
              Configuración activa: <strong>{data.personality.name}</strong>
            </p>
            <p class="mt-1 text-sm text-green-700 dark:text-green-400">
              Última actualización: {new Date(data.personality.updated_at).toLocaleString('es-CL')}
            </p>
          </div>
        </div>
      </div>
    {:else}
      <div
        class="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20"
      >
        <div class="flex items-center">
          <svg
            class="h-5 w-5 text-yellow-600 dark:text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="ml-3 text-sm font-medium text-yellow-800 dark:text-yellow-300">
            No hay configuración activa. Crea una nueva configuración para activar el chatbot.
          </p>
        </div>
      </div>
    {/if}

    <!-- Form -->
    <PersonalityForm personality={data.personality} onSave={handleSave} />

    <!-- Documentation Link -->
    <div
      class="mt-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">📚 Documentación</h3>
      <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Para más información sobre cómo funciona este sistema, consulta la documentación técnica:
      </p>
      <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <a
            href="/Fase 3 Admin/01-overview.md"
            class="text-blue-600 hover:underline dark:text-blue-400"
          >
            → Visión General del Sistema
          </a>
        </li>
        <li>
          <a
            href="/Fase 3 Admin/02-architecture.md"
            class="text-blue-600 hover:underline dark:text-blue-400"
          >
            → Arquitectura y Componentes
          </a>
        </li>
        <li>
          <a
            href="/Fase 3 Admin/03-data-model.md"
            class="text-blue-600 hover:underline dark:text-blue-400"
          >
            → Modelo de Datos
          </a>
        </li>
      </ul>
    </div>
  </main>
</div>
