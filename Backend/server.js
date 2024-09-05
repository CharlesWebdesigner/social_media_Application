const app = require("./server/express");
const config = require("./config/config");
const port = config.port || 3000;
const mongoose = require("mongoose");
try {
  app.listen(port, async () => {
    await mongoose.connect(config.url);
    console.info(`App is running on port ${port}`);
  });
} catch (error) {
  console.log(`Encountered error : ${error} while starting server`);
}
