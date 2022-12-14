"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
const qaRouter = require('./routes');
app.use('/qa', qaRouter);
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
// connectionDemo();
