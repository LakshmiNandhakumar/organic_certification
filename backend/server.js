require('dotenv').config();
const express   = require('express');
const bodyParser = require('body-parser')
const app       = express();
const port      = process.env.PORT || 3000;
const morgan = require('morgan');


const authRoute = require('./routes/authRoute');
const applicationRoute = require('./routes/applicationRoute');
const fieldRoute = require('./routes/fieldRoute');
const mongoose  = require('mongoose');
const cors = require('cors');  

const connectionString = process.env.MONGOURL; 
mongoose.connect(connectionString)
.then(()=> console.log("Successfully connected to the Database"))
.catch((error)=>console.log("Not connected to the Database"));



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



app.use(cors());
app.use("/api/users",authRoute);
app.use("/api/application",applicationRoute);
app.use("/api/field",fieldRoute);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});