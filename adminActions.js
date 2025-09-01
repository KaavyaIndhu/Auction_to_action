require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./team.model');

async function updateTeam() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Example: Update Team 001
    const teamNumber = "001"; // change this as needed

    // 1️⃣ Increase credit by 200
    await Team.updateOne(
      { teamNumber },
      { $inc: { credit: 200 } }
    );

    // 2️⃣ Increase debit by 100
    await Team.updateOne(
      { teamNumber },
      { $inc: { debit: 100 } }
    );

    // 3️⃣ Add an item
    await Team.updateOne(
      { teamNumber },
      { $push: { items: "Solar Panel" } }
    );

    // 4️⃣ Remove an item
    await Team.updateOne(
      { teamNumber },
      { $pull: { items: "Wind Turbine" } }
    );

    console.log(`✅ Updated team ${teamNumber} successfully!`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating team:", err);
  }
}

updateTeam();
