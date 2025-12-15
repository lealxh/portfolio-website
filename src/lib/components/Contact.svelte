<script lang="ts">
  import { contact } from "$lib/data/content";
  import { openChat } from "$lib/stores/chat";
  import BackToTop from "$lib/components/BackToTop.svelte";
  import ChatIcon from "$lib/components/icons/ChatIcon.svelte";
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
        <BackToTop />
      </div>

      <!-- Right Side - Contact Card -->
      <div
        class="border border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/20 rounded-xl p-6 dark:hover:border-text-muted/40 transition-all duration-300"
      >
        <p
          class="text-sm text-gray-700 dark:text-gray-400 mb-6 leading-relaxed"
        >
          {contact.message}
        </p>

        <div class="space-y-3 mb-6">
          <a
            href={`mailto:${contact.email}`}
            class="text-gray-900 dark:text-white transition-colors duration-200 block"
          >
            {contact.email}
          </a>
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-900 dark:text-white transition-colors duration-200 inline-flex items-center gap-2"
          >
            {contact.linkedin.text}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          class="pt-6 border-t border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/20"
        >
          <button
            onclick={openChat}
            class="text-sm text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <ChatIcon />
            Habla con mi asistente
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
