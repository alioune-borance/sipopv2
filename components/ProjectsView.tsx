
import React, { useState } from 'react';
import { Project } from '../types';
import { MapPin, Anchor, Zap, CheckCircle2, Clock, ChevronRight, Bookmark, Check, Droplets, Home, Truck, Landmark, AlertTriangle } from 'lucide-react';

const mockProjects: Project[] = [
  { 
    id: 'MITA-AUT-01', 
    name: "Autoroute Dakar-Tivaouane-Saint Louis", 
    ministry: "Infrastructures", 
    program: "Développement du Réseau Autoroutier",
    status: 'On Track', 
    progressPhysical: 28, 
    progressFinancial: 35, 
    costTotal: "1 250.6 Mds", 
    source: "Multi-Bailleurs (BID, BADEA, BOAD, État)",
    description: "Construction de l'axe autoroutier majeur reliant la capitale au pôle de développement Nord. Projet structurant de l'Axe 1 (Économie Compétitive).",
    startDate: "2024",
    endDate: "2028",
    location: "Dakar - Louga - St Louis",
    beneficiariesCount: "2.5 Millions de citoyens"
  },
  { 
    id: 'MHA-DES-01', 
    name: "Unité de Dessalement d'Eau de Mer", 
    ministry: "Hydraulique et Assainissement", 
    program: "Sécurisation de l'Approvisionnement en Eau",
    status: 'On Track', 
    progressPhysical: 42, 
    progressFinancial: 48, 
    costTotal: "137.3 Mds", 
    source: "JICA / Japon",
    description: "Réalisation d'une usine de dessalement pour pallier le déficit hydrique de la région de Dakar et sécuriser la consommation d'eau potable.",
    startDate: "2023",
    endDate: "2027",
    location: "Mamelles, Dakar",
    beneficiariesCount: "Région de Dakar"
  },
  { 
    id: 'MUCT-LOG-01', 
    name: "Programme 30 000 Logements", 
    ministry: "Urbanisme et Habitat", 
    program: "Accès au Logement Social",
    status: 'Delayed', 
    progressPhysical: 15, 
    progressFinancial: 22, 
    costTotal: "483.9 Mds", 
    source: "État / Partenaires Privés",
    description: "Projet phare de transformation sociale visant à faciliter l'accès à la propriété pour les ménages à revenus modestes (Axe 2).",
    startDate: "2024",
    endDate: "2029",
    location: "National (Pôles Urbains)",
    beneficiariesCount: "30 000 familles"
  },
  { 
    id: 'MPEM-POR-01', 
    name: "Développement du Port de Ziguinchor", 
    ministry: "Pêches et Économie Maritime", 
    program: "Infrastructures Maritimes",
    status: 'On Track', 
    progressPhysical: 65, 
    progressFinancial: 58, 
    costTotal: "10.9 Mds", 
    source: "ORIO (Hollande) / État",
    description: "Dragage et modernisation des infrastructures portuaires pour booster l'économie de la Casamance et le désenclavement.",
    startDate: "2023",
    endDate: "2026",
    location: "Ziguinchor",
    beneficiariesCount: "Région Sud"
  },
  { 
    id: 'MITA-BRT-01', 
    name: "Bus Rapid Transit (BRT)", 
    ministry: "Infrastructures et Transports", 
    program: "Mobilité Urbaine Durable",
    status: 'Completed', 
    progressPhysical: 100, 
    progressFinancial: 98, 
    costTotal: "227.5 Mds", 
    source: "Banque Mondiale / BEI",
    description: "Système de transport de masse sur voie réservée traversant 14 communes de l'agglomération dakaroise.",
    startDate: "2020",
    endDate: "2025",
    location: "Dakar - Guédiawaye",
    beneficiariesCount: "300 000 passagers/jour"
  },
  { 
    id: 'AN-MOD-01', 
    name: "Modernisation de l'Assemblée Nationale", 
    ministry: "Gouvernance", 
    program: "Renforcement des Institutions",
    status: 'On Track', 
    progressPhysical: 25, 
    progressFinancial: 30, 
    costTotal: "3.0 Mds", 
    source: "État (BCI)",
    description: "Digitalisation des processus parlementaires et rénovation des infrastructures pour un contrôle citoyen accru (Axe 4).",
    startDate: "2025",
    endDate: "2027",
    location: "Dakar",
    beneficiariesCount: "Parlementaires / Nation"
  }
];

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
}

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    'On Track': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'Delayed': 'bg-amber-100 text-amber-900 border-amber-200',
    'Critical': 'bg-red-100 text-red-900 border-red-200',
    'Completed': 'bg-blue-100 text-blue-900 border-blue-200',
  };

  const icons = {
    'On Track': CheckCircle2,
    'Delayed': Clock,
    'Critical': AlertTriangle,
    'Completed': CheckCircle2,
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black border ${styles[status]} uppercase tracking-widest`}>
      <Icon size={12} className="mr-1.5" />
      {status === 'On Track' ? 'SATISFAISANT' : status === 'Delayed' ? 'VIGILANCE' : status === 'Critical' ? 'CRITIQUE' : 'TERMINÉ'}
    </span>
  );
};

const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const [pinnedProjects, setPinnedProjects] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);

  const togglePin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newPinned = new Set(pinnedProjects);
    if (newPinned.has(id)) {
      newPinned.delete(id);
    } else {
      newPinned.add(id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setPinnedProjects(newPinned);
  };

  const getProjectIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('auto') || n.includes('brt')) return <Truck size={24} />;
    if (n.includes('eau') || n.includes('dessalement')) return <Droplets size={24} />;
    if (n.includes('logement')) return <Home size={24} />;
    if (n.includes('port')) return <Anchor size={24} />;
    if (n.includes('assemblée')) return <Landmark size={24} />;
    return <Zap size={24} />;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <span className="px-4 py-1.5 bg-emerald-700 text-white rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-600 shadow-sm">PIP 2026-2028</span>
              <span className="text-slate-400 font-bold text-xs">Extraction prioritaire document stratégique</span>
           </div>
           <h2 className="text-5xl font-serif font-bold text-state-900 tracking-tight leading-tight">Projets <span className="text-emerald-600 italic">Prioritaires</span></h2>
           <p className="text-slate-500 mt-3 text-lg font-medium">Contrôle des investissements majeurs • Agenda Vision 2050.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-premium border border-slate-200">
          <button className="px-6 py-3 text-[10px] font-black bg-state-900 text-white rounded-xl shadow-lg transition-all uppercase tracking-widest">Tous les projets</button>
          <button className="px-6 py-3 text-[10px] font-black text-slate-400 hover:text-state-900 transition-colors uppercase tracking-widest">Par Axe</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {mockProjects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onSelectProject(project)}
            className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
          >
            <div className="p-10 border-b border-slate-50">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className={`p-4 rounded-2xl mr-5 shadow-sm border border-slate-100 ${project.status === 'Completed' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {getProjectIcon(project.name)}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block">{project.id}</span>
                    <h3 className="text-2xl font-bold text-state-900 group-hover:text-emerald-700 transition-colors leading-tight">{project.name}</h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <StatusBadge status={project.status} />
                  <button 
                    onClick={(e) => togglePin(e, project.id)}
                    className={`p-3 rounded-xl border transition-all ${pinnedProjects.has(project.id) ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-inner' : 'bg-white border-slate-100 text-slate-400 hover:text-emerald-600'}`}
                  >
                    <Bookmark size={18} fill={pinnedProjects.has(project.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2 italic">
                "{project.description}"
              </p>
              
              <div className="grid grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                <div>
                  <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest text-slate-400">
                    <span>Réalisation Physique</span>
                    <span className="text-state-900 font-black">{project.progressPhysical}%</span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full shadow-inner overflow-hidden border border-slate-100">
                    <div className="state-gradient h-full rounded-full transition-all duration-1000" style={{ width: `${project.progressPhysical}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest text-slate-400">
                    <span>Consommation Crédits</span>
                    <span className="text-state-900 font-black">{project.progressFinancial}%</span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full shadow-inner overflow-hidden border border-slate-100">
                    <div className={`h-full rounded-full transition-all duration-1000 ${project.progressFinancial > project.progressPhysical + 15 ? 'bg-red-500 shadow-red-500/20' : 'bg-amber-500 shadow-amber-500/20'}`} style={{ width: `${project.progressFinancial}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 flex items-center justify-between bg-white px-10">
               <div className="flex items-center gap-10">
                 <div>
                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Coût PIP</div>
                    <div className="text-lg font-serif font-bold text-state-900">{project.costTotal}</div>
                 </div>
                 <div>
                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Source / Bailleur</div>
                    <div className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 uppercase tracking-widest truncate max-w-[150px]">{project.source}</div>
                 </div>
               </div>
               <button className="flex items-center text-[10px] font-black text-state-900 group-hover:translate-x-3 transition-all uppercase tracking-widest">
                  Fiche de Contrôle <ChevronRight size={16} className="ml-2 text-accent-gold" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {showToast && (
        <div className="fixed bottom-10 right-10 bg-state-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center space-x-4 animate-in slide-in-from-bottom-10 duration-300 z-50 border border-white/10 backdrop-blur-md">
           <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
             <Check size={20} />
           </div>
           <div>
              <p className="text-xs font-black uppercase tracking-widest">Projet épinglé</p>
              <p className="text-[10px] text-emerald-400 font-bold">Ajouté à votre espace de contrôle parlementaire.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsView;
