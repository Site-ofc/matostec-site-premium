import { asset, link } from "./paths";

type BrandProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
};

export default function Brand({ tone = "light", size = "md", asLink = true }: BrandProps) {
  const content = (
    <>
      <img src={asset("/assets/matos-tec-mark-hq.png")} width={1632} height={964} alt="" aria-hidden="true" />
      <span className="brand-type">
        <b>Matos Tec</b>
        <i>Segurança eletrônica</i>
      </span>
    </>
  );
  const className = `brand brand--${tone} brand--${size}`;
  return asLink ? (
    <a className={className} href={link("/")} aria-label="Matos Tec, início">
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}
