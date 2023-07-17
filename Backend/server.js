const db = require('./db/initTable.js')
require('dotenv').config();
const path = require('node:path')
const express= require('express');

const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit')

const authenticationMiddleware = require('./middleware/authenticationMiddleware.js')
const app = express();
app.use(express.json())

app.use(xss());
app.use(cors())
app.use(helmet());
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5000, // limit each IP to 100 requests per windowMs
  })
);


//Import routers
const ProductsRouter = require('./routers/productQueries.js');
const AuthRouter = require('./routers/auth.js');
const CartRouter = require('./routers/cart.js');
const StripeRouter = require('./routers/APIRequests.js')
const OrderRouter = require('./routers/order.js')

//Use routers
app.use('/api/v1/products', ProductsRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/cart', authenticationMiddleware, CartRouter)
app.use('/api/v1/purchase', StripeRouter);
app.use('/api/v1/order', authenticationMiddleware, OrderRouter)

const port = Number(process.env.PORT) || 3000;

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
});

const start = async ()=> {
    try{
        await db.InitTables();    
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}`)
        })
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}
start();