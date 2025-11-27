export interface imovel {
    id: number;
    titulo: string;
    tipo: number;
    preco: number;
    endereco?: string;
    cidade: string;
    estado: string;
    quartos: number;
    banheiros: number;
    area: number;
    cep: string;
    imagem: string;
    data_publicacao?: string;
}