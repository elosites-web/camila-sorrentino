import type { ServiceKey } from './precos';

export interface ServiceItem {
  id: ServiceKey;
  numero: string;
  titulo: string;
  descricao: string;
  imagem: string | null;
  alt: string;
}

export interface GalleryItem {
  id: string;
  imagem: string;
  alt: string;
  categoria: string;
}

export interface SpacePhoto {
  id: string;
  imagem: string;
  alt: string;
}

export interface CertificatePhoto {
  id: string;
  imagem: string;
  alt: string;
}

export interface FaqItem {
  id: string;
  numero: string;
  categoria: string;
  pergunta: string;
  resposta: string;
}

export const WHATSAPP_PREFILLED_MESSAGE =
  'Olá! Conheci seu trabalho pelo site e gostaria de consultar informações sobre os serviços e agendamento.';

export const siteConfig = {
  profissional: 'Camila Sorrentino',
  marca: 'Camila Sorrentino – Nail Designer',
  subtituloMarca: 'Nail Designer',
  cidade: 'Jundiaí/SP',
  telefoneExibicao: '(11) 91176-4182',
  telefoneSchema: '+55 11 91176-4182',
  whatsappBaseUrl: 'https://wa.me/5511911764182',
  instagramHandle: '@cah_sorrentinonails_',
  instagramUrl: 'https://www.instagram.com/cah_sorrentinonails_/',
  threadsUrl: 'https://www.threads.com/@cah_sorrentinonails_',
  imagens: {
    logoPreto: '/assets/aistudio/logo-preto_669f957b.png',
    hero: '/assets/aistudio/trabalho-11_a3b5ebb1.jpg',
    heroAlt: 'Unhas stiletto em vermelho profundo com arte metálica prateada',
    camila: '/images/camila.jpg',
    camilaAlt: 'Retrato de Camila Sorrentino, nail designer',
    formacaoParede: '/assets/aistudio/formacao-parede_9bebe613.jpg',
    formacaoParedeAlt: 'Parede do estúdio com certificados emoldurados de atualização profissional',
  },
  navegacao: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Trabalhos', href: '#trabalhos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Formação', href: '#formacao' },
    { label: 'Contato', href: '#contato' },
  ],
  servicos: [
    {
      id: 'alongamento',
      numero: '01',
      titulo: 'Alongamento de unhas',
      descricao:
        'Construção com naturalidade, simetria e curvatura pensada para valorizar o formato das suas mãos.',
      imagem: '/assets/aistudio/servico-alongamento_aab537df.jpg',
      alt: 'Alongamento de unhas em formato amendoado com acabamento natural leitoso',
    },
    {
      id: 'gel',
      numero: '02',
      titulo: 'Esmaltação em gel',
      descricao:
        'Acabamento uniforme, cor intensa e brilho sofisticado para manter suas unhas impecáveis no dia a dia.',
      imagem: '/assets/aistudio/servico-gel_5e825312.jpg',
      alt: 'Esmaltação em gel vermelho intenso com detalhe perolado e pedrarias',
    },
    {
      id: 'pes',
      numero: '03',
      titulo: 'Pés',
      descricao:
        'Cuidado delicado e acabamento elegante para os pés, com atenção minuciosa aos detalhes e conforto.',
      imagem: '/images/servico-pes.jpg',
      alt: 'Unhas dos pés com esmaltação em francesinha clássica delicada e brilho natural',
    },
    {
      id: 'manutencao',
      numero: '04',
      titulo: 'Manutenção',
      descricao:
        'Acompanhamento periódico do alongamento para renovar a estrutura, o alinhamento e a beleza das unhas.',
      imagem: '/assets/aistudio/servico-manutencao_520a1e7d.jpg',
      alt: 'Manutenção de alongamento em tom nude natural com acabamento uniforme',
    },
  ] satisfies ServiceItem[],
  trabalhos: [
    {
      id: 'trabalho-01',
      imagem: '/assets/aistudio/trabalho-12_684a93ee.jpg',
      alt: 'Alongamento quadrado com ponta levemente leitosa e acabamento natural',
      categoria: 'Alongamento',
    },
    {
      id: 'trabalho-02',
      imagem: '/assets/aistudio/trabalho-02_ee986ead.jpg',
      alt: 'Unhas amendoadas com base translúcida natural e brilho uniforme',
      categoria: 'Alongamento',
    },
    {
      id: 'trabalho-03',
      imagem: '/assets/aistudio/trabalho-03_42176128.jpg',
      alt: 'Esmaltação em gel azul marinho com traços geométricos brancos',
      categoria: 'Esmaltação em gel',
    },
    {
      id: 'trabalho-04',
      imagem: '/assets/aistudio/trabalho-04_75133585.jpg',
      alt: 'Unhas amendoadas em vermelho metálico com destaque dourado',
      categoria: 'Esmaltação em gel',
    },
    {
      id: 'trabalho-05',
      imagem: '/assets/aistudio/trabalho-05_3bdeaabb.jpg',
      alt: 'Alongamento quadrado em tom leitoso com detalhe dourado próximo à cutícula',
      categoria: 'Alongamento',
    },
    {
      id: 'trabalho-06',
      imagem: '/assets/aistudio/trabalho-06_5ac404e4.jpg',
      alt: 'Alongamento quadrado com acabamento natural e ponta translúcida',
      categoria: 'Alongamento',
    },
    {
      id: 'trabalho-07',
      imagem: '/assets/aistudio/trabalho-07_f54cdbb3.jpg',
      alt: 'Unhas curtas quadradas em tom nude translúcido com brilho natural',
      categoria: 'Naturalidade',
    },
    {
      id: 'trabalho-08',
      imagem: '/assets/aistudio/trabalho-08_cb6e0cc5.jpg',
      alt: 'Alongamento quadrado translúcido com detalhes iridescentes encapsulados',
      categoria: 'Nail art',
    },
    {
      id: 'trabalho-09',
      imagem: '/assets/aistudio/trabalho-09_e902d39f.jpg',
      alt: 'Alongamento quadrado com francesinha delicada e brilho sutil',
      categoria: 'Francesinha',
    },
    {
      id: 'trabalho-10',
      imagem: '/assets/aistudio/trabalho-10_c5a7a624.jpg',
      alt: 'Alongamento quadrado natural com acabamento translúcido e brilho uniforme',
      categoria: 'Naturalidade',
    },
    {
      id: 'trabalho-11',
      imagem: '/assets/aistudio/hero_01b6af04.jpg',
      alt: 'Unhas amendoadas com esmaltação em gel em tom malva rosado e brilho uniforme',
      categoria: 'Esmaltação em gel',
    },
    {
      id: 'trabalho-12',
      imagem: '/assets/aistudio/trabalho-01_385caba4.jpg',
      alt: 'Unhas amendoadas com efeito perolado delicado e brilho suave',
      categoria: 'Alongamento',
    },
    {
      id: 'trabalho-13',
      imagem: '/images/trabalho-13.jpg',
      alt: 'Unhas dos pés com francesinha clássica delicada e acabamento natural brilhante',
      categoria: 'Pés',
    },
  ] satisfies GalleryItem[],
  espaco: [
    {
      id: 'espaco-01',
      imagem: '/assets/aistudio/espaco-01_6fff77b0.jpg',
      alt: 'Mesa de atendimento do estúdio com iluminação dedicada e esmaltes organizados',
    },
    {
      id: 'espaco-02',
      imagem: '/assets/aistudio/espaco-02_5e2c2870.jpg',
      alt: 'Bancada organizada com equipamentos de esterilização e materiais de atendimento',
    },
  ] satisfies SpacePhoto[],
  certificadosIndividuais: [] as CertificatePhoto[],
  duvidasFrequentes: [
    {
      id: 'duvida-01',
      numero: '01',
      categoria: 'Preparo das unhas',
      pergunta: 'Como funciona o preparo das unhas antes do alongamento ou da esmaltação?',
      resposta:
        'O preparo é realizado de forma minuciosa e delicada, respeitando a estrutura natural de cada unha. Envolve a higienização adequada, o cuidado com as cutículas e a preparação da lâmina para favorecer boa aderência, conforto e um acabamento uniforme.',
    },
    {
      id: 'duvida-02',
      numero: '02',
      categoria: 'Antes do atendimento',
      pergunta: 'Preciso preparar ou retirar o esmalte das unhas antes de ir ao estúdio?',
      resposta:
        'Não é necessário retirar cutículas ou aplicar produtos previamente. Caso esteja com esmaltação em gel ou alongamento anterior, basta avisar no momento do agendamento pelo WhatsApp para organizarmos o atendimento de acordo com a sua necessidade.',
    },
    {
      id: 'duvida-03',
      numero: '03',
      categoria: 'Durabilidade',
      pergunta: 'O que influencia a durabilidade do alongamento?',
      resposta:
        'A durabilidade acompanha o ritmo de crescimento natural das unhas, os cuidados na rotina diária e o retorno periódico para manutenção. Além disso, o equilíbrio da estrutura e da curvatura durante a construção contribui para manter o alinhamento, a resistência e o brilho por mais tempo.',
    },
    {
      id: 'duvida-04',
      numero: '04',
      categoria: 'Cuidados pós-atendimento',
      pergunta: 'Quais cuidados ajudam a preservar as unhas após o atendimento?',
      resposta:
        'Evite utilizar as unhas como apoio ou ferramenta para abrir embalagens, dê preferência ao uso de luvas ao lidar com produtos de limpeza e mantenha a hidratação diária das mãos e da região das cutículas. Para preservar a saúde da unha natural, nunca force nem tente remover o alongamento ou o gel em casa.',
    },
    {
      id: 'duvida-05',
      numero: '05',
      categoria: 'Manutenção',
      pergunta: 'Quando é indicado agendar a manutenção ou a remoção?',
      resposta:
        'O momento ideal acompanha o crescimento natural da unha de cada cliente. Sempre que notar o espaço próximo à cutícula ou quiser renovar o formato e a cor, entre em contato pelo WhatsApp para combinarmos o retorno com segurança.',
    },
  ] satisfies FaqItem[],
};
