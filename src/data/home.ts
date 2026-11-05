/**
 * Static content migrated from the Latin Rogue Cleaning WordPress site.
 *
 * The original site stored these as ACF (Advanced Custom Fields Pro) fields:
 *   - acf-json/group_5d6f08d2b75b2.json ("Home Fields", on the front page)
 *   - acf-json/group_5d70458e65389.json ("Header Fields", options page)
 *
 * See MIGRATION.md for the old ACF field name -> new key mapping.
 * Edit values here (or in the component that consumes them) to update the page.
 */

export interface Headline {
  /** Optional small/script line rendered above the main headline word. */
  small?: string;
  main: string;
}

export interface Service {
  headline: string;
  /** Path to the icon served from /public/images. */
  icon: string;
  text: string;
}

export interface Quote {
  text: string;
  name: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HomeData {
  site: {
    name: string;
    logo: string;
    phone: string;
  };
  nav: NavItem[];
  cta: NavItem;
  hero: {
    headline: Headline;
    text: string;
  };
  about: {
    image: string;
    headline: Headline;
    text: string[];
  };
  services: {
    headline: string;
    text: string;
    items: Service[];
  };
  call: {
    number: string;
    text: string;
  };
  quotes: Quote[];
  contact: {
    headline: Headline;
    text: string[];
    note: string;
    defaultState: string;
  };
}

const home: HomeData = {
  site: {
    name: 'Latin Rogue Cleaning',
    logo: '/images/logo.svg',
    phone: '(520) 256-4237',
  },
  nav: [
    { label: 'about', href: '#about' },
    { label: 'services', href: '#services' },
    { label: 'contact', href: '#quote' },
  ],
  cta: { label: 'Get A Free Quote', href: '#quote' },
  hero: {
    headline: { small: 'Make Your World as', main: 'Clean As Mine' },
    text: 'Contact Latin Rogue Cleaning today and have your home cleaned just the way you want it.',
  },
  about: {
    image: '/images/4pan.png',
    headline: { small: 'Why Latin Rogue', main: 'Is A Clean Sweep' },
    text: [
      "In today's busy world, families, couples, and singles turn to Latin Rogue Cleaning to keep their lives and their homes in order. Latin Rogue is more than just another cleaning service, spend your time the way you want and let the professionals do the cleaning!",
      'Many of our clients take advantage of our competitive rates and hire us for regular visits. But we also clean for other reasons:  parties, seasonal cleaning, post-construction or renovation, asthma and allergy relief and sometimes, or for a well deserved day off!',
    ],
  },
  services: {
    headline: 'Services',
    text: 'On every visit, Latin Rogue Cleaning dusts, vacuums, washes and sanitizes each room. We clean from left to right, top to bottom, and in between every nook and cranny so no detail is overlooked.',
    items: [
      {
        headline: 'Kitchen',
        icon: '/images/5lemons-64x64.png',
        text: 'We clean all cabinets and appliances. We move your small appliances and other items on your counter and clean the counter area. We clean the tops of all items and replace them where we found them. We scour your sink and sweep and thoroughly mop your floor!',
      },
      {
        headline: 'Bathroom',
        icon: '/images/9towels-64x64.png',
        text: 'We clean showers, tubs, toilet and sinks. We clean and disinfect all fixtures and treat any mildew. We clean your mirrors and the shower door tracks. We move most vanity items and clean your counter areas. We clean the tops of vanity items and replace them. We clean your bathroom cabinets and floors.',
      },
      {
        headline: 'All Rooms',
        icon: '/images/2bottles-64x64.png',
        text: 'We dust any ceiling fans, lights, mini-blinds and other high dusting. We clean wall decorations, picture frames, light switches, window sills, doors and door trim. We dust, clean and/or polish all furniture and all decorative items. We clean baseboards quarterly. And we sweep, mop and vacuum.',
      },
    ],
  },
  call: {
    number: '(520) 256-4237',
    text: 'Call Today!',
  },
  quotes: [
    {
      text: 'Latin Rogue Cleaning is, without a doubt, the most responsive cleaning service I have ever used in all my years of property and facilities management services. They respond quickly unlike many of their competitors and the service is always first rate.',
      name: 'Jim Stevenson',
    },
    {
      text: 'I have used several cleaning companies for my offices but nobody is as reliable and consistent as Latin Rogue Cleaning Services. They are the best.',
      name: 'Susan Black',
    },
    {
      text: "Latin Rogue Cleaning is a lifesaver! Without them I wouldn't have had the time (or the energy) to throw my sister's baby shower! Thanks to Latin Rogue Cleaning my party was a success!",
      name: 'Lisa Turner',
    },
  ],
  contact: {
    headline: {
      small: "You're Minutes Away from a free estimate!",
      main: 'free quote',
    },
    text: [
      'Please complete the following form and we will follow up with you within one business day. Or, feel free to call our office anytime!',
      'Prices may vary based on the size of your room, the type of floor and the service desired.',
    ],
    note: 'Latin Rogue Cleaning currently only serves Arizona.',
    defaultState: 'Arizona',
  },
};

export default home;
