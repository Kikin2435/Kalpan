import app from "./app.js";
import { sequelize } from "./database/database.js";


function main() {
    sequelize.sync({ force: false });
        console.log("Conexion con la base de datos exitosa!");
        app.listen(4000);
}

main();