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
    <>
      <section className="cover cover--residential" id="topo">
        <picture className="cover-photo" aria-hidden="true">
          <source
            media="(max-width: 900px)"
            srcSet={asset("/assets/cover/matostec-cover-mobile.webp")}
            type="image/webp"
          />
          <img
            src={asset("/assets/cover/matostec-cover-desktop.webp")}
            alt=""
            width={2560}
            height={1440}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="cover-scrim" aria-hidden="true" />

        <div className="cover-inner">
          <div className="cover-brand">
            <Brand tone="light" size="lg" asLink={false} />
            <span className="cover-brand-line">Goianésia · Anápolis · Vale do São Patrício</span>
          </div>

          <div className="cover-body">
            <div className="cover-copy">
              <span className="cover-eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p>{text}</p>
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
          </div>
        </div>
      </section>

      <section className="cover-actions-band" aria-label="Próximos passos">
        <div className="cover-actions-band-inner">
          <span className="cover-actions-note">Atendimento local · orçamento sem compromisso</span>
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
        </div>
      </section>
    </>
  );
}
