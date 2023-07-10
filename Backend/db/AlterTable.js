const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});


const addColumn = async()=>{
    try{
        const results = await pool.query(
            `ALTER TABLE "products"
                ADD COLUMN createdAt DATE DEFAULT NOW() - '1 week'::INTERVAL * ROUND(RANDOM() * 100);`
        )   
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

const dropColumn = async()=> {
    try{
        const results = await pool.query(
            `ALTER TABLE "products"
                DROP COLUMN IF EXISTS createdAt;`
        )   
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

const alterColumn = async()=>{
    let columnName =  "productisonsale";
    try{
        const results = await pool.query(
            `ALTER TABLE "products"
                ALTER COLUMN ${columnName} TYPE boolean USING (${columnName}::boolean);`
        )   
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

//addColumn()