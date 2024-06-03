"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, qty, rate } = req.body;
    const total = qty * rate;
    try {
        const product = new Product_1.default({ name, qty, rate, total });
        yield product.save();
        res.json(product);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.addProduct = addProduct;
