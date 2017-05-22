var express = require('express');
const bodyParser = require('body-parser');
const modules = require('./modules');

var app = express();

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

var router = express.Router();
var repo;

router.use('/1',function(req, res){
    modules.reposByName(req.query.name).then((data)=>{
        res.json(data);
})
});
router.use('/2',function(req, res){
    modules.reposByStr(req.query.q).then((data)=>{
        res.json(data);
    repo = data;
})
});
router.use('/3',function(req, res){
    modules.commitsByRepo(repo[0]).then((data)=>{
        res.json(data);
})
});

app.use('/', router);

app.listen(3030, () => console.log('Running on http://localhost:3030'));
