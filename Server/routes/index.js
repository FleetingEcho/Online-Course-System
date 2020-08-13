import express from 'express';
const router = express.Router({});


router.get('/', (req, res, next)=>{
    res.render('../public/build/index.html');
});

module.exports = router;