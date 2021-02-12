import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/usuario", routes);
app.get("/", (request, response) => {
  response.json({ messagem: "Bem Vindo a API MyAppTypescript!" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`API Rodando na porta ${PORT}`);
});
