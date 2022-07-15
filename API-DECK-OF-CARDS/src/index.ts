import { app } from "./app";
import { getADeck } from "./endpoints/getNewDeck";

app.get("/deck", getADeck)