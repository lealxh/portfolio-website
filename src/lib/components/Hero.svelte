<script lang="ts">
  import { hero, navigationCards, socialLinks } from '$lib/data/content';
  import profilePic from '$lib/assets/Formal.png';
  import { openChat } from '$lib/stores/chat';
  import ChatIcon from '$lib/components/icons/ChatIcon.svelte';
  import ProjectsIcon from '$lib/components/icons/ProjectsIcon.svelte';
  import UserIcon from '$lib/components/icons/UserIcon.svelte';
  import BriefcaseIcon from '$lib/components/icons/BriefcaseIcon.svelte';
  import MailIcon from '$lib/components/icons/MailIcon.svelte';
</script>

<section id="hero" class="flex min-h-screen flex-col items-center justify-center px-6 py-12">
  <div class="w-full max-w-4xl">
    <!-- Main Content -->
    <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
      <!-- Left Side -->
      <div class="flex flex-col items-center gap-8 lg:items-start">
        <div class="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <!-- Profile Image -->
          <img
            src={profilePic}
            alt={hero.name}
            class="h-24 w-24 rounded-full object-cover opacity-90 md:h-28 md:w-28"
          />

          <!-- Text -->
          <div class="flex-1 space-y-4 text-center lg:text-left">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              {hero.name}
            </h2>

            <p
              class="max-w-md text-base leading-relaxed text-gray-700 dark:text-gray-400 md:text-lg"
            >
              {hero.tagline}
            </p>
          </div>
        </div>

        <!-- CTAs -->
        <div class="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
          <a
            href="https://drive.google.com/file/d/1xUAa520tGcj3zBIcgGp0Kox0Hse6DYn_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block rounded-xl bg-accent px-8 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            {hero.cta}
          </a>

          <button
            onclick={openChat}
            class="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200/60 bg-bg-primary px-8 py-3 font-medium text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:shadow-premium"
          >
            <ChatIcon class="h-4 w-4 transition-colors dark:group-hover:text-white" />
            Chat
          </button>
        </div>
      </div>

      <!-- Right Side - Navigation Cards -->
      <div class="grid grid-cols-2 gap-4">
        {#each navigationCards as card}
          <a
            href={card.link}
            class="card card-hover group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-xl p-6 sm:aspect-square"
          >
            <div class="flex h-12 w-12 items-center justify-center">
              {#if card.icon === 'projects'}
                <ProjectsIcon
                  class="h-8 w-8 text-gray-700 transition-colors dark:text-gray-400 dark:group-hover:text-white"
                />
              {:else if card.icon === 'about'}
                <UserIcon
                  class="h-8 w-8 text-gray-700 transition-colors dark:text-gray-400 dark:group-hover:text-white"
                />
              {:else if card.icon === 'experience'}
                <BriefcaseIcon
                  class="h-8 w-8 text-gray-700 transition-colors dark:text-gray-400 dark:group-hover:text-white"
                />
              {:else if card.icon === 'contact'}
                <MailIcon
                  class="h-8 w-8 text-gray-700 transition-colors dark:text-gray-400 dark:group-hover:text-white"
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
        aria-label="Twitter Profile"
        class="text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
          />
        </svg>
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        class="text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </div>
</section>
