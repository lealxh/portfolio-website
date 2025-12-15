<script lang="ts">
  import { contact } from '$lib/data/content';
  import { openChat } from '$lib/stores/chat';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import ChatIcon from '$lib/components/icons/ChatIcon.svelte';
</script>

<section id="contact" class="flex min-h-screen items-center px-6 py-20">
  <div class="mx-auto w-full max-w-4xl">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Left Side - Title -->
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {contact.title}
        </h2>
        <BackToTop />
      </div>

      <!-- Right Side - Contact Card -->
      <div class="card p-6">
        <p class="mb-6 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
          {contact.message}
        </p>

        <div class="mb-6 space-y-3">
          <a
            href={`mailto:${contact.email}`}
            class="block text-gray-900 transition-colors duration-200 dark:text-white"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-gray-900 transition-colors duration-200 dark:text-white"
          >
            {contact.linkedin.text}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          class="dark:border-text-muted/20 border-t border-gray-200 pt-6 shadow-sm hover:shadow-md"
        >
          <button
            onclick={openChat}
            class="inline-flex items-center gap-2 text-sm text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-white"
          >
            <ChatIcon />
            Habla con mi asistente
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
