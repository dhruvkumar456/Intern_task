const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://taskapp:87654321@cluster0.nhlke.mongodb.net/intern_task?retryWrites=true&w=majority',
{useCreateIndex:true ,useNewUrlParser:true,useUnifiedTopology: true })