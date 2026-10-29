const express = require('express');
const cors = require('cors');
const cookieParser  = require('cookie-parser');

const app = express();
 app.use(express.json());
 app.use(cors());
 app.use(cookieParser());
 const authRoutes= require('./routes/auth.routes');
 const musicRoutes = require('./routes/music.routes');
 app.use('/api/auth' , authRoutes);
app.use('/api/music', musicRoutes);






 module.exports = app;