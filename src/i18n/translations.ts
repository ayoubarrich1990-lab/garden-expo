import { Language } from '../types';

export interface TranslationsType {
  common: {
    datesNotice: string;
    location: string;
    venueName: string;
    requestStand: string;
    requestBadge: string;
    contactUs: string;
    discover: string;
    viewAll: string;
    backToHome: string;
    readMore: string;
    close: string;
    search: string;
    filter: string;
    loading: string;
    editionLabel: string;
  };
  navbar: {
    home: string;
    salon: string;
    exhibitors: string;
    visitors: string;
    conferences: string;
    partners: string;
    news: string;
    contact: string;
    bookStand: string;
    spaceVisitor: string;
    spaceExhibitor: string;
    spaceAdmin: string;
    disconnect: string;
  };
  home: {
    editionBadge: string;
    heroTitle: string;
    heroQuote: string;
    heroDesc: string;
    ctaBookStand: string;
    ctaGetBadge: string;
    ctaWatchVideo: string;
    quickStats: {
      editions: { value: string; label: string };
      exhibitors: { value: string; label: string };
      visitors: { value: string; label: string };
      satisfaction: { value: string; label: string };
    };
    brandsTitle: string;
    brandsSubtitle: string;
    partnersTitle: string;
    partnersSubtitle: string;
    aboutBadge: string;
    aboutTitle: string;
    aboutP1: string;
    aboutP2: string;
    aboutP3: string;
    aboutPoints: string[];
    aboutCtaDiscover: string;
    aboutCtaContact: string;
    sectorsBadge: string;
    sectorsTitle: string;
    sectorsSubtitle: string;
    sectors: {
      id: string;
      title: string;
      description: string;
    }[];
    kpiBadge: string;
    kpiTitle: string;
    kpiSubtitle: string;
    kpis: { value: string; label: string; desc: string }[];
    confBadge: string;
    confTitle: string;
    confDesc: string;
    confPoints: string[];
    confCta: string;
    bannerCtaTitle: string;
    bannerCtaSubtitle: string;
    bannerCtaExhibitor: string;
    bannerCtaVisitor: string;
  };
  salon: {
    badge: string;
    title: string;
    subtitle: string;
    introTitle: string;
    introP1: string;
    introP2: string;
    whyTitle: string;
    pilar1Title: string;
    pilar1Desc: string;
    pilar2Title: string;
    pilar2Desc: string;
    pilar3Title: string;
    pilar3Desc: string;
    venueTitle: string;
    venueDesc: string;
  };
  exhibitors: {
    badge: string;
    title: string;
    subtitle: string;
    whyExhibitTitle: string;
    reasons: { title: string; desc: string }[];
    formTitle: string;
    formSubtitle: string;
    companyName: string;
    contactPerson: string;
    jobTitle: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    surfaceDesired: string;
    standType: string;
    standEquipped: string;
    standBare: string;
    sector: string;
    notes: string;
    submitBooking: string;
    successMessage: string;
  };
  visitors: {
    badge: string;
    title: string;
    subtitle: string;
    whyVisitTitle: string;
    profilesTitle: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    jobTitle: string;
    company: string;
    email: string;
    phone: string;
    city: string;
    activitySector: string;
    submitPass: string;
    passFree: string;
    successMessage: string;
    downloadBadge: string;
  };
  conferences: {
    badge: string;
    title: string;
    subtitle: string;
    introTitle: string;
    introDesc: string;
    tableThemesTitle: string;
  };
  partners: {
    badge: string;
    title: string;
    subtitle: string;
    catInstitutional: string;
    catAcademic: string;
    catMedia: string;
    becomePartnerTitle: string;
    becomePartnerDesc: string;
    ctaPartner: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    infoTitle: string;
    organizerLabel: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    send: string;
    sentSuccess: string;
  };
}

export const translations: Record<Language, TranslationsType> = {
  fr: {
    common: {
      datesNotice: 'Casablanca, Maroc | 2027 — Dates à confirmer',
      location: 'OFEC, Casablanca, Maroc',
      venueName: 'Office des Foires et Expositions de Casablanca (OFEC)',
      requestStand: 'DEMANDER UN STAND',
      requestBadge: 'DEMANDER MON BADGE',
      contactUs: 'NOUS CONTACTER',
      discover: 'DÉCOUVRIR',
      viewAll: 'VOIR TOUT',
      backToHome: "Retour à l'accueil",
      readMore: 'En savoir plus',
      close: 'Fermer',
      search: 'Rechercher...',
      filter: 'Filtrer',
      loading: 'Chargement en cours...',
      editionLabel: '4ème Édition · Casablanca 2027',
    },
    navbar: {
      home: 'ACCUEIL',
      salon: 'LE SALON',
      exhibitors: 'EXPOSER',
      visitors: 'VISITER',
      conferences: 'CONFÉRENCES',
      partners: 'PARTENAIRES',
      news: 'ACTUALITÉS',
      contact: 'CONTACT',
      bookStand: 'DEMANDER UN STAND',
      spaceVisitor: 'Espace Visiteur (Badge)',
      spaceExhibitor: 'Espace Exposant (Stand)',
      spaceAdmin: 'Console Admin (Supervision)',
      disconnect: 'Déconnexion',
    },
    home: {
      editionBadge: '4ÈME ÉDITION — CASABLANCA 2027',
      heroTitle: 'Salon International de L’Aménagement Paysager et Urbain',
      heroQuote: '« Des territoires plus verts pour demain »',
      heroDesc:
        "Le rendez-vous international des professionnels, des décideurs et des institutionnels du paysage, de l'urbanisme et des villes durables. Innovations, solutions et partenariats pour des territoires résilients en Afrique.",
      ctaBookStand: 'RÉSERVER UN STAND',
      ctaGetBadge: 'DEMANDER UN BADGE VISITEUR',
      ctaWatchVideo: 'VOIR LE FILM DU SALON',
      quickStats: {
        editions: { value: '3', label: 'Éditions Réussies' },
        exhibitors: { value: '210+', label: 'Exposants Réunis' },
        visitors: { value: '15 500+', label: 'Visiteurs Pros' },
        satisfaction: { value: '95 %', label: 'Satisfaction' },
      },
      brandsTitle: 'ILS NOUS ONT FAIT CONFIANCE',
      brandsSubtitle: 'Grandes Marques & Entreprises Exposantes de Référence',
      partnersTitle: 'PARTENAIRES INSTITUTIONNELS & SCIENTIFIQUES',
      partnersSubtitle: 'Ministères, Fédérations, Ordres Professionnels et Grandes Écoles',
      aboutBadge: 'À PROPOS DU SALON',
      aboutTitle: 'Le Grand Carrefour Panafricain du Paysage et de la Ville Verte',
      aboutP1:
        "Plateforme B2B d'envergure internationale à Casablanca, Garden Expo Africa s'impose comme l'événement fédérateur incontournable des professionnels du paysage, de l'aménagement urbain et de la ville durable en Afrique.",
      aboutP2:
        'Conçu comme un véritable hub de rencontres d’affaires et de transfert technologique, le salon rassemble les leaders de l’ingénierie végétale, de l’irrigation raisonnée, des équipements sportifs, des piscines et des solutions écologiques face aux défis climatiques.',
      aboutP3:
        "Sous l'impulsion des grands chantiers nationaux et continentaux, Garden Expo Africa offre un écosystème propice aux partenariats stratégiques entre donneurs d'ordre publics et concepteurs privés.",
      aboutPoints: [
        'Espace d’exposition interactif de plus de 12 000 m² à l’OFEC Casablanca',
        'Conférences de haut niveau, tables rondes scientifiques et ateliers pratiques',
        'Plateforme de rendez-vous B2B qualifiés et démonstrations techniques en direct',
      ],
      aboutCtaDiscover: 'DÉCOUVRIR LE SALON',
      aboutCtaContact: "CONTACTER L'ORGANISATEUR",
      sectorsBadge: "SECTEURS D'EXPOSITION",
      sectorsTitle: "Secteurs d'Activité d'Exposition",
      sectorsSubtitle:
        "Une offre exhaustive regroupant 9 filières d'excellence pour concevoir, aménager et entretenir des espaces verts durables et des villes résilientes.",
      sectors: [
        {
          id: 'sec-1',
          title: 'Mobilier urbain et aires de jeux',
          description:
            'Bancs publics bioclimatiques, pergolas, corbeilles de tri, structures de jeux inclusives et parcours plein air.',
        },
        {
          id: 'sec-2',
          title: 'Revêtement de sol et terrains de sport',
          description:
            'Sols amortissants EPDM coulés, dalles de sécurité, pistes d’athlétisme, gazons sportifs et résines extérieures.',
        },
        {
          id: 'sec-3',
          title: 'Arrosage',
          description:
            'Micro-irrigation de précision, tuyères, programmateurs connectés, télégestion et réutilisation des eaux usées traitées (REUT).',
        },
        {
          id: 'sec-4',
          title: 'Équipement et matériel de jardinage',
          description:
            'Tondeuses professionnelles, taille-haies, débroussailleuses, broyeurs de branches et outillage électroportatif.',
        },
        {
          id: 'sec-5',
          title: 'Horticulture et végétale',
          description:
            'Pépinières, arbres d’alignement, palmiers, plantes succulentes, gazons en rouleaux et semences adaptées au stress hydrique.',
        },
        {
          id: 'sec-6',
          title: 'Éclairage extérieur',
          description:
            'Luminaires solaires autonomes, projecteurs LED basse consommation, candélabres urbains et illuminations architecturales.',
        },
        {
          id: 'sec-7',
          title: 'Mobilier de jardin',
          description:
            'Salons extérieurs en teck et aluminium, transats haut de gamme, parasols professionnels, ombrières et cuisines d’extérieur.',
        },
        {
          id: 'sec-8',
          title: 'Équipement et matériaux de travaux publics',
          description:
            'Mini-pelles de terrassement paysager, chargeuses compactes, trancheuses pour réseaux et matériaux drainants écologiques.',
        },
        {
          id: 'sec-9',
          title: 'Piscine',
          description:
            'Piscines biologiques, bassins d’ornement, spas professionnels, filtration écologique et équipements de bien-être extérieur.',
        },
      ],
      kpiBadge: 'CHIFFRES CLÉS DU SALON',
      kpiTitle: 'Un Impact Économique et Professionnel Mesurable',
      kpiSubtitle: 'Des indicateurs consolidés attestant de la solidité et de la légitimité du salon.',
      kpis: [
        {
          value: '100+',
          label: 'Exposants Directs',
          desc: 'Entreprises leaders du Maroc et de l’international',
        },
        {
          value: '8 500+',
          label: 'Visiteurs Professionnels Attendus',
          desc: 'Architectes, promoteurs, paysagistes et communes',
        },
        {
          value: '15+',
          label: 'Délégations Africaines',
          desc: 'Représentants ministériels et décideurs du continent',
        },
        {
          value: '24',
          label: 'Conférences & Workshops',
          desc: 'Animés par des experts de renom international',
        },
      ],
      confBadge: 'PROGRAMME TECHNIQUE & SCIENTIFIQUE',
      confTitle: 'Conférences & Débats : Les Villes Durables de Demain',
      confDesc:
        "Sous le thème central de la résilience hydrique et de l'urbanisme éco-responsable, découvrez les analyses d'experts sur l'avenir des territoires verts en Afrique.",
      confPoints: [
        'Gestion sobre et réutilisation des eaux non conventionnelles (REUT)',
        'Végétalisation urbaine face au stress thermique des métropoles',
        'Nouvelles normes de sécurité et d’accessibilité des aires récréatives',
      ],
      confCta: 'CONSULTER LE PROGRAMME COMPLET',
      bannerCtaTitle: 'Participez à la Prochaine Édition de Garden Expo Africa',
      bannerCtaSubtitle:
        'Que vous soyez exposant ou visiteur professionnel, réservez dès maintenant votre présence au cœur du salon de référence.',
      bannerCtaExhibitor: 'RÉSERVER MON EMPLACEMENT STAND',
      bannerCtaVisitor: 'OBTENIR MON E-BADGE COUPE-FILE GRATUIT',
    },
    salon: {
      badge: 'LE SALON OFFICIEL',
      title: 'Garden Expo Africa — Édition Maroc',
      subtitle: 'La Grande Vitrine Panafricaine du Paysage, des Espaces Verts et de la Ville Durable',
      introTitle: 'Une vision stratégique pour les territoires de demain',
      introP1:
        "Garden Expo Africa s'érige comme le lieu de convergence privilégié des architectes, paysagistes, pépiniéristes, ingénieurs et décideurs municipaux désireux de répondre aux défis écologiques contemporains.",
      introP2:
        'Organisé à Casablanca, capitale économique du Royaume et carrefour des affaires en Afrique du Nord et de l’Ouest, le salon valorise le savoir-faire local tout en ouvrant des perspectives d’exportation pour les industriels du secteur.',
      whyTitle: 'Trois piliers fondamentaux au service de la profession',
      pilar1Title: 'Business & Réseautage B2B',
      pilar1Desc:
        'Rencontres ciblées entre prescripteurs, directeurs techniques municipaux, architectes et fournisseurs certifiés.',
      pilar2Title: 'Innovation & Éco-Conception',
      pilar2Desc:
        'Présentation des dernières avancées technologiques en irrigation connectée, matériaux drainants et éclairage solaire.',
      pilar3Title: 'Partage Scientifique & Normes',
      pilar3Desc:
        'Partage des bonnes pratiques environnementales et conformité aux standards internationaux d’aménagement.',
      venueTitle: 'Un site prestigieux au cœur de Casablanca',
      venueDesc:
        "L'Office des Foires et Expositions de Casablanca (OFEC), situé en front de mer face à la majestueuse Mosquée Hassan II, offre des infrastructures modernes adaptées à l'accueil d'expositions professionnelles de grande ampleur.",
    },
    exhibitors: {
      badge: 'ESPACE EXPOSANTS',
      title: 'Exposer à Garden Expo Africa',
      subtitle: 'Valorisez vos innovations auprès de plus de 8 500 décideurs et professionnels qualifiés.',
      whyExhibitTitle: 'Pourquoi exposer à Garden Expo Africa ?',
      reasons: [
        {
          title: 'Accédez à des donneurs d’ordre majeurs',
          desc: 'Rencontrez les directeurs des régies d’aménagement, mairies, promoteurs immobiliers et architectes paysagistes.',
        },
        {
          title: 'Lancez vos nouveaux produits',
          desc: 'Bénéficiez d’une visibilité médiatique accrue et présentez vos solutions en direct à un public d’acheteurs.',
        },
        {
          title: 'Accélérez votre développement en Afrique',
          desc: 'Établissez des partenariats stratégiques avec des délégations venues de tout le continent.',
        },
      ],
      formTitle: 'Demande de Réservation de Stand & Devis',
      formSubtitle: 'Remplissez le formulaire officiel ci-dessous pour recevoir une proposition d’emplacement adaptée.',
      companyName: 'Nom de l’entreprise',
      contactPerson: 'Nom et Prénom du contact',
      jobTitle: 'Fonction / Poste',
      email: 'Email professionnel',
      phone: 'Téléphone / Mobile',
      city: 'Ville',
      country: 'Pays',
      surfaceDesired: 'Superficie souhaitée (m²)',
      standType: 'Type de stand',
      standEquipped: 'Stand Équipé (cloisons, enseigne, éclairage, mobilier de base)',
      standBare: 'Stand Nu (surface libre pour aménagement sur mesure)',
      sector: 'Secteur principal d’activité',
      notes: 'Besoins particuliers ou remarques',
      submitBooking: 'ENVOYER MA DEMANDE DE STAND',
      successMessage: 'Votre demande a été enregistrée avec succès. Notre équipe commerciale vous contactera sous 24h.',
    },
    visitors: {
      badge: 'ESPACE VISITEURS',
      title: 'Visiter Garden Expo Africa',
      subtitle: 'Votre pass professionnel gratuit pour accéder aux 2 halls d’exposition et aux conférences.',
      whyVisitTitle: 'Pourquoi visiter le salon ?',
      profilesTitle: 'Profils des visiteurs professionnels accueillis',
      formTitle: 'Demande de Badge Coupe-File Gratuit',
      formSubtitle: 'Votre badge nominatif officiel vous sera délivré instantanément avec QR Code d’accès sécurisé.',
      fullName: 'Nom et Prénom',
      jobTitle: 'Fonction professionnelle',
      company: 'Entreprise ou Organisme',
      email: 'Email professionnel',
      phone: 'Numéro de téléphone',
      city: 'Ville de résidence',
      activitySector: 'Votre domaine d’activité',
      submitPass: 'GÉNÉRER MON E-BADGE GRATUIT',
      passFree: 'Accès 100% gratuit réservé exclusivement aux professionnels et étudiants des filières associées.',
      successMessage: 'Votre badge officiel a été généré avec succès ! Retrouvez-le dans votre espace visiteur.',
      downloadBadge: 'TÉLÉCHARGER MON BADGE',
    },
    conferences: {
      badge: 'PROGRAMME TECHNIQUE',
      title: 'Conférences & Ateliers Scientifiques',
      subtitle: 'Découvrez les interventions d’experts internationaux sur les grands défis urbains et climatiques.',
      introTitle: 'Un carrefour d’échanges intellectuels et opérationnels',
      introDesc:
        'Pendant les 4 jours du salon, participez à un cycle dense de conférences plénières, tables rondes et retours d’expériences sur les projets majeurs d’aménagement paysager au Maroc et en Afrique.',
      tableThemesTitle: 'Thématiques majeures abordées lors des sessions',
    },
    partners: {
      badge: 'NOS PARTENAIRES',
      title: 'Partenaires Institutionnels & Scientifiques',
      subtitle: 'Ils soutiennent la dynamique de développement de Garden Expo Africa.',
      catInstitutional: 'Partenaires Institutionnels & Ministériels',
      catAcademic: 'Partenaires Scientifiques & Grandes Écoles',
      catMedia: 'Partenaires Médias & Presse Professionnelle',
      becomePartnerTitle: 'Devenir Partenaire Officiel',
      becomePartnerDesc:
        'Associez l’image de votre institution ou média à la référence panafricaine des espaces verts et de la ville durable.',
      ctaPartner: 'CONTACTER LE SERVICE PARTENARIATS',
    },
    contact: {
      badge: 'CONTACT & ACCÈS',
      title: 'Contacter le Comité d’Organisation',
      subtitle: 'Une question sur votre participation ou votre visite ? Nos équipes sont à votre entière disposition.',
      infoTitle: 'Coordonnées de l’Organisateur',
      organizerLabel: 'Organisateur Officiel',
      addressLabel: 'Adresse & Siège',
      phoneLabel: 'Téléphones Directs',
      emailLabel: 'Emails de Contact',
      hoursLabel: 'Horaires d’Accueil',
      formTitle: 'Envoyez-nous un Message',
      formSubtitle: 'Nous nous engageons à vous apporter une réponse personnalisée dans les meilleurs délais.',
      fullName: 'Votre Nom complet',
      company: 'Entreprise / Organisme',
      email: 'Adresse Email',
      phone: 'Téléphone',
      subject: 'Objet du message',
      message: 'Votre message ou question',
      send: 'ENVOYER MON MESSAGE',
      sentSuccess: 'Votre message a bien été envoyé. Notre équipe vous répondra rapidement.',
    },
  },
  en: {
    common: {
      datesNotice: 'Casablanca, Morocco | 2027 — Dates to be confirmed',
      location: 'OFEC, Casablanca, Morocco',
      venueName: 'Casablanca International Fair & Exhibition Center (OFEC)',
      requestStand: 'BOOK A STAND',
      requestBadge: 'GET YOUR BADGE',
      contactUs: 'CONTACT US',
      discover: 'DISCOVER',
      viewAll: 'VIEW ALL',
      backToHome: 'Back to Home',
      readMore: 'Read More',
      close: 'Close',
      search: 'Search...',
      filter: 'Filter',
      loading: 'Loading in progress...',
      editionLabel: '4th Edition · Casablanca 2027',
    },
    navbar: {
      home: 'HOME',
      salon: 'THE EXPO',
      exhibitors: 'EXHIBIT',
      visitors: 'VISIT',
      conferences: 'CONFERENCES',
      partners: 'PARTNERS',
      news: 'NEWS',
      contact: 'CONTACT',
      bookStand: 'BOOK A STAND',
      spaceVisitor: 'Visitor Portal (Badge)',
      spaceExhibitor: 'Exhibitor Portal (Stand)',
      spaceAdmin: 'Admin Console (Supervision)',
      disconnect: 'Sign Out',
    },
    home: {
      editionBadge: '4TH EDITION — CASABLANCA 2027',
      heroTitle: 'International Exhibition for Landscaping and Urban Development',
      heroQuote: '“Greener territories for tomorrow”',
      heroDesc:
        'The international gathering for landscape, urban planning and sustainable city professionals, decision-makers and institutions. Innovations, solutions and strategic partnerships for resilient territories in Africa.',
      ctaBookStand: 'BOOK A STAND',
      ctaGetBadge: 'REQUEST A VISITOR BADGE',
      ctaWatchVideo: 'WATCH EXPO TEASER',
      quickStats: {
        editions: { value: '3', label: 'Successful Editions' },
        exhibitors: { value: '210+', label: 'Exhibiting Brands' },
        visitors: { value: '15,500+', label: 'Trade Visitors' },
        satisfaction: { value: '95%', label: 'Satisfaction Rate' },
      },
      brandsTitle: 'THEY TRUST US',
      brandsSubtitle: 'Leading Brands & Benchmark Exhibiting Companies',
      partnersTitle: 'INSTITUTIONAL & SCIENTIFIC PARTNERS',
      partnersSubtitle: 'Ministries, Federations, Professional Orders and Universities',
      aboutBadge: 'ABOUT THE EXPO',
      aboutTitle: 'The Pan-African Hub for Landscaping and Green Cities',
      aboutP1:
        'As an international B2B platform based in Casablanca, Garden Expo Africa has established itself as the essential unifying event for professionals in landscaping, urban planning, and sustainable city development in Africa.',
      aboutP2:
        'Designed as a true hub for business meetings and technology transfer, the expo brings together leaders in plant engineering, smart irrigation, sports facilities, pools, and ecological solutions facing climate challenges.',
      aboutP3:
        'Driven by major national and continental infrastructure projects, Garden Expo Africa offers a fertile ecosystem for strategic partnerships between public authorities and private creators.',
      aboutPoints: [
        'Over 12,000 sqm of interactive exhibition space at OFEC Casablanca',
        'High-level conferences, scientific roundtables, and practical masterclasses',
        'Tailored B2B matchmaking platform and live technical equipment demonstrations',
      ],
      aboutCtaDiscover: 'DISCOVER THE EXPO',
      aboutCtaContact: 'CONTACT THE ORGANIZER',
      sectorsBadge: 'EXHIBITION SECTORS',
      sectorsTitle: 'Exhibition Activity Sectors',
      sectorsSubtitle:
        'A comprehensive showcase comprising 9 specialized sectors to design, build, and maintain sustainable green spaces and resilient cities.',
      sectors: [
        {
          id: 'sec-1',
          title: 'Urban Furniture & Playgrounds',
          description:
            'Bioclimatic public benches, pergolas, waste sorting bins, inclusive play structures and outdoor fitness courses.',
        },
        {
          id: 'sec-2',
          title: 'Flooring & Sports Grounds',
          description:
            'In-situ cast EPDM safety flooring, shock-absorbing tiles, athletic tracks, synthetic turf and outdoor permeable resins.',
        },
        {
          id: 'sec-3',
          title: 'Irrigation & Water Solutions',
          description:
            'Precision micro-irrigation, pop-up sprayers, smart connected controllers, telemetry, and treated wastewater reuse (TWR).',
        },
        {
          id: 'sec-4',
          title: 'Gardening Tools & Machinery',
          description:
            'Commercial mowers, hedge trimmers, brush cutters, wood chippers, and high-performance cordless electric tools.',
        },
        {
          id: 'sec-5',
          title: 'Horticulture & Plant Material',
          description:
            'Tree nurseries, avenue trees, palms, drought-tolerant succulents, roll sod turf, and drought-resistant seeds.',
        },
        {
          id: 'sec-6',
          title: 'Outdoor Lighting',
          description:
            'Autonomous solar lighting, low-energy LED projectors, decorative urban lamp posts, and architectural illuminations.',
        },
        {
          id: 'sec-7',
          title: 'Garden Furniture',
          description:
            'Teak and aluminium outdoor lounges, premium sunbeds, commercial umbrellas, shading structures, and outdoor kitchens.',
        },
        {
          id: 'sec-8',
          title: 'Civil Engineering & Public Works Equipment',
          description:
            'Mini-excavators for landscaping, compact loaders, trenchers for networks, and eco-friendly permeable aggregates.',
        },
        {
          id: 'sec-9',
          title: 'Swimming Pools & Water Features',
          description:
            'Natural biological swimming pools, ornamental ponds, commercial spas, eco-filtration, and outdoor wellness installations.',
        },
      ],
      kpiBadge: 'KEY EXPO FIGURES',
      kpiTitle: 'Measurable Economic and Professional Impact',
      kpiSubtitle: 'Consolidated performance metrics confirming the authority and growth of the expo.',
      kpis: [
        {
          value: '100+',
          label: 'Direct Exhibitors',
          desc: 'Leading Moroccan and international enterprises',
        },
        {
          value: '8,500+',
          label: 'Expected Trade Visitors',
          desc: 'Architects, developers, landscapers, and municipalities',
        },
        {
          value: '15+',
          label: 'African Delegations',
          desc: 'Ministerial representatives and continental decision-makers',
        },
        {
          value: '24',
          label: 'Conferences & Workshops',
          desc: 'Led by world-renowned experts and researchers',
        },
      ],
      confBadge: 'TECHNICAL & SCIENTIFIC PROGRAM',
      confTitle: 'Conferences & Debates: Sustainable Cities of Tomorrow',
      confDesc:
        'Focusing on water resilience and eco-responsible urban planning, discover deep expert insights on the future of green territories in Africa.',
      confPoints: [
        'Sobriety and reuse of treated non-conventional water (REUT)',
        'Urban greening strategies to mitigate metropolitan heat islands',
        'New safety and accessibility standards for recreational public areas',
      ],
      confCta: 'VIEW FULL PROGRAM',
      bannerCtaTitle: 'Join the Next Edition of Garden Expo Africa',
      bannerCtaSubtitle:
        'Whether you are an exhibitor or professional visitor, secure your presence at the benchmark continental trade show.',
      bannerCtaExhibitor: 'BOOK MY STAND SPACE',
      bannerCtaVisitor: 'GET MY FREE FAST-TRACK E-BADGE',
    },
    salon: {
      badge: 'THE OFFICIAL EXPO',
      title: 'Garden Expo Africa — Morocco Edition',
      subtitle: 'The Leading Pan-African Showcase for Landscaping, Green Spaces, and Sustainable Cities',
      introTitle: 'A Strategic Vision for Tomorrow’s Territories',
      introP1:
        'Garden Expo Africa is the premier meeting place for architects, landscapers, nurserymen, civil engineers, and municipal authorities seeking answers to contemporary environmental challenges.',
      introP2:
        'Hosted in Casablanca, Morocco’s economic capital and a thriving commercial hub connecting North and West Africa, the expo highlights local know-how while opening export channels for global suppliers.',
      whyTitle: 'Three Pillars Serving the Profession',
      pilar1Title: 'B2B Business & Networking',
      pilar1Desc:
        'High-impact connections between specifiers, municipal directors, lead architects, and certified equipment suppliers.',
      pilar2Title: 'Innovation & Eco-Design',
      pilar2Desc:
        'Showcasing the latest breakthroughs in smart irrigation, permeable surfacing, drought-resilient flora, and solar lighting.',
      pilar3Title: 'Scientific Exchange & Standards',
      pilar3Desc:
        'Promoting environmental best practices, sustainable urban standards, and climate adaptation frameworks.',
      venueTitle: 'A Prestigious Venue in the Heart of Casablanca',
      venueDesc:
        'The Casablanca International Fair Center (OFEC), located on the oceanfront directly facing the iconic Hassan II Mosque, offers modern exhibition infrastructure designed for major trade events.',
    },
    exhibitors: {
      badge: 'EXHIBITOR PORTAL',
      title: 'Exhibit at Garden Expo Africa',
      subtitle: 'Showcase your solutions to more than 8,500 qualified trade decision-makers and buyers.',
      whyExhibitTitle: 'Why Exhibit at Garden Expo Africa?',
      reasons: [
        {
          title: 'Access Major Public & Private Decision-Makers',
          desc: 'Meet directors of urban agencies, municipalities, real estate developers, and lead landscape architects.',
        },
        {
          title: 'Launch New Products with High Visibility',
          desc: 'Gain targeted media exposure and present live demonstrations directly to qualified procurement teams.',
        },
        {
          title: 'Accelerate Continental Expansion',
          desc: 'Forge strategic distribution partnerships with visiting delegations from across Africa.',
        },
      ],
      formTitle: 'Stand Booking Request & Quote',
      formSubtitle: 'Complete the official form below to receive a personalized booth layout and quotation.',
      companyName: 'Company Name',
      contactPerson: 'Contact Full Name',
      jobTitle: 'Job Title / Position',
      email: 'Corporate Email',
      phone: 'Phone / Mobile',
      city: 'City',
      country: 'Country',
      surfaceDesired: 'Desired Surface Area (sqm)',
      standType: 'Stand Package',
      standEquipped: 'Equipped Stand (walls, signage, lighting, basic furniture package)',
      standBare: 'Bare Space (custom architecture and bespoke stand build)',
      sector: 'Primary Sector of Activity',
      notes: 'Special requests or technical requirements',
      submitBooking: 'SUBMIT MY STAND APPLICATION',
      successMessage: 'Your booking inquiry was successfully registered. Our commercial team will contact you within 24h.',
    },
    visitors: {
      badge: 'VISITOR PORTAL',
      title: 'Visit Garden Expo Africa',
      subtitle: 'Your free professional badge granting full access to both exhibition halls and technical sessions.',
      whyVisitTitle: 'Why Visit the Expo?',
      profilesTitle: 'Profile of Professional Visitors Welcomed',
      formTitle: 'Free Fast-Track E-Badge Registration',
      formSubtitle: 'Your official nominative pass will be generated instantly with a secure QR Code.',
      fullName: 'Full Name',
      jobTitle: 'Professional Role',
      company: 'Company / Organization',
      email: 'Work Email Address',
      phone: 'Phone Number',
      city: 'City of Residence',
      activitySector: 'Your Sector of Activity',
      submitPass: 'GENERATE MY FREE E-BADGE',
      passFree: '100% complimentary entry strictly reserved for trade professionals and university students in related fields.',
      successMessage: 'Your official visitor badge was generated successfully! You can access it anytime in your portal.',
      downloadBadge: 'DOWNLOAD MY BADGE',
    },
    conferences: {
      badge: 'TECHNICAL SESSIONS',
      title: 'Conferences & Scientific Workshops',
      subtitle: 'Discover insights from international experts on key climate, landscape and urban challenges.',
      introTitle: 'A Forum for Intellectual and Operational Dialogue',
      introDesc:
        'Across all 4 days of the expo, take part in high-level plenary sessions, roundtables, and case study presentations on major landscape and infrastructure projects in Morocco and Africa.',
      tableThemesTitle: 'Key Themes Addressed during Technical Sessions',
    },
    partners: {
      badge: 'OUR PARTNERS',
      title: 'Institutional & Scientific Partners',
      subtitle: 'Organizations supporting the growth and mission of Garden Expo Africa.',
      catInstitutional: 'Institutional & Ministerial Partners',
      catAcademic: 'Scientific Partners & Higher Institutes',
      catMedia: 'Media Partners & Trade Publications',
      becomePartnerTitle: 'Become an Official Partner',
      becomePartnerDesc:
        'Align your brand or organization with Africa’s benchmark green space and sustainable city trade expo.',
      ctaPartner: 'CONTACT PARTNERSHIPS OFFICE',
    },
    contact: {
      badge: 'CONTACT & VENUE',
      title: 'Contact the Organizing Committee',
      subtitle: 'Questions regarding your exhibition or visit? Our team is dedicated to assisting you.',
      infoTitle: 'Organizer Contact Details',
      organizerLabel: 'Official Organizer',
      addressLabel: 'Headquarters Address',
      phoneLabel: 'Direct Phone Lines',
      emailLabel: 'Contact Email Addresses',
      hoursLabel: 'Operating Hours',
      formTitle: 'Send Us a Message',
      formSubtitle: 'We commit to providing a tailored and prompt response.',
      fullName: 'Your Full Name',
      company: 'Company / Institution',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Message Subject',
      message: 'Your Message or Inquiry',
      send: 'SEND MY MESSAGE',
      sentSuccess: 'Your message has been sent successfully. Our team will get back to you shortly.',
    },
  },
  ar: {
    common: {
      datesNotice: 'الدار البيضاء، المغرب | 2027 — التواريخ ستحدد لاحقاً',
      location: 'مكتب المعارض والأسواق الدولية بالدار البيضاء (OFEC)',
      venueName: 'مكتب المعارض والأسواق الدولية بالدار البيضاء (OFEC)',
      requestStand: 'طلب جناح عرض',
      requestBadge: 'طلب شارة الدخول',
      contactUs: 'اتصل بنا',
      discover: 'اكتشف المزيد',
      viewAll: 'عرض الكل',
      backToHome: 'العودة للرئيسية',
      readMore: 'اقرأ المزيد',
      close: 'إغلاق',
      search: 'بحث...',
      filter: 'تصفية',
      loading: 'جاري التحميل...',
      editionLabel: 'النسخة الرابعة · الدار البيضاء 2027',
    },
    navbar: {
      home: 'الرئيسية',
      salon: 'عن المعرض',
      exhibitors: 'العارضون',
      visitors: 'الزوار',
      conferences: 'المؤتمرات',
      partners: 'الشركاء',
      news: 'الأخبار',
      contact: 'اتصل بنا',
      bookStand: 'حجز جناح عرض',
      spaceVisitor: 'فضاء الزائر (الشارة)',
      spaceExhibitor: 'فضاء العارض (الجناح)',
      spaceAdmin: 'لوحة التحكم الإدارية',
      disconnect: 'تسجيل الخروج',
    },
    home: {
      editionBadge: 'النسخة الرابعة — الدار البيضاء 2027',
      heroTitle: 'المعرض الدولي لتهيئة المساحات الخضراء والتهيئة الحضرية',
      heroQuote: '«أقاليم أكثر اخضراراً لغد أفضل»',
      heroDesc:
        'الملتقى الدولي للمهنيين وصناع القرار والمؤسسات الفاعلة في مجال المساحات الخضراء، التهيئة الحضرية والمدن المستدامة. ابتكارات، حلول وشراكات استراتيجية لتنمية مرنة في إفريقيا.',
      ctaBookStand: 'حجز جناح عرض',
      ctaGetBadge: 'طلب شارة الزائر المهني',
      ctaWatchVideo: 'مشاهدة الفيديو التعريفي',
      quickStats: {
        editions: { value: '3', label: 'دورات ناجحة' },
        exhibitors: { value: '+210', label: 'شركة وعلامة تجارية' },
        visitors: { value: '+15,500', label: 'زائر مهني' },
        satisfaction: { value: '95 %', label: 'نسبة الرضا' },
      },
      brandsTitle: 'وضعوا ثقتهم بنا',
      brandsSubtitle: 'كبرى الشركات والعلامات التجارية الرائدة العارضة',
      partnersTitle: 'الشركاء المؤسساتيون والعلميون',
      partnersSubtitle: 'الوزارات، الفيدراليات، الهيئات المهنية والجامعات الوطنية والدولية',
      aboutBadge: 'عن المعرض',
      aboutTitle: 'الملتقى الإفريقي الأكبر للمساحات الخضراء والمدينة المستدامة',
      aboutP1:
        'باعتباره منصة أعمال دولية B2B في الدار البيضاء، يفرض معرض Garden Expo Africa نفسه كحدث رائد يجمع كافة الفاعلين في مجال التهيئة الحضرية، هندسة المساحات الطبيعية وبناء مدن مستدامة في إفريقيا.',
      aboutP2:
        'تم تصميم المعرض كملتقى حقيقي للأعمال ونقل التكنولوجيا، حيث يجمع رواد الهندسة النباتية، تقنيات الري الذكي، التجهيزات الرياضية، المسابح والحلول البيئية لمواجهة التحديات المناخية.',
      aboutP3:
        'في ظل الأوراش الكبرى الوطنية والقارية، يوفر المعرض منظومة خصبة لعقد شراكات استراتيجية بين المؤسسات العمومية والمقاولات الخاصة المبتكرة.',
      aboutPoints: [
        'مساحة عرض تفاعلية تتجاوز 12,000 متر مربع بمكتب المعارض بالدار البيضاء',
        'مؤتمرات رفيعة المستوى، ندوات علمية وورشات عمل تطبيقية مع نخبة الخبراء',
        'منصة لقاءات أعمال B2B متخصصة وعروض توضيحية حية للآليات والمعدات',
      ],
      aboutCtaDiscover: 'اكتشف تفاصيل المعرض',
      aboutCtaContact: 'التواصل مع المنظمين',
      sectorsBadge: 'قطاعات العرض',
      sectorsTitle: 'قطاعات أنشطة المعرض المتخصصة',
      sectorsSubtitle:
        'عرض متكامل يشمل 9 فروع متميزة لتصميم، تهيئة وصيانة مساحات خضراء مستدامة ومدن حديثة مرنة.',
      sectors: [
        {
          id: 'sec-1',
          title: 'الأثاث الحضري ومساحات اللعب',
          description:
            'مقاعد عمومية بيومناخية، مظلات حضرية، سلات الفرز، ألعاب تفاعلية شاملة للأطفال ومسارات رياضية خارجية.',
        },
        {
          id: 'sec-2',
          title: 'أرضيات الملاعب والمساحات الرياضية',
          description:
            'أرضيات مطاطية ممتصة للصدمات EPDM، بلاط الأمان، حلبات ألعاب القوى، العشب الرياضي الاصطناعي والراتنجات الخارجية.',
        },
        {
          id: 'sec-3',
          title: 'السقي والري الذكي',
          description:
            'أنظمة الري الدقيق، مرشات حديثة، مبرمجات ذكية متصلة، التحكم عن بعد وإعادة استخدام المياه العادمة المعالجة.',
        },
        {
          id: 'sec-4',
          title: 'معدات وآلات البستنة الاحترافية',
          description:
            'جزازات العشب المهنية، قواطع الأغصان، آلات التشذيب، ماكينات فرم المخلفات والأدوات الكهربائية اللاسلكية.',
        },
        {
          id: 'sec-5',
          title: 'البستنة، المشاتل والنباتات',
          description:
            'مشاتل الأشجار، نخيل، نباتات مقاومة للجفاف، لفائف العشب الطبيعي وبذور متأقلمة مع ندرة المياه.',
        },
        {
          id: 'sec-6',
          title: 'الإنارة الخارجية والطاقة الشمسية',
          description:
            'إنارة شمسية ذكية، كشافات LED عالية الكفاءة، أعمدة إنارة ديكورية وإنارة المعالم المعمارية والحدائق.',
        },
        {
          id: 'sec-7',
          title: 'أثاث الحدائق الفاخر',
          description:
            'جلسات خارجية من الخشب والألمنيوم، أسرّة استرخاء فاخرة، مظلات مهنية، مظلات واقية ومطابخ حدائق خارجية.',
        },
        {
          id: 'sec-8',
          title: 'معدات ومواد الأشغال العامة والتهيئة',
          description:
            'حفارات صغيرة للتهيئة الطبيعية، جرافات مدمجة، آلات حفر شبكات الري ومواد تصريف مياه صديقة للبيئة.',
        },
        {
          id: 'sec-9',
          title: 'المسابح والبحيرات المائية',
          description:
            'مسابح بيولوجية، بحيرات مائية اصطناعية، حمامات سبا مهنية، أنظمة فلترة صديقة للبيئة ومعدات استجمام خارجي.',
        },
      ],
      kpiBadge: 'أرقام رئيسية عن المعرض',
      kpiTitle: 'أثر اقتصادي ومهني ملموس وشامل',
      kpiSubtitle: 'مؤشرات أداء قوية تؤكد ريادة ومكانة المعرض على الصعيدين الوطني والقاري.',
      kpis: [
        {
          value: '+100',
          label: 'عارض مباشر ورائد',
          desc: 'شركات وطنية ودولية كبرى متخصصة',
        },
        {
          value: '+8,500',
          label: 'زائر مهني متوقع',
          desc: 'مهندسون معماريون، مقاولون وجماعات ترابية',
        },
        {
          value: '+15',
          label: 'وفد إفريقي مشارك',
          desc: 'مسؤولون حكوميون وصناع قرار من القارة',
        },
        {
          value: '24',
          label: 'ندوة وورشة عمل علمية',
          desc: 'بإشراف خبراء وباحثين دوليين بارزين',
        },
      ],
      confBadge: 'البرنامج العلمي والتقني',
      confTitle: 'المؤتمرات والنقاشات: مدن المستقبل المستدامة',
      confDesc:
        'تحت شعار المرونة المائية والتخطيط الحضري الإيكولوجي، اكتشف تحليلات معمقة لنخبة الخبراء حول مستقبل المساحات الخضراء في إفريقيا.',
      confPoints: [
        'ترشيد الموارد المائية واستعمال المياه غير التقليدية المعالجة',
        'تشجير المدن والتخفيف من الجزر الحرارية في الحواضر الكبرى',
        'أحدث معايير السلامة والولوجية في الفضاءات الترفيهية العمومية',
      ],
      confCta: 'الاطلاع على البرنامج الكامل للمؤتمرات',
      bannerCtaTitle: 'شارك في الدورة الرابعة لمعرض Garden Expo Africa',
      bannerCtaSubtitle:
        'سواء كنت عارضاً أو زائراً مهنياً، احجز حضورك الآن في الحدث الأبرز للمساحات الخضراء في إفريقيا.',
      bannerCtaExhibitor: 'حجز موقع جناحي في المعرض',
      bannerCtaVisitor: 'الحصول على شارة الدخول الإلكترونية مجاناً',
    },
    salon: {
      badge: 'عن المعرض الرسمي',
      title: 'معرض Garden Expo Africa — دورة المغرب',
      subtitle: 'الواجهة الإفريقية الأبرز للمساحات الخضراء، التهيئة الحضرية والمدن المستدامة',
      introTitle: 'رؤية استراتيجية لتهيئة مجالات الغد',
      introP1:
        'يشكل المعرض ملتقى استثنائياً يجمع المهندسين المعماريين، مصممي المساحات الطبيعية، مسؤولي المشاتل وصناع القرار الترابي للإجابة عن الرهانات البيئية الراهنة.',
      introP2:
        'يقام المعرض بالدار البيضاء، العاصمة الاقتصادية للمملكة وبوابة الأعمال الإفريقية، مبرزاً الكفاءات الوطنية مع فتح آفاق التصدير نحو الأسواق الدولية.',
      whyTitle: 'ثلاث ركائز استراتيجية تخدم تطور القطاع',
      pilar1Title: 'تطوير الأعمال والتواصل B2B',
      pilar1Desc: 'لقاءات عمل مباشرة ومثمرة بين أصحاب المشاريع والشركات الموردة المعتمدة.',
      pilar2Title: 'الابتكار والتصميم الإيكولوجي',
      pilar2Desc: 'استعراض أحدث الابتكارات في الري الذكي، المواد المنفذة للماء والإنارة الشمسية.',
      pilar3Title: 'التبادل العلمي والمعايير الحديثة',
      pilar3Desc: 'تبادل الممارسات البيئية الفضلى وتطبيق المعايير الدولية في التهيئة الخارجية.',
      venueTitle: 'موقع متميز بقلب الدار البيضاء',
      venueDesc:
        'يتميز مكتب المعارض بالدار البيضاء بموقعه الساحلي الاستراتيجي قبالة مسجد الحسن الثاني وتوفره على بنية تحتية عصرية لاستقبال التظاهرات الدولية الكبرى.',
    },
    exhibitors: {
      badge: 'فضاء العارضين',
      title: 'المشاركة كعارض في المعرض',
      subtitle: 'قدم ابتكاراتك ومنتجاتك لأكثر من 8,500 مشتري وصانع قرار مهني.',
      whyExhibitTitle: 'لماذا تشارك في Garden Expo Africa؟',
      reasons: [
        {
          title: 'الوصول المباشر إلى أصحاب القرار والصفقات',
          desc: 'الالتقاء بمسؤولي الوكالات الحضرية، الجماعات الترابية، المنعشين العقاريين والمهندسين.',
        },
        {
          title: 'إطلاق المنتجات الجديدة مع تغطية إعلامية',
          desc: 'استفد من زخم إعلامي واسع وقدم عروضك التوضيحية الحية أمام جمهور متخصص.',
        },
        {
          title: 'تعزيز انتشار أعمالك في السوق الإفريقية',
          desc: 'بناء شراكات توزيع وتصدير استراتيجية مع وفود قادمة من مختلف الدول الإفريقية.',
        },
      ],
      formTitle: 'طلب حجز جناح عرض وعرض أسعار رسمي',
      formSubtitle: 'املأ الاستمارة الرسمية أدناه لتلقي مقترح تفصيلي مناسب لمساحة وتصميم جناحك.',
      companyName: 'اسم الشركة أو المؤسسة',
      contactPerson: 'الاسم الكامل لمسؤول التواصل',
      jobTitle: 'الصفة / المنصب المهني',
      email: 'البريد الإلكتروني المهني',
      phone: 'رقم الهاتف / المحمول',
      city: 'المدينة',
      country: 'الدولة',
      surfaceDesired: 'المساحة المطلوبة (بالمتر المربع)',
      standType: 'نوع الجناح',
      standEquipped: 'جناح مجهز بالكامل (قواطع، لافتة، إضاءة وأثاث مكتبي أساسي)',
      standBare: 'مساحة عارية (لتنفيذ ديكور وتصميم خاص حسب الطلب)',
      sector: 'القطاع الرئيسي للنشاط',
      notes: 'ملاحظات أو متطلبات خاصة',
      submitBooking: 'إرسال طلب الجناح',
      successMessage: 'تم تسجيل طلبك بنجاح. سيتواصل معك فريقنا التجاري خلال 24 ساعة.',
    },
    visitors: {
      badge: 'فضاء الزوار',
      title: 'زيارة المعرض مجاناً',
      subtitle: 'شارتك المهنية تتيح لك الدخول المباشر إلى قاعتي العرض وجميع الجلسات العلمية.',
      whyVisitTitle: 'أهمية حضور المعرض للمهنيين',
      profilesTitle: 'الفئات المهنية المستهدفة بالزيارة',
      formTitle: 'طلب الشارة الإلكترونية المجانية',
      formSubtitle: 'سيتم إصدار شارتك الاسمية فوراً متضمنة رمز الاستجابة السريعة QR Code لدخول آمن وسريع.',
      fullName: 'الاسم الكامل',
      jobTitle: 'المهنة / المنصب',
      company: 'الشركة أو المؤسسة التابع لها',
      email: 'البريد الإلكتروني المهني',
      phone: 'رقم الهاتف',
      city: 'مدينة الإقامة',
      activitySector: 'مجال التخصص والنشاط',
      submitPass: 'إصدار الشارة الإلكترونية مجاناً',
      passFree: 'دخول مجاني 100% مخصص حصرياً للمهنيين وطلبة المعاهد المتخصصة.',
      successMessage: 'تم إنشاء شارتك بنجاح! يمكنك الاطلاع عليها وتحميلها من فضاء الزائر.',
      downloadBadge: 'تحميل الشارة الرسمية',
    },
    conferences: {
      badge: 'البرنامج العلمي',
      title: 'المؤتمرات وورشات العمل المتخصصة',
      subtitle: 'اكتشف رؤى الخبراء الدوليين حول التحديات البيئية والمناخية للمدن.',
      introTitle: 'ملتقى رفيع للحوار الفكري والحلول الميدانية',
      introDesc:
        'طيلة أيام المعرض الأربعة، شارك في جلسات عامة وندوات حوارية وعروض تجارب ميدانية لأبرز مشاريع المساحات الخضراء والتهيئة الحضرية بالمغرب وإفريقيا.',
      tableThemesTitle: 'أبرز المحاور المطروحة للنقاش خلال الندوات',
    },
    partners: {
      badge: 'شركاؤنا الكرام',
      title: 'الشركاء المؤسساتيون والعلميون',
      subtitle: 'مؤسسات تدعم رؤية وتطور معرض Garden Expo Africa.',
      catInstitutional: 'الشركاء المؤسساتيون والوزارات',
      catAcademic: 'الشركاء الأكاديميون والمدارس العليا',
      catMedia: 'الشركاء الإعلاميون والصحافة المتخصصة',
      becomePartnerTitle: 'كن شريكاً رسمياً للمعرض',
      becomePartnerDesc:
        'اربط صورة مؤسستك أو وسيلتك الإعلامية بالحدث القاري الأبرز للمساحات الخضراء والمدينة المستدامة.',
      ctaPartner: 'التواصل مع قسم الشراكات',
    },
    contact: {
      badge: 'التواصل والموقع',
      title: 'التواصل مع اللجنة المنظمة',
      subtitle: 'لديك استفسار حول المشاركة أو الزيارة؟ فريقنا في خدمتك لتقديم كافة التوضيحات.',
      infoTitle: 'معلومات الاتصال بالجهة المنظمة',
      organizerLabel: 'الجهة المنظمة الرسمية',
      addressLabel: 'العنوان والمقر',
      phoneLabel: 'أرقام الهاتف المباشرة',
      emailLabel: 'عناوين البريد الإلكتروني',
      hoursLabel: 'أوقات العمل والاستقبال',
      formTitle: 'أرسل لنا رسالة مباشرة',
      formSubtitle: 'نلتزم بالرد على كافة استفساراتكم في أقرب وقت ممكن.',
      fullName: 'الاسم الكامل',
      company: 'الشركة / المؤسسة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      subject: 'موضوع الرسالة',
      message: 'نص الرسالة أو الاستفسار',
      send: 'إرسال الرسالة الآن',
      sentSuccess: 'تم إرسال رسالتك بنجاح. سيقوم فريقنا بالرد عليك قريباً.',
    },
  },
};

export function useTranslation(lang: Language): TranslationsType {
  return translations[lang] || translations.fr;
}
