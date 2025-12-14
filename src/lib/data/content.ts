export const hero = {
  greeting: 'Hola',
  name: "José Leal",
  tagline: 'Frontend Engineer especializado en aplicaciones enterprise y automatización de workflows. Construyo interfaces mantenibles y herramientas que eliminan trabajo manual.',
  cta: 'Descargar CV'
};

export const whatIDo = {
  title: 'Qué hago',
  areas: [
    {
      title: 'Frontend Engineering',
      description: 'Desarrollo aplicaciones web para entornos enterprise con React y SvelteKit. Interfaces mantenibles, escalables y con buen rendimiento.'
    },
    {
      title: 'Automation & Internal Tools',
      description: 'Diseño automatizaciones de workflows con n8n y Node.js. Integro APIs, construyo herramientas internas y elimino trabajo manual repetitivo.'
    }
  ]
};

export const experience = {
  title: 'Experiencia',
  roles: [
    {
      position: 'Frontend Engineer',
      company: 'Globant',
      description: 'Aplicaciones web enterprise con React y SvelteKit para American Century Investment. Features end-to-end, micro-frontends y migración tecnológica.'
    },
    {
      position: 'Automation Projects',
      company: 'Side Projects',
      description: 'Automatizaciones de workflows con n8n y Node.js. Content Engine, herramientas internas y pipelines de integración entre sistemas.'
    }
  ]
};

export const projects = {
  title: 'Proyectos',
  items: [
    {
      title: 'Content Engine',
      description: 'Sistema de publicación automática desde Notion a LinkedIn y Twitter. Arquitectura híbrida que evita $100/mes en APIs de Twitter.',
      stack: ['n8n', 'Playwright', 'Node.js', 'OAuth2'],
      status: 'completed'
    },
    {
      title: 'AI Message Assistant',
      description: 'Clasificación y respuesta automática de DMs con GPT-4. En desarrollo.',
      stack: ['n8n', 'OpenAI', 'Vector DB'],
      status: 'in-progress'
    }
  ]
};

export const navigationCards = [
  {
    title: 'Mis Proyectos',
    icon: 'projects',
    link: '#projects'
  },
  {
    title: 'Qué Hago',
    icon: 'about',
    link: '#what-i-do'
  },
  {
    title: 'Experiencia',
    icon: 'experience',
    link: '#experience'
  },
  {
    title: 'Contáctame',
    icon: 'contact',
    link: '#contact'
  }
];

export const socialLinks = {

  twitter: 'https://x.com/joseleal_n8n',
  linkedin: 'https://www.linkedin.com/in/jose-gregorio-leal-sanchez',
};

export const contact = {
  title: 'Contacto',
  message: '¿Hablamos de automatización o tienes un proyecto en mente?',
  email: 'lealxh@gmail.com',
  linkedin: {
    text: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jose-gregorio-leal-sanchez'
  }
};
