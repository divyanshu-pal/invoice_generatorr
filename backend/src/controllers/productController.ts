import { Request, Response } from 'express';
import Product from '../models/Product'

export const addProduct = async (req: Request, res: Response) => {
  const { name, qty, rate } = req.body;
  const total = qty * rate;
  try {
    const product = new Product({ name, qty, rate, total });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
