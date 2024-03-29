const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const queries = [
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    `CREATE TABLE IF NOT EXISTS "products" (
	    productId uuid DEFAULT uuid_generate_v4 (),
	    productName boolean DEFAULT False, 
        productSeller VARCHAR(100) NOT NULL,
        productImageUrl VARCHAR(100) NOT NULL, 
        productPrice integer DEFAULT 1, 
        productQuantityAvailable integer DEFAULT 1, 
        productDescription VARCHAR(500) NOT NULL, 
        productIsOnSale boolean DEFAULT False, 
        productSalePrice integer DEFAULT 1,
        numPurchases integer DEFAULT floor(random() * 25) + 1,
	    PRIMARY KEY (productId)
    );`,
    `CREATE TABLE IF NOT EXISTS "users" (
	    userId uuid DEFAULT uuid_generate_v4 () NOT NULL,
	    userEmail VARCHAR(100) NOT NULL, 
        userName VARCHAR(100) NOT NULL, 
        userPassword VARCHAR(100) NOT NULL, 
        userIsTempUser BOOLEAN NOT NULL,
        PRIMARY KEY (userId)
    );`,
    `CREATE TABLE IF NOT EXISTS "cartItems" (
	    cartEntryId uuid DEFAULT uuid_generate_v4 () NOT NULL,
        cartProductId uuid NOT NULL,
	    cartUserId uuid NOT NULL,
        cartQuantity integer NOT NULL,
        orderCompleted BOOLEAN DEFAULT false,
        PRIMARY KEY (cartEntryId)
    );`,
    `CREATE TABLE IF NOT EXISTS "orders" (
	    orderId uuid DEFAULT uuid_generate_v4 () NOT NULL,
        orderCartItemIds uuid[] NOT NULL,
	    orderUserId uuid NOT NULL,
        createdAt timestamp DEFAULT now(),
        PRIMARY KEY (orderId)
    );`
];


const execute = async (query) => {
    try {
        await pool.connect();     // gets connection
        await pool.query(query);  // sends queries
        console.log(`Successfully executed pg query: ${query}`)
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


//For each table type we have, create the table if it doesn not already exist.
const InitTables = async()=>{
    for(let i = 0; i < queries.length; i++)
    {
        await execute(queries[i]).then(result => {
        }) 
    }
}

module.exports = {InitTables}