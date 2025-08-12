require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./admin.model');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await mongoose.connection.db.dropCollection('adminData').catch(err => {
      if (err.codeName === 'NamespaceNotFound') {
        console.log("ℹ️ No existing 'adminData' collection found.");
      } else {
        throw err;
      }
    });

    const admin = {
      username: 'mainAdmin',   
      password: 'securePass'  
    };

    await Admin.create(admin);
    console.log("✅ Admin account inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting admin:", err);
  }
}

seedAdmin();
