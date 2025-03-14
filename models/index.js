import sequelize from "../config/db.js";
import User from "./User.js";
import Product from "./Product.js";
import News from "./News.js";
import Contact from "./Contact.js";



export default sequelize;
export { User, Product, News, Contact };