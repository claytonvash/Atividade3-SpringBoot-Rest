import { IProduct } from '../interfaces/product';
import { Category } from './category';

export class Product implements IProduct{
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    price: number;
    categories: Array<Category>;

    constructor() {
        this.categories = new Array<Category>();
    }
}
