const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes')
require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT)
})


const Login = async(req, res)=> {
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide an email and password'});
    }
    const user = await CheckForEmail(userEmail);
    if(!user)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: `No user found with email ${userEmail}`});
    }

    const match = await bcrypt.compare(userPassword, user.userpassword);
    if(!match)
    {
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Password');
    }

    const token = await CreateJWT(user);
    user.token = token;
    
    delete user.userpassword;

    await TransferAllCartItems(req.user, user);

    res.status(200).json(user);
}


const Register = async(req, res)=> {
    const {
        userEmail, 
        userName, 
        userPassword
    } = req.body;

    if(!userEmail || !userName || !userPassword)
    {
        return res.status(StatusCodes.UNAUTHORIZED).json({error: 'Please provide a valid username, email, and password.'})
    }


    let validEmail = true;
    if( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail))
    {
        validEmail = true;
    }
    else{
        validEmail = false;
    }

    if(!validEmail)
    {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Please provide a valid email"});
    }
    
    let user  = await CheckForEmail(userEmail);
    if(user)
    {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: `User already exists with email ${userEmail}`});
    }

    //Generate the salt and hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    try{
        const result = await pool.query(`INSERT INTO users (
            userName,
            userPassword,
            userEmail,
            userIsTempUser
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        ) RETURNING *`,
        [userName, hashedPassword, userEmail, false])

        user = result.rows[0];
        const token = await CreateJWT(user);
        user.token = token;
        delete user.userpassword;
        
        await TransferAllCartItems(req.user, user);
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(400).json({msg: err.message});
    }    
}

const TransferAllCartItems = async(tempUser, permenentUser)=>
{
    const {
        userId,
        name
    } = tempUser;

    if(!userId || !permenentUser.userid)
    {
        return;
    }

    try {
        const items = await pool.query(
            `SELECT * FROM "cartItems"
            RIGHT JOIN products
                ON productId = cartProductId
            WHERE cartUserId = $1 AND orderCompleted = $2`, 
            [userId, false]);

        for(let i = 0; i < items.rows.length; i++)
        {
            await TransferSingleCartItem(permenentUser.userid, items.rows[i])
        }
    }
    catch(err)
    {
        console.log(err);
        return;
    }   

}

const TransferSingleCartItem = async(toUserId, cartItem) => {
    const {
        cartproductid,
        cartquantity
    } = cartItem;

    const userId = toUserId;

    try{
        const checkResult = await pool.query(
            `SELECT * FROM "cartItems"
            RIGHT JOIN products
                ON productId = cartProductId
            WHERE cartProductId = $1 AND cartUserId = $2 AND ordercompleted = $3`,
            [cartproductid, userId, false]
        )
        
        //This means an entry with the product exists. If this is the case we want to update the quantity
        if(checkResult.rowCount > 0)
        {
            const results = await pool.query(
                `UPDATE "cartItems" SET
                    cartQuantity = $1
                WHERE cartEntryId = $2 AND cartUserId = $3
                RETURNING *`,
                [
                    cartquantity + checkResult.rows[0].cartquantity,
                    checkResult.rows[0].cartentryid,
                    userId
                ]
            );
            return;
        }
        else{
            const results = await pool.query(
                `INSERT into "cartItems" (
                    cartProductId,
                    cartUserId,
                    cartQuantity
                )
                VALUES (
                    $1,
                    $2,
                    $3
                )
                RETURNING *`,
                [
                    cartproductid,
                    userId,
                    cartquantity
                ]
            );
            return;
        }
    }
    catch(err)
    {
        return;
    }
}



const CreateTempUser = async(req, res)=>{
    const tempBody = {
        userEmail: "temp",
        userName: "temp",
        userPassword: "temp"
    }
    
    const {
        userEmail, 
        userName, 
        userPassword
    } = tempBody;

    if(!userEmail || !userName || !userPassword)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide a username, password, and email.'})
    }

    //Generate the salt and hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    try{
        const result = await pool.query(`INSERT INTO users (
            userName,
            userPassword,
            userEmail,
            userIsTempUser
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        ) RETURNING *`,
        [userName, hashedPassword, userEmail, true])

        let user = {...result.rows[0]};
        const token = await CreateJWT(user);
        user.token = token;
        delete user.userpassword;
        
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(400).json({
            msg: err.message,
        });
    }    
}

//Checks for existing email in database
const CheckForEmail = async(email) =>
{
    try{
        const {rows} = await pool.query(
            `SELECT * FROM users WHERE userEmail = $1`,
            [email]
        )
        const user = rows[0];
        if(!user)
        {
            return null;
        }
        
        return user;
    }
    catch(err)
    {
        res.status(400).json({msg: err.message});
    }
}

const CheckForUserid = async(userid) => 
{
    try{
        const {rows} = await pool.query(
            `SELECT * FROM users WHERE userId = $1`,
            [userid]
        )
        const user = rows[0];
        if(!user)
        {
            return null;
        }
        
        return user;
    }
    catch(err)
    {
        res.status(400).json({msg: err.message});
    }
}

//Given a valid JWT, return the user information (for use if the user has left the page and come back)
const GetCurrentUser = async(req, res)=> {
    const {
        userId,
        name,
        email
    } = req.user;
    
    try{
        const {rows} = await pool.query(
            `SELECT * FROM users WHERE userId = $1`,
            [userId]
        )
        let user = rows[0];
        if(!user)
        {
            return res.status(404).json({msg: 'No user found'});
        }

        delete user.userpassword;
        return res.status(200).json(user);
    }
    catch(err)
    {
        res.status(400).json({msg: err.message});
    }
}

module.exports = {
    Login,
    Register,
    CreateTempUser,
    CheckForUserid, 
    GetCurrentUser
}

const CreateJWT = async (user) => {        
    return jwt.sign({
        userId: user.userid,
        name: user.username,
        email: user.useremail
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_LIFETIME
    }
    )
}