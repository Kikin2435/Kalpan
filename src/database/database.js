import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('Kalpan', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})