const productsRouter = require("express").Router();
const pool = require("../db")
const authorization = require('../middleware/authorization')


//Create product
productsRouter.post('/create', authorization, async(req, res) => {

    try {
    const {code, name, size, option, quantity, quantity_optimal, created_by} = req.body;  

    //check if product (i.e. code, size and option combi) exist (if yes, throw error)
    const product = await pool.query("SELECT * FROM products WHERE code = $1 AND size = $2 AND option = $3", [code, size, option]);

    if (product.rows.length !==0) {
        return res.status(401).json("product already exists")
    }

    //insert new product in table
    const newProducts = await pool.query("INSERT INTO products(code, name, size, option, quantity, quantity_optimal, created_by) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [code, name, size, option, quantity, quantity_optimal, created_by]);

    res.json("new product added");

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
} ) 

//Get User Info
productsRouter.get("/userid", authorization, async (req, res) => {
    try {
        
        const user = await pool.query("SELECT user_id, name FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error")
    }
})


//Search products
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


//View products
productsRouter.get("/list", authorization, async (req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }

})

//View single product
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

//Update product (Minus)
productsRouter.put("/:id", authorization, async (req, res) => {
    try {
        const {id} = req.params;
           const updateProducts = await pool.query(
            "UPDATE products SET quantity = quantity - 1 WHERE product_id = $1", [id]
        );
        const addSales = await pool.query(
            "INSERT INTO sales (quantity_sold, product_id) VALUES(1, $1)", [id]
        );

        res.json("product updated");
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//Update product (Plus)
productsRouter.patch("/:id", authorization, async (req, res) => {
    try {
        const {id} = req.params;
        const {increase} = req.body;
           const updateProducts = await pool.query(
            "UPDATE products SET quantity = quantity + $1 WHERE product_id = $2", [increase, id]
        );
        
        res.json("product updated");
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//Delete product
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