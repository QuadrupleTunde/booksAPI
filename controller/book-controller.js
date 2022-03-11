const express = require('express')
const { updateOne } = require('../models/books.js')
const app = express()
const books = express.Router()
const Books = require('../models/books.js')

books.get('/seed', (req, res) => {
    Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "W∀RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(success=> {
            console.log(success)
            res.status(200).json({
            message: 'Seed successful'
        })})
        .catch(err=>{
            res.status(404).json({
            message: 'Seed unsuccessful'
        })})
})


// index
books.get('/', (req,res)=>{
    Books.find()
    .then(foundBooks=>{
        res.status(200).json(foundBooks)
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(404)
    })
})
// show
books.get('/:id', (req,res)=>{
    const id = req.params.id
    Books.findById(id)
    .then(foundBooks=>{
        res.status(200).json({ 
            book: foundBooks,
            id: id
        })
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(404)
    })
})

// Create
books.post('/', (req,res)=>{
    const id = req.params.id
    Books.create(req.body)
    .then(createdBooks=>{
        res.status(200).json({ 
            book: createdBooks,
            id: id
        })
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(404)
    })
})

// update
books.put('/:id', (req,res)=>{
    const id = req.params.id
    // console.log(req.body, id)
    Books.findByIdAndUpdate(id, req.body, {new : true})
    .then(updatedBooks=>{
        res.status(200).json( { book: `books ${id}`,
            book: updatedBooks,
            id: id
        })
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(404)
    })
})

// delete
books.delete('/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
    Books.findByIdAndDelete(id)
    .then(deletedBooks=>{
        res.json({deletedBooks,
            message: "Successfully deleted"
        
        })
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(404)
    })
})

module.exports = books