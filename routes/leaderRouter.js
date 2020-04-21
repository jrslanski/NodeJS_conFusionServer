const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('We will send all the leaders to you');
})
.post((req,res,next) => {
    res.end('We will add the leader with name: ' 
    + req.body.name + ' and description: '+ req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT is not supported for /leaders');
})
.delete((req,res,next) => {
    res.end('Will delete all the leaders');
});

leaderRouter.route('/:leaderId')
.all((req,res,next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send details of the leader: '
    + req.params.leaderId + ' to you!');
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST is not supported for /promotions/' + req.params.leaderId);
})
.put( (req, res, next) => {
    res.write('Updating the promotion:  '
    + req.params.leaderId);
    res.end('Will update the promotion: '
    + req.body.name + ' with details: ' +  req.body.description);
})
.delete( (req, res, next) => {
    res.end('Deleting promotion: '+ req.params.leaderId);
});

module.exports = leaderRouter;