const slides = [
  {
    type: 'title',
    tagline: 'GoDaddy Airo',
    title: 'AI for agencies: save time, grow revenue',
    subtitle: 'From red alerts to new clients, without burning out.',
    hero: `Manual Mondays are over. Let's explore how GoDaddy Airo keeps agencies sharp, responsive, and ready for growth.`
  },
  {
    type: 'standard',
    tagline: 'The frame',
    title: 'Automate what drains your time.',
    subtitle: 'Save your judgment for where it matters most.',
    description: `We will shift repetitive work onto AI so you can invest energy in creativity, counsel, and relationships.`
  },
  {
    type: 'list',
    tagline: 'What you will get',
    title: 'The promise for the next 10 minutes',
    bullets: [
      'Handle site alerts at scale',
      'Build a client site draft in minutes',
      'Grow with leads, support, and resources',
      'Three rules for using AI in your agency'
    ],
  },
  {
    type: 'timeline',
    tagline: 'Setting the stage',
    title: 'Monday morning at your agency',
    description: 'A quick pulse check on the room before we dive in.',
    timeline: [
      { label: 'Alert', text: 'Two sites throw critical alerts before 9 AM. You need clarity fast.' },
      { label: 'Draft', text: 'A new client signed overnight. They are waiting on a first look.' },
      { label: 'Growth', text: 'Your pipeline cannot stall. You still need leads, support, and momentum.' }
    ],
  },
  {
    type: 'cards',
    tagline: 'Hub agent',
    title: 'Your control tower',
    cards: [
      {
        headline: 'Why it matters',
        items: [
          'Centralize signals and act in batches',
          'Automate repetitive maintenance',
          'Guardrails for client sites',
          'Reports clients understand',
          'Standardize updates and upgrades'
        ]
      },
      {
        headline: 'Live Prompting',
        prompts: [
          '"Show me all websites under my management."',
          '"Which ones have alerts?"',
          '"Update plugins for all sites with critical updates."'
        ]
      }
    ],
  },
  {
    type: 'demo',
    tagline: 'Demo flow',
    title: 'Hub agent in action',
    bullets: [
      '"Show me all sites with errors."',
      '"Fix the critical issues."',
      '"Run a security scan"'
    ],
    media: {
      type: 'video',
      src: 'hub-sites-agent.mp4',
      caption: 'Hub Agent walk-through'
    },
  },
  {
    type: 'cards',
    tagline: 'Airo Site Designer',
    title: 'Break the content bottleneck',
    cards: [
      {
        headline: 'What It Delivers',
        items: [
          'Drop in discovery notes to get a site draft in minutes',
          'Adjust content and style by describing outcomes',
          'Built with native Gutenberg blocks - no lock-in'
        ]
      },
      {
        headline: 'The Insight',
        body: '83.5% of agencies cite gathering content as their biggest challenge. Site Designer turns that blocker into a launchpad.'
      }
    ],
  },
  {
    type: 'demo',
    tagline: 'Demo flow',
    title: 'Design with prompts',
    bullets: [
      '"Make fine tuned edits."',
      '"Add full pages"',
      '"Finish in WordPress — Your agency craft."'
    ],
    media: {
      type: 'video',
      src: 'airo-site-designer-agent.mp4',
      caption: 'Airo Site Designer walk-through'
    },
  },
  {
    type: 'cards',
    tagline: 'Agency Partner Program',
    title: 'Growth, backed by GoDaddy',
    media: {
      type: 'image',
      src: 'godaddy_agency_program_qr.png',
      caption: 'Scan to explore the Agency Partner Program'
    },
    cards: [
      {
        headline: 'Fueling Your Pipeline',
        items: [
          'Leads delivered straight to your inbox',
          'Dedicated success manager',
          'Priority support when timelines tighten',
          'Resources and training keep teams sharp'
        ]
      }
    ],
  },
  {
    type: 'timeline',
    tagline: 'Scenario',
    title: 'One workflow, three wins',
    timeline: [
      { label: 'Hub Agent', text: 'Spot and resolve critical alerts in minutes.' },
      { label: 'Site Designer', text: 'Draft a client-ready experience at speed.' },
      { label: 'Partner Program', text: 'Grow with leads, support, and strategic resources.' }
    ],
  },
  {
    type: 'list',
    tagline: 'Beyond the core',
    title: 'Specialized agents that fill the gaps',
    bullets: [
      'Blog creator keeps content calendars humming',
      'Logo generator to launch brand stories faster',
      'Market research for positioning and proposals',
      'Site Optimizer to keep experiences fast and secure'
    ],
  },
  {
    type: 'cards',
    tagline: 'Action item',
    title: 'Audit your week',
    cards: [
      {
        headline: 'AI Owns',
        items: [
          'Tasks that repeat daily or weekly',
          'Updates and monitoring with clear rules',
          'Translations from technical to client-ready'
        ]
      },
      {
        headline: 'Humans Own',
        items: [
          'Judgment calls and creative leaps',
          'Client relationships and trust',
          'Playbooks that codify best practice'
        ]
      }
    ],
  },
  {
    type: 'list',
    tagline: 'Three rules',
    title: 'How agencies win with AI',
    bullets: [
      'AI owns the repetitive work',
      'Humans keep the judgment',
      'Playbooks scale your wins'
    ],
  },
  {
    type: 'cta',
    tagline: 'Call to action',
    title: 'Handle Monday mornings without burning out',
    bullets: [
      'Use Hub Agent to cut hours to minutes',
      'Use Site Designer to deliver drafts faster',
      "Join GoDaddy's Agency Partner Program to grow"
    ],
    linkText: 'https://bit.ly/gdvistara to visit this presentation online.',
    media: {
      type: 'image',
      src: 'godaddy_agency_program_qr.png',
      caption: 'Scan to join the Agency Partner Program'
    }
  }
];

window.slides = slides;
