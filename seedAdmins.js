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
      { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }
    ];

    await Admin.insertMany(admins);
    console.log("✅ Admin accounts inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting admins:", err);
  }
}

seedAdmins();
