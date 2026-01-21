
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line 
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Activity, Users, Wallet, TrendingUp, 
  Download, ChevronRight, Globe, ShieldCheck, Zap, Droplets, Heart, 
  Briefcase, Landmark, Map, Info, Calendar
} from 'lucide-react';

const DashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'impact' | 'macro' | 'keys' | 'pap'>('keys');

  // Données documentaires avec Situation Initiale (Page 3)
  const impactData = [
    { label: "RNB / Habitant (Atlas US$)", initial: 1660, initialYear: 2023, target: 2468, targetYear: 2029, icon: Wallet, unit: "$", source: "B. Mondiale" },
    { label: "Exportation (% PIB)", initial: 23.0, initialYear: 2023, target: 25.6, targetYear: 2029, icon: TrendingUp, unit: "%", source: "DGPPE" },
    { label: "Ratio Dette (% PIB)", initial: 99.7, initialYear: 2023, target: 75.3, targetYear: 2029, icon: Landmark, unit: "%", source: "DGPPE" },
    { label: "IDH", initial: 0.511, initialYear: 2022, target: 0.581, targetYear: 2029, icon: Heart, unit: "", source: "PNUD" },
    { label: "Accès Électricité (%)", initial: 86.0, initialYear: 2022, target: 100, targetYear: 2029, icon: Zap, unit: "%", source: "Énergie" },
    { label: "Énergie Renouvelable (Mix)", initial: 30.0, initialYear: 2022, target: 36.1, targetYear: 2029, icon: Zap, unit: "%", source: "Énergie" },
  ];

  const dataMacro = [
    { year: '2025', croissance: 9.7, deficit: -3.0, pression: 20.5, invest: 2123.4 },
    { year: '2026', croissance: 5.0, deficit: -3.0, pression: 21.0, invest: 2268.9 },
    { year: '2027', croissance: 5.4, deficit: -3.0, pression: 21.9, invest: 2519.9 },
    { year: '2028', croissance: 5.9, deficit: -3.0, pression: 22.3, invest: 2769.0 },
    { year: '2029', croissance: 6.4, deficit: -3.0, pression: 22.6, invest: 3140.2 },
  ];

  const dataAxePAP = [
    { name: 'Axe 1: Économie Compétitive', value: 30.1, color: '#022c22' },
    { name: 'Axe 2: Capital Humain', value: 34.4, color: '#059669' },
    { name: 'Axe 3: Aménagement Durable', value: 19.6, color: '#fbbf24' },
    { name: 'Axe 4: Gouvernance', value: 15.8, color: '#1e293b' },
  ];

  return (
    <div className="page-transition space-y-10 animate-in fade-in duration-500 pb-16">
      {/* Header Section Corrigée */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
             <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200">VISION SÉNÉGAL 2050</span>
             <span className="text-slate-400 font-bold text-xs flex items-center"><Calendar size={14} className="mr-1" /> Mise à jour : Déc. 2025</span>
          </div>
          <h2 className="text-6xl font-serif font-bold text-state-900 tracking-tight leading-tight">
            Tableaux de Bord <span className="text-emerald-600 italic">SND</span> 2025-2029
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium">Monitoring des indicateurs d'impact et macro-budgétaires.</p>
        </div>
        <button className="flex items-center px-8 py-5 bg-[#4d7367] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#3d5c52] transition-all group shrink-0">
          <Download size={18} className="mr-4 text-accent-gold" /> 
          <span className="flex flex-col items-start leading-none">
            RAPPORT
            <span className="text-[9px] opacity-70">STRATÉGIQUE</span>
          </span>
        </button>
      </div>

      {/* Barre de Navigation Premium Corrigée */}
      <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-premium flex items-center justify-between overflow-x-auto scrollbar-hide min-h-[90px]">
        {[
          { id: 'impact', label: 'Impact Socio-Économique', icon: Globe },
          { id: 'macro', label: 'Macro-Budgétaire', icon: Landmark },
          { id: 'keys', label: 'Indicateurs Clés / LOLF', icon: Activity },
          { id: 'pap', label: 'Financement PAP', icon: Wallet },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[220px] mx-1 flex items-center justify-center px-6 py-5 rounded-2xl text-[10px] font-black tracking-widest transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-[#4d7367] text-white shadow-xl translate-y-[-2px]' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} className={`mr-4 ${activeTab === tab.id ? 'text-accent-gold' : 'text-slate-300'}`} />
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Contenu des Onglets */}
      {activeTab === 'impact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-500">
           {impactData.map((item, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium group hover:border-emerald-200 transition-all flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-slate-50 rounded-2xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                         <item.icon size={24} />
                      </div>
                      <div className="text-right">
                         <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Source: {item.source}</div>
                         <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">CIBLE {item.targetYear}</div>
                      </div>
                   </div>
                   <h3 className="text-[13px] font-black text-slate-600 uppercase tracking-widest mb-6 leading-relaxed">{item.label}</h3>
                   
                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50 text-center">
                         <div className="text-[8px] font-black text-slate-400 uppercase mb-1">Réf. ({item.initialYear})</div>
                         <div className="text-xl font-black text-slate-400">{item.initial}{item.unit}</div>
                      </div>
                      <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
                         <div className="text-[8px] font-black text-emerald-800 uppercase mb-1">Cible ({item.targetYear})</div>
                         <div className="text-xl font-black text-state-900">{item.target}{item.unit}</div>
                      </div>
                   </div>
                </div>

                <div>
                   <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest text-slate-400">
                      <span>Progrès Stratégique</span>
                      <span className="text-emerald-700">Calculé en temps réel</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-50">
                      <div className="state-gradient h-full rounded-full w-[65%] transition-all duration-1000"></div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}

      {(activeTab === 'macro' || activeTab === 'keys') && (
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-premium animate-in fade-in duration-500">
           <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
              <div>
                 <h3 className="text-3xl font-serif font-bold text-state-900">Indicateurs de Performance SND</h3>
                 <p className="text-slate-400 font-medium mt-2">Projection quinquennale des agrégats stratégiques et conformité LOLF.</p>
              </div>
              <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100">
                 <button className="px-6 py-3 bg-white text-[10px] font-black uppercase tracking-widest text-state-900 rounded-xl shadow-sm border border-slate-200">Croissance %</button>
                 <button className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-state-900 transition-colors">Dépenses PAP</button>
              </div>
           </div>
           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={dataMacro}>
                    <defs>
                       <linearGradient id="colorG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" name="Taux Croissance (%)" dataKey="croissance" stroke="#059669" strokeWidth={5} fill="url(#colorG)" dot={{r: 6, fill: '#022c22'}} />
                    <Area type="monotone" name="Pression Fiscale (%)" dataKey="pression" stroke="#fbbf24" strokeWidth={5} fill="none" dot={{r: 6, fill: '#022c22'}} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      )}

      {activeTab === 'pap' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-premium flex flex-col items-center">
                 <h3 className="text-2xl font-serif font-bold text-state-900 mb-8 self-start">Répartition du PAP (18 496.83 Mds)</h3>
                 <div className="flex-1 w-full h-[400px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                             data={dataAxePAP}
                             innerRadius={110}
                             outerRadius={150}
                             paddingAngle={8}
                             dataKey="value"
                             stroke="none"
                             cx="50%"
                             cy="45%"
                          >
                             {dataAxePAP.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                          <Tooltip />
                          <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{paddingTop: '30px', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase'}} />
                       </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coût Total</div>
                       <div className="text-3xl font-serif font-bold text-state-900">100%</div>
                    </div>
                 </div>
              </div>
              
              <div className="bg-state-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                 <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-accent-gold mb-10">Synthèse Ingestive PAP</h3>
                    <div className="space-y-8">
                       {[
                         { axe: "Axe 1 : Économie Compétitive", val: "5 567 Mds", share: "30.1%" },
                         { axe: "Axe 2 : Capital Humain", val: "6 363 Mds", share: "34.4%" },
                         { axe: "Axe 3 : Aménagement Durable", val: "3 625 Mds", share: "19.6%" },
                         { axe: "Axe 4 : Gouvernance", val: "2 922 Mds", share: "15.8%" },
                       ].map((item, i) => (
                         <div key={i}>
                            <div className="flex justify-between items-end mb-3">
                               <span className="text-xs font-bold text-emerald-100">{item.axe}</span>
                               <span className="text-lg font-serif font-bold text-accent-gold">{item.val} <span className="text-[10px] opacity-40">({item.share})</span></span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-accent-gold" style={{width: item.share}}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="mt-12 p-8 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                    <p className="text-xs text-emerald-100 font-medium italic leading-relaxed">
                       Note : La budgétisation triennale privilégie l'Axe 2 pour renforcer le capital humain et l'équité sociale (34.4% du portefeuille).
                    </p>
                 </div>
              </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
