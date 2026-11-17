export interface EnderecoConfig {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  confirmado: boolean;
  mostrarEndereco: boolean;
}

export const enderecoConfig: EnderecoConfig = {
  rua: 'Av. Ângelo Riveli',
  numero: '542',
  bairro: 'Jardim da Fonte',
  cidade: 'Jundiaí',
  estado: 'SP',
  confirmado: true,
  mostrarEndereco: true,
};
