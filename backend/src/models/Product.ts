import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  qty: number;
  rate: number;
  total: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
