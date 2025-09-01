require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./team.model');

async function tradeItems(teamA, teamB, itemFromA, creditFromB) {
  try {
    // ✅ Connect to DB first
    await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1️⃣ Remove item from Team A, add credit
      await Team.updateOne(
        { teamNumber: teamA },
        {
          $pull: { items: itemFromA },
          $inc: { credit: creditFromB }
        },
        { session }
      );

      // 2️⃣ Add item to Team B, reduce credit
      await Team.updateOne(
        { teamNumber: teamB },
        {
          $push: { items: itemFromA },
          $inc: { debit: creditFromB }
        },
        { session }
      );

      // ✅ Commit transaction
      await session.commitTransaction();
      console.log(`✅ Trade successful: ${itemFromA} moved from Team ${teamA} → Team ${teamB}, credits transferred.`);
    } catch (err) {
      // ❌ Rollback on error
      await session.abortTransaction();
      console.error("❌ Trade failed, rolled back:", err);
    } finally {
      session.endSession();
      mongoose.connection.close();
    }
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err);
  }
}

// 🔹 Example usage
tradeItems("001", "002", "Bricks", 200);

