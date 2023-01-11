import connection from "./connection";
import users from "./tables/users.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) };

const createTables = () => connection
   .raw(`
   CREATE TABLE IF NOT EXISTS cookApp_users(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM ("NORMAL","ADMIN") NOT NULL DEFAULT ("NORMAL")
   );
   
   
   `)
   .then(() => { console.log("A tabela foi criada!") })
   .catch(printError);

const insertUsers = () => connection("cookApp_users")
   .insert(users)
   .then(() => { console.log("Tabela users foi populada com sucesso!!") })
   .catch(printError);




const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers) 
   .finally(closeConnection);
