<script lang="ts">
  import '../app.css';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  let { children } = $props();

  // Mouse spotlight logic
  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<!-- Spotlight Effect -->
<div
  class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
  style="background: radial-gradient(1200px circle at {mouseX}px {mouseY}px, var(--spotlight-color), transparent 70%);"
></div>

<svelte:head>
  <title>José Leal - Frontend Engineer & Automation Consultant</title>
  <meta
    name="description"
    content="Frontend Engineer especializado en aplicaciones enterprise y automatización de workflows. Construyo software escalable y elimino tareas manuales."
  />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="José Leal — Software Engineer & Automation Consultant" />
  <meta
    property="og:description"
    content="Diseño aplicaciones web enterprise y soluciones de automatización que reducen trabajo manual y escalan procesos."
  />
  <meta property="og:url" content="https://portfolio-website-ten-iota-89.vercel.app/" />
  <meta
    property="og:image"
    content="https://portfolio-website-ten-iota-89.vercel.app/og-image.png"
  />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="José Leal — Software Engineer & Automation Consultant" />
  <meta
    name="twitter:description"
    content="Aplicaciones web enterprise y automatización de workflows con foco en impacto real."
  />
  <meta
    name="twitter:image"
    content="https://portfolio-website-ten-iota-89.vercel.app/og-image.png"
  />

  <link rel="icon" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<ThemeToggle />

{@render children()}
