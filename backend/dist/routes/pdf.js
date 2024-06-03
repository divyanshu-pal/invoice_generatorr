"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdfController_1 = require("../controllers/pdfController");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = express_1.default.Router();
router.post('/generate', authenticateToken_1.default, pdfController_1.generatePDF);
module.exports = router;
