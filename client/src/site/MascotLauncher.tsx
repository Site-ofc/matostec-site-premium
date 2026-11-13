import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { asset } from "./paths";

function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.13c-1.55 0-3.07-.42-4.4-1.2l-.32-.19-3.12.82.83-3.04-.2-.33a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.23-8.23 8.23z" />
    </svg>
  );
}

type LauncherProps = {
  whatsappHref: string;
  phoneLabel: string;
};

export default function MascotLauncher({ whatsappHref, phoneLabel }: LauncherProps) {
  const [visible, setVisible] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(() => {
    try {
      return window.localStorage.getItem("matostec:launcher-dismissed") !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setBubbleOpen(false), 14000);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <div className={`wa-launcher ${visible ? "is-visible" : ""}`}>
      {bubbleOpen && (
        <div className="wa-bubble" role="status">
          <button
            className="wa-bubble-close"
            onClick={() => {
              setBubbleOpen(false);
              try {
                window.localStorage.setItem("matostec:launcher-dismissed", "1");
              } catch {
                /* ignore */
              }
            }}
            aria-label="Fechar mensagem">
            <X size={14} />
          </button>
          <strong>Orçamento sem compromisso</strong>
          <span>Converse com a equipe da Matos Tec sobre o seu projeto.</span>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            Começar conversa
          </a>
        </div>
      )}
      <div className="wa-cluster">
        <a className="wa-button" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
          <WhatsAppGlyph size={19} />
          <span>WhatsApp</span>
        </a>
        <button
          className="wa-mascot"
          onClick={() => setBubbleOpen((open) => !open)}
          aria-label={`Abrir mensagem · ${phoneLabel}`}
          aria-expanded={bubbleOpen}>
          <img
            className="wa-mascot-img"
            src={asset("/assets/mascot/electrician-launcher.webp")}
            alt=""
            width={480}
            height={640}
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
}
