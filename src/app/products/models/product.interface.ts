export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    description: string;
    tags?: string[];
    price: number;
    starRating: number;
    imageUrl: string;
    category: string;
}
