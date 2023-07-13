import connection from "./connection";
import users from "./tablesPopulation/users.json"
import recipes from "./tablesPopulation/recipes.json"
import likes from "./tablesPopulation/likes.json"
import follows from "./tablesPopulation/follows.json"


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

   CREATE TABLE IF NOT EXISTS cookApp_recipes(
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      photo VARCHAR(255),
      description VARCHAR(255) NOT NULL,
      cook_time VARCHAR(63),
      servings VARCHAR(63),
      ingredients VARCHAR(255) NOT NULL,
      instructions VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      author_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (author_id) REFERENCES cookApp_users (id)
   );

   CREATE TABLE IF NOT EXISTS cookApp_follows(
      user_id VARCHAR(255) NOT NULL,
      following_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES cookApp_users (id),
      FOREIGN KEY (following_id) REFERENCES cookApp_users (id),
      PRIMARY KEY (user_id, following_id)
   );

   CREATE TABLE IF NOT EXISTS cookApp_likes(
      user_id VARCHAR(255) NOT NULL,
      recipe_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES cookApp_users (id),
      FOREIGN KEY (recipe_id) REFERENCES cookApp_recipes (id),
      PRIMARY KEY (user_id, recipe_id)
   );  
   
   `)


   .then(() => { console.log("As tabelas foram criadas!") })
   .catch(printError);

const insertUsers = () => connection("cookApp_users")
   .insert(users)
   .then(() => { console.log("Tabela users foi criada e populada com sucesso!!") })
   .catch(printError);

const insertRecipes = () => connection("cookApp_recipes")  
   .insert(recipes)
   .then(() => { console.log("Tabela recipes foi criada e populada com sucesso!!") })
   .catch(printError);

   const insertLikes = () => connection("cookApp_likes")  
   .insert(likes)
   .then(() => { console.log("Tabela likes foi criada e populada com sucesso!!") })
   .catch(printError);

   const insertFollows = () => connection("cookApp_follows")  
   .insert(follows)
   .then(() => { console.log("Tabela follows foi criada e populada com sucesso!!") })
   .catch(printError);



const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers) 
   .then(insertRecipes)
   .then(insertFollows)
   .then(insertLikes)
   .finally(closeConnection);
