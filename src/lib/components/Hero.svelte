<script lang="ts">
  import { hero, navigationCards, socialLinks } from "$lib/data/content";

  function openChat() {
    const chatButton = document.querySelector(
      '[aria-label="Abrir chat"]',
    ) as HTMLButtonElement;
    chatButton?.click();
  }
</script>

<section
  id="hero"
  class="min-h-screen flex flex-col items-center justify-center px-6 py-12"
>
  <div class="w-full max-w-4xl">
    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Left Side - Text Content -->
      <div class="space-y-6">
       
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
        >
          {hero.name}
        </h2>
        <p class="text-gray-700 dark:text-gray-400 leading-relaxed max-w-md">
          {hero.tagline}
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a
            href="https://drive.google.com/file/d/1xUAa520tGcj3zBIcgGp0Kox0Hse6DYn_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded transition-colors duration-200 text-center"
          >
            {hero.cta}
          </a>
          <button
            onclick={openChat}
            class="group px-8 py-3 border border-gray-800 dark:border-text-muted/40 hover:border-accent dark:hover:border-white hover:text-accent dark:hover:text-white text-gray-900 dark:text-white font-medium rounded transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <svg
              class="w-4 h-4 group-hover:text-accent dark:group-hover:text-white transition-colors"
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
            Chat
          </button>
        </div>
      </div>

      <!-- Right Side - Navigation Cards -->
      <div class="grid grid-cols-2 gap-4">
        {#each navigationCards as card}
          <a
            href={card.link}
            class="group border border-black dark:border-text-muted/20 rounded-xl p-8 hover:border-accent dark:hover:border-text-muted/40 transition-all duration-300 flex flex-col items-center justify-center gap-4 aspect-square"
          >
            <div class="w-12 h-12 flex items-center justify-center">
              {#if card.icon === "projects"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 group-hover:text-accent dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              {:else if card.icon === "about"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 group-hover:text-accent dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              {:else if card.icon === "experience"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 group-hover:text-accent dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              {:else if card.icon === "contact"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 group-hover:text-accent dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              {/if}
            </div>
            <p
              class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent dark:group-hover:text-white transition-colors"
            >
              {card.title}
            </p>
          </a>
        {/each}
      </div>
    </div>

    <!-- Footer - Social Links -->
    <div class="mt-20 flex justify-center gap-6">
      <a
        href={socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
          />
        </svg>
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        class="text-text-muted hover:text-text-primary transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      </a>
    </div>
  </div>
</section>
