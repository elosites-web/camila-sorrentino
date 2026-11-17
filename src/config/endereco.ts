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
  rua: 'Rua Exemplo',
  numero: '123',
  bairro: 'Centro',
  cidade: 'Jundiaí',
  estado: 'SP',
  confirmado: false,
  mostrarEndereco: true,
};
