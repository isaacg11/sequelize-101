const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const Sequelize = require("Sequelize");
const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize("Music", "michael", null, {
    host: "localhost",
    dialect: "sqlite",
    storage: "/Users/isaacgrey/Desktop/db/Chinook_Sqlite_AutoIncrementPKs.sqlite"
});

const Artist = sequelize.define("Artist", {
      ArtistId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Name: Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps: false
});

// create
app.post('/artist', (req, res) => {
    Artist.create({
      Name: req.body.name
    });
    res.sendStatus(200)
});

// read all
app.get('/artist', (req, res) => {
    Artist.findAll().then(artists => {
    res.json(artists);
    });
});

// read one
app.get('/artist/:id', (req, res) => {
    Artist.find({
      where: { 
        ArtistId: req.params.id
      }
    }).then(artist => {
      res.json(artist);
    });
});

// update one
app.put('/artist/:id', (req, res) => {
    Artist.update(
      { Name: 'Kenny Rogers' },
      {
        where: {
          ArtistId: req.params.id
        }
      }
    ).then(result => {
      res.json(result);      
  });
});

// delete one
app.delete('/artist/:id', (req, res) => {
    Artist.find({ 
      where: { ArtistId: req.params.id }
      }).then(artist => {
        artist.destroy();
        res.sendStatus(200);
      });
});

app.listen(3000, () => {
    console.log('server running')
})

