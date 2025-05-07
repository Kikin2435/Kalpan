import app from "./app.js";
import { sequelize } from "./database/database.js";


async function main() {
    try {
        await sequelize.sync({ force: false });
        console.log("Conexion con la base de datos exitosa!");
        app.listen(4000);
    } catch (error) {
        console.log("Error con la conexion de base de datos!");
    }
}

main();