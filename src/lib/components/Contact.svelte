<script lang="ts">
  import { contact } from "$lib/data/content";

  function openChat() {
    const chatButton = document.querySelector(
      '[aria-label="Abrir chat"]',
    ) as HTMLButtonElement;
    chatButton?.click();
  }
</script>

<section id="contact" class="min-h-screen flex items-center py-20 px-6">
  <div class="w-full max-w-4xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Left Side - Title -->
      <div class="space-y-6">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          {contact.title}
        </h2>
        <a
          href="#hero"
          class="text-gray-700 dark:text-gray-400 hover:text-accent dark:hover:text-white transition-colors inline-flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          Volver arriba
        </a>
      </div>

      <!-- Right Side - Contact Card -->
      <div
        class="border border-gray-800 dark:border-text-muted/20 rounded-xl p-6 hover:border-accent dark:hover:border-text-muted/40 transition-all duration-300"
      >
        <p
          class="text-sm text-gray-700 dark:text-gray-400 mb-6 leading-relaxed"
        >
          {contact.message}
        </p>

        <div class="space-y-3 mb-6">
          <a
            href={`mailto:${contact.email}`}
            class="text-gray-900 dark:text-white hover:text-accent transition-colors duration-200 block"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-900 dark:text-white hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
          >
            {contact.linkedin.text}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div class="pt-6 border-t border-gray-800 dark:border-text-muted/20">
          <button
            onclick={openChat}
            class="text-sm text-gray-700 dark:text-gray-400 hover:text-accent dark:hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Habla con mi asistente
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
