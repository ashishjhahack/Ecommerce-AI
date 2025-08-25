import productModel from "../models/productModel.js";
import {v2 as cloudinary} from 'cloudinary';


// This is publicly open so we have to use authentication for admin only
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];      // if it have a property of image then select. it will not give error when image is not selected
        const image2 = req.files.image2 && req.files.image1[0];
        const image3 = req.files.image3 && req.files.image1[0];
        const image4 = req.files.image4 && req.files.image1[0];

        // now we stroe this image in cloudinary from where we get URL and then we store that URl in a databse
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)   // undefined images have been removed

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url;   // store this url in result
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),       // b/c default is string
            subCategory,
            bestseller: bestseller === 'true' ? 'true' : 'false',
            sizes: JSON.parse(sizes),   // converting string to array
            image: imagesUrl,
            date: Date.now()
        }

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(imagesUrl);

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: 'Product added'})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}


const listProducts = async(req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}


const removeProducts = async(req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);      // In postman, just post the id in body
        res.json({success: true, message: "Product Removed Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}


// for single product info
const singleProduct = async(req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

export {listProducts, removeProducts, singleProduct, addProduct};