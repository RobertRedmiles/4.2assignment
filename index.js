// //index.js
// const express = require("express"); //uses the express package

// const app = express(); //Creates an express application
// const port = 3000; //Port number
// app.use(express.json());

// //Route for GET "/"
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.get("/items/:id", (req, res) => {
//     res.json(req.params);
// });

// app.post("/login", (req, res) => {
//     res.send("POST request at /login");
// });

// app.post("/register", (req, res)=>{
//     res.json(req.body);
// });

// app.put("/cart", (req, res) => {
//     res.send("PUT request at /cart");
// });

// app.delete("/cart", (req, res) => {
//     res.send("DELETE request at /cart");
// });

// app.listen(port, () => {  //Listen to port
//     console.log(`App listening on port ${port}`);
// });




const express = require("express"); //uses the express package

const app = express(); //Creates an express application
const PORT = 3001; //Port
app.use(express.json());





const fruits = [
    {
        id : 1,
        name : "banana"
    },
    {
        id : 2,
        name : "mango"
    }
]


//GET /fruits
app.get("/fruits", (req, res) => {
    res.json(fruits);
});

//GET /fruits/:id
app.get("/fruits/:id", (req, res) => {
    for (let fruit of fruits) {
        console.log(req.params.id);
        if (fruit.id == req.params.id) {
          res.status(200);
          return res.send(fruit);
        }
    }
    res.status(404);
    res.send("Fruit not found");
})

//POST /fruits
app.post("/fruits", function (req, res) {

    //Check if "name" is actually given
    if (!req.body.name) {
        return res.status(400).send("No name given")
    }

    if (fruits.length > 0 && fruits.some((f) => f.name === req.body.name)) {
        res.status(409);
        return res.send("Fruit already exists");
    }
    let index = fruits[fruits.length - 1].id + 1;
    const newFruit = {
        id : index,
        name : req.body.name
    }
    fruits.push(newFruit);
    res.json(newFruit);
    });

//PUT /fruits/:id
app.put("/fruits/:id", function (req, res) {
    for (let fruit of fruits) {
        if (fruit.id == req.params.id) {
        fruit.name = req.body.name;
        res.status(200);
        return res.send("Update successful");
        }
    }
    res.status(404);
    res.send("Fruit not found");
});

app.delete("/fruits/:id", function (req, res) {
    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i].id  == req.params.id) {
            console.log("delete")
        fruits.splice(i, 1);
        return res.send("Item deleted");
        }
    }
    res.send("Item not found")
});

 app.listen(PORT, () => {  //Listen to port
     console.log(`App listening on port ${PORT}`);
});

