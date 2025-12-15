<script lang="ts">
  import { whatIDo } from '$lib/data/content';
  import BackToTop from '$lib/components/BackToTop.svelte';
</script>

<section id="what-i-do" class="flex min-h-screen items-center px-6 py-20">
  <div class="mx-auto w-full max-w-4xl">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Left Side - Title -->
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {whatIDo.title}
        </h2>
        <BackToTop />
      </div>

      <!-- Right Side - Cards -->
      <div class="grid grid-cols-1 gap-4">
        {#each whatIDo.areas as area}
          <div class="card p-6">
            <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
              {area.title}
            </h3>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {area.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
