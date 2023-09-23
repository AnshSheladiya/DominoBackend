/**
 * File Name: mongoose-connection.js
 */
const mongoose = require('mongoose');
const config = require('../../config');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // time before failing initial connection
  socketTimeoutMS: 45000, // time before timing out queries
  family: 4, // use IPv4, skip trying IPv6
};

let retries = 0;
const maxRetries = 5;
function connectWithRetry() {
  console.log('Connecting to MongoDB...');
  mongoose.set('strictQuery', false);
  mongoose
    .connect(config.database.url, options)
    .then(() => {
      console.log('MongoDB connected!');
      retries = 0;
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB: ${err}`);
      if (retries < maxRetries) {
        retries++;
        console.log(`Retrying connection (${retries}/${maxRetries})...`);
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log(`Maximum connection retries (${maxRetries}) reached`);
      }
    });
}

// Connect to the database
connectWithRetry();

// Use Mongoose transactions for atomicity and consistency
// Wrap transactional operations in a session to enable transactions
async function performTransaction(operations) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await operations(session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
