const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const {readdirSync} = require("fs")
require("dotenv").config()


app.use(bodyParser.json())
app.use(cors())
app.use(morgan("dev"))





readdirSync("./routers").map((c)=>app.use("/api",require("./routers/"+c)))




app.listen(8200, () => console.log("On port 8200"))
