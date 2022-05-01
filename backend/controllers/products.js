const productsRouter = require("express").Router();
const pool = require("../db")
const authorization = require('../middleware/authorization')

productsRouter.post('/create', authorization, async(req, res) => {

    try {
    const {code, name, size, option, quantity, quantity_optimal, percent_optimal, created_by} = req.body;  

    const newProducts = await pool.query("INSERT INTO products(code, name, size, option, quantity, quantity_optimal, percent_optimal, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [code, name, size, option, quantity, quantity_optimal, percent_optimal, created_by]);

    res.json("new product added");

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
} ) 

//search products
productsRouter.get("/search/:code/:size", authorization, async (req, res) => {
    try {
        const {code, size} = req.params;
        const resultProducts = await pool.query("SELECT * FROM products WHERE code = $1 AND size LIKE $2", [code, size]);
        res.json(resultProducts.rows);
        console.log(req.params);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }

})


//view products
productsRouter.get("/list", authorization, async (req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }

})

//view single product
productsRouter.get("/:id", authorization, async (req, res) => {
    try {
        const {id} = req.params;
        const singleProduct = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);
        res.json(singleProduct.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//update product
productsRouter.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {quantity} = req.body;
        const updateProducts = await pool.query(
            "UPDATE products SET quantity = quantity - 1 WHERE product_id = $1", [id]
        );

        res.json("product updated");
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//delete product
productsRouter.delete("/:id", authorization, async (req, res) => {
    try {
        const {id} = req.params;
        const deleteProducts = await pool.query(
            "DELETE FROM products WHERE product_id = $1", [id]
        );

        res.json({status: "ok", message: "deleted"});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})


module.exports = productsRouter;