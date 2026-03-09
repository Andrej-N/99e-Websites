export const en = {
  nav: {
    logo: 'Web99',
    cta: 'Get Started',
  },
  hero: {
    badge: 'Limited Time Offer',
    headline: 'Your Website.',
    headline2: '99€.',
    headline3: 'Online in 48 Hours.',
    subheadline:
      'We build fast, modern, mobile-ready websites for small businesses and freelancers — from concept to launch in 48 hours.',
    cta_primary: 'Contact',
    cta_secondary: 'Portfolio',
    trust: '50+ happy clients',
    trust2: '48-hour delivery',
  },
  stats: [
    { value: '50+', label: 'Websites Delivered' },
    { value: '48', label: 'Hours Average Delivery' },
    { value: '99€', label: 'All-In Price' },
    { value: '100%', label: 'Client Satisfaction' },
  ],
  features: {
    title: 'Everything Included.',
    subtitle: 'No surprises. No upsells. One price covers it all.',
    items: [
      { icon: 'Palette', label: 'Custom Responsive Design' },
      { icon: 'Search', label: 'SEO Optimized' },
      { icon: 'Mail', label: 'Contact Form' },
      { icon: 'BarChart2', label: 'Google Analytics' },
      { icon: 'Zap', label: 'Fast Loading Speed' },
      { icon: 'Smartphone', label: 'Mobile First' },
      { icon: 'Globe', label: 'Domain & Hosting Guidance' },
      { icon: 'Lock', label: 'SSL Certificate Setup' },
      { icon: 'Globe', label: 'Monthly Hosting (15€/mo)' },
      { icon: 'FileText', label: 'Copywriting + Hosting (50€/mo)' },
    ],
  },
  process: {
    title: 'How It Works',
    subtitle: 'Simple. Fast. Professional.',
    steps: [
      {
        number: '01',
        title: 'Order',
        description:
          'Fill out our simple brief. Tell us about your business, your goals, and your vision.',
        duration: '',
        icon: 'ClipboardList',
      },
      {
        number: '02',
        title: 'Design',
        description:
          'We create a custom visual concept tailored to your brand identity and target audience.',
        duration: '',
        icon: 'Paintbrush',
      },
      {
        number: '03',
        title: 'Development',
        description:
          'Your site is built with modern, blazing-fast technology. Fully responsive. Fully optimized.',
        duration: '',
        icon: 'Code2',
      },
      {
        number: '04',
        title: 'Delivery',
        description:
          'Your site goes live. We hand you all the keys — full ownership, zero strings attached.',
        duration: '',
        icon: 'Rocket',
      },
    ],
  },
  pricing: {
    title: 'One Price. Everything Included.',
    subtitle: 'No monthly fees. No hidden costs. Pay once, own forever.',
    badge: 'Most Popular',
    price: '99',
    currency: '€',
    period: 'one-time payment',
    includes: [
      'Custom responsive design',
      'SEO optimization',
      'Contact form integration',
      'Google Analytics setup',
      'Mobile-first development',
      'SSL certificate setup',
      'Fast delivery in 48 hours',
      'Full ownership & source code',
      'Monthly hosting (15€)',
      'Copywriting + hosting (50€/month)',
    ],
    cta: 'Get Started Now',
    note: 'No hidden fees. No monthly charges. Pay once, own forever.',
    guarantee: '30-day satisfaction guarantee',
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know.',
    items: [
      {
        question: 'What exactly do I get for 99€?',
        answer:
          'You get a fully custom, responsive website with SEO optimization, contact form, Google Analytics, and SSL setup. No templates — every site is built from scratch for you.',
      },
      {
        question: 'How fast can you deliver?',
        answer:
          'Most projects are completed and live within 48 hours from the moment we receive your brief and content.',
      },
      {
        question: 'Do I own the website after delivery?',
        answer:
          'Absolutely. You get full ownership of the website, including all source code and assets. No vendor lock-in, ever.',
      },
      {
        question: 'What do I need to provide?',
        answer:
          'Just your business information, logo (if you have one), any photos or content you want to use, and your vision. We will handle the rest.',
      },
    ],
  },
  showcase: {
    title: 'Our Work',
    subtitle: 'Real websites we built for real businesses. Browse them right here.',
    backToHome: '← Back to Home',
    viewFullscreen: 'View Fullscreen',
    closePreview: 'Close Preview',
    items: [
      {
        slug: 'bakery',
        title: 'Meel Bakery',
        category: 'Food & Beverage',
        description: 'Artisan bread & pastries — warm, inviting design with elegant typography.',
      },
      {
        slug: 'elegant',
        title: 'Maison de Coiffure',
        category: 'Beauty & Salon',
        description: 'Luxury hair salon with a refined, minimalist aesthetic.',
      },
      {
        slug: 'eyewear',
        title: 'LOOQ Eyewear',
        category: 'Retail & Fashion',
        description: 'Modern eyewear brand with bold visuals and clean layout.',
      },
      {
        slug: 'interactive',
        title: 'ToyBox',
        category: 'Kids & Fun',
        description: 'Playful, colorful interactive experience for a toy store.',
      },
      {
        slug: 'plumber',
        title: 'FlowFix Plumbing',
        category: 'Local Services',
        description: 'Professional plumbing service with a trustworthy, clean design.',
      },
    ],
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Ready to start your project? Reach out to us.',
    phone: '+381 65 820 0252',
    email: '99web.contact@gmail.com',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
  },
  footer: {
    tagline: 'Fast websites. Fair price. Full ownership.',
    copyright: '© 2025 Web99. All rights reserved.',
    email: '99web.contact@gmail.com',
    links: ['Privacy Policy', 'Terms of Service', 'Contact'],
  },
}

export type Translations = typeof en
