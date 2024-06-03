"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const pdfGenerate = require('./routes/pdf');
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', pdfGenerate);
const PORT = process.env.PORT || 5000;
app.get('/', (_, res) => {
    res.send("<h1>hello your server is ready</h1>");
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
