import React, { useState } from 'react';
import { PageId } from '../types';
import { ORGANIZER_DETAILS, FAQS } from '../data/expoData';
import { validateEmail, validatePhone } from '../utils/expoLogic';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Building2,
  ShieldCheck,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignements Stand Exposant',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Veuillez saisir votre nom.';
    if (!validateEmail(formData.email)) errors.email = 'Veuillez saisir une adresse email valide.';
    if (!validatePhone(formData.phone)) errors.phone = 'Veuillez saisir un numéro de téléphone valide.';
    if (!formData.message.trim()) errors.message = 'Veuillez rédiger votre message.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSent(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>Coordonnées & Assistance</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Contactez le Comité d'Organisation
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              L'équipe de R2H Communication est à votre écoute pour vous accompagner dans votre participation,
              vos démarches exposants ou l'obtention de votre badge visiteur.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Official Coordinates Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">
                Siège & Organisation
              </span>
              <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-6">
                {ORGANIZER_DETAILS.name}
              </h2>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Adresse administrative :</strong>
                    <span>{ORGANIZER_DETAILS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Téléphone Mobile & WhatsApp :</strong>
                    <a
                      href={`tel:${ORGANIZER_DETAILS.phonePrimary.replace(/\s+/g, '')}`}
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      {ORGANIZER_DETAILS.phonePrimary}
                    </a>
                    <span className="block text-xs text-stone-500 mt-0.5">
                      Fixe : {ORGANIZER_DETAILS.phoneLandline}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Courriers électroniques :</strong>
                    <div className="flex flex-col gap-0.5">
                      <a href={`mailto:${ORGANIZER_DETAILS.emailContact}`} className="text-emerald-700 hover:underline">
                        Général : {ORGANIZER_DETAILS.emailContact}
                      </a>
                      <a href={`mailto:${ORGANIZER_DETAILS.emailSales}`} className="text-emerald-700 hover:underline">
                        Commercial : {ORGANIZER_DETAILS.emailSales}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900">Horaires d'ouverture :</strong>
                    <span>{ORGANIZER_DETAILS.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Card */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                Lieu du Salon au Maroc
              </span>
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] mb-2">
                Casablanca · Pôle d'Exposition
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                L'Office des Foires et Expositions de Casablanca (OFEC) est idéalement situé en bord de mer, à proximité des grands axes autoroutiers, de la gare Casa-Port et des complexes hôteliers de la métropole.
              </p>
              <div className="p-3 bg-stone-800/80 rounded-lg text-xs text-stone-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rue Tiznit, Face à la Mosquée Hassan II, Casablanca</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-2">
              Formulaire de Contact Direct
            </h2>
            <p className="text-xs text-stone-600 mb-6">
              Envoyez-nous votre message. Notre équipe commerciale et technique vous répondra dans les plus brefs délais.
            </p>

            {isSent ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-950 mb-1">
                  Message envoyé avec succès !
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto mb-6">
                  Merci {formData.name}. Votre demande concernant « {formData.subject} » a bien été transmise à l'équipe de R2H Communication à Casablanca.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Renseignements Stand Exposant',
                      message: '',
                    });
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nom complet ou Entreprise *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom complet"
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@exemple.ma"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+212 ..."
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Objet de votre demande *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  >
                    <option value="Renseignements Stand Exposant">Renseignements Stand Exposant</option>
                    <option value="Inscription & Badge Visiteur">Inscription & Badge Visiteur</option>
                    <option value="Proposition de Sponsoring & Partenariat">Proposition de Sponsoring & Partenariat</option>
                    <option value="Relations Presse & Médias">Relations Presse & Médias</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Votre message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Détaillez votre demande pour l'édition de Casablanca..."
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                  {formErrors.message && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.message}</span>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Données confidentielles CNDP</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-md transition-colors flex items-center gap-2"
                  >
                    <span>Envoyer le message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Section FAQ */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Foire Aux Questions
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Questions Fréquentes sur le Salon au Maroc
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
