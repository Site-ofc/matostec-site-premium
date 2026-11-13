import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BatteryCharging,
  Cable,
  Camera,
  Check,
  ChevronDown,
  CircuitBoard,
  CloudSun,
  Eye,
  FileCheck2,
  Gauge,
  Globe2,
  House,
  LayoutGrid,
  Lightbulb,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PlugZap,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  Volume2,
  Wifi,
  Wrench,
  X,
  Zap,
} from "lucide-react";

type ModelId = 1 | 2 | 3;

type HomeProps = {
  modelOverride?: ModelId;
};

const phone = "(62) 99493-2746";
const phoneHref = "tel:+5562994932746";
const whatsappHref =
  "https://wa.me/5562994932746?text=Ol%C3%A1%2C%20Matos%20Tec!%20Vim%20pelo%20site%20e%20queria%20um%20or%C3%A7amento.";
const reviewsHref =
  "https://www.google.com/maps/search/?api=1&query=Matos%20Tec%20Sistemas%20de%20Seguran%C3%A7a%20e%20Energia%20Solar%20Goian%C3%A9sia";
const mapsHref =
  "https://www.google.com/maps/place/Matos+Tec+Sistemas+de+Seguran%C3%A7a+e+Energia+Solar+em+Goian%C3%A9sia/@-18.9220717,-48.2636901,5z/data=!4m6!3m5!1s0x6cce93ab2bdffb0b:0x4b97110cb3815731!8m2!3d-15.4455263!4d-49.116242!16s%2Fg%2F11x_lvv3gx";

const regions = [
  "Goianésia",
  "Anápolis",
  "Ceres",
  "Rialma",
  "Jaraguá",
  "Itapuranga",
  "Uruana",
  "Rubiataba",
  "Barro Alto",
];

const modelLabels: Record<ModelId, string> = {
  1: "Nightline",
  2: "Solar Aura",
  3: "Grid Control",
};

const modelDescriptions: Record<ModelId, string> = {
  1: "Editorial premium · confiança e presença",
  2: "Claro contemporâneo · acolhimento e energia",
  3: "Técnico modular · diagnóstico e conversão",
};

const problems = [
  {
    title: "A conta de luz pesa todo mês",
    answer: "Energia solar",
    detail: "Mande a conta e veja o tamanho do sistema.",
    icon: SunMedium,
  },
  {
    title: "Já entraram ou tentaram entrar no imóvel",
    answer: "Cerca + alarme + câmeras",
    detail: "Barre, avise e registre o que acontece.",
    icon: ShieldAlert,
  },
  {
    title: "Quero ver a casa ou a loja quando estou fora",
    answer: "Câmeras no celular",
    detail: "Acesso ao vivo e gravação configurada com você.",
    icon: Eye,
  },
  {
    title: "Disjuntor desarma, tomada esquenta ou dá choque",
    answer: "Elétrica primeiro",
    detail: "Quadro, aterramento, DR e DPS antes de qualquer automação.",
    icon: PlugZap,
  },
  {
    title: "Vou construir ou reformar",
    answer: "Planejamento integrado",
    detail: "Fiação, câmera e automação passam juntas antes de fechar parede.",
    icon: CircuitBoard,
  },
  {
    title: "Quero acender, abrir e armar pelo celular",
    answer: "Automação",
    detail: "Luz, portão, tomadas e alarme em cenas simples.",
    icon: Sparkles,
  },
  {
    title: "Meu comércio ou condomínio tem muito entra e sai",
    answer: "Segurança para fluxo",
    detail: "Câmeras, gravador, controle de acesso e aviso de área monitorada.",
    icon: LayoutGrid,
  },
];

const serviceCards = [
  {
    eyebrow: "01 · Segurança",
    title: "Veja. Barre. Avise.",
    text: "Câmeras no celular, alarme, cerca elétrica e controle de acesso. A proteção que funciona combina duas ou três camadas depois de olhar o muro, o portão e o movimento.",
    icon: ShieldCheck,
    image: "/assets/google/matostec-painel.jpg",
    accent: "cyan",
  },
  {
    eyebrow: "02 · Energia solar",
    title: "Gere no próprio telhado.",
    text: "Projeto, instalação e homologação com a Equatorial Goiás. O sistema é dimensionado pela geração estimada em kWh por mês, não apenas pela quantidade de placas.",
    icon: SunMedium,
    image: "/assets/google/matostec-rooftop.jpg",
    accent: "amber",
  },
  {
    eyebrow: "03 · Elétrica + automação",
    title: "Uma casa que responde.",
    text: "Quadro, aterramento, proteção contra surto, luz, portão, tomadas, persianas e cenas no celular ou na voz — com a elétrica feita do jeito certo.",
    icon: House,
    image: "/assets/google/matostec-painel.jpg",
    accent: "mint",
  },
] as const;

const faqs = [
  {
    q: "Como é o preço?",
    a: "Depende do tamanho do imóvel, do equipamento e de quanto cabo precisa passar. O valor exato sai na proposta, depois da visita.",
  },
  {
    q: "Vocês atendem fora de Goianésia?",
    a: "Sim. Anápolis, Ceres, Rialma, Jaraguá, Itapuranga, Uruana, Rubiataba, Barro Alto e toda a região do Vale do São Patrício.",
  },
  {
    q: "Dá para fazer por etapas?",
    a: "Sim. A visita deixa o plano completo e você instala na ordem e no ritmo que couber.",
  },
  {
    q: "Atendem comércio, condomínio e fazenda?",
    a: "Na segurança, sim: casa, comércio, condomínio e fazenda. Para solar e automação, a solução é dimensionada ao imóvel.",
  },
  {
    q: "A energia solar zera a conta?",
    a: "Não há promessa de conta zero. Permanecem taxa mínima, iluminação pública e regras do Fio B conforme o sistema e o ano. A proposta mostra a geração estimada.",
  },
];

function getModelFromPath(): ModelId | null {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/modelo-(1|2|3)/);
  return match ? (Number(match[1]) as ModelId) : null;
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand-mark ${inverse ? "inverse" : ""}`} href="/" aria-label="Matos Tec, início">
      <img className="brand-logo-image" src="/assets/matos-tec-logo-google.png" alt="Matos Tec" />
    </a>
  );
}

function WhatsAppButton({ children = "Falar no WhatsApp", subtle = false }: { children?: ReactNode; subtle?: boolean }) {
  return (
    <a className={`button button-whatsapp ${subtle ? "subtle" : ""}`} href={whatsappHref} target="_blank" rel="noreferrer">
      <MessageCircle size={17} />
      <span>{children}</span>
      <ArrowUpRight size={15} />
    </a>
  );
}

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ModelPicker({ active }: { active?: ModelId }) {
  return (
    <div className="model-picker" aria-label="Escolher modelo">
      <span className="picker-label">3 propostas</span>
      {[1, 2, 3].map((id) => (
        <a key={id} className={active === id ? "active" : ""} href={`/modelo-${id}`}>
          <span className={`picker-dot dot-${id}`} /> {modelLabels[id as ModelId]}
        </a>
      ))}
    </div>
  );
}

function Gallery() {
  const cards = [
    {
      id: 1 as ModelId,
      number: "01",
      theme: "night-card",
      image: "/assets/google/matostec-rooftop.jpg",
      title: "Nightline",
      subtitle: modelDescriptions[1],
      detail: "Uma presença escura, cinematográfica e premium para destacar confiança e tecnologia.",
    },
    {
      id: 2 as ModelId,
      number: "02",
      theme: "solar-card",
      image: "/assets/google/matostec-rooftop.jpg",
      title: "Solar Aura",
      subtitle: modelDescriptions[2],
      detail: "Uma direção luminosa e acolhedora para aproximar famílias, comércio e fazendas.",
    },
    {
      id: 3 as ModelId,
      number: "03",
      theme: "grid-card",
      image: "/assets/google/matostec-painel.jpg",
      title: "Grid Control",
      subtitle: modelDescriptions[3],
      detail: "Uma interface modular para levar o visitante do problema ao próximo passo.",
    },
  ];
  return (
    <main className="gallery-page">
      <div className="gallery-glow" />
      <header className="gallery-header">
        <BrandMark />
        <span className="gallery-kicker">Direções de redesign · 2026</span>
        <a className="gallery-contact" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
      </header>
      <section className="gallery-hero">
        <div>
          <span className="eyebrow">Matos Tec · escolha uma direção</span>
          <h1>Três formas de transformar a mesma força em um site mais <em>memorável.</em></h1>
          <p>Mockups completos, responsivos e baseados nas informações públicas da Matos Tec: segurança, energia solar, elétrica e automação em Goianésia, Anápolis e no Vale do São Patrício.</p>
        </div>
        <div className="gallery-proof"><span>5,0</span><Star size={14} fill="currentColor" /> no Google · 6 avaliações</div>
      </section>
      <section className="model-grid">
        {cards.map((card) => (
          <a className={`model-card ${card.theme}`} key={card.id} href={`/modelo-${card.id}`}>
            <div className="model-card-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,.76)), url(${card.image})` }}>
              <span className="model-number">{card.number}</span>
              <span className="model-card-arrow"><ArrowUpRight size={20} /></span>
              <div className="model-card-copy"><span>{card.subtitle}</span><h2>{card.title}</h2><p>{card.detail}</p></div>
            </div>
          </a>
        ))}
      </section>
      <section className="gallery-note">
        <div><span className="eyebrow">O que está dentro</span><h2>Conteúdo real. Hierarquia nova.</h2></div>
        <p>Os três modelos carregam a mesma base de informação: serviços, diagnóstico por problema, processo de atendimento, diferenças técnicas, pós-instalação, regiões atendidas, avaliação pública e FAQ.</p>
      </section>
      <footer className="gallery-footer"><BrandMark /><span>Segurança eletrônica · energia solar · automação</span><a href={phoneHref}>{phone}</a></footer>
    </main>
  );
}

function TopNav({ model, variant = "default" }: { model: ModelId; variant?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`top-nav ${variant}`}>
      <div className="nav-inner">
        <BrandMark inverse={model === 1} />
        <nav className={open ? "open" : ""}>
          <a href="#solucoes" onClick={() => setOpen(false)}>Soluções</a>
          <a href="#como-funciona" onClick={() => setOpen(false)}>Como funciona</a>
          <a href="#regiao" onClick={() => setOpen(false)}>Região</a>
          <a href="#duvidas" onClick={() => setOpen(false)}>Dúvidas</a>
        </nav>
        <div className="nav-actions"><a className="nav-phone" href={phoneHref}><Phone size={15} /> {phone}</a><a className="nav-review" href={reviewsHref} target="_blank" rel="noreferrer"><Star size={14} fill="currentColor" /> Avaliações</a><WhatsAppButton children="WhatsApp" /></div>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Hero({ model }: { model: ModelId }) {
  const content: Record<ModelId, { eyebrow: string; title: React.ReactNode; text: string; image: string }> = {
    1: {
      eyebrow: "Tecnologia que protege o que importa",
      title: <>Uma casa mais <em>segura.</em><br />Um sistema que faz sentido.</>,
      text: "Câmeras, energia do sol e uma casa que responde a um toque. A mesma empresa cuida de tudo, do projeto à manutenção.",
      image: "/assets/google/matostec-rooftop.jpg",
    },
    2: {
      eyebrow: "Energia, segurança e automação no mesmo plano",
      title: <>Tudo começa quando<br /><em>você decide cuidar.</em></>,
      text: "Soluções pensadas para a rotina real de casas, comércios, condomínios e fazendas em Goianésia, Anápolis e no Vale do São Patrício.",
      image: "/assets/google/matostec-rooftop.jpg",
    },
    3: {
      eyebrow: "Matos Tec / sistema integrado",
      title: <>Seu imóvel não é<br /><span className="hero-mono">três problemas.</span></>,
      text: "É um único sistema. Comece pelo que está acontecendo hoje e deixe o próximo passo claro: elétrica, solar, segurança ou automação.",
      image: "/assets/google/matostec-painel.jpg",
    },
  };
  const item = content[model];
  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 50%, var(--hero-overlay-end) 100%), url(${item.image})` }}>
      <div className="hero-inner">
        <div className="hero-content">
          <span className="eyebrow">{item.eyebrow}</span>
          <h1>{item.title}</h1>
          <p>{item.text}</p>
          <div className="hero-actions"><WhatsAppButton>{model === 3 ? "Diagnosticar meu imóvel" : model === 2 ? "Planejar minha solução" : "Falar com um especialista"}</WhatsAppButton><a className="button button-ghost" href="#solucoes">Explorar soluções <ArrowDownRight size={16} /></a></div>
          <div className="hero-meta"><span><span className="status-dot" /> Atendimento pelo WhatsApp</span><a href={reviewsHref} target="_blank" rel="noreferrer"><Star size={14} fill="currentColor" /> 5,0 no Google · 6 avaliações</a></div>
        </div>
        {model === 3 && <div className="hero-console"><div className="console-top"><span>STATUS DO IMÓVEL</span><span className="console-ok"><span className="status-dot" /> integrado</span></div><div className="console-value">04 <small>áreas em uma visita</small></div><div className="console-bars"><span style={{ width: "88%" }} /><span style={{ width: "64%" }} /><span style={{ width: "76%" }} /></div><div className="console-labels"><span>elétrica</span><span>solar</span><span>segurança</span></div></div>}
      </div>
    </section>
  );
}

function ServiceStrip() {
  return (
    <section className="service-strip" id="solucoes">
      <div className="container-wide">
        <div className="service-intro"><span className="eyebrow">Uma equipe, quatro camadas</span><h2>O sistema começa no que ninguém vê.</h2><p>Antes da câmera, do painel ou do comando de voz, existe uma base elétrica bem feita. É isso que torna o conjunto mais seguro e mais fácil de manter.</p></div>
        <div className="service-cards">{serviceCards.map((service) => <article className={`service-card ${service.accent}`} key={service.title}><div className="service-card-top"><span className="service-icon"><service.icon size={20} /></span><span>{service.eyebrow}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href={whatsappHref} target="_blank" rel="noreferrer">Conhecer a área <ArrowRight size={15} /></a><div className="service-card-image" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(10,16,25,.7)), url(${service.image})` }} /></article>)}</div>
      </div>
    </section>
  );
}

function ProblemSection({ model }: { model: ModelId }) {
  const [active, setActive] = useState(0);
  const current = problems[active];
  return (
    <section className="problem-section" id="diagnostico">
      <div className="container-wide problem-layout">
        <SectionHeading eyebrow="Comece pelo seu problema" title={<>Não sabe o que pedir?<br /><em>Comece por aqui.</em></>} text="Escolha a situação que mais parece com a sua. A recomendação já aponta o primeiro movimento." />
        <div className="problem-board">
          <div className="problem-list">{problems.map((problem, index) => <button className={active === index ? "active" : ""} key={problem.title} onClick={() => setActive(index)}><span className="problem-index">0{index + 1}</span><span>{problem.title}</span><ArrowRight size={16} /></button>)}</div>
          <div className="problem-answer"><div className="answer-icon"><current.icon size={24} /></div><span className="eyebrow">Próximo passo recomendado</span><h3>{current.answer}</h3><p>{current.detail}</p><a href={whatsappHref} target="_blank" rel="noreferrer">Contar meu caso <ArrowUpRight size={15} /></a><div className="answer-footer"><span>Diagnóstico inicial pelo WhatsApp</span><span>0{active + 1}/07</span></div></div>
        </div>
      </div>
    </section>
  );
}

function IntegrationSection({ model }: { model: ModelId }) {
  const benefits = [
    "Um número só para chamar quando algo dá problema.",
    "O quadro revisado pensando em tudo o que vai entrar nele.",
    "Uma visita técnica para olhar o imóvel inteiro.",
    "Cabos e eletrodutos planejados uma vez, sem abrir de novo.",
    "Plano completo para instalar por etapas, no seu ritmo.",
  ];
  return (
    <section className={`integration-section model-${model}`}>
      <div className="container-wide integration-grid"><div className="integration-image"><img src="/assets/google/matostec-painel.jpg" alt="Técnico chegando para atendimento em uma casa" /><span className="image-stamp"><span>1</span> visita olha o imóvel inteiro</span></div><div className="integration-copy"><SectionHeading eyebrow="Uma empresa em vez de três" title={<>Menos retrabalho.<br /><em>Mais visão do todo.</em></>} text="Quem instala a câmera é a mesma empresa que faz a parte elétrica e coloca o sistema solar. Veja o que muda na prática." /><div className="benefit-list">{benefits.map((benefit, index) => <div key={benefit}><span>0{index + 1}</span><p>{benefit}</p></div>)}</div><a className="text-link" href={whatsappHref} target="_blank" rel="noreferrer">Quero mais de uma área na mesma visita <ArrowRight size={16} /></a></div></div>
    </section>
  );
}

function SequenceSection() {
  const steps = [
    { n: "01", title: "Elétrica", text: "Quadro, aterramento, DR, DPS e padrão de entrada em ordem.", icon: PlugZap },
    { n: "02", title: "Energia solar", text: "O sistema entra em um quadro pronto e segue para a Equatorial Goiás.", icon: SunMedium },
    { n: "03", title: "Segurança", text: "Câmeras e gravador com circuito próprio e nobreak.", icon: ShieldCheck },
    { n: "04", title: "Automação", text: "Cenas que juntam luz, portão e alarme em um toque.", icon: Sparkles },
  ];
  return (
    <section className="sequence-section" id="como-funciona"><div className="container-wide"><SectionHeading eyebrow="Existe uma ordem certa" title="Quando você faz mais de uma coisa, o projeto conversa." text="Uma base bem resolvida evita que o próximo sistema vire um improviso." /><div className="sequence-grid">{steps.map((step) => <article key={step.n}><div className="sequence-number">{step.n}</div><step.icon size={21} /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="sequence-note"><Check size={17} /><span>O plano pode ser instalado por etapas. A visita deixa o caminho pronto.</span></div></div></section>
  );
}

function ServiceDetails({ model }: { model: ModelId }) {
  return (
    <section className="details-section"><div className="container-wide"><SectionHeading eyebrow="Detalhe que vira confiança" title="A proposta explica o que acontece antes, durante e depois." text="A Matos Tec não começa pelo equipamento. Começa pelo contexto do imóvel." /><div className="detail-panels"><article className="detail-panel security"><div className="detail-panel-head"><span className="service-icon"><ShieldCheck size={20} /></span><div><span className="eyebrow">Segurança eletrônica</span><h3>Proteção em camadas</h3></div></div><p>Uma câmera registra, mas não impede. Cerca e concertina agem antes; alarme avisa durante; câmera mostra e grava depois e ao vivo.</p><div className="detail-columns"><div><b>Wi-Fi</b><span>1 a 3 pontos, cartão ou nuvem, instalação rápida.</span></div><div><b>Cabeada</b><span>DVR/NVR com HD, nobreak e mais espaço para crescer.</span></div></div><div className="detail-tags"><span><LockKeyhole size={13} /> LGPD em mente</span><span><Camera size={13} /> Teste dia e noite</span></div></article><article className="detail-panel solar"><div className="detail-panel-head"><span className="service-icon"><SunMedium size={20} /></span><div><span className="eyebrow">Energia solar</span><h3>Geração sem promessa vazia</h3></div></div><p>Painel, inversor, casa e medidor trabalham juntos. O excedente vira crédito em kWh, válido por 60 meses na área da Equatorial Goiás.</p><div className="energy-flow"><span><SunMedium size={16} /> painel</span><ArrowRight size={15} /><span><Activity size={16} /> inversor</span><ArrowRight size={15} /><span><House size={16} /> casa</span></div><div className="detail-tags"><span><Gauge size={13} /> kWh/mês</span><span><FileCheck2 size={13} /> ART + homologação</span></div></article><article className="detail-panel automation"><div className="detail-panel-head"><span className="service-icon"><Sparkles size={20} /></span><div><span className="eyebrow">Elétrica + automação</span><h3>Conforto sobre uma base certa</h3></div></div><p>Antes de automatizar, olhe para disjuntor, aterramento, DR e DPS. Depois, luz, portão, tomadas, persianas e cenas podem responder ao celular ou à voz.</p><div className="automation-scenes"><span><Volume2 size={15} /> “Boa noite”</span><span><Lightbulb size={15} /> “Cheguei”</span><span><Wifi size={15} /> “Viagem”</span></div><div className="detail-tags"><span><Cable size={13} /> Wi-Fi · Zigbee · cabeada</span><span><Check size={13} /> Testada com você</span></div></article></div></div></section>
  );
}

function ProcessSection() {
  const process = [
    ["01", "WhatsApp", "Conte o que você precisa. Se for solar, mande a foto da conta."],
    ["02", "Visita técnica", "Telhado, quadro, padrão, muro e pontos de câmera entram no olhar."],
    ["03", "Proposta por escrito", "Equipamento, marca, modelo, prazo e garantia de cada item."],
    ["04", "Instalação e teste", "De dia e, para as câmeras, também com pouca luz."],
    ["05", "Entrega", "Aplicativo configurado, explicação de uso e contato de suporte."],
  ];
  return (
    <section className="process-section"><div className="container-wide process-grid"><div className="process-lead"><SectionHeading eyebrow="Do primeiro áudio ao sistema funcionando" title={<>A clareza começa<br /><em>antes da obra.</em></>} text="Você sabe o que será visto, proposto, instalado e entregue." /><a className="button button-dark" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Começar pelo WhatsApp <ArrowUpRight size={15} /></a></div><div className="process-list">{process.map(([n, title, text]) => <div className="process-step" key={n}><span className="process-number">{n}</span><div><h3>{title}</h3><p>{text}</p></div><Check size={16} /></div>)}</div></div></section>
  );
}

function AfterSection() {
  return (
    <section className="after-section"><div className="container-wide after-grid"><div className="after-image"><img src="/assets/google/matostec-painel.jpg" alt="Limpeza da lente de uma câmera de segurança" /><span>O sistema continua sendo seu depois da entrega.</span></div><div><SectionHeading eyebrow="Depois que o técnico vai embora" title="Cuidado simples. Sistema presente." text="A entrega inclui explicação de uso. A rotina mantém o investimento funcionando melhor." /><div className="after-cards"><article><ShieldCheck size={18} /><h3>Segurança</h3><p>Limpar a lente, conferir uma gravação antiga e trocar acessos quando necessário. Baterias têm vida útil.</p></article><article><SunMedium size={18} /><h3>Energia solar</h3><p>Acompanhar o app e limpar os painéis quando a poeira acumular, especialmente na seca de maio a setembro.</p></article><article><PlugZap size={18} /><h3>Elétrica + automação</h3><p>Testar o DR de tempos em tempos e manter aplicativo e central atualizados.</p></article></div><a className="text-link" href={whatsappHref} target="_blank" rel="noreferrer">Já tenho um sistema e preciso de manutenção <ArrowRight size={16} /></a></div></div></section>
  );
}

function RegionSection() {
  return (
    <section className="region-section" id="regiao"><div className="region-image" style={{ backgroundImage: "linear-gradient(90deg, rgba(28,32,56,.95), rgba(28,32,56,.52)), url(/assets/google/matostec-rooftop.jpg)" }} /><div className="container-wide region-content"><div><span className="eyebrow">Localização e atendimento</span><h2>Goianésia, Anápolis<br />e o Vale do São Patrício.</h2><p>Atendimento para casas, comércios, condomínios e fazendas, com uma equipe que entende o imóvel inteiro.</p><div className="region-actions"><a className="button button-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Ver se atendemos você <ArrowUpRight size={15} /></a><a className="button button-map" href={mapsHref} target="_blank" rel="noreferrer"><MapPin size={16} /> Abrir localização no Google</a></div></div><div className="region-list"><div className="rating"><strong>5,0</strong><span><Star size={15} fill="currentColor" /> no Google<br /><small>6 avaliações</small></span></div><div className="region-chips">{regions.map((region) => <span key={region}><MapPin size={12} /> {region}</span>)}</div><div className="region-links"><a className="review-link" href={reviewsHref} target="_blank" rel="noreferrer"><Star size={14} fill="currentColor" /> Ver avaliações no Google <ArrowUpRight size={14} /></a><a className="review-link" href={mapsHref} target="_blank" rel="noreferrer"><MapPin size={14} /> Ver perfil e fotos <ArrowUpRight size={14} /></a></div></div></div></section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="duvidas"><div className="container-wide faq-grid"><SectionHeading eyebrow="Dúvidas que aparecem antes do sim" title={<>Resposta direta,<br /><em>sem letra miúda.</em></>} text="Se a dúvida continuar, o WhatsApp está a um toque." /><div className="faq-list">{faqs.map((item, index) => <div className={`faq-item ${open === index ? "open" : ""}`} key={item.q}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{item.q}</span><ChevronDown size={18} /></button>{open === index && <p>{item.a}</p>}</div>)}</div></div></section>
  );
}

function SiteFooter({ model }: { model: ModelId }) {
  return <footer className={`site-footer footer-${model}`}><div className="container-wide footer-top"><div><BrandMark inverse={model === 1} /><p>Segurança eletrônica, energia solar e automação em Goianésia, Anápolis e no Vale do São Patrício.</p></div><div className="footer-links"><div><span className="footer-label">Soluções</span><a href="#solucoes">Segurança eletrônica</a><a href="#solucoes">Energia solar</a><a href="#solucoes">Elétrica e automação</a></div><div><span className="footer-label">Contato</span><a href={whatsappHref} target="_blank" rel="noreferrer">Chamar no WhatsApp</a><a href={phoneHref}>Ligar {phone}</a><a href={reviewsHref} target="_blank" rel="noreferrer">Avaliações no Google</a></div></div></div><div className="container-wide footer-bottom"><span>© Matos Tec · projeto, instalação e manutenção.</span><a href="/">Ver as 3 propostas</a></div></footer>;
}

function FullSite({ model }: { model: ModelId }) {
  useEffect(() => {
    document.title = `Matos Tec — ${modelLabels[model]}`;
    window.scrollTo(0, 0);
  }, [model]);
  return <div className={`site-shell model-${model}`}><TopNav model={model} variant={model === 2 ? "nav-light" : model === 3 ? "nav-grid" : ""} /><Hero model={model} /><ServiceStrip /><ProblemSection model={model} /><IntegrationSection model={model} /><SequenceSection /><ServiceDetails model={model} /><ProcessSection /><AfterSection /><RegionSection /><FAQSection /><section className="final-cta"><div className="container-wide"><span className="eyebrow">Qual área vem primeiro?</span><h2>Vamos deixar seu próximo passo claro.</h2><div><p>Conte pelo WhatsApp o que precisa resolver. A visita técnica organiza o resto.</p><WhatsAppButton>Começar pelo WhatsApp</WhatsAppButton></div></div></section><SiteFooter model={model} /></div>;
}

export default function Home({ modelOverride }: HomeProps) {
  const [pathModel, setPathModel] = useState<ModelId | null>(() => getModelFromPath());
  useEffect(() => {
    const onPop = () => setPathModel(getModelFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const model = modelOverride ?? pathModel;
  return model ? <FullSite model={model} /> : <Gallery />;
}
