require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./team.model');

async function updateTeam(teamNumber, creditChange, debitChange, addItem, removeItem) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const updateOps = {};

    // Handle credit change
    if (creditChange !== 0) {
      updateOps.$inc = { ...updateOps.$inc, credit: creditChange };
    }

    // Handle debit change
    if (debitChange !== 0) {
      updateOps.$inc = { ...updateOps.$inc, debit: debitChange };
    }

    // Handle adding an item
    if (addItem) {
      updateOps.$push = { ...updateOps.$push, items: addItem };
    }

    // Handle removing an item
    if (removeItem) {
      updateOps.$pull = { ...updateOps.$pull, items: removeItem };
    }

    const result = await Team.updateOne({ teamNumber }, updateOps);

    if (result.modifiedCount > 0) {
      console.log(`✅ Team ${teamNumber} updated successfully.`);
    } else {
      console.log(`ℹ️ No changes made to Team ${teamNumber}.`);
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating team:", err);
  }
}

// 🔹 Example usage (change values here to test)
updateTeam("001", 200, 0, "Bricks", null); 
// adds +200 credit and adds "Bricks" to Team 001
