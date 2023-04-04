const ProductsModel = require("../models/products.model");

const express = require("express");

const productsRouter = express.Router();


productsRouter.get("/" , async(req,res) => {
    try {
        let data = await ProductsModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({error : error});
    }
});

productsRouter.post("/add" , async(req,res) => {
    let data = req.body;
    console.log("this is data" , data);
    try {
        let newData = new ProductsModel(req.body);
        await newData.save();
        res.status(200).send({msg : "successfully added"});
    } catch (error) {
        res.status(400).send({msg : "failed to add"});
    }
});

module.exports = productsRouter;


// {
//     "title" : "shoes",
//     "price" : 9000,
//     "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgH0pI936joKhwRQSNg0vuVp39q_402X7HYLnB9ODwA&usqp=CAU&ec=48665701",
//       "stock": 9
//   }