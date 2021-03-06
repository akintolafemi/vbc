const express = require('express');
const connectDB = require('./DB/Connection');
const cors = require('cors');
const app = express();

connectDB();
app.use(cors({origin: '*'}));
app.use(express.json({ extended:false }));
app.use('/api', require('./Api/Certificate'));
const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("Server Started"));
