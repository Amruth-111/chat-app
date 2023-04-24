let express=require('express');
let fs=require('fs');
let bodyParser = require('body-parser');


let app=express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="GET"><input id="username" type="text" name="title"><button type="submit">add</button></form>')
})

app.get('/',(req,res)=>{
    fs.readFile("message.txt",(err,data)=>{
        if(err){
        console.log(err);
        data="no data found";
        }
        res.send(
            `${data}<form action="/" method ="POST" onsubmit="document.getElementById('username').value =localStorage.getItem('username')">
                <input type="text" id="message" name="message"></input>
                <input type="hidden" id="username" name="username"></input>
                <button type="submit">send</button>
            </form>`
            )

    })
    
    
})

app.post('/',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);

    fs.writeFile("message.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
       err? console.log(err):res.redirect("/")
    })
    
})

app.listen(3000)