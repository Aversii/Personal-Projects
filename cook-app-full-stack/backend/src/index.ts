import app from "./app";
import { recipeRouter } from "./routes/recipeRouter";

import { userRouter } from "./routes/userRoutes";

app.use("/users", userRouter)
app.use("/recipes", recipeRouter)
