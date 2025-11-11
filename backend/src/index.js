import app from "./app.js";
import { sequelize } from "./database/database.js";


async function main() {
    // Use alter:true in development to apply model changes to the DB schema (adds new columns without dropping data)
    await sequelize.sync({ alter: true });
    console.log("Conexion con la base de datos exitosa!");
    app.listen(4000);
}

main();