<script lang="ts">
  import { projects } from "$lib/data/content";
  import BackToTop from "$lib/components/BackToTop.svelte";
</script>

<section id="projects" class="min-h-screen flex items-center py-20 px-6">
  <div class="w-full max-w-4xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <!-- Left Side - Title -->
      <div class="space-y-6">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          {projects.title}
        </h2>
        <BackToTop />
      </div>

      <!-- Right Side - Cards -->
      <div class="space-y-4">
        {#each projects.items as project}
          <div
            class="border border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/20 rounded-xl p-6 dark:hover:border-text-muted/40 transition-all duration-300"
          >
            <div class="flex items-start gap-2 mb-2">
              <h3
                class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white"
              >
                {project.title}
              </h3>
              {#if project.status === "in-progress"}
                <span
                  class="text-xs text-gray-500 dark:text-gray-500 italic mt-1"
                  >[En desarrollo]</span
                >
              {/if}
            </div>
            <p
              class="text-sm text-gray-700 dark:text-gray-400 leading-relaxed mb-3"
            >
              {project.description}
            </p>
            <div class="flex flex-wrap gap-2">
              {#each project.stack as tech}
                <span
                  class="text-xs text-gray-600 dark:text-gray-500 px-2 py-1 border border-gray-200 shadow-sm hover:shadow-md dark:border-text-muted/20 rounded-full"
                >
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
