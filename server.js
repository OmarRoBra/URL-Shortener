const express= require('express')
const mongooose=require('mongoose')
const app=express();
const shortUrl=require('./Models/shortUrl')

mongooose.connect('mongodb+srv://Omar:Alceconbotas2@omar-sdsdk.mongodb.net/urlShortener',{
    useNewUrlParser:true, useUnifiedTopology:true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const ShortUrls= await shortUrl.find()
    res.render('index',{ShortUrls:ShortUrls})
})
app.post('/shortUrls',async(req,res)=>{
   await shortUrl.create({full:req.body.fullUrl})
   res.redirect('/')
})
app.get('/:shortUrl',async(req,res)=>{
    const ShortUrl= await shortUrl.findOne({short:req.params.shortUrl})
    if(ShortUrl===null) return  res.sendStatus(404)
    ShortUrl.clicks++;
    ShortUrl.save()
    res.redirect(ShortUrl.full)
})
app.listen(process.env.PORT|| 5000)
