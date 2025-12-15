/**
 * Main content data types for the portfolio
 */

export interface NavigationCard {
  title: string;
  icon: 'projects' | 'about' | 'experience' | 'contact';
  link: string;
}

export interface SocialLinks {
  twitter: string;
  linkedin: string;
}

export interface Hero {
  greeting: string;
  name: string;
  tagline: string;
  cta: string;
}

export interface WhatIDoArea {
  title: string;
  description: string;
}

export interface WhatIDo {
  title: string;
  areas: WhatIDoArea[];
}

export interface ExperienceRole {
  position: string;
  company: string;
  description: string;
}

export interface Experience {
  title: string;
  roles: ExperienceRole[];
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  status: 'completed' | 'in-progress';
}

export interface Projects {
  title: string;
  items: Project[];
}

export interface ContactLinkedIn {
  text: string;
  url: string;
}

export interface Contact {
  title: string;
  message: string;
  email: string;
  linkedin: ContactLinkedIn;
}
