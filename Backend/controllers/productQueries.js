require('dotenv').config();
const {StatusCodes} = require('http-status-codes')

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

const GetProductsCount = async(req, res) => {
    const {
        minPrice, 
        maxPrice,
        minPurchases,
        maxPurchases,
        onSale,
        search
    } = req.query;

    //Get the price condition. If no query, default to true
    let priceQuery = getPriceQuery(minPrice, maxPrice);
    //Get the number of purchases condition. If no query, default to true
    let purchasesQuery = getPurchasesQuery(minPurchases, maxPurchases);
    //is the product on sale?
    let saleQuery = onSale ? `productisonsale = ${onSale === "true" ? "True" : "False"}` : 'true';
    let searchQuery = search ? `"productname" LIKE '%${search}%'` : 'true'

    let orderByQuery = 'productId';
    let orderModeQuery = 'ASC';
    let limitQuery = '';

    //perform the query with all of the relevant search conditions.
    try{
        const results = await pool.query(
            `SELECT * FROM products WHERE ${saleQuery} AND ${priceQuery} AND ${purchasesQuery} AND ${searchQuery} ORDER BY ${orderByQuery} ${orderModeQuery}${limitQuery}`);            
            res.status(200).json({entries: results.rowCount})
        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('something went wrong');
    }

}

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
        limit,//Number of entries per page
        search
    } = req.query;

    //Get the price condition. If no query, default to true
    let priceQuery = getPriceQuery(minPrice, maxPrice);
    //Get the number of purchases condition. If no query, default to true
    let purchasesQuery = getPurchasesQuery(minPurchases, maxPurchases);
    //is the product on sale?
    let saleQuery = onSale ? `productisonsale = ${onSale === "true" ? "True" : "False"}` : 'true';
    let orderByQuery = sort ? sort : 'productId';
    let orderModeQuery = sortMode ? sortMode : 'ASC';
    let limitQuery = limit ? ` LIMIT ${limit}` : '';
    let offsetQuery = offset ? ` OFFSET ${offset}` : '';
    let searchQuery = search ? `"productname" LIKE '%${search}%'` : 'true'

    //perform the query with all of the relevant search conditions.
    try{
        const results = await pool.query(
            `SELECT * FROM products WHERE ${saleQuery} AND ${priceQuery} AND ${purchasesQuery} AND ${searchQuery} ORDER BY ${orderByQuery} ${orderModeQuery}${limitQuery}${offsetQuery}`);
            //This is stupid of me but I couldn't figure out how to conditionally sort using one column or another
            //based on the status of a third column, so I'm just sorting the values here using plain old javascript (if sorting by price)
            if(sort && sort === 'productprice')
            {
                let payload = results.rows.sort((a, b) => {
                    if(orderModeQuery === 'ASC')
                    {
                        return((a.productisonsale === true ? a.productsaleprice : a.productprice) - (b.productisonsale  === true ? b.productsaleprice : b.productprice))
                    }
                    else{
                        return((b.productisonsale  === true ? b.productsaleprice : b.productprice) - (a.productisonsale  === true ? a.productsaleprice : a.productprice))
                    }
                });
                return res.status(200).json({payload: payload, entries: results.rowCount})

            }            
            res.status(200).json({payload: results.rows, entries: results.rowCount})
        
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({msg: err.message});
    }
}

const getPriceQuery = (minPrice, maxPrice) => {
    let priceQuery = 'true';

    if(minPrice !== undefined && maxPrice !== undefined)
    {
        priceQuery = `((productisonsale = false AND productprice BETWEEN ${minPrice} AND ${maxPrice}) OR ((productisonsale = true AND productsaleprice BETWEEN ${minPrice} AND ${maxPrice})))`
    }
    else if(minPrice !== undefined && maxPrice === undefined)
    {
        priceQuery = `((productisonsale = false AND productprice > ${minPrice}) OR ((productisonsale = true AND productsaleprice > ${minPrice}))`
    }
    else if(minPrice === undefined && maxPrice !== undefined)
    {
        priceQuery = `((productisonsale = false AND productprice < ${maxPrice}) OR (productisonsale = true AND productsaleprice < ${maxPrice}))`
    }

    return priceQuery;
}

const getPurchasesQuery = (minPurchases, maxPurchases) => {
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
    return purchasesQuery;
}

const GetProductById = async (req, res)=>{
    const id = req.params.id;

    try{
        const results = await pool.query('SELECT * FROM products WHERE productId = $1', [id]) 
        res.status(200).json(results.rows[0]);
    }
    catch(err){
        res.status(400).json({msg: err.message});
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
        res.status(400).json({msg: err.message});
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
        res.status(400).json({msg: err.message});
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
        res.status(400).json({msg: err.message});
    }
}

module.exports = {
    CreateProduct,
    GetProducts,
    GetProductsCount,
    GetProductById,
    UpdateProduct,
    DeleteProduct
}