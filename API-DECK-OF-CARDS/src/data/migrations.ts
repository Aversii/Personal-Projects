import { connection } from "./connection"
import cards from "./cards.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

      CREATE TABLE IF NOT EXISTS Deck (
         id INT PRIMARY KEY,
         nipe VARCHAR(255)NOT NULL,
         name VARCHAR(3)NOT NULL UNIQUE,
         value INT NOT NULL,
         cardImageUrl VARCHAR(255)         
      );

`)
   .then(() => { console.log("Tables OK =D") })
   .catch(printError)

const insertCards = () => connection("Deck")
   .insert(cards)
   .then(() => { console.log("Deck populated") })
   .catch(printError)


const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertCards)
   .finally(closeConnection)