import express from "express";
const authrouter = express.Router();
import { register, login } from "../controllers/auth-contoller.js";
import {
  getallblog,
  addnewblog,
  getsingleblog,
} from "../controllers/blog-controller.js";
import {
  getallcateg,
  addnewcateg,
} from "../controllers/category-controller.js";
import multer from "multer";
import checkauth from "../middlewares/authmiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

authrouter.route("/register").post(register);
authrouter.route("/login").post(login);

//protected routes

authrouter.route("/getallblogs").get(checkauth, getallblog);
authrouter
  .route("/addnewblog")
  .post(upload.single("thumbnail"), checkauth, addnewblog);
authrouter.route("/getblog/:id").get(checkauth, getsingleblog);

//categroy routes

authrouter.route("/getallcategories").get(checkauth, getallcateg);
authrouter.route("/addnewcategory").post(checkauth, addnewcateg);

export { authrouter };
