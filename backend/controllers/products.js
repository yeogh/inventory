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
        
        const user = await pool.query("SELECT user_id, name, permission FROM users WHERE user_id = $1", [req.user]);
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
        const resultProducts = await pool.query("SELECT * FROM products WHERE code = $1 AND size LIKE $2 ORDER BY size, product_id DESC", [code, size]);
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
        const singleProduct = await pool.query("SELECT products.code, products.name,products.size, products.option, products.product_id, products.quantity, products.quantity_sold, users.name AS created_name FROM products INNER JOIN users ON products.created_by = users.user_id WHERE products.product_id = $1", [id]);

        res.json(singleProduct.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})

//SELECT products.code, products.size, products.option, products.product_id, products.quantity, users.name FROM products INNER JOIN users ON products.created_by = users.user_id WHERE products.product_id = 33;


//Update product (Minus)
productsRouter.put("/:id", authorization, async (req, res) => {
    try {
        const {id} = req.params;
           const updateProductsQty = await pool.query(
            "UPDATE products SET quantity = quantity - 1, quantity_sold = quantity_sold + 1 WHERE product_id = $1", [id]
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

        //check if product has record of sales (if yes, throw error)
        const checkDeleteProduct = await pool.query("SELECT quantity_sold FROM products WHERE product_id = $1", [id]);
        console.log(checkDeleteProduct);
        if (checkDeleteProduct.rows[0]["quantity_sold"] > 0) {
        return res.status(401).json("product with sales record cannot be deleted")
        }

        const deleteProducts = await pool.query(
            "DELETE FROM products WHERE product_id = $1", [id]
        );

        res.json("product deleted");
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
})


//Report details
productsRouter.get("/reportdetails/:startdate/:enddate", authorization, async (req, res) => {
    try {
        const {startdate, enddate} = req.params;
     
        const rptProducts = await pool.query("SELECT products.code, products.size, products.option, products.product_id, sales.date FROM products INNER JOIN sales ON products.product_id = sales.product_id WHERE DATE(sales.date) BETWEEN $1 AND $2 ORDER BY products.code, products.size, products.option, sales.date DESC", [startdate, enddate]);

        //use this to correct the timezone data issue (json returns in ISO timezone 8 hours late compared to db)
        for (let i=0; i<rptProducts.rows.length; i++) {
            const dateArray = [];
            const convertDateArray = [];
            dateArray[i] = new Date(rptProducts.rows[i]["date"]);
            convertDateArray[i] = new Date(dateArray[i].getTime() + (8*60*60*1000));
            rptProducts.rows[i]["date"] = convertDateArray[i]
        }

        res.json(rptProducts.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }

})


//Report summary
productsRouter.get("/reportsummary/:startdate/:enddate", authorization, async (req, res) => {
    try {
        const {startdate, enddate} = req.params;
     
        const rptProducts = await pool.query("SELECT products.code, products.size, products.option, products.product_id, COUNT(*) AS count FROM products INNER JOIN sales ON products.product_id = sales.product_id WHERE DATE(sales.date) BETWEEN $1 AND $2 GROUP BY products.product_id ORDER BY count DESC", [startdate, enddate]);

        res.json(rptProducts.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }

})


module.exports = productsRouter;