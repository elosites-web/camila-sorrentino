import type { EnderecoConfig } from '../config/endereco';
import type { PrecosConfig, ServiceKey } from '../config/precos';
import { WHATSAPP_PREFILLED_MESSAGE, siteConfig, type ServiceItem } from '../config/site';

export interface PriceListRow {
  id: ServiceKey;
  numero: string;
  titulo: string;
  descricao: string;
  precoTexto: string | null;
  disponivel: boolean;
}

export function buildWhatsAppUrl(message: string = WHATSAPP_PREFILLED_MESSAGE): string {
  const encodedMessage = encodeURIComponent(message);
  return `${siteConfig.whatsappBaseUrl}?text=${encodedMessage}`;
}

export function formatServicePrice(
  serviceKey: ServiceKey,
  config: PrecosConfig,
): string | null {
  if (!config.mostrarPrecos) {
    return null;
  }

  const rawValue = config.valores[serviceKey];
  if (typeof rawValue !== 'number' || !Number.isFinite(rawValue) || rawValue <= 0) {
    return null;
  }

  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: Number.isInteger(rawValue) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rawValue);

  return `a partir de R$ ${formatted}`;
}

export function buildPriceListRows(
  servicos: readonly ServiceItem[],
  config: PrecosConfig,
): PriceListRow[] {
  return servicos.map((servico) => {
    const precoTexto = formatServicePrice(servico.id, config);
    return {
      id: servico.id,
      numero: servico.numero,
      titulo: servico.titulo,
      descricao: servico.descricao,
      precoTexto,
      disponivel: precoTexto !== null,
    };
  });
}

export function formatEnderecoLinha(config: EnderecoConfig): string | null {
  if (!config.mostrarEndereco) {
    return null;
  }

  const ruaNumero = [config.rua, config.numero].filter(Boolean).join(', ');
  const cidadeEstado = [config.cidade, config.estado].filter(Boolean).join('/');
  const partes = [ruaNumero, config.bairro, cidadeEstado].filter(Boolean);

  if (partes.length === 0) {
    return null;
  }

  return `${ruaNumero} – ${[config.bairro, cidadeEstado].filter(Boolean).join(', ')}`;
}

export function formatEnderecoCompleto(config: EnderecoConfig): string {
  const ruaNumero = [config.rua, config.numero].filter(Boolean).join(', ');
  const cidadeEstado = [config.cidade, config.estado].filter(Boolean).join(' – ');
  return [ruaNumero, [config.bairro, cidadeEstado].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(' – ');
}

export function buildMapsSearchUrl(config: EnderecoConfig): string | null {
  if (!config.confirmado || !config.mostrarEndereco) {
    return null;
  }

  const query = [config.rua, config.numero, config.bairro, config.cidade, config.estado]
    .filter(Boolean)
    .join(', ');

  if (!query) {
    return null;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildGoogleMapsDirectionsUrl(config: EnderecoConfig): string {
  const endereco = formatEnderecoCompleto(config);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(endereco)}`;
}

export function buildWazeDirectionsUrl(config: EnderecoConfig): string {
  const endereco = formatEnderecoCompleto(config);
  return `https://waze.com/ul?q=${encodeURIComponent(endereco)}&navigate=yes`;
}

export function buildGoogleMapsEmbedUrl(config: EnderecoConfig): string {
  const endereco = formatEnderecoCompleto(config);
  return `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&hl=pt-BR&z=16&output=embed`;
}
