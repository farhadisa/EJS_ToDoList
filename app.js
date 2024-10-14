 const express = require("express");
 const bodyParser = require("body-parser");

 const app = express();

 app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({extended:true}));

 app.use(express.static("public"));

 const port = 3000;

 const items = [];

 const workItems = [];

 app.get("/",(req,res)=>{
    
    var today = new Date(); 
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
 
    var day = today.toLocaleDateString("en-US", options);
    res.render('list', {listTitle: day, additem: items});

 });

 app.post("/",(req,res)=>{

    var item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }

    console.log(req.body)

 });

 app.get("/work",((req,res)=>{
     res.render('list',{listTitle: "Work List", additem: workItems})
 }));

 app.post("/work",(req,res)=>{
   
    let item = req.body.newItem;
    
    workItems.push(item);

    res.redirect("/work")
    
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("*",(req,res)=>{
    res.sendFile(__dirname + '/notFound.html')
})

 app.listen(port,()=>{
     console.log("Bu bir denemdir.")
})