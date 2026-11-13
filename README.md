# Matos Tec — Site premium

**Site publicado:** https://juliaassis238.github.io/matostec-site-premium/

O deploy é automático: cada push na `main` roda o workflow `.github/workflows/deploy-pages.yml`, gera o build estático em `dist/public` e publica no GitHub Pages (base `/matostec-site-premium/`).

Homepage institucional premium para a Matos Tec, com identidade baseada no logotipo usado no perfil do Google Maps, fotos reais do perfil e paleta azul-marinho, vermelho, amarelo e branco.

## Conteúdo incluído

- Segurança eletrônica: câmeras, alarme, cerca, DVR/NVR, Wi-Fi/cabeada, casas, comércio, condomínio e fazenda.
- Energia solar: painel, inversor, créditos, on-grid, híbrido e off-grid, Equatorial Goiás, ART, homologação e cuidados.
- Elétrica e automação: quadro, DR, DPS, aterramento, fiação, portão, luz, tomadas, persianas, Alexa/Google, Wi-Fi, Zigbee e cabeada.
- Processo de WhatsApp à entrega e manutenção pós-instalação.
- Regiões atendidas, nota pública, avaliações e localização oficial no Google Maps.
- CTAs funcionais para WhatsApp, telefone, avaliações e localização.

## Rodar localmente

```bash
pnpm install
pnpm dev:static
```

O site abre em `http://localhost:3000`.

## Rotas
- `/` — site premium (direção Nightline).
- `/modelo-1`, `/modelo-2`, `/modelo-3` — as três propostas.
- `/propostas` — galeria para comparar as propostas.

## Links oficiais

- Perfil e fotos no Google Maps: https://www.google.com/maps/place/Matos+Tec+Sistemas+de+Seguran%C3%A7a+e+Energia+Solar+em+Goian%C3%A9sia/
- Avaliações: https://www.google.com/maps/search/?api=1&query=Matos%20Tec%20Sistemas%20de%20Seguran%C3%A7a%20e%20Energia%20Solar%20Goian%C3%A9sia
- WhatsApp: https://wa.me/5562994932746
- Telefone: +55 62 99493-2746
