require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./team.model');

async function activateTeam(credential) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const team = await Team.findOne({ teamCredential: credential });

    if (!team) {
      console.log("❌ No team found with that credential.");
      return;
    }

    if (team.isActive) {
      console.log(`ℹ️ Team ${team.teamNumber} is already active.`);
      return;
    }

    team.isActive = true;
    await team.save();
    console.log(`✅ Team ${team.teamNumber} is now active!`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
  }
}
activateTeam("REG001");
