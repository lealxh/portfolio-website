<script lang="ts">
  import { hero, navigationCards, socialLinks } from "$lib/data/content";
  import profilePic from "$lib/assets/Formal.png";
  import { openChat } from "$lib/stores/chat";
  import ChatIcon from "$lib/components/icons/ChatIcon.svelte";
  import ProjectsIcon from "$lib/components/icons/ProjectsIcon.svelte";
  import UserIcon from "$lib/components/icons/UserIcon.svelte";
  import BriefcaseIcon from "$lib/components/icons/BriefcaseIcon.svelte";
  import MailIcon from "$lib/components/icons/MailIcon.svelte";
</script>

<section
  id="hero"
  class="min-h-screen flex flex-col items-center justify-center px-6 py-12"
>
  <div class="w-full max-w-4xl">
    <!-- Main Content -->
    <div
      class="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-center"
    >
      <!-- Left Side -->
      <div class="flex flex-col items-center lg:items-start gap-8">
        <div
          class="flex flex-col md:flex-row gap-5 md:items-start items-center"
        >
          <!-- Profile Image (reduced prominence) -->
          <img
            src={profilePic}
            alt="Profile Picture"
            class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover opacity-90"
          />

          <!-- Text -->
          <div class="flex-1 space-y-4 text-center lg:text-left">
            <h2
              class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
            >
              {hero.name}
            </h2>

            <p
              class="text-gray-700 dark:text-gray-400 leading-relaxed max-w-md text-base md:text-lg"
            >
              {hero.tagline}
            </p>
          </div>
        </div>

        <!-- CTAs -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
        >
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
            <ChatIcon
              class="w-4 h-4 dark:group-hover:text-white transition-colors"
            />
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
                <ProjectsIcon
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 dark:group-hover:text-white transition-colors"
                />
              {:else if card.icon === "about"}
                <UserIcon
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 dark:group-hover:text-white transition-colors"
                />
              {:else if card.icon === "experience"}
                <BriefcaseIcon
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 dark:group-hover:text-white transition-colors"
                />
              {:else if card.icon === "contact"}
                <MailIcon
                  class="w-8 h-8 text-gray-700 dark:text-gray-400 dark:group-hover:text-white transition-colors"
                />
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
        class="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
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
