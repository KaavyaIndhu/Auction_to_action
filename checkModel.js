require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./team.model'); // make sure path is correct

async function checkModel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Just grab one team
    const team = await Team.findOne();
    if (!team) {
      console.log("❌ No teams found in database.");
    } else {
      console.log("✅ Team document found:");
      console.log(team.toObject());
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

checkModel();
