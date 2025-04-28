const router=require('express').Router();
const enusureAuth=require('../Middleware/Auth')
router.get('/',enusureAuth,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"tv",
            price:50000,

        }
    ])
})
module.exports=router;