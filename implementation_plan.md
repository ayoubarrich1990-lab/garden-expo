# Refonte Complète de la Plateforme Digitale Garden Expo Africa

Plateforme digitale B2B d'envergure internationale dédiée au salon Garden Expo Africa au Maroc, inspirée des standards ergonomiques et fonctionnels du SIB Maroc, dotée d'un annuaire interactif, d'un espace exposant avec plan vectoriel dynamique, d'un espace visiteur avec badges électroniques et d'un back-office administrateur multi-rôles.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Les trois décisions fondamentales suivantes ont été validées lors de la phase de cadrage :
> 1. **Architecture Backend & Sécurité :** Moteur full-stack Node.js / Express avec persistance de données (schémas relationnels JSON/SQLite sécurisés côté serveur), authentification par sessions chiffrées/tokens et contrôle strict des accès (RBAC : Super Admin, Admin, Exposant, Visiteur).
> 2. **Plan d'Exposition Interactif :** Plan vectoriel SVG interactif reproduisant l'architecture du Hall avec recherche dynamique de stands, zoom/pan et mise en évidence automatique en temps réel du stand réservé par l'exposant connecté.
> 3. **Archives des Éditions :** Fiches d'archives riches et complètes pour les éditions 1, 2 et 3 (thématiques, statistiques réelles, photos, vidéos et moments forts), administrables directement depuis le back-office.

---

## 1. Overview & Core Concept

- **Positionnement :** Le grand carrefour panafricain du paysage, de l'aménagement urbain, de l'irrigation durable, du mobilier extérieur et des technologies écologiques au Maroc.
- **Ambition :** Dépasser le simple site vitrine pour offrir une véritable plateforme de services événementiels B2B tout au long de l'année, à l'image du Salon International du Bâtiment (SIB).
- **Publics cibles :**
  - *Exposants industriels, fabricants et pépiniéristes :* Suivi de dossier, validation de stand sur plan, documents contractuels et factures PDF.
  - *Visiteurs professionnels (architectes, aménageurs, élus, prescripteurs) :* Pré-enregistrement, badge électronique officiel, préparation de parcours de visite et mise en favoris.
  - *Comité d'organisation (R2H Communication / Partenaires) :* Gestion centralisée des exposants, validation des inscriptions, affectation des stands et actualisation des contenus.

---

## 2. User Experience & Visual Design

### Direction Artistique & Palette Chromatique
- **Esprit :** Architecture contemporaine, bioclimatique et végétale. Design haut de gamme inspiré des salons internationaux, aéré, sans encombrement mécanique.
- **Palette officielle :**
  - Vert Profond Institutionnel : `#123D2B` (60% des accents sombres et headers premium)
  - Vert Naturel Végétal : `#367A4D` (Couleur d'action et validation)
  - Vert Lumière : `#A5C96B` (Détails et badges statutaires)
  - Fond Canvas Pur : `#FFFFFF` et Fond Gris Sable : `#F5F6F3`
  - Anthracite de Contraste : `#202620` (Textes et typographies éditoriales)
- **Typographie :**
  - Titrages : *Outfit* (géométrique, moderne, impact international)
  - Corps de texte : *Plus Jakarta Sans* (haute lisibilité sur écrans et formulaires)
  - Chiffres & Indicateurs : *Tabular Numerals* (verticalité stricte pour surfaces et prix)

### Parcours & Expérience Utilisateur
1. **Portail Public :**
   - *Header Institutionnel :* Logo officiel transparent vectorisé, navigation claire, actions rapides (« Devenir exposant », « Badge visiteur », « Espaces privés »).
   - *Hero Immersion :* Vidéo/Photographie architecturale paysagère, accroche officielle, date et lieu de la prochaine édition à Casablanca.
   - *Section « Best Of 3ème Édition » :* Lecteur vidéo responsive avec vignette personnalisée, mode plein écran et intégration multicanale.
   - *Bandeau défilant des exposants & partenaires :* Animation continue avec pause au survol et liens vérifiés.
   - *Section « Ils nous font confiance » :* Cartes de témoignages et interviews vidéo d'exposants.
   - *Galerie Photos Pro :* Grille filtrable par édition et catégorie (Stands, Inauguration, Conférences, B2B, Animations) avec visionneuse plein écran.
   - *Rétrospective « Trois éditions, une même passion » :* Chronologie éditoriale détaillée des éditions 1, 2 et 3.
2. **Annuaire Interactif des Exposants (Inspiré de SIB Maroc) :**
   - Moteur de recherche multicritère (nom, secteur, catégorie, numéro de stand, édition).
   - Grille de cartes professionnelles avec logos, secteurs, pays et stand attribué.
   - Fiche entreprise détaillée pour chaque exposant (description, contacts autorisés, produits phares, localisation sur plan).
3. **Espace Exposant Privé :**
   - Dashboard de bord sécurisé avec statut du dossier de participation.
   - Synthèse du stand (surface en m², dimensions, type d'aménagement, options).
   - Visualisation interactive du stand sur le plan SVG du Hall.
   - Coffre-fort documentaire : consultation et téléchargement des contrats, règlements et factures PDF.
   - Mise à jour autonome de la fiche entreprise publique.
4. **Espace Visiteur Privé :**
   - Authentification et gestion de profil professionnel.
   - Génération, affichage et téléchargement instantané du E-Badge avec QR Code sécurisé.
   - Carnet de route : sélection d'exposants favoris et planification de rendez-vous sur le salon.
5. **Back-Office Administrateur :**
   - Tableau de bord décisionnel (métriques globales, taux de remplissage du salon, répartition par secteur).
   - Module de gestion des exposants (création de compte, attribution de stand, téléversement de factures et contrats).
   - Modération des visiteurs et export des listes pour le contrôle d'accès.
   - Gestionnaire de contenus (vidéos Best-Of, interviews, photos de la galerie, actualités).

---

## 3. Key Product Decisions & Trade-Offs

- **Serveur Express Full-Stack & Persistance :**
  - *Approche :* API REST Express intégrée avec base de données relationnelle persistée côté serveur, compatible avec Node 22 sur Hostinger et les conteneurs Cloud.
  - *Pourquoi :* Permet une étanchéité absolue des données privées (factures, contrats, coordonnées sensibles non exposées) et fonctionne de manière autonome sans dépendance bloquante à un service externe non configuré.
- **Contrôle d'Accès Basé sur les Rôles (RBAC) :**
  - *Approche :* Sessions sécurisées avec tokens HTTP-only, ségrégation stricte des profils (`SUPER_ADMIN`, `EXPOSITOR`, `VISITOR`).
  - *Pourquoi :* Un exposant ne peut en aucun cas accéder aux factures ou contrats d'un concurrent ; les visiteurs ne voient que les coordonnées publiquement consenties.
- **Plan Vectoriel SVG Dynamique :**
  - *Approche :* Rendu SVG interactif avec IDs de stands indexés, zoom interactif, infobulles au survol et centrage automatique sur le stand de l'exposant connecté.
  - *Pourquoi :* Temps de chargement quasi-instantané, fluidité maximale sur mobile et tablette, et compatibilité avec tous les navigateurs sans bibliothèque 3D lourde.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT FRONTEND (React 19)                      │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────┐  ┌────────────────┐  │
│  │   Portail Public      │  │ Annuaire & Galerie│  │  Plan Hall SVG │  │
│  │  Accueil, À Propos,   │  │  Recherche, Filtre│  │  Zoom, Focus   │  │
│  │  Best Of, Éditions    │  │  Fiches Exposants │  │  Stands B2B    │  │
│  └───────────┬───────────┘  └─────────┬─────────┘  └───────┬────────┘  │
│              │                        │                    │           │
│  ┌───────────┴────────────────────────┴────────────────────┴────────┐  │
│  │            Espaces Sécurisés & Gestion des Rôles                 │  │
│  │  • Espace Exposant (Dashboard, Contrats, Factures PDF, Stand)    │  │
│  │  • Espace Visiteur (Mon Compte, E-Badge QR Code, Mes Favoris)    │  │
│  │  • Back-Office Admin (CRUD Exposants, Stands, Galerie, Stats)    │  │
│  └────────────────────────────────────┬─────────────────────────────┘  │
└───────────────────────────────────────┼────────────────────────────────┘
                                        │ API REST / JSON
┌───────────────────────────────────────▼────────────────────────────────┐
│                       SERVEUR EXPRESS (Node.js 22)                     │
│                                                                        │
│  ┌───────────────────┐  ┌──────────────────────┐  ┌─────────────────┐  │
│  │   Auth & Sessions │  │  Contrôleurs Métier  │  │ Fichiers & PDF  │  │
│  │   JWT / RBAC      │  │  Exposants, Badges,  │  │ Factures, Plans │  │
│  │   Middleware RLS  │  │  Galerie, Actualités │  │ Contrats Signés │  │
│  └─────────┬─────────┘  └──────────┬───────────┘  └────────┬────────┘  │
│            └───────────────────────┼────────────────────────┘          │
│                                    ▼                                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                  Moteur de Données Relationnelles                │  │
│  │  • users / profiles / roles                                      │  │
│  │  • exhibitors / stands / halls / invoices / documents            │  │
│  │  • visitors / visitor_favorites / visitor_badges                │  │
│  │  • editions / themes / gallery / interviews / news / settings    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Modèle de Données & Tables Clés

1. `users` & `profiles` : Identifiant, email, mot de passe hashé, rôle (`admin`, `exhibitor`, `visitor`), nom, organisation, avatar.
2. `exhibitors` : ID, nom entreprise, secteur d'activité, logo, description, site web, téléphone, stand attribué (`stand_id`), statut du dossier.
3. `stands` : ID, hall (ex: Hall A), numéro (ex: A-14), superficie (m²), dimensions, type (équipé, nu, îlot), coordonnées SVG (`x`, `y`, `width`, `height`).
4. `invoices_and_documents` : ID, ID exposant, type (facture, contrat, plan technique), titre, montant, statut de paiement, URL/fichier, date.
5. `visitors` & `badges` : ID, nom, entreprise, fonction, pays, email, numéro de badge unique (`GEA-VIS-26-XXXXX`), QR Code payload.
6. `visitor_favorites` : ID visiteur, ID exposant, notes personnelles de visite.
7. `editions` : Numéro (1, 2, 3, 4), année, dates, lieu, thématique officielle, statistiques réelles (m², exposants, pays), vidéo Best Of.
8. `gallery` : Catégorie (Stands, Inauguration, Conférences, B2B), titre, édition, URL image, légende.
9. `interviews` : Entreprise, intervenant, poste, citation, URL vidéo, édition.
10. `partners` : Nom, catégorie (exposant, média, institutionnel), logo, URL externe, ordre de défilement.
