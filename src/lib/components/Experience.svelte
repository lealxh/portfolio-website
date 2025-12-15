<script lang="ts">
  import { experience } from '$lib/data/content';
  import BackToTop from '$lib/components/BackToTop.svelte';
</script>

<section id="experience" class="flex min-h-screen items-center px-6 py-20">
  <div class="mx-auto w-full max-w-4xl">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Left Side - Title -->
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {experience.title}
        </h2>
        <BackToTop />
      </div>

      <!-- Right Side - Cards -->
      <div class="space-y-4">
        {#each experience.roles as role}
          <div
            class="dark:border-text-muted/20 dark:hover:border-text-muted/40 rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
              {role.position}
            </h3>
            <p class="mb-3 text-sm text-gray-600 dark:text-gray-500">
              {role.company}
            </p>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {role.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
