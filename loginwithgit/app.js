const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 6700;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors())
app.get('/',(req,res) => {
    res.send(
        "<a href='https://github.com/login/oauth/authorize?client_id=cb7a83e9c3d66b171004'>Login With Github</a>"
        )
});


app.post('/users',(req,res) => {
    const code =req.query.code
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_secret:'d9c24bfb3c4735e5f20983a31c55bb2968eae8f7',
        client_id:'cb7a83e9c3d66b171004',
        code:req.body.code
    })
    .set('Accept','application/json')
    .end((err,result) => {
        if(err) throw err;
        var accesstoken = result.body.access_token
        const option = {
            url:'https://api.github.com/user',
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':'token '+accesstoken,
                'User-Agent':'sep-node'
                
            }
        }
        var output;
        request(option,(err,response,body) => {
            output = body;
            console.log(output)
            return res.send(output)
        })
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

