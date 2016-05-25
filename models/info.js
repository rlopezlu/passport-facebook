var mongoose = require('mongoose');

module.exports = mongoose.model('Info',
    {
        Movie: String,
        SoccerTeam: String, 
      }
);