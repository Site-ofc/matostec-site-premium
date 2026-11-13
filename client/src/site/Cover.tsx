import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, MessageCircle, Star } from "lucide-react";
import Brand from "./Brand";
import { asset } from "./paths";

type CoverProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  primaryLabel: string;
  whatsappHref: string;
  reviewsHref: string;
  phoneLabel: string;
};

export default function Cover({ eyebrow, title, text, primaryLabel, whatsappHref, reviewsHref, phoneLabel }: CoverProps) {
  return (
    <section className="cover" id="topo">
      <div className="cover-bg" aria-hidden="true">
        <div className="cover-grid" />
        <div className="cover-glow cover-glow-red" />
        <div className="cover-glow cover-glow-steel" />
        <div className="cover-halo" />
      </div>

      <div className="cover-inner">
        <div className="cover-brand">
          <Brand tone="light" size="lg" asLink={false} />
          <span className="cover-brand-line">Goiânia · Goiás · Vale do São Patrício</span>
        </div>

        <div className="cover-body">
          <div className="cover-copy">
            <span className="cover-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{text}</p>
            <div className="cover-actions">
              <a className="btn btn-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={17} />
                <span>{primaryLabel}</span>
                <ArrowUpRight size={15} />
              </a>
              <a className="btn btn-outline" href="#solucoes">
                Explorar soluções <ArrowDownRight size={16} />
              </a>
            </div>
            <div className="cover-meta">
              <span>
                <span className="status-dot" /> Atendimento pelo WhatsApp
              </span>
              <a href={reviewsHref} target="_blank" rel="noreferrer">
                <Star size={13} fill="currentColor" /> 5,0 no Google · 6 avaliações
              </a>
              <a href={`tel:+${phoneLabel.replace(/\D/g, "")}`}>{phoneLabel}</a>
            </div>
          </div>

          <div className="cover-stage">
            <div className="cover-arc" aria-hidden="true" />
            <div className="cover-arc cover-arc--inner" aria-hidden="true" />
            <picture>
              <source media="(max-width: 760px)" srcSet={asset("/assets/mascot/electrician-cover-mobile.webp")} type="image/webp" />
              <img
                className="cover-mascot"
                src={asset("/assets/mascot/electrician-cover-wide.webp")}
                alt="Mascote eletricista da Matos Tec instalando uma placa solar completa em estrutura metálica"
                width={1800}
                height={1072}
                fetchPriority="high"
              />
            </picture>
            <span className="cover-caption">Projeto · Instalação · Manutenção</span>
          </div>
        </div>
      </div>
    </section>
  );
}
