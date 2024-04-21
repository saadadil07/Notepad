
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=>{
        fs.readdir('./files', 'utf-8', (err,data)=>{
            res.render('index', {data: data})
            console.log(data);
        })   
})

app.post('/create', (req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, (err)=>{
        if(err) throw err
    })
    res.redirect('/')
})

app.get(`/details/:filename`, (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err,data)=>{
        if(err) throw err
        res.render('details', {title: req.params.filename, data: data})
    })
})

app.get('/delete/:filename', (req,res)=>{
    fs.unlink(`./files/${req.params.filename}`, (err)=>{
        if(err) throw err
        res.redirect('/')
        console.log('deleted');
    })
})

app.get('/rename/:filename', (req,res)=>{
    res.render('rename', {old: req.params.filename})
})

app.post('/edited', (req,res)=>{
    fs.rename(`./files/${req.body.old}`, `./files/${req.body.new}`, (err)=>{
        if(err) throw err
        res.redirect('/')
    })
})

app.get('/delete/:filename', (req,res)=>{
    fs.unlink(`./files/${req.params.filename}`, (err)=>{
        if(err) throw err
        res.redirect('/')
        console.log('deleted');
    })
})

app.listen(3000)

