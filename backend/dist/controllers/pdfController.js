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
exports.generatePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const generatePDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const browser = yield puppeteer_1.default.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 60000,
        });
        const page = yield browser.newPage();
        const content = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          p {
            margin: 0;
            padding: 5px 0;
            font-size: 14px;
            color: #555;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f4f4f4;
            color: #333;
          }
          .total-section {
            margin-top: 20px;
            text-align: right;
          }
          .total-section div {
            margin: 5px 0;
          }
          .grand-total {
            font-weight: bold;
            font-size: 16px;
          }
          .validity {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
          }
          .terms {
            margin-top: 30px;
            padding: 10px;
            background-color: #333;
            color: white;
            border-radius: 5px;
            text-align: center;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${products.map((prod) => `
              <tr>
                <td>${prod.name}</td>
                <td>${prod.qty}</td>
                <td>${prod.rate}</td>
                <td>${prod.total}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total-section">
          <div>Total: INR ${products.reduce((sum, prod) => sum + prod.total, 0)}</div>
          <div>GST (18%): INR ${(products.reduce((sum, prod) => sum + prod.total, 0) * 0.18).toFixed(2)}</div>
          <div class="grand-total">Grand Total: INR ${(products.reduce((sum, prod) => sum + prod.total, 0) * 1.18).toFixed(2)}</div>
        </div>
        <div class="validity">Valid until: ${new Date().toLocaleDateString('en-GB')}</div>
        <div class="terms">
          Terms and Conditions: we are happy to supply any further information you may need and trust that you call on us to fill your order, which will receive our prompt and careful attention.
        </div>
      </body>
    </html>
  `;
        yield page.goto('about:blank', { waitUntil: 'networkidle0' });
        yield page.setContent(content, { waitUntil: 'networkidle0' });
        const pdf = yield page.pdf({ format: 'A4' });
        yield browser.close();
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.contentType('application/pdf');
        res.send(pdf);
    }
    catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Server error');
    }
});
exports.generatePDF = generatePDF;
