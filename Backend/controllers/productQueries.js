require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

//TODO: Add Query options
const GetProducts = async (req, res) => {
    const {
        minPrice, 
        maxPrice,
        minPurchases,
        maxPurchases,
        sort,//What are we sorting by (price, purchases, name)
        sortMode,//ASC or DESC
        onSale,
        offset,
        limit//Number of entries per page
    } = req.query;

    //Get the price condition. If no query, default to true
    let priceQuery = 'true';
    if(minPrice && maxPrice)
    {
        priceQuery = `((productisonsale = false AND productprice BETWEEN ${minPrice} AND ${maxPrice}) OR ((productisonsale = true AND productsaleprice BETWEEN ${minPrice} AND ${maxPrice})))`
    }
    else if(minPrice && !maxPrice)
    {
        priceQuery = `((productisonsale = false AND productprice > ${minPrice}) OR ((productisonsale = true AND productsaleprice > ${minPrice}))`
    }
    else if(!minPrice && maxPrice)
    {
        priceQuery = `((productisonsale = false AND productprice < ${maxPrice}) OR (productisonsale = true AND productsaleprice < ${maxPrice}))`
    }

    //Get the number of purchases condition. If no query, default to true
    let purchasesQuery = 'true';
    if(minPurchases && maxPurchases)
    {
        purchasesQuery = `numpurchases BETWEEN ${minPurchases} AND ${maxPurchases}`
    }
    else if(minPurchases && !maxPurchases)
    {
        purchasesQuery = `numpurchases > ${minPurchases}`
    }
    else if(!minPurchases && maxPurchases)
    {
        purchasesQuery = `numpurchases < ${maxPurchases}`
    }
    
    //is the product on sale?
    let saleQuery = onSale ? `productisonsale = ${onSale === "true" ? "True" : "False"}` : 'true';

    //perform the query with all of the relevant search conditions.
    try{
        const results = await pool.query(
            `SELECT * FROM products WHERE ${saleQuery} AND ${priceQuery} AND ${purchasesQuery} ORDER BY productId ASC`);
            res.status(200).json({payload: results.rows, entries: results.rowCount})
        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('something went wrong');
    }
    
}

const GetProductById = async (req, res)=>{
    const id = req.params.id;

    try{
        const results = await pool.query('SELECT * FROM products WHERE productId = $1', [id]) 
        res.status(200).json(results.rows[0]);
    }
    catch(err){
        throw err;
    }
}

const CreateProduct = async (req, res)=> {    
    const {
        productName, 
        productImageUrl, 
        productPrice, 
        productQuantityAvailable, 
        productDescription, 
        productIsOnSale, 
        productSalePrice,
        productSeller
    } = req.body; 

    try{
        const results = await pool.query(
            `INSERT INTO products (
                productName, 
                productImageUrl, 
                productPrice, 
                productQuantityAvailable, 
                productDescription, 
                productIsOnSale, 
                productSalePrice,
                productSeller
            )
            VALUES (
                $1, 
                $2, 
                $3, 
                $4, 
                $5, 
                $6, 
                $7,
                $8
            ) RETURNING *`,
            [        
                productName, 
                productImageUrl, 
                productPrice, 
                productQuantityAvailable, 
                productDescription, 
                productIsOnSale, 
                productSalePrice,
                productSeller
            ]);
        res.status(200).json(`Product added with id: ${results.rows[0].productid}`);
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const UpdateProduct = async (req, res)=> {
    const id = req.params.id;
    const {
        productName, 
        productImageUrl, 
        productPrice, 
        productQuantityAvailable, 
        productDescription, 
        productIsOnSale, 
        productSalePrice,
        productSeller
    } = req.body; 
    try{
        const results = await pool.query(
            `UPDATE products SET 
                productName = $1, 
                productImageUrl = $2, 
                productPrice = $3, 
                productQuantityAvailable = $4, 
                productDescription = $5, 
                productIsOnSale = $6, 
                productSalePrice = $7
                productSeller = $8
                WHERE productId = $9
                RETURNING *`,
            [ 
                productName, 
                productImageUrl, 
                productPrice, 
                productQuantityAvailable, 
                productDescription, 
                productIsOnSale, 
                productSalePrice,
                productSeller,
                id
            ]
        )
        res.status(200).json({
            msg: `Product modified with ID: ${results.rows[0].productid}`,
            updatedEntry: results.rows[0]
        })

    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const DeleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        await pool.query('DELETE FROM products WHERE id = $1', [id])
        res.status(200).send(`Product delete with ID: ${id}`);
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

module.exports = {
    CreateProduct,
    GetProducts,
    GetProductById,
    UpdateProduct,
    DeleteProduct
}