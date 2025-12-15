<script lang="ts">
  import { whatIDo } from "$lib/data/content";
  import BackToTop from "$lib/components/BackToTop.svelte";
</script>

<section id="what-i-do" class="min-h-screen flex items-center py-20 px-6">
  <div class="w-full max-w-4xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Left Side - Title -->
      <div class="space-y-6">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          {whatIDo.title}
        </h2>
        <BackToTop />
      </div>

      <!-- Right Side - Cards -->
      <div class="grid grid-cols-1 gap-4">
        {#each whatIDo.areas as area}
          <div
            class="border border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/20 rounded-xl p-6 dark:hover:border-text-muted/40 transition-all duration-300"
          >
            <h3
              class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3"
            >
              {area.title}
            </h3>
            <p class="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
              {area.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
