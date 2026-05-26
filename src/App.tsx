/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Star,
  Users,
  ShieldAlert,
  Frown,
  Coins,
  Check,
  Heart,
  Smile,
  Smartphone,
  Share2,
  Calculator,
  ArrowUpRight
} from 'lucide-react';
import VslPlayer from './components/VslPlayer';

import CheckoutModal from './components/CheckoutModal';
import { STUDENT_TESTIMONIALS } from './data/catalogData';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [businessName, setBusinessName] = useState('Meu Ateliê de Cestas');
  const [whatsapp, setWhatsapp] = useState('(11) 99876-5432');
  
  // Exit popup/recusa warnings state
  const [showRecusaModal, setShowRecusaModal] = useState(false);
  const [licencasRestantes, setLicencasRestantes] = useState(7);

  // VSL Delayed unlock state
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Decorative live sales alert state to generate high visual social proof
  const [liveAlert, setLiveAlert] = useState<{ name: string; city: string; action: string } | null>(null);

  // Simulating live alerts for sales page energy
  useEffect(() => {
    const alerts = [
      { name: 'Sandra M.', city: 'Limeira - SP', action: 'acabou de garantir o catálogo!' },
      { name: 'Cláudia R.', city: 'Belo Horizonte - MG', action: 'fechou uma encomenda de R$ 250!' },
      { name: 'Patrícia S.', city: 'Rio de Janeiro - RJ', action: 'gerou 3 links de WhatsApp agora!' },
      { name: 'Jéssica F.', city: 'Salto - SP', action: 'acabou de garantir o catálogo!' },
    ];

    const showRandomAlert = () => {
      const idx = Math.floor(Math.random() * alerts.length);
      setLiveAlert(alerts[idx]);
      setTimeout(() => {
        setLiveAlert(null);
      }, 4500);
    };

    // First trigger
    const initialTimeout = setTimeout(showRandomAlert, 5000);
    
    // Interval
    const interval = setInterval(showRandomAlert, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Simulating slow countdown of seats
  useEffect(() => {
    const interval = setInterval(() => {
      setLicencasRestantes(prev => {
        if (prev <= 3) return prev; // Hold at 3
        return prev - 1;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleRecusaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRecusaModal(true);
  };

  return (
    <div className="font-sans antialiased text-stone-800 bg-white min-h-screen relative selection:bg-rose-500/10 selection:text-rose-900">
      
      {/* 1. TOP PROGRESS BAR */}
      <div id="top-progress-bar" className="sticky top-0 z-40 bg-white shadow-xs">
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 h-1.5 w-full"></div>
        <div className="bg-amber-50/95 backdrop-blur-md border-b border-stone-200/50 py-3 text-center px-4">
          <p className="text-xs sm:text-sm font-bold text-amber-900 tracking-wide flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            <span>Etapa 2 de 2 — Sua oferta especial está reservada</span>
          </p>
        </div>
      </div>

      {/* LIVE SALES POPUP BANNER */}
      {isUnlocked && liveAlert && (
        <div className="fixed bottom-6 left-6 z-50 bg-stone-900/95 backdrop-blur-md shadow-2xl border border-stone-800 px-4 py-3.5 rounded-2xl max-w-sm flex items-center gap-3 animate-slide-up">
          <div className="w-9 h-9 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-lg shrink-0">
            🔔
          </div>
          <div>
            <h5 className="text-[11px] font-bold text-stone-200">{liveAlert.name} ({liveAlert.city})</h5>
            <p className="text-[10px] text-stone-400 mt-0.5">{liveAlert.action}</p>
          </div>
        </div>
      )}

      {/* 2. HEADER SECTION (Headline & Subhead) */}
      <header className="py-12 sm:py-16 px-4 max-w-4xl mx-auto text-center">
        
        {/* Audience Pill */}
        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-100 uppercase tracking-widest mb-6 leading-none">
          <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-pulse" /> Oportunidade Exclusiva
        </span>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-stone-950 leading-tight font-display">
          ⚠️ A maioria das iniciantes perde a primeira venda por causa disso…
        </h1>

        {/* Subtitle */}

      </header>

      {/* 3. AVISO ACIMA DO VÍDEO & VSL CONTAINER */}
      <section className="px-4 pb-16 max-w-4xl mx-auto">
        
        {/* Aviso Acima do Vídeo */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 sm:p-4 mb-5 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-stone-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 leading-snug">
            🚨 Oferta disponível somente nesta página. Se você sair ou atualizar, pode não conseguir acessar novamente.
          </p>
        </div>

        <VslPlayer onUnlock={() => setIsUnlocked(true)} />

      </section>

      {/* Conditionally visible content starting from the button downward */}
      {isUnlocked && (
        <>
          {/* Metodo de Vendas de 4 Passos e Botao CTA Principal */}
          <section className="px-4 pb-16 max-w-6xl mx-auto">
            {/* Título Centralizado com linha de destaque idêntico ao print */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-[#4C2F27] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Venda na sua primeira semana com esses 4 passos simples
              </h2>
              <div className="w-12 h-[3.5px] bg-rose-400 mx-auto mt-3.5 rounded-full" />
            </div>

            {/* Passos do Método em Formato de Cards Elegantes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              
              {/* Card 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-5 border border-stone-100">
                  <Smartphone className="w-5 h-5 text-stone-800" />
                </div>
                <h4 className="font-extrabold text-[12px] sm:text-[13px] tracking-wider uppercase text-[#4C2F27] mb-2.5">
                  Baixe os catálogos prontos
                </h4>
                <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                  Escolha o modelo, edite no celular e deixe pronto pra divulgar.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-5 border border-stone-100">
                  <Share2 className="w-5 h-5 text-stone-800" />
                </div>
                <h4 className="font-extrabold text-[12px] sm:text-[13px] tracking-wider uppercase text-[#4C2F27] mb-2.5">
                  Poste nas redes sociais
                </h4>
                <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                  Instagram, WhatsApp, Facebook, grupos e conhecidos.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-5 border border-stone-100">
                  <Calculator className="w-5 h-5 text-stone-800" />
                </div>
                <h4 className="font-extrabold text-[12px] sm:text-[13px] tracking-wider uppercase text-[#4C2F27] mb-2.5">
                  Monte sua cesta
                </h4>
                <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                  O Fábrica de Cestas Lucrativas mostra os itens, custo e lucro automaticamente.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-5 border border-stone-100">
                  <ArrowUpRight className="w-5 h-5 text-stone-800" />
                </div>
                <h4 className="font-extrabold text-[12px] sm:text-[13px] tracking-wider uppercase text-[#4C2F27] mb-2.5">
                  Primeiras vendas
                </h4>
                <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed">
                  Você só precisa divulgar, montar e vender para começar a lucrar ainda essa semana.
                </p>
              </div>

            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleOpenCheckout}
                className="w-full sm:w-auto px-10 py-5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-rose-600/35 transition-all uppercase tracking-wider animate-pulse hover:scale-103 cursor-pointer"
              >
                🔥 SIM! QUERO LIBERAR MEUS CATÁLOGOS AGORA
              </button>
              <p className="text-stone-800 text-xs sm:text-sm font-semibold max-w-xl mx-auto mt-4 leading-relaxed bg-amber-500/10 border border-amber-200 p-4 rounded-xl">
                Hoje você pode liberar mais de 10 catálogos profissionais e editáveis no Canva para divulgar suas cestas como alguém que já vende há anos — mas essa condição sai do ar assim que você fechar essa página.
              </p>
              <p className="text-xs text-stone-500 font-medium mt-3">
                Acesso imediato + garantia de 7 dias
              </p>
            </div>
          </section>

          {/* 4. SEÇÃO VISUAL */}
          <section className="py-20 bg-stone-50 border-y border-stone-200/50 px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
              Material Completo para o Seu Sucesso
            </span>
          </div>

          {/* Bullets layout container */}
          <div className="max-w-4xl mx-auto">
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-stone-900 text-center mb-8">
                Seus benefícios imediatos ao entrar hoje:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Bullet 1 */}
                <div className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-start gap-2.5">
                  <span className="text-emerald-500 shrink-0 text-sm">✅</span>
                  <div>
                    <p className="font-extrabold text-stone-900 text-xs sm:text-sm">+10 catálogos profissionais editáveis no Canva</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">Modelos testados de altíssima conversão.</p>
                  </div>
                </div>



                {/* Bullet 3 */}
                <div className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-start gap-2.5">
                  <span className="text-emerald-500 shrink-0 text-sm">✅</span>
                  <div>
                    <p className="font-extrabold text-stone-900 text-xs sm:text-sm">Modelos que passam aparência profissional</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">Diferencia seu negócio das amadoras em segundos.</p>
                  </div>
                </div>

                {/* Bullet 6 */}
                <div className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-start gap-2.5">
                  <span className="text-emerald-500 shrink-0 text-sm">✅</span>
                  <div>
                    <p className="font-extrabold text-stone-900 text-xs sm:text-sm">Basta trocar preço e contato</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">Nenhum conhecimento em design necessário.</p>
                  </div>
                </div>

                {/* Bullet 7 */}
                <div className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-start gap-2.5">
                  <span className="text-emerald-500 shrink-0 text-sm">✅</span>
                  <div>
                    <p className="font-extrabold text-stone-900 text-xs sm:text-sm">Funciona direto pelo celular</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">Abra no Canva e configure de onde estiver.</p>
                  </div>
                </div>

                {/* Bullet 8 */}
                <div className="bg-white p-4 rounded-xl border border-stone-200/60 flex items-start gap-2.5">
                  <span className="text-emerald-500 shrink-0 text-sm">✅</span>
                  <div>
                    <p className="font-extrabold text-stone-900 text-xs sm:text-sm">Ideal pra quem está começando do zero</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">Acelera o aprendizado das encomendas de grife.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. BLOCO DE ESCASSEZ */}
      <section className="py-16 bg-stone-950 text-stone-100 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center">
          
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            ⚠️ Essa oferta não vai aparecer de novo depois que você sair dessa página
          </h2>

          <div className="space-y-3 max-w-2xl mx-auto text-stone-300 text-xs sm:text-sm leading-relaxed">
            <p>Esse material não está disponível publicamente.</p>
            <p className="font-semibold text-rose-400">Ele foi liberado apenas para quem acabou de comprar o aplicativo fábrica de cestas lucrativas.</p>
            <p>Se você fechar agora, talvez precise comprar separado depois — por um valor muito maior.</p>
          </div>

        </div>
      </section>

      {/* 8. DETAILED PRICING CALLOUT BLOCK */}
      <section id="pricing-block" className="py-25 bg-stone-900 text-stone-100 px-4 relative overflow-hidden">
        
        {/* Abstract graphic bg glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
          
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 uppercase tracking-widest leading-none inline-block">
            Sua oferta especial — só disponível agora nesta página
          </span>

          <h2 className="text-3xl sm:text-4.5xl font-black text-white font-display tracking-tight">
            Seu Catálogo Pronto para Lucrar
          </h2>



          {/* Pricing figures */}
          <div className="bg-black/45 rounded-2xl p-6 sm:p-8 max-w-sm mx-auto border border-white/10 shadow-2xl">
            <span className="text-xs text-stone-400 block line-through">De R$ 97,00 reais</span>
            <div className="flex items-baseline justify-center gap-1.5 mt-2">
              <span className="text-stone-300 text-sm font-bold">Por apenas</span>
              <strong className="text-4xl sm:text-5.5xl font-black text-rose-500 font-mono">R$ 27,00</strong>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Desconto de R$ 70 aplicado com sucesso!
            </span>
          </div>

          <p className="text-xs text-stone-300 font-bold max-w-xs mx-auto">
            Pagamento único. Acesso imediato. Essa oferta some quando você fechar essa página.
          </p>

          {/* Golden big CTA button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black text-sm sm:text-base py-5 px-8 rounded-2xl shadow-xl shadow-rose-600/20 active:scale-97 hover:scale-103 transition-transform uppercase tracking-wider cursor-pointer font-sans"
            >
              🔥 QUERO ACESSAR OS +10 CATÁLOGOS AGORA
            </button>
            <button
              type="button"
              onClick={handleRecusaClick}
              className="block text-center mx-auto text-stone-300 hover:text-white text-xs sm:text-sm mt-4 select-none transition-all duration-200 underline decoration-stone-600 hover:decoration-rose-500 cursor-pointer bg-transparent border-0 outline-none opacity-90 hover:opacity-100 font-medium"
            >
              Não, prefiro continuar sem os catálogos profissionais.
            </button>
            
            {/* Countdown notice */}
            <p className="text-[10px] text-amber-500 font-semibold mt-2.5 uppercase tracking-wide">
              ⚡ Apenas {licencasRestantes} licenças promocionais disponíveis para a sua região hoje!
            </p>
          </div>

        </div>
      </section>

      {/* CONFIRMAÇÃO DO PRODUTO PRINCIPAL ACIMA DA GARANTIA */}
      <section className="py-12 bg-white px-4 border-t border-stone-200/60 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest mb-2 leading-none">
            ✅ Pedido Confirmado
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#4C2F27]">
            Tudo pronto com o seu aplicativo principal!
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Os dados de acesso para o <strong>Fábrica de Cestas Lucrativas</strong> foram enviados agora mesmo para o seu e-mail. Caso não os encontre em alguns minutos, lembre-se de verificar suas pastas de spam e promoções.
          </p>
        </div>
      </section>

      {/* 9. WARRANTY AND INSURANCE SEAL SECTION */}
      <section id="warranty-block" className="py-20 bg-stone-50 border-t border-stone-200/60 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Custom Gold Certificate Seal visual requested by Warranty */}
          <div className="relative w-28 h-28 mx-auto hover:rotate-3 transition-transform">
            <div className="absolute inset-2 rounded-full border-4 border-dashed border-amber-600/30"></div>
            <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-lg flex flex-col justify-center items-center text-stone-100">
              <span className="text-2xl leading-none">🎖️</span>
              <span className="text-[10px] font-black uppercase tracking-wider mt-1 text-amber-200">7 DIAS</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white leading-none">🛡️ GARANTIA</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            🛡️ Teste sem risco por 7 dias
          </h3>

          <div className="space-y-2 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            <p>Use os catálogos.</p>
            <p>Edite.</p>
            <p>Divulgue.</p>
            <p className="font-semibold text-stone-950">E se achar que não valeu a pena, basta pedir reembolso em até 7 dias.</p>
            <p>Sem perguntas.</p>
            <p>Sem burocracia.</p>
            <p className="font-bold text-amber-700">O risco é todo meu.</p>
          </div>

          {/* Secure seals logo list */}
          <div className="flex justify-center items-center gap-6 text-stone-400 text-[10px] sm:text-xs pt-4">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Compra Garantida</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Acesso de Grife</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Suporte VIP</span>
          </div>

        </div>
      </section>

      {/* 10. CTA FINAL & SECONDARY BOTÃO */}
      <section className="py-20 bg-stone-100 border-t border-stone-200 px-4 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-stone-950">
            Você já decidiu começar. <span className="block text-rose-600 mt-1 sm:mt-0">Agora decida parecer profissional desde a primeira venda.</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Depois que essa página fechar, essa condição pode não ficar disponível novamente.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenCheckout}
            className="w-full sm:w-auto px-12 py-5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-transform uppercase tracking-widest hover:scale-104 cursor-pointer"
          >
            🔥 QUERO ACESSAR OS +10 CATÁLOGOS AGORA
          </button>
          <button
            type="button"
            onClick={handleRecusaClick}
            className="block text-center mx-auto text-stone-600 hover:text-stone-950 text-xs sm:text-sm mt-4 select-none transition-all duration-200 underline decoration-stone-300 hover:decoration-rose-500 cursor-pointer bg-transparent border-0 outline-none opacity-90 hover:opacity-100 font-medium"
          >
            Não, prefiro continuar sem os catálogos profissionais.
          </button>
          <p className="text-[10px] text-stone-400 mt-3 font-semibold uppercase tracking-wider">
            Acesso liberado imediatamente após a confirmação do pagamento.
          </p>
        </div>
      </section>

      {/* 11. REJECTION DISCRET_LINK (Ative culpa saudável) */}
      <footer className="py-12 bg-white text-center px-4">
        <a 
          href="#recusa"
          onClick={handleRecusaClick} 
          className="text-stone-400 hover:text-stone-600 text-xs sm:text-sm font-semibold transition underline decoration-dotted underline-offset-4 cursor-pointer"
        >
          Não, obrigada. Prefiro perder essa oferta e seguir sem o catálogo.
        </a>
        <p className="text-[10px] text-stone-300 mt-6 max-w-sm mx-auto leading-relaxed">
          Página de vendas de Upsell exclusivo de oferta única. Este catálogo não voltará a ser oferecido por este valor promocional.
        </p>
      </footer>
    </>
  )}

      {/* MODAL 1: RECUSA ATIVA DE OFERTA EXECUTOR (CULPA SAUDÁVEL) */}
      {showRecusaModal && (
        <div id="recusa-modal" className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-100 text-center space-y-5 animate-scale-up">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center text-3xl mx-auto">
              🤔
            </div>
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                Você tem certeza que prefere divulgar com fotos comuns?
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Começar a divulgar as cestas com fotos ruins tiradas no cantinho de casa pode fazer as suas clientes sumirem sem nem perguntar o preço.
              </p>
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl font-medium leading-relaxed">
                Por apenas <strong>R$ 27,00</strong> você garante uma vitrine profissional de grife. É o custo de apenas 1 coxinha por mês para garantir o sustento das encomendas!
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowRecusaModal(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Mudei de ideia, quero garantir a vitrine de grife!
              </button>
              <button
                type="button"
                onClick={() => setShowRecusaModal(false)}
                className="w-full py-2.5 text-xs text-stone-400 hover:text-stone-600 underline font-medium cursor-pointer"
              >
                Sim, prefiro correr o risco e passar por essa trava sozinha.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FULL CHECKOUT SIMULATED FORM SCREEN */}
      <CheckoutModal 
         isOpen={isCheckoutOpen} 
         onClose={() => setIsCheckoutOpen(false)} 
         businessName={businessName}
         whatsapp={whatsapp}
      />

    </div>
  );
}
