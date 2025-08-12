require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./admin.model');

async function seedAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await mongoose.connection.db.dropCollection('adminData').catch(err => {
      if (err.codeName === 'NamespaceNotFound') {
        console.log("ℹ️ No existing 'adminData' collection found.");
      } else {
        throw err;
      }
    });

    const admins = [
      { username: '23BCI0214', password: 'Roopa214' }
    ];

    await Admin.insertMany(admins);
    console.log("✅ Admin accounts inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting admins:", err);
  }
}

seedAdmins();
