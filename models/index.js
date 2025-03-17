import sequelize from "../config/db.js";
import User from "./User.js";
import Product from "./Product.js";
import News from "./News.js";
import Contact from "./Contact.js";
import Testimonial from "./Testimonial.js"
import Award from "./Award.js"
import Milestone from "./Milestone.js"
import Director from "./Director.js"



export default sequelize;
export { User, Product, News, Contact, Testimonial, Award, Milestone, Director };