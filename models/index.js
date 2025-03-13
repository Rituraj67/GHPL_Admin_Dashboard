import sequelize from "../config/db.js";
import User from "./User.js";
import Product from "./Product.js";

export default sequelize;
export { User, Product };