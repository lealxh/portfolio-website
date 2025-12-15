import type {
  Hero,
  WhatIDo,
  Experience,
  Projects,
  NavigationCard,
  SocialLinks,
  Contact
} from '$lib/types/content';

export const hero: Hero = {
  greeting: 'Hola',
  name: 'José Leal',
  tagline:
    'Software Engineer con experiencia en entornos enterprise. Diseño interfaces web y herramientas de automatización que reducen trabajo manual y escalan procesos.',
  cta: 'Descargar CV'
};

export const whatIDo: WhatIDo = {
  title: 'Qué hago',
  areas: [
    {
      title: 'Frontend Engineering (Enterprise)',
      description:
        'Construyo aplicaciones web mantenibles y escalables en contextos enterprise, trabajando de forma end-to-end desde requerimientos hasta producción, con foco en calidad, performance y experiencia de usuario.'
    },
    {
      title: 'Automation & Internal Tools',
      description:
        'Diseño y desarrollo automatizaciones y herramientas internas para integrar sistemas, eliminar tareas repetitivas y mejorar la eficiencia operativa, utilizando n8n, Node.js y APIs.'
    }
  ]
};

export const experience: Experience = {
  title: 'Experiencia',
  roles: [
    {
      position: 'Enterprise Software Engineer',
      company: 'Globant',
      description:
        'Desarrollo de aplicaciones web en entornos financieros y enterprise, trabajando de forma autónoma en features end-to-end, migraciones tecnológicas y arquitecturas de micro-frontends, colaborando con equipos distribuidos.'
    },
    {
      position: 'Automation & Internal Tools',
      company: 'Side Projects',
      description:
        'Diseño e implementación de proyectos de automatización y tooling interno enfocados en reducir trabajo manual, integrar sistemas y construir soluciones confiables y mantenibles.'
    }
  ]
};

export const projects: Projects = {
  title: 'Proyectos',
  items: [
    {
      title: 'Content Engine',
      description:
        'Sistema de automatización para publicación de contenido desde Notion a LinkedIn y Twitter. Diseñado para reducir trabajo manual y costos operativos mediante una arquitectura híbrida.',
      stack: ['n8n', 'Playwright', 'Node.js', 'OAuth2'],
      status: 'completed'
    },
    {
      title: 'AI Message Assistant',
      description:
        'Asistente para clasificación y respuesta automática de mensajes, orientado a mejorar tiempos de respuesta y organización de conversaciones. Proyecto en desarrollo.',
      stack: ['n8n', 'LLMs', 'Vector DB'],
      status: 'in-progress'
    }
  ]
};

export const navigationCards: NavigationCard[] = [
  {
    title: 'Proyectos',
    icon: 'projects',
    link: '#projects'
  },
  {
    title: 'Qué hago',
    icon: 'about',
    link: '#what-i-do'
  },
  {
    title: 'Experiencia',
    icon: 'experience',
    link: '#experience'
  },
  {
    title: 'Contacto',
    icon: 'contact',
    link: '#contact'
  }
];

export const socialLinks: SocialLinks = {
  twitter: 'https://x.com/joseleal_n8n',
  linkedin: 'https://www.linkedin.com/in/jose-gregorio-leal-sanchez'
};

export const contact: Contact = {
  title: 'Contacto',
  message:
    '¿Tienes un proceso que podría automatizarse o un proyecto en el que necesites apoyo técnico?',
  email: 'lealxh@gmail.com',
  linkedin: {
    text: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jose-gregorio-leal-sanchez'
  }
};
