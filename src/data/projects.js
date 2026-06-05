export const projectFilters = ['all', 'web', 'applications', 'databases', 'academic', 'personal'];

export const projects = [
  {
    id: 1,
    key: 'businessCard',
    slug: 'business-card',
    category: 'web',
    filters: ['web', 'personal'],
    technologies: ['html', 'css', 'javascript'],
    github: 'https://github.com/naguirrel0209/BussinessCardWesterAguirre',
    productionUrl: 'https://westeraguirre-card.vercel.app/',
    image: '/images/projects/bussiness-card.jpeg',
  },
  {
    id: 2,
    key: 'uvgEats',
    slug: 'uvg-eats',
    category: 'academic',
    filters: ['academic', 'applications'],
    technologies: ['java', 'oop'],
    github: 'https://github.com/Naguirrel/UVG-Eats',
    image: '/images/projects/uvg-eats.jpeg',
  },
  {
    id: 3,
    key: 'visaApp',
    slug: 'visa-app',
    category: 'web',
    filters: ['web', 'databases', 'academic'],
    technologies: ['javascript', 'webDevelopment'],
    github: 'https://github.com/dquan123/Software_Proyecto',
    productionUrl: 'http://3.14.12.212:5173/',
    image: '/images/projects/visa-app.jpeg',
  },
  {
    id: 4,
    key: 'piggyMobile',
    slug: 'piggymobile',
    category: 'applications',
    filters: ['applications', 'personal', 'academic'],
    technologies: ['javascript', 'mobileDevelopment'],
    github: 'https://github.com/YayaG2805/Proyectoplats',
    image: '/images/projects/piggymobile.jpeg',
  },
  {
    id: 5,
    key: 'movieTracker',
    slug: 'movie-tracker',
    category: 'databases',
    filters: ['web', 'databases', 'academic'],
    technologies: ['go', 'sqlite', 'javascript'],
    githubFrontend: 'https://github.com/Naguirrel/Proyecto1_web_cliente',
    githubBackend: 'https://github.com/Naguirrel/Proyecto1_web_backend',
    image: '/images/projects/movie-tracker.jpeg',
  },
];

export const featuredProjects = projects;
