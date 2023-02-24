const express = require("express");
const urlRoutes = require("./routes/urlRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", urlRoutes);

// Error middleware
app.use(errorMiddleware.handleErrors);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
