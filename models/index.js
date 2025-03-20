import sequelize from "../config/db.js"; // your initialized Sequelize instance
import Sequelize from "sequelize";

// Import model definitions
import Product from "./Product.js";
import User from "./User.js";
import Director from "./Director.js";
import Award from "./Award.js";
import Milestones from "./Milestone.js";
import News from "./News.js";
import Testimonial from "./Testimonial.js";
import Job from "./Job.js";
import Contact from "./Contact.js";

// Attach models to the db object
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Product = Product;
db.User = User;
db.Director = Director;
db.Award = Award;
db.Milestones = Milestones;
db.News = News;
db.Testimonial = Testimonial;
db.Job = Job;
db.Contact = Contact;

export default db;
