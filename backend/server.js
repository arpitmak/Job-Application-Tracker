const app = require("./src/app");
const { PORT } = require("./src/config/env");
const connectDB = require("./src/config/db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB();



