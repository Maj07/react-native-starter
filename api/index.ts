import { Product } from '../models/Product';
import { data } from './data.json';

export const getProducts = (): Promise<Product[]> => Promise.resolve(data);
