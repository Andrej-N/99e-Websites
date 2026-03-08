import type { Translations } from './en'

export const sr: Translations = {
  nav: {
    logo: 'Web99',
    cta: 'Počnite',
  },
  hero: {
    badge: 'Ograničena ponuda',
    headline: 'Vaš sajt.',
    headline2: '99€.',
    headline3: 'Online za 48 sati.',
    subheadline:
      'Pravimo brze, moderne, mobilne sajtove za male biznise i frilensere — od ideje do lansiranja za 48 sati.',
    cta_primary: 'Kontakt',
    cta_secondary: 'Portfolio',
    trust: '50+ zadovoljnih klijenata',
    trust2: 'Isporuka za 48 sati',
  },
  stats: [
    { value: '50+', label: 'Isporučenih sajtova' },
    { value: '48', label: 'Sati prosečna isporuka' },
    { value: '99€', label: 'Sve uključena cena' },
    { value: '100%', label: 'Zadovoljstvo klijenata' },
  ],
  features: {
    title: 'Sve uključeno.',
    subtitle: 'Bez izneneđenja. Bez dodatnih troškova. Jedna cena za sve.',
    items: [
      { icon: 'Palette', label: 'Prilagođen responzivni dizajn' },
      { icon: 'Search', label: 'SEO optimizacija' },
      { icon: 'Mail', label: 'Kontakt forma' },
      { icon: 'BarChart2', label: 'Google Analytics' },
      { icon: 'Zap', label: 'Brzo učitavanje' },
      { icon: 'Smartphone', label: 'Mobile First' },
      { icon: 'Globe', label: 'Smernice za domen i hosting' },
      { icon: 'Lock', label: 'Postavljanje SSL sertifikata' },
      { icon: 'Globe', label: 'Mesečni hosting (15€)' },
      { icon: 'FileText', label: 'Copywriting i hosting (50€/mesečno)' },
    ],
  },
  process: {
    title: 'Kako funkcioniše',
    subtitle: 'Jednostavno. Brzo. Profesionalno.',
    steps: [
      {
        number: '01',
        title: 'Poručite',
        description:
          'Popunite naš kratki upitnik. Recite nam o vašem biznisu, ciljevima i viziji.',
        duration: '',
        icon: 'ClipboardList',
      },
      {
        number: '02',
        title: 'Dizajn',
        description:
          'Kreiramo vizuelni koncept prilagođen vašem brendu i ciljnoj publici.',
        duration: '',
        icon: 'Paintbrush',
      },
      {
        number: '03',
        title: 'Razvoj',
        description:
          'Vaš sajt se gradi modernom, ultrabrzon tehnologijom. Potpuno responzivan. Potpuno optimizovan.',
        duration: '',
        icon: 'Code2',
      },
      {
        number: '04',
        title: 'Isporuka',
        description:
          'Vaš sajt ide uživo. Predajemo vam sve — puno vlasništvo, bez obaveza.',
        duration: '',
        icon: 'Rocket',
      },
    ],
  },
  pricing: {
    title: 'Jedna cena. Sve uključeno.',
    subtitle: 'Bez mesečnih naknada. Bez skrivenih troškova. Platite jednom, vaše zauvek.',
    badge: 'Najpopularnije',
    price: '99',
    currency: '€',
    period: 'jednokratna uplata',
    includes: [
      'Prilagođen responzivni dizajn',
      'SEO optimizacija',
      'Integracija kontakt forme',
      'Postavljanje Google Analytics',
      'Mobile-first razvoj',
      'Postavljanje SSL sertifikata',
      'Brza isporuka za 48 sati',
      'Puno vlasništvo i izvorni kod',
      'Mesečni hosting (15€)',
      'Copywriting i hosting (50€/mesečno)',
    ],
    cta: 'Počnite sada',
    note: 'Bez skrivenih naknada. Bez mesečnih troškova. Platite jednom, vaše zauvek.',
    guarantee: 'Garancija zadovoljstva 30 dana',
  },
  faq: {
    title: 'Česta pitanja',
    subtitle: 'Sve što trebate znati.',
    items: [
      {
        question: 'Šta tačno dobijam za 99€?',
        answer:
          'Dobijate potpuno prilagođen, responzivan sajt, SEO optimizacijom, kontakt formom, Google Analytics-om i SSL podešavanjem. Bez šablona — svaki sajt se gradi od nule.',
      },
      {
        question: 'Koliko brzo možete da isporučite?',
        answer:
          'Većina projekata se završi i objavi u roku od 48 sati od kada primimo vaš upitnik i sadržaj.',
      },
      {
        question: 'Da li posle isporuke posedujem sajt?',
        answer:
          'Apsolutno. Dobijate puno vlasništvo nad sajtom, uključujući sav izvorni kod i materijale. Bez zaključavanja kod jednog dobavljača.',
      },
      {
        question: 'Šta treba da obezbedim?',
        answer:
          'Samo informacije o vašem biznisu, logo (ako ga imate), fotografije ili sadržaj koji želite da koristite, i vašu viziju. Mi ćemo se pobrinuti za ostatak.',
      },
    ],
  },
  showcase: {
    title: 'Naši radovi',
    subtitle: 'Pravi sajtovi koje smo napravili za prave biznise. Pregledajte ih ovde.',
    backToHome: '← Nazad na početnu',
    viewFullscreen: 'Prikaži ceo ekran',
    closePreview: 'Zatvori pregled',
    items: [
      {
        slug: 'bakery',
        title: 'Meel Pekara',
        category: 'Hrana i piće',
        description: 'Zanatski hleb i peciva — topao, privlačan dizajn sa elegantnom tipografijom.',
      },
      {
        slug: 'elegant',
        title: 'Maison de Coiffure',
        category: 'Lepota i salon',
        description: 'Luksuzni frizerski salon sa prefinjenom, minimalističkom estetikom.',
      },
      {
        slug: 'eyewear',
        title: 'LOOQ Naočare',
        category: 'Maloprodaja i moda',
        description: 'Moderan brend naočara sa upečatljivim vizuelima i čistim rasporedom.',
      },
      {
        slug: 'interactive',
        title: 'ToyBox',
        category: 'Deca i zabava',
        description: 'Razigrano, šareno interaktivno iskustvo za prodavnicu igračaka.',
      },
      {
        slug: 'plumber',
        title: 'FlowFix Vodoinstalatere',
        category: 'Lokalne usluge',
        description: 'Profesionalna vodoinstalaterska usluga sa pouzdanim, čistim dizajnom.',
      },
    ],
  },
  contact: {
    title: 'Kontaktirajte nas',
    subtitle: 'Spremni da pokrenete projekat? Javite nam se.',
    phone: '+381 65 820 0252',
    email: 'andrej.nedeljkovic@inlock.ai',
    phoneLabel: 'Telefon',
    emailLabel: 'Email',
  },
  footer: {
    tagline: 'Brzi sajtovi. Poštena cena. Puno vlasništvo.',
    copyright: '© 2025 Web99. Sva prava zadržana.',
    email: 'hello@web99.io',
    links: ['Politika privatnosti', 'Uslovi korišćenja', 'Kontakt'],
  },
}
