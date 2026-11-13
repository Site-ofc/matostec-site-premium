import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import Brand from "@/site/Brand";
import { asset, link } from "@/site/paths";

type ServiceKey = "seguranca" | "energia-solar" | "eletrica-automacao";

type ServiceData = {
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  hero: string;
  heroAlt: string;
  focusTitle: string;
  focusText: string;
  layers: { title: string; timing: string; does: string; not: string }[];
  compareTitle: string;
  compareText: string;
  compare: { label: string; first: string; second: string }[];
  compareNames: [string, string];
  factors: { title: string; text: string }[];
  audiences: { title: string; text: string }[];
  faqs: [string, string][];
  whatsapp: string;
};

const phone = "(62) 99493-2746";
const phoneHref = "tel:+5562994932746";
const mapsHref = "https://www.google.com/maps/search/?api=1&query=Matos%20Tec%20Sistemas%20de%20Seguran%C3%A7a%20e%20Energia%20Solar%20Goian%C3%A9sia";

const services: Record<ServiceKey, ServiceData> = {
  seguranca: {
    label: "Segurança eletrônica",
    eyebrow: "Câmeras · alarme · cerca",
    title: "Sua casa no seu celular, de dia e de noite.",
    intro: "Câmeras, alarme e cerca instalados por quem também cuida da parte elétrica. Em Goianésia e região.",
    hero: "/assets/studio/security.webp",
    heroAlt: "Câmera de segurança instalada em uma parede externa",
    focusTitle: "Câmera não impede ninguém de entrar. Por isso ela raramente vem sozinha.",
    focusText: "A proteção mais eficiente combina camadas. O técnico olha o muro, o portão, os acessos e o movimento do imóvel antes de indicar os equipamentos.",
    layers: [
      { title: "Cerca elétrica", timing: "Antes", does: "Dificulta a entrada e ajuda a afastar quem tenta pular o muro.", not: "Não registra o que aconteceu." },
      { title: "Alarme", timing: "Durante", does: "Dispara a sirene e avisa no celular quando há uma invasão.", not: "Não mostra quem entrou." },
      { title: "Câmera", timing: "Depois e ao vivo", does: "Mostra o que acontece e grava para você consultar quando precisar.", not: "Não barra a entrada sozinha." },
    ],
    compareTitle: "Wi-Fi ou cabeada? A diferença aparece no dia em que você precisa da gravação.",
    compareText: "A escolha depende da distância, dos pontos e do nível de continuidade que o imóvel precisa.",
    compareNames: ["Câmera Wi-Fi", "Câmera cabeada com gravador"],
    compare: [
      { label: "Onde grava", first: "Cartão na câmera ou nuvem", second: "DVR ou NVR com HD" },
      { label: "Se levarem a câmera", first: "A gravação pode ir junto", second: "O HD continua guardado no gravador" },
      { label: "Sinal", first: "Depende do roteador e das paredes", second: "Vai pelo cabo, sem depender do Wi-Fi" },
      { label: "Melhor para", first: "1 a 3 pontos internos", second: "Área externa, comércio e fazenda" },
    ],
    factors: [
      { title: "Câmeras", text: "Quantidade, resolução, visão noturna, ângulo e tamanho do HD, que define quantos dias ficam gravados." },
      { title: "Alarme", text: "Ambientes, sensores com ou sem fio, presença de animais e aviso no aplicativo ou em central." },
      { title: "Cerca elétrica", text: "Metros de muro, portões, cantos, altura e possibilidade de usar concertina." },
      { title: "Instalação", text: "Metros de cabo, eletroduto, altura dos pontos, acesso ao telhado e distância até o portão." },
    ],
    audiences: [
      { title: "Casa", text: "Portão, garagem, fundo e quintal. Aplicativo configurado para quem mora no imóvel." },
      { title: "Comércio", text: "Caixa, porta, estoque e estacionamento, com mais dias de gravação e acesso remoto." },
      { title: "Condomínio", text: "Portaria, pedestres, veículos, garagem e regras de acesso às imagens." },
      { title: "Fazenda", text: "Pontos distantes, gravação local, nobreak e proteção para quando a internet rural falha." },
    ],
    faqs: [
      ["Vejo as câmeras pelo celular?", "Sim. O aplicativo é configurado com você e com quem mais for usar o sistema na entrega."],
      ["Quantos dias ficam gravados?", "Depende do HD, do número de câmeras, da resolução e de gravar continuamente ou por movimento. A proposta informa essa estimativa."],
      ["E se faltar internet ou energia?", "O gravador continua gravando sem internet. Com nobreak, câmeras e gravador seguem ligados por um período que depende da capacidade do equipamento."],
      ["A instalação considera a LGPD?", "Para comércios e condomínios, a equipe orienta posicionamento, usuários, senhas e boas práticas de acesso às imagens."],
    ],
    whatsapp: "segurança eletrônica",
  },
  "energia-solar": {
    label: "Energia solar",
    eyebrow: "Projeto · instalação · homologação",
    title: "Gere sua própria energia com um projeto que cabe no seu telhado.",
    intro: "Dimensionamento, instalação e homologação com a Equatorial Goiás para casas, comércios, condomínios e fazendas.",
    hero: "/assets/google/matostec-rooftop.webp",
    heroAlt: "Painéis solares instalados em um telhado",
    focusTitle: "Não é a quantidade de placas que define um bom sistema.",
    focusText: "O projeto considera seu consumo, o telhado, a orientação do imóvel, o inversor, as proteções e a conexão com a rede antes de indicar a solução.",
    layers: [
      { title: "Dimensionamento", timing: "Antes", does: "Cruza consumo, telhado e geração estimada para evitar um sistema subdimensionado.", not: "Não usa apenas a média de uma conta sem analisar o imóvel." },
      { title: "Instalação", timing: "Durante", does: "Organiza estrutura, cabos, inversor, proteção e acabamento para o sistema trabalhar com segurança.", not: "Não termina na colocação das placas." },
      { title: "Homologação", timing: "Depois", does: "Acompanha o processo com a Equatorial Goiás e orienta a configuração do aplicativo.", not: "Não promete prazo que depende da concessionária." },
    ],
    compareTitle: "On-grid, híbrido ou off-grid? O sistema certo depende da sua rotina.",
    compareText: "A equipe explica o que muda em investimento, autonomia, baterias e relação com a rede elétrica.",
    compareNames: ["On-grid", "Híbrido ou off-grid"],
    compare: [
      { label: "Rede elétrica", first: "Usa a rede e compensa excedentes", second: "Pode manter cargas com bateria" },
      { label: "Bateria", first: "Geralmente não usa", second: "Faz parte do projeto" },
      { label: "Melhor para", first: "Reduzir a conta com consumo previsível", second: "Locais com quedas ou pouca rede" },
      { label: "Projeto", first: "Prioriza geração e homologação", second: "Inclui autonomia e gestão de cargas" },
    ],
    factors: [
      { title: "Consumo", text: "A conta recente mostra o padrão de uso e ajuda a estimar a geração necessária em kWh por mês." },
      { title: "Telhado", text: "Área útil, orientação, sombra, estrutura, inclinação e acesso entram no dimensionamento." },
      { title: "Inversor e proteção", text: "A solução precisa de equipamentos compatíveis, aterramento, proteção contra surtos e quadro preparado." },
      { title: "Homologação", text: "A equipe organiza projeto, documentação e acompanhamento junto à Equatorial Goiás." },
    ],
    audiences: [
      { title: "Casa", text: "Reduza o impacto da conta e acompanhe a geração pelo aplicativo no dia a dia." },
      { title: "Comércio", text: "Dimensione o sistema para o horário de funcionamento, equipamentos e expansão do negócio." },
      { title: "Condomínio", text: "Avalie áreas comuns, medição, rateio e o espaço disponível para a instalação." },
      { title: "Fazenda", text: "Considere distâncias, bombas, galpões, rede disponível e a necessidade de autonomia." },
    ],
    faqs: [
      ["A energia solar zera a conta?", "Não é possível prometer conta zerada. Podem permanecer cobranças mínimas, iluminação pública e outros componentes das regras aplicáveis."],
      ["Por que enviar uma conta de luz?", "Ela mostra o consumo recente e permite uma primeira estimativa. A confirmação acontece depois da avaliação do telhado e do imóvel."],
      ["Os créditos têm validade?", "Os créditos seguem as regras aplicáveis do sistema conectado à rede. A proposta explica como isso funciona para o seu caso."],
      ["A equipe cuida da homologação?", "Sim. O processo com a Equatorial Goiás faz parte do atendimento de projeto e instalação."],
    ],
    whatsapp: "energia solar",
  },
  "eletrica-automacao": {
    label: "Elétrica e automação",
    eyebrow: "Quadro · proteção · praticidade",
    title: "Uma base elétrica segura para tudo funcionar melhor.",
    intro: "Revisão do quadro, aterramento, proteção contra surtos e automação para controlar luzes, portões e tomadas.",
    hero: "/assets/studio/electrician.webp",
    heroAlt: "Eletricista organizando os cabos de um quadro de distribuição",
    focusTitle: "Automação começa pela elétrica, não pelo aplicativo.",
    focusText: "Antes de conectar luz, portão ou tomada ao celular, a equipe verifica quadro, circuitos, aterramento, DR e DPS para que o sistema responda com segurança.",
    layers: [
      { title: "Quadro", timing: "Base", does: "Organiza circuitos, disjuntores e capacidade para os equipamentos atuais e futuros.", not: "Não esconde sobrecarga ou emenda improvisada." },
      { title: "Proteção", timing: "Segurança", does: "Aterramento, DR e DPS ajudam a reduzir riscos de choque e danos por surtos.", not: "Não substitui revisão quando há aquecimento ou desarme frequente." },
      { title: "Automação", timing: "Conforto", does: "Integra luz, portão, tomadas e cenas pelo celular ou por comando de voz.", not: "Não transforma uma instalação inadequada em uma instalação segura." },
    ],
    compareTitle: "Wi-Fi, Zigbee ou cabeada? A escolha depende do imóvel.",
    compareText: "A equipe considera distância, paredes, quantidade de dispositivos, internet e o que precisa continuar funcionando manualmente.",
    compareNames: ["Wi-Fi", "Zigbee ou cabeada"],
    compare: [
      { label: "Instalação", first: "Rápida, aproveita a rede existente", second: "Pode exigir hub ou passagem de cabo" },
      { label: "Alcance", first: "Depende do roteador e das paredes", second: "Pode criar rede própria ou usar cabo" },
      { label: "Melhor para", first: "Poucos pontos e ampliação gradual", second: "Mais dispositivos e automação planejada" },
      { label: "Continuidade", first: "Depende da rede e da internet", second: "Pode manter controles locais e cabeados" },
    ],
    factors: [
      { title: "Quadro", text: "Capacidade, organização, circuitos, disjuntores e espaço para novos equipamentos." },
      { title: "Aterramento", text: "A base precisa estar em ordem antes de receber automação ou equipamentos sensíveis." },
      { title: "Proteções", text: "DR e DPS ajudam a proteger pessoas, circuitos e equipamentos contra falhas e surtos." },
      { title: "Rotina", text: "A automação é definida pelo que você quer acender, abrir, desligar ou acompanhar." },
    ],
    audiences: [
      { title: "Casa", text: "Cenas para luzes, portão, tomadas e iluminação externa sem perder o comando manual." },
      { title: "Comércio", text: "Mais controle sobre iluminação, acesso, equipamentos e horários de funcionamento." },
      { title: "Condomínio", text: "Automação e elétrica planejadas para áreas comuns, portões e equipamentos compartilhados." },
      { title: "Fazenda", text: "Quadros, bombas, portões e pontos distantes com atenção a surtos e estabilidade." },
    ],
    faqs: [
      ["Posso automatizar uma casa antiga?", "Em muitos casos sim. Primeiro a equipe verifica quadro, circuitos, aterramento e os pontos que você quer automatizar."],
      ["A automação funciona sem internet?", "Alguns comandos locais continuam funcionando. A resposta depende do equipamento e da arquitetura escolhida."],
      ["O que são DR e DPS?", "DR ajuda na proteção contra choques e DPS ajuda a reduzir danos causados por surtos elétricos. A aplicação depende da instalação."],
      ["Dá para fazer por etapas?", "Sim. A equipe organiza a prioridade e deixa a base preparada para futuras ampliações quando for possível."],
    ],
    whatsapp: "elétrica e automação",
  },
};

function whatsappFor(service: string, suffix = "") {
  const text = `Olá, Matos Tec! Vim pela página de ${service} e quero conversar sobre meu imóvel.${suffix}`;
  return `https://wa.me/5562994932746?text=${encodeURIComponent(text)}`;
}

function DetailHeader({ service }: { service: ServiceData }) {
  return (
    <header className="detail-nav">
      <div className="detail-nav-inner">
        <a href={link("/")} aria-label="Voltar para o início"><Brand tone="light" /></a>
        <nav>
          <a href={link("/seguranca")}>Segurança</a>
          <a href={link("/energia-solar")}>Energia solar</a>
          <a href={link("/eletrica-automacao")}>Elétrica e automação</a>
        </nav>
        <a className="btn btn-primary btn-sm" href={whatsappFor(service.whatsapp)} target="_blank" rel="noreferrer">
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>
    </header>
  );
}

function DetailFooter({ service }: { service: ServiceData }) {
  return (
    <footer className="detail-footer">
      <div className="wrap detail-footer-grid">
        <div>
          <Brand tone="light" size="lg" asLink={false} />
          <p>Segurança eletrônica, energia solar, elétrica e automação em Goianésia e região.</p>
        </div>
        <div className="detail-footer-links">
          <a href={link("/")}><ArrowLeft size={15} /> Voltar para o início</a>
          <a href={whatsappFor(service.whatsapp)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Chamar no WhatsApp</a>
          <a href={phoneHref}><Phone size={15} /> Ligar {phone}</a>
          <a href={mapsHref} target="_blank" rel="noreferrer"><MapPin size={15} /> Goianésia e região</a>
        </div>
      </div>
    </footer>
  );
}

function ServiceDetail({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = services[serviceKey];
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="detail-page">
      <DetailHeader service={service} />
      <main>
        <section className="detail-hero">
          <div className="wrap detail-hero-grid">
            <div className="detail-hero-copy">
              <a className="detail-back" href={link("/")}><ArrowLeft size={15} /> Voltar para soluções</a>
              <span className="kicker kicker--gold">{service.eyebrow}</span>
              <h1>{service.title}</h1>
              <p>{service.intro}</p>
              <div className="detail-hero-actions">
                <a className="btn btn-gold" href={whatsappFor(service.whatsapp, " Quero montar meu orçamento.")} target="_blank" rel="noreferrer">
                  Montar meu orçamento <ArrowUpRight size={15} />
                </a>
                <a className="btn btn-outline" href={whatsappFor(service.whatsapp)} target="_blank" rel="noreferrer">
                  Chamar no WhatsApp <MessageCircle size={15} />
                </a>
              </div>
              <a className="detail-rating" href="https://www.google.com/maps/search/?api=1&query=Matos%20Tec%20Sistemas%20de%20Seguran%C3%A7a%20e%20Energia%20Solar%20Goian%C3%A9sia" target="_blank" rel="noreferrer">
                <Star size={14} fill="currentColor" /> 5,0 no Google · 6 avaliações
              </a>
            </div>
            <div className="detail-hero-media">
              <img src={asset(service.hero)} alt={service.heroAlt} />
              <span>{service.label} · Goianésia e região</span>
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-light">
          <div className="wrap">
            <div className="detail-section-head">
              <span className="kicker">01 — Como funciona</span>
              <h2>{service.focusTitle}</h2>
              <p>{service.focusText}</p>
            </div>
            <div className="detail-layer-grid">
              {service.layers.map((layer) => (
                <article className="detail-layer" key={layer.title}>
                  <span>{layer.timing}</span>
                  <h3>{layer.title}</h3>
                  <b>O que faz</b>
                  <p>{layer.does}</p>
                  <b>O que não faz</b>
                  <p className="detail-muted">{layer.not}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-paper">
          <div className="wrap">
            <div className="detail-section-head">
              <span className="kicker">02 — Escolha certa</span>
              <h2>{service.compareTitle}</h2>
              <p>{service.compareText}</p>
            </div>
            <div className="detail-compare">
              <div className="detail-compare-head"><span></span><b>{service.compareNames[0]}</b><b>{service.compareNames[1]}</b></div>
              {service.compare.map((row) => (
                <div className="detail-compare-row" key={row.label}><strong>{row.label}</strong><span>{row.first}</span><span>{row.second}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-dark">
          <div className="wrap">
            <div className="detail-section-head">
              <span className="kicker kicker--gold">03 — Planejamento</span>
              <h2>O orçamento depende do imóvel e da sua rotina.</h2>
              <p>Na visita, a equipe confirma os pontos, equipamentos e etapas. A proposta informa marcas, modelos, prazos e garantias antes da aprovação.</p>
            </div>
            <div className="detail-factor-grid">
              {service.factors.map((factor) => (
                <article key={factor.title}><span>+</span><h3>{factor.title}</h3><p>{factor.text}</p></article>
              ))}
            </div>
            <a className="btn btn-gold" href={whatsappFor(service.whatsapp, " Quero entender o que entra no meu orçamento.")} target="_blank" rel="noreferrer">Falar sobre meu imóvel <ArrowUpRight size={15} /></a>
          </div>
        </section>

        <section className="detail-section detail-section-light">
          <div className="wrap">
            <div className="detail-section-head">
              <span className="kicker">04 — Para cada imóvel</span>
              <h2>A solução muda conforme o lugar. <em>A avaliação olha o conjunto.</em></h2>
            </div>
            <div className="detail-audience-grid">
              {service.audiences.map((audience) => <article key={audience.title}><h3>{audience.title}</h3><p>{audience.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-paper">
          <div className="wrap detail-process-grid">
            <div className="detail-section-head">
              <span className="kicker">05 — Do primeiro áudio à entrega</span>
              <h2>Você sabe o que acontece em cada etapa.</h2>
              <p>A equipe orienta o próximo passo e acompanha a instalação até o sistema funcionar no seu dia a dia.</p>
              <a className="btn btn-dark" href={whatsappFor(service.whatsapp)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Começar pelo WhatsApp</a>
            </div>
            <div className="detail-timeline">
              {["Você conta o que precisa e envia fotos ou a conta de luz, quando fizer sentido.", "A visita técnica avalia o imóvel e confirma os pontos relevantes.", "Você recebe uma proposta por escrito antes de aprovar.", "A instalação é feita, testada e explicada no local."].map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-light">
          <div className="wrap detail-faq-grid">
            <div className="detail-section-head"><span className="kicker">06 — Dúvidas</span><h2>Resposta direta antes do sim.</h2><p>Se a sua dúvida não estiver aqui, o WhatsApp está a um toque.</p></div>
            <div className="detail-faq-list">
              {service.faqs.map(([question, answer], index) => <div className={`detail-faq ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}
            </div>
          </div>
        </section>

        <section className="detail-final-cta">
          <div className="wrap"><span className="kicker kicker--gold">{service.label}</span><h2>Quer uma solução pensada para o seu imóvel?</h2><p>Conte onde fica o imóvel e o que você precisa resolver. A equipe orienta o próximo passo.</p><a className="btn btn-gold" href={whatsappFor(service.whatsapp)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Chamar no WhatsApp <ArrowUpRight size={15} /></a></div>
        </section>
      </main>
      <DetailFooter service={service} />
    </div>
  );
}

export default ServiceDetail;
