import express from "express";
import { addProduct, listProducts, removeProducts, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();


// now we have to provide token in headers 
productRouter.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), addProduct)      // we have to use this middleware for upload images and .feilds for passing multiple form data
productRouter.post('/remove', adminAuth, removeProducts)
productRouter.post('/single', singleProduct)

productRouter.get('/list', listProducts)

export default productRouter;