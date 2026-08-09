const express=require('express');
const songsRoutes=require('./routes/song.route')
const app=express();    
const cors=require('cors')
app.use(express.json());
app.use(cors());
app.use('/',songsRoutes);//42.00

module.exports=app; 