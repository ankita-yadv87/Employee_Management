const express = require("express");
const app  = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error")



app.use(express.json());
app.use(cookieParser());



// Route Imports
const employee = require("./routes/employeeRoute");

const department = require("./routes/departmentRoute");

app.use("/api/v1",employee);

app.use("/api/v1",department);

//middleware for error
app.use(errorMiddleware);

module.exports=app;