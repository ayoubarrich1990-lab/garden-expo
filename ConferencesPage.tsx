import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Mic,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  FileText,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  Send,
  Droplets,
  Trees,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ConferencesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ConferencesPage: React.FC<ConferencesPageProps> = ({ onNavigate }) => {
  const { language } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    sessionOfInterest: 'all',
  });

  const tracks = [
    { id: 'all', label: language === 'ar' ? 'جميع المحاور' : language === 'en' ? 'All Tracks' : 'Tous les cycles' },
    { id: 'water', label: language === 'ar' ? 'إعادة استخدام المياه والري' : language === 'en' ? 'Water Reuse & Irrigation' : 'REUT & Eaux recyclées' },
    { id: 'urban', label: language === 'ar' ? 'المدن المستدامة والبيئة' : language === 'en' ? 'Sustainable & Resilient Cities' : 'Urbanisme & Ville durable' },
    { id: 'smart', label: language === 'ar' ? 'المدينة الذكية والإضاءة' : language === 'en' ? 'Smart Landscape & IoT' : 'Smart City & Éclairage' },
  ];

  const sessions = [
    {
      id: 'conf-1',
      track: 'water',
      title: 'Gestion rationnelle et REUT dans les aménagements paysagers méditerranéens et africains',
      speaker: 'Pr. Karim Bennani & Experts IMANOR / AAPM',
      time: 'Jour 1 — 10h00 - 11h45',
      room: 'Auditorium Hassan II',
      description: 'Normes de traitement, technologies membranaires et valorisation des eaux non conventionnelles pour les parcs métropolitains.',
      badge: 'Session Plénière',
    },
    {
      id: 'conf-2',
      track: 'urban',
      title: 'La Trame Verte et Bleue comme bouclier bioclimatique des métropoles de demain',
      speaker: 'Architectes-Paysagistes IFLA Africa & MGBC',
      time: 'Jour 1 — 14h30 - 16h00',
      room: 'Salle Atlantique A',
      description: 'Intégration paysagère des grands boulevards, forêts urbaines et corridors écologiques au service de la résilience thermique.',
      badge: 'Table Ronde',
    },
    {
      id: 'conf-3',
      track: 'smart',
      title: 'Smart Green Spaces : IoT, télégestion d’arrosage et jumeaux numériques urbains',
      speaker: 'Comité buildingSMART Morocco & Innovateurs GreenTech',
      time: 'Jour 2 — 10h30 - 12h15',
      room: 'Auditorium Hassan II',
      description: 'Pilotage en temps réel des consommations d’eau et d’énergie via capteurs d’humidité sol et éclairage LED solaire connecté.',
      badge: 'Keynote Tech',
    },
    {
      id: 'conf-4',
      track: 'urban',
      title: 'Mobilier urbain circulaire et aires récréatives inclusives pour l’Afrique de demain',
      speaker: 'Designers urbains & Direction de l’Urbanisme',
      time: 'Jour 2 — 15h00 - 16h30',
      room: 'Salle Atlantique B',
      description: 'Matériaux biosourcés, sécurité des enfants, accessibilité universelle et pérennité dans les espaces publics à forte fréquentation.',
      badge: 'Atelier Pratique',
    },
  ];

  const filteredSessions = selectedTrack === 'all'
    ? sessions
    : sessions.filter((s) => s.track === selectedTrack);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24">
      {/* Hero Header */}
      <section className="relative bg-[#004421] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39B54A] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#08752D] blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-200 text-xs font-semibold tracking-wider uppercase mb-5">
            <Mic className="w-3.5 h-3.5 text-[#39B54A]" />
            <span>Cycle Scientifique & Institutionnel — 2027</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Conférences & Ateliers Stratégiques
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-emerald-100 font-light leading-relaxed">
            Plus de 40 sessions, keynotes et débats d’experts animés par les grands décideurs de l’urbanisme,
            des paysagistes de renom et les institutions de l’aménagement durable en Afrique.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-emerald-100/90 font-medium">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
              <Calendar className="w-4 h-4 text-[#39B54A]" />
              <span>4ème Édition 2027 (Dates à confirmer)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
              <MapPin className="w-4 h-4 text-[#39B54A]" />
              <span>Casablanca, Maroc</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-4 h-4 text-[#39B54A]" />
              <span>+1 500 Congressistes attendus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Track Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedTrack === track.id
                  ? 'bg-[#004421] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#004421] border border-emerald-200">
                    {session.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{session.time}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#151515] mb-2 leading-snug">
                  {session.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                  {session.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-emerald-800">{session.speaker}</span>
                <span className="flex items-center gap-1 text-stone-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {session.room}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Registration Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#08752D] mb-2">
                Accès Conférences & Séminaires
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] mb-4">
                Réservez votre place aux sessions plénières
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                L’accès aux conférences est inclus dans la préinscription visiteur professionnel ou le badge exposant.
                Inscrivez-vous dès maintenant pour recevoir en priorité le programme détaillé, la liste définitive des intervenants
                et les actes du congrès.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#39B54A] shrink-0" />
                  <span>Attestation de participation délivrée aux professionnels et étudiants</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#39B54A] shrink-0" />
                  <span>Accès aux synthèses vidéo et aux présentations des intervenants</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#39B54A] shrink-0" />
                  <span>Espace networking réservé aux conférenciers et décideurs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F5F7F5] rounded-2xl p-6 border border-stone-200">
              {registered ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-1">Inscription enregistrée !</h4>
                  <p className="text-xs text-stone-600">
                    Merci {formData.fullName}. Vous recevrez le programme officiel complet dès sa publication.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h4 className="text-sm font-bold text-[#151515]">Pré-réservation Conférences</h4>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="M. / Mme Nom & Prénom"
                      className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#08752D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email professionnel *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@entreprise.com"
                      className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#08752D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Organisme / Entreprise</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Nom de l’organisme"
                      className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#08752D]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#004421] hover:bg-[#08752D] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirmer ma pré-réservation</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
