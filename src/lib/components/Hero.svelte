<script lang="ts">
  import { hero, navigationCards, socialLinks } from "$lib/data/content";
  import profilePic from "$lib/assets/Formal.png";

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
    <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-center">
      <!-- Left Side -->
      <div class="flex flex-col items-center lg:items-start gap-8">
        <div class="flex flex-col md:flex-row gap-5 md:items-start items-center">
          <!-- Profile Image (reduced prominence) -->
          <img
            src={profilePic}
            alt="Profile Picture"
            class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover opacity-90"
          />

          <!-- Text -->
          <div class="flex-1 space-y-4 text-center lg:text-left">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {hero.name}
            </h2>

            <p class="text-gray-700 dark:text-gray-400 leading-relaxed max-w-md text-base md:text-lg">
              {hero.tagline}
            </p>
          </div>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
          <a
            href="https://drive.google.com/file/d/1xUAa520tGcj3zBIcgGp0Kox0Hse6DYn_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded transition-colors duration-200 text-center"
          >
            {hero.cta}
          </a>

          <button
            onclick={openChat}
            class="group px-8 py-3 border border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/40 dark:hover:border-white text-gray-900 dark:text-white font-medium rounded transition-colors duration-200 inline-flex items-center justify-center gap-2 opacity-90 hover:opacity-100"
          >
            <svg
              class="w-4 h-4  dark:group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a4.5 4.5 0 01-2 2h-5l-5 5v-5z"
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
            class="group border border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/20 rounded-xl p-6 dark:hover:border-text-muted/40 transition-all duration-300 flex flex-col items-center justify-center gap-4 aspect-[4/3] sm:aspect-square"
          >
            <div class="w-12 h-12 flex items-center justify-center">
              {#if card.icon === "projects"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400  dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              {:else if card.icon === "about"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400  dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              {:else if card.icon === "experience"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400  dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              {:else if card.icon === "contact"}
                <svg
                  class="w-8 h-8 text-gray-700 dark:text-gray-400  dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              {/if}
            </div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {card.title}
            </p>
          </a>
        {/each}
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-24 flex justify-center gap-6">
      <!-- Social icons unchanged -->
    </div>
  </div>
</section>
