export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const events = [
  {
    id: 'innolab-event', name: 'InnoLab Hackathon', year: '2026', date: '2026 · Hackathon',
    venue: 'Ateneo de Naga University',
    description: 'Helped shape CherIt’s product and features, tested the prototype, and presented it with the team.',
    certificate: '', project: 'cherit.html',
    photos: [
      { src: 'assets/events/innolab-team.jpg', alt: 'The InnoLab team posing with a certificate after the hackathon', width: 1280, height: 672 },
      { src: 'assets/events/innolab-presentation.jpg', alt: 'The team presenting CherIt to the InnoLab audience', width: 1280, height: 672 }
    ] as Photo[]
  },
  {
    id: 'sparklab-event', name: 'SparkLab Hackathon', year: '2025', date: 'Oct 15–16, 2025 · Hackathon',
    venue: 'Ateneo de Naga University',
    description: 'Explored a community incident-reporting concept with the team and worked on the interface design in Figma.',
    certificate: 'https://drive.google.com/file/d/1RkKvmAEt0-deJ_l32yiKbftRnQKAPD9C/view',
    project: '',
    photos: [
      { src: 'assets/events/sparklab-workspace.jpg', alt: 'The SparkLab stage and a laptop showing a design prototype', width: 720, height: 1280 },
      { src: 'assets/events/sparklab-banner.jpg', alt: 'SparkLab Hackathon banner with the October 15–16, 2025 event dates', width: 720, height: 1280 },
      { src: 'assets/events/sparklab-attendees.jpg', alt: 'Two SparkLab attendees beside their laptops', width: 720, height: 1280 }
    ] as Photo[]
  },
  {
    id: 'byte-event', name: 'BYTE 2025', year: '2025', date: 'Oct 2025 · Technology expo',
    venue: 'Summit Hotel Naga',
    description: 'Bicol Youth for Technology Expo.',
    certificate: 'https://drive.google.com/file/d/1K9hhRa4_a32W1-9Gl700q0oqUTpUo8ph/view',
    project: '', photos: [] as Photo[]
  },
  {
    id: 'pycon-event', name: 'PyCon APAC', year: '2025', date: 'Mar 1–2, 2025 · Conference',
    venue: 'Ateneo de Manila University',
    description: 'Attended Python talks and met other developers at my first tech conference.',
    certificate: 'https://drive.google.com/file/d/1Olwh7-c18ldMIQkuVetsZ-ONY5iYRMdD/view',
    project: '', photos: [] as Photo[]
  }
];

export const tools = [
  ['Python', 'python', 'Programming and scripting'],
  ['Flutter', 'flutter', 'Mobile interface prototypes'],
  ['C++', 'cplusplus', 'Programming fundamentals'],
  ['Git', 'git', 'Version control'],
  ['GitHub', 'github', 'Repositories and collaboration'],
  ['ChatGPT', 'chatgpt', 'Exploring approaches and debugging'],
  ['Claude', 'claude', 'AI-assisted development'],
  ['Figma', 'figma', 'Interface design and prototyping'],
  ['Canva', 'canva', 'Graphic design'],
  ['CapCut', 'capcut', 'Video editing']
];

export const contacts = [
  { id: 'email', name: 'Email', label: 'jfrancis.espiritu@gmail.com', href: 'mailto:jfrancis.espiritu@gmail.com', icon: 'envelope' },
  { id: 'github', name: 'GitHub', label: 'github.com/Jeyep18', href: 'https://github.com/Jeyep18', icon: 'github' },
  { id: 'linkedin', name: 'LinkedIn', label: 'linkedin.com/in/jfrancis-espiritu', href: 'https://www.linkedin.com/in/jfrancis-espiritu', icon: 'linkedin' }
];

export const projects = [
  {
    id: 'cherit', name: 'CherIt', description: 'A lesson-pack library for Bicol public-school teachers.',
    status: 'Hackathon prototype', stack: 'React · TypeScript',
    details: 'I contributed website direction, feature design, QA, and the presentation as part of a three-person team.',
    href: 'cherit.html', action: 'Read the case study'
  },
  {
    id: 'bagyong-bahay', name: 'Bagyong Bahay', description: 'A Filipino storm-preparation game about choices under pressure.',
    status: 'Private test candidate', stack: 'Godot',
    details: 'I led the project and contributed to architecture, 3D maps, and visual direction. Teammates handled parts of implementation, and development used substantial AI assistance.',
    href: './#bagyong', action: 'View the gallery preview'
  },
  {
    id: 'transitph', name: 'TransitPH', description: 'An early web app for navigating local public transportation.',
    status: 'In progress', stack: 'Next.js · React · Leaflet',
    details: 'A map-based exploration of how to help riders find their way around local public transportation.',
    href: 'https://github.com/Jeyep18/transit-ph', action: 'View source'
  },
  {
    id: 'demolay', name: 'DeMolay chapter website', description: 'A community website for chapter information and events.',
    status: 'In development', stack: 'Next.js · TypeScript',
    details: 'The site brings together chapter information, events, and a digital archive.', href: '', action: ''
  },
  {
    id: 'veterinary-system', name: 'Veterinary clinic system', description: 'A clinic records prototype for pets, visits, and vaccinations.',
    status: 'Academic prototype', stack: 'PHP · Oracle',
    details: 'An academic project exploring how to organize patient records, clinic visits, and vaccinations.',
    href: 'https://github.com/Jeyep18/VetClinicSystem', action: 'View source'
  }
];
