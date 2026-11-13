import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from "lucide-react";
import Brand from "@/site/Brand";
import Cover from "@/site/Cover";
import MascotLauncher from "@/site/MascotLauncher";
import { asset, link } from "@/site/paths";

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
  "https://www.google.com/maps/place/Matos+Tec+Sistemas+de+Seguran%C3%A7a+e+Energia+Solar+em+Goian%C3%A9sia/data=!4m6!3m5!1s0x6cce93ab2bdffb0b:0x4b97110cb3815731!8m2!3d-15.4455263!4d-49.116242!16s%2Fg%2F11x_lvv3gx";

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

const covers: Record<ModelId, { eyebrow: string; title: ReactNode; text: string; primaryLabel: string }> = {
  1: {
    eyebrow: "Energia · Proteção · Automação",
    title: <>Energia que<br /><em>trabalha</em> por você.</>,
    text: "Energia solar, proteção e controle para sua rotina.",
    primaryLabel: "Falar com especialista",
  },
  2: {
    eyebrow: "Energia, segurança e automação no mesmo plano",
    title: <>Tudo começa quando <em>você decide cuidar.</em></>,
    text: "Soluções pensadas para a rotina real de casas, comércios, condomínios e fazendas — com uma equipe que olha o imóvel inteiro antes de propor.",
    primaryLabel: "Planejar minha solução",
  },
  3: {
    eyebrow: "Matos Tec · sistema integrado",
    title: <>Seu imóvel não é três problemas. É <em>um sistema.</em></>,
    text: "Comece pelo que está acontecendo hoje e deixe o próximo passo claro: elétrica, solar, segurança ou automação.",
    primaryLabel: "Diagnosticar meu imóvel",
  },
};

const problems = [
  { title: "A conta de luz pesa todo mês", answer: "Energia solar", detail: "Mande a conta e veja o tamanho do sistema." },
  { title: "Já entraram ou tentaram entrar no imóvel", answer: "Cerca, alarme e câmeras", detail: "Barre, avise e registre o que acontece." },
  { title: "Quero ver a casa ou a loja quando estou fora", answer: "Câmeras no celular", detail: "Acesso ao vivo e gravação configurada com você." },
  { title: "Disjuntor desarma, tomada esquenta ou dá choque", answer: "Elétrica primeiro", detail: "Quadro, aterramento, DR e DPS antes de qualquer automação." },
  { title: "Vou construir ou reformar", answer: "Planejamento integrado", detail: "Fiação, câmera e automação passam juntas antes de fechar parede." },
  { title: "Quero acender, abrir e armar pelo celular", answer: "Automação", detail: "Luz, portão, tomadas e alarme em cenas simples." },
  { title: "Meu comércio ou condomínio tem muito entra e sai", answer: "Segurança para fluxo", detail: "Câmeras, gravador, controle de acesso e aviso de área monitorada." },
];

const services = [
  {
    eyebrow: "01 · Segurança eletrônica",
    title: "Veja. Barre. Avise.",
    text: "Câmeras no celular, alarme, cerca elétrica e controle de acesso. A proteção que funciona combina duas ou três camadas depois de olhar o muro, o portão e o movimento.",
    image: "security",
    alt: "Câmera IP de segurança instalada em parede externa",
    width: 1100,
    height: 1467,
  },
  {
    eyebrow: "02 · Energia solar",
    title: "Gere no próprio telhado.",
    text: "Projeto, instalação e homologação com a Equatorial Goiás. O sistema é dimensionado pela geração estimada em kWh por mês, não apenas pela quantidade de placas.",
    image: "solar",
    alt: "Detalhe de placa solar fotovoltaica com reflexo do sol",
    width: 1100,
    height: 1467,
  },
  {
    eyebrow: "03 · Elétrica e automação",
    title: "Uma casa que responde.",
    text: "Quadro, aterramento, proteção contra surto, luz, portão, tomadas, persianas e cenas no celular ou na voz — com a elétrica feita do jeito certo.",
    image: "automation-service",
    alt: "Técnico instalando um motor de portão automático e seu controle de automação",
    width: 1100,
    height: 1467,
  },
];

const benefits = [
  "Um número só para chamar quando algo dá problema.",
  "O quadro revisado pensando em tudo o que vai entrar nele.",
  "Uma visita técnica para olhar o imóvel inteiro.",
  "Cabos e eletrodutos planejados uma vez, sem abrir de novo.",
  "Plano completo para instalar por etapas, no seu ritmo.",
];

const sequence = [
  { n: "01", title: "Elétrica", text: "Quadro, aterramento, DR, DPS e padrão de entrada em ordem." },
  { n: "02", title: "Energia solar", text: "O sistema entra em um quadro pronto e segue para a Equatorial Goiás." },
  { n: "03", title: "Segurança", text: "Câmeras e gravador com circuito próprio e nobreak." },
  { n: "04", title: "Automação", text: "Cenas que juntam luz, portão e alarme em um toque." },
];

const details = [
  {
    accent: "blood",
    eyebrow: "Segurança eletrônica",
    title: "Proteção em camadas",
    text: "Uma câmera registra, mas não impede. Cerca e concertina agem antes; alarme avisa durante; câmera mostra e grava depois e ao vivo.",
    facts: [
      ["Wi-Fi", "1 a 3 pontos, cartão ou nuvem"],
      ["Cabeada", "DVR ou NVR com HD e nobreak"],
      ["Ambientes", "Casa, comércio, condomínio e fazenda"],
    ],
    tags: ["LGPD em mente", "Teste dia e noite"],
  },
  {
    accent: "gold",
    eyebrow: "Energia solar",
    title: "Geração sem promessa vazia",
    text: "Painel, inversor, casa e medidor trabalham juntos. O excedente vira crédito em kWh, válido por 60 meses na área da Equatorial Goiás.",
    facts: [
      ["Geração", "Estimada em kWh/mês"],
      ["Créditos", "60 meses"],
      ["Sistemas", "On-grid, híbrido e off-grid"],
    ],
    tags: ["ART e homologação", "Projeto e instalação"],
  },
  {
    accent: "navy",
    eyebrow: "Elétrica e automação",
    title: "Conforto sobre uma base certa",
    text: "Antes de automatizar, olhe para disjuntor, aterramento, DR e DPS. Depois, luz, portão, tomadas, persianas e cenas respondem ao celular ou à voz.",
    facts: [
      ["Base", "Quadro, DR, DPS e aterramento"],
      ["Controle", "Wi-Fi, Zigbee ou cabeada"],
      ["Voz", "Alexa e Google"],
    ],
    tags: ["Cenas testadas com você", "Interruptor funciona sem internet"],
  },
];

const process = [
  ["01", "WhatsApp", "Conte o que você precisa. Se for solar, mande a foto da conta."],
  ["02", "Visita técnica", "Telhado, quadro, padrão, muro e pontos de câmera entram no olhar."],
  ["03", "Proposta por escrito", "Equipamento, marca, modelo, prazo e garantia de cada item."],
  ["04", "Instalação e teste", "De dia e, para as câmeras, também com pouca luz."],
  ["05", "Entrega", "Aplicativo configurado, explicação de uso e contato de suporte."],
];

const care = [
  ["Segurança", "Limpar a lente, conferir uma gravação antiga e trocar acessos quando necessário. Baterias têm vida útil."],
  ["Energia solar", "Acompanhar o app e limpar os painéis quando a poeira acumular, especialmente na seca de maio a setembro."],
  ["Elétrica e automação", "Testar o DR de tempos em tempos e manter aplicativo e central atualizados."],
];

const faqs = [
  ["Como é o preço?", "Depende do tamanho do imóvel, do equipamento e de quanto cabo precisa passar. O valor exato sai na proposta, depois da visita."],
  ["Vocês atendem fora de Goianésia?", "Sim. Anápolis, Ceres, Rialma, Jaraguá, Itapuranga, Uruana, Rubiataba, Barro Alto e toda a região do Vale do São Patrício."],
  ["Dá para fazer por etapas?", "Sim. A visita deixa o plano completo e você instala na ordem e no ritmo que couber."],
  ["Atendem comércio, condomínio e fazenda?", "Na segurança, sim: casa, comércio, condomínio e fazenda. Para solar e automação, a solução é dimensionada ao imóvel."],
  ["A energia solar zera a conta?", "Não há promessa de conta zero. Permanecem taxa mínima, iluminação pública e regras do Fio B conforme o sistema e o ano. A proposta mostra a geração estimada."],
];

function getModelFromPath(): ModelId | null {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/modelo-(1|2|3)/);
  return match ? (Number(match[1]) as ModelId) : null;
}

function StudioPhoto({ name, alt, sizes = "(max-width: 900px) 100vw, 400px" }: { name: string; alt: string; sizes?: string }) {
  const base = asset(`/assets/studio/${name}`);
  return (
    <img
      src={`${base}-640.webp`}
      srcSet={`${base}-640.webp 640w, ${base}.webp 1100w`}
      sizes={sizes}
      width={1100}
      height={1467}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
}

function Header({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner">
          <Brand tone="light" />
          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#solucoes">Soluções</a>
            <a href="#diagnostico">Diagnóstico</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#regiao">Região</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href={phoneHref}>
              <Phone size={14} /> {phone}
            </a>
            <a className="btn btn-primary btn-sm nav-wa" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
              <MessageCircle size={15} /> <span>WhatsApp</span>
            </a>
            <button className="nav-burger" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-panel ${open ? "is-open" : ""}`}>
        <a href="#solucoes" onClick={close}>Soluções</a>
        <a href="#diagnostico" onClick={close}>Diagnóstico</a>
        <a href="#como-funciona" onClick={close}>Como funciona</a>
        <a href="#regiao" onClick={close}>Região</a>
        <a href="#duvidas" onClick={close}>Dúvidas</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={close}>Falar no WhatsApp</a>
      </div>
    </>
  );
}

function Solutions() {
  return (
    <section className="solutions section-light" id="solucoes">
      <div className="wrap">
        <div className="solutions-top">
          <div className="section-head">
            <span className="kicker">01 — Soluções</span>
            <h2>Quatro camadas de um <em>mesmo sistema.</em></h2>
            <p>Antes da câmera, do painel ou do comando de voz, existe uma base elétrica bem feita. É isso que torna o conjunto mais seguro e mais fácil de manter.</p>
          </div>
          <p className="solutions-note">Segurança, energia solar, elétrica e automação na mesma visita técnica — com um plano que conversa entre si.</p>
        </div>
        <div className="solutions-grid">
          {services.map((service) => (
            <article className="solution" key={service.title}>
              <a className="solution-media" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={`Falar sobre ${service.title}`}>
                <StudioPhoto name={service.image} alt={service.alt} />
              </a>
              <div className="solution-body">
                <span className="solution-index">{service.eyebrow}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="link-arrow" href={whatsappHref} target="_blank" rel="noreferrer">
                  Conhecer a área <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolarSpot() {
  return (
    <section className="solar section-dark">
      <div className="wrap solar-grid">
        <figure className="solar-media">
          <img
            src={asset("/assets/google/matostec-rooftop-800.webp")}
            srcSet={`${asset("/assets/google/matostec-rooftop-800.webp")} 800w, ${asset("/assets/google/matostec-rooftop.webp")} 1600w`}
            sizes="(max-width: 1080px) 100vw, 620px"
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            alt="Sistema fotovoltaico instalado em telhado de telha, com painéis azuis e céu aberto"
          />
          <figcaption>Sistema instalado · região de Goianésia</figcaption>
        </figure>
        <div className="solar-copy">
          <div className="section-head">
            <span className="kicker kicker--gold">02 — Energia solar</span>
            <h2>O sol entra pelo telhado e volta como <em>crédito em kWh.</em></h2>
            <p>O painel gera, o inversor converte e a casa usa na hora. O excedente vai para a rede da Equatorial Goiás e pode abater outra conta no mesmo CPF ou CNPJ.</p>
          </div>
          <dl className="metrics">
            <div className="metric">
              <dt>Dimensionamento</dt>
              <dd><em>kWh/mês</em></dd>
            </div>
            <div className="metric">
              <dt>Validade dos créditos</dt>
              <dd>60 <em>meses</em></dd>
            </div>
            <div className="metric">
              <dt>Homologação</dt>
              <dd>Equatorial <em>Goiás</em></dd>
            </div>
          </dl>
          <a className="link-arrow" href={whatsappHref} target="_blank" rel="noreferrer">
            Enviar minha conta de luz <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Diagnostic() {
  const [active, setActive] = useState(0);
  const current = problems[active];
  return (
    <section className="diagnostic section-paper" id="diagnostico">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">03 — Diagnóstico</span>
          <h2>Não sabe o que pedir? <em>Comece por aqui.</em></h2>
          <p>Escolha a situação que mais parece com a sua. A recomendação já aponta o primeiro movimento.</p>
        </div>
        <div className="diag">
          <div className="diag-list" role="tablist" aria-label="Situações do imóvel">
            {problems.map((problem, index) => (
              <button
                key={problem.title}
                role="tab"
                aria-selected={active === index}
                className={`diag-item ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}>
                <span className="n">{String(index + 1).padStart(2, "0")}</span>
                <span className="t">{problem.title}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
          <div className="diag-answer" role="tabpanel">
            <span className="kicker">Próximo passo recomendado</span>
            <h3>{current.answer}</h3>
            <p>{current.detail}</p>
            <a className="btn btn-gold" href={whatsappHref} target="_blank" rel="noreferrer">
              Contar meu caso <ArrowUpRight size={15} />
            </a>
            <span className="diag-count">Diagnóstico inicial pelo WhatsApp · {String(active + 1).padStart(2, "0")}/07</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Integration() {
  return (
    <section className="integration section-light">
      <div className="wrap integration-grid">
        <div className="integration-media">
          <StudioPhoto name="electrician" alt="Eletricista organizando os cabos de um quadro de distribuição" sizes="(max-width: 1080px) 100vw, 480px" />
          <div className="integration-badge"><b>1</b> visita olha o imóvel inteiro</div>
        </div>
        <div>
          <div className="section-head">
            <span className="kicker">04 — Uma empresa em vez de três</span>
            <h2>Menos retrabalho. <em>Mais visão do todo.</em></h2>
            <p>Quem instala a câmera é a mesma empresa que faz a parte elétrica e coloca o sistema solar. Veja o que muda na prática.</p>
          </div>
          <div className="benefit-list">
            {benefits.map((benefit, index) => (
              <div className="benefit" key={benefit}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
          <a className="link-arrow" href={whatsappHref} target="_blank" rel="noreferrer">
            Quero mais de uma área na mesma visita <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Sequence() {
  return (
    <section className="sequence section-dark" id="como-funciona">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker kicker--gold">05 — A ordem certa</span>
          <h2>Quando você faz mais de uma coisa, <em>o projeto conversa.</em></h2>
          <p>Uma base bem resolvida evita que o próximo sistema vire um improviso.</p>
        </div>
        <div className="sequence-grid">
          {sequence.map((step) => (
            <article className="sequence-step" key={step.n}>
              <div className="n">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="sequence-note">
          <ArrowRight size={15} /> O plano pode ser instalado por etapas. A visita deixa o caminho pronto.
        </div>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section className="details section-light">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">06 — Detalhe que vira confiança</span>
          <h2>A proposta explica o que acontece <em>antes, durante e depois.</em></h2>
          <p>A Matos Tec não começa pelo equipamento. Começa pelo contexto do imóvel.</p>
        </div>
        <div className="details-grid">
          {details.map((detail) => (
            <article className={`detail detail--${detail.accent}`} key={detail.title}>
              <span className="eyebrow">{detail.eyebrow}</span>
              <h3>{detail.title}</h3>
              <p>{detail.text}</p>
              <div className="detail-facts">
                {detail.facts.map(([label, value]) => (
                  <div key={label}>
                    <b>{label}</b>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              <div className="detail-tags">
                {detail.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-paper">
      <div className="wrap process-grid">
        <div>
          <div className="section-head">
            <span className="kicker">07 — Do primeiro áudio ao sistema funcionando</span>
            <h2>A clareza começa <em>antes da obra.</em></h2>
            <p>Você sabe o que será visto, proposto, instalado e entregue.</p>
          </div>
          <a className="btn btn-dark process-cta" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> Começar pelo WhatsApp <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="timeline">
          {process.map(([n, title, text]) => (
            <div className="timeline-item" key={n}>
              <span className="n">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Care() {
  return (
    <section className="care section-dark">
      <div className="wrap care-grid">
        <div>
          <div className="section-head">
            <span className="kicker kicker--gold">08 — Depois que o técnico vai embora</span>
            <h2>Cuidado simples. <em>Sistema presente.</em></h2>
            <p>A entrega inclui explicação de uso. A rotina mantém o investimento funcionando melhor.</p>
          </div>
          <div className="care-list">
            {care.map(([title, text]) => (
              <div className="care-item" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a className="link-arrow" href={whatsappHref} target="_blank" rel="noreferrer">
              Já tenho um sistema e preciso de manutenção <ArrowRight size={15} />
            </a>
          </div>
        </div>
        <div className="care-media">
          <StudioPhoto name="automation-maintenance" alt="Técnico inspecionando um painel fotovoltaico durante a manutenção" sizes="(max-width: 1080px) 100vw, 560px" />
        </div>
      </div>
    </section>
  );
}

function Region() {
  return (
    <section className="region" id="regiao">
      <div className="region-bg" aria-hidden="true" />
      <div className="wrap region-grid">
        <div>
          <span className="kicker kicker--gold">09 — Localização e atendimento</span>
          <h2>Goianésia, Anápolis e o <em>Vale do São Patrício.</em></h2>
          <p>Atendimento para casas, comércios, condomínios e fazendas, com uma equipe que entende o imóvel inteiro.</p>
          <div className="region-actions">
            <a className="btn btn-gold" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Ver se atendemos você
            </a>
            <a className="btn btn-outline" href={mapsHref} target="_blank" rel="noreferrer">
              <MapPin size={15} /> Abrir no Google Maps
            </a>
          </div>
        </div>
        <div className="region-panel">
          <div className="rating">
            <strong>5,0</strong>
            <span>
              <Star size={14} fill="currentColor" /> no Google
              <br />
              <small>6 avaliações públicas</small>
            </span>
          </div>
          <div className="chips">
            {regions.map((region) => (
              <span key={region}>{region}</span>
            ))}
          </div>
          <div className="region-links">
            <a href={reviewsHref} target="_blank" rel="noreferrer">
              <Star size={13} fill="currentColor" /> Ver avaliações no Google <ArrowUpRight size={13} />
            </a>
            <a href={mapsHref} target="_blank" rel="noreferrer">
              <MapPin size={13} /> Ver perfil e fotos <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section-light" id="duvidas">
      <div className="wrap faq-grid">
        <div className="section-head">
          <span className="kicker">10 — Dúvidas que aparecem antes do sim</span>
          <h2>Resposta direta, <em>sem letra miúda.</em></h2>
          <p>Se a dúvida continuar, o WhatsApp está a um toque.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], index) => (
            <div className={`faq-item ${open === index ? "open" : ""}`} key={q}>
              <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
                <span>{q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
              {open === index && (
                <div className="answer">
                  <p>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <span className="kicker">Qual área vem primeiro?</span>
          <h2>Vamos deixar seu próximo passo <em>claro.</em></h2>
        </div>
        <div className="cta-side">
          <p>Conte pelo WhatsApp o que precisa resolver. A visita técnica organiza o resto.</p>
          <a className="btn" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> Começar pelo WhatsApp <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand tone="light" size="lg" asLink={false} />
            <p>Segurança eletrônica, energia solar e automação em Goianésia, Anápolis e no Vale do São Patrício.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span>Soluções</span>
              <a href="#solucoes">Segurança eletrônica</a>
              <a href="#solucoes">Energia solar</a>
              <a href="#solucoes">Elétrica e automação</a>
              <a href={link("/propostas")}>Ver as 3 propostas</a>
            </div>
            <div className="footer-col">
              <span>Contato</span>
              <a href={whatsappHref} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              <a href={phoneHref}>Ligar {phone}</a>
              <a href={reviewsHref} target="_blank" rel="noreferrer">Avaliações no Google</a>
              <a href={mapsHref} target="_blank" rel="noreferrer">Localização no Maps</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Matos Tec · projeto, instalação e manutenção.</span>
          <a href="#topo">Voltar ao topo</a>
        </div>
      </div>
    </footer>
  );
}

function FullSite({ model }: { model: ModelId }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [model]);
  const cover = covers[model];
  return (
    <div className="site">
      <Header />
      <main>
        <Cover
          eyebrow={cover.eyebrow}
          title={cover.title}
          text={cover.text}
          primaryLabel={cover.primaryLabel}
          whatsappHref={whatsappHref}
          reviewsHref={reviewsHref}
          phoneLabel={phone}
        />
        <Solutions />
        <SolarSpot />
        <Diagnostic />
        <Integration />
        <Sequence />
        <Details />
        <Process />
        <Care />
        <Region />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MascotLauncher whatsappHref={whatsappHref} phoneLabel={phone} />
    </div>
  );
}

function Gallery() {
  const cards = [
    { id: 1 as ModelId, image: "security", title: "Nightline", text: "A direção aprovada: editorial escuro, foco em confiança e presença." },
    { id: 2 as ModelId, image: "solar", title: "Solar Aura", text: "A mesma base com foco na energia do sol e no acolhimento." },
    { id: 3 as ModelId, image: "automation-service", title: "Grid Control", text: "A mesma base com foco técnico e conversão pelo diagnóstico." },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="gallery">
      <header className="gallery-head">
        <Brand tone="dark" />
        <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
      </header>
      <section className="gallery-hero">
        <div>
          <span className="kicker">Matos Tec · direções de redesign</span>
          <h1>Três formas de transformar a mesma força em um site mais <em>memorável.</em></h1>
          <p>Mockups completos, responsivos e baseados nas informações públicas da Matos Tec: segurança, energia solar, elétrica e automação em Goianésia, Anápolis e no Vale do São Patrício.</p>
        </div>
        <div className="gallery-proof"><strong>5,0</strong> no Google · 6 avaliações</div>
      </section>
      <section className="gallery-grid">
        {cards.map((card) => (
          <a className="gallery-card" key={card.id} href={link(`/modelo-${card.id}`)}>
            <StudioPhoto name={card.image} alt={`Modelo ${card.title}`} sizes="(max-width: 900px) 100vw, 30vw" />
            <div className="gallery-card-body">
              <span>Modelo 0{card.id}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          </a>
        ))}
      </section>
      <footer className="gallery-foot">
        <span>Segurança eletrônica · energia solar · automação</span>
        <a href={phoneHref}>{phone}</a>
      </footer>
    </main>
  );
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
