export type ServiceKey = 'alongamento' | 'gel' | 'pes' | 'manutencao';

export interface PrecosConfig {
  confirmado: boolean;
  mostrarPrecos: boolean;
  valores: Record<ServiceKey, number | null>;
}

export const precosConfig: PrecosConfig = {
  confirmado: false,
  mostrarPrecos: false,
  valores: {
    alongamento: null,
    manutencao: null,
    gel: null,
    pes: null,
  },
};
