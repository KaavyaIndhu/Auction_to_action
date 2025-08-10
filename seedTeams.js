require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./team.model');

async function seedTeams() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connection.db.dropCollection('teamData').catch(err => {
      if (err.codeName === 'NamespaceNotFound') {
        console.log("ℹ️ No existing 'teamData' collection found.");
      } else {
        throw err;
      }
    });

    const teams = [];
    for (let i = 1; i <= 65; i++) {
      const formattedNumber = String(i).padStart(3, '0'); 
      const regNumber = `REG${formattedNumber}`;
      teams.push({
        teamNumber: formattedNumber, 
        teamCredential: regNumber,
        isActive: false
      });
    }
    await Team.insertMany(teams);
    console.log("✅ 65 teams inserted successfully with 3-digit team numbers!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting teams:", err);
  }
}

seedTeams();
