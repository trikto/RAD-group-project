const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/events/locations", require("./routes/locationRoutes"));
app.use("/api/events/foods", require("./routes/foodRoutes"));
app.use("/api/events/sounds", require("./routes/soundRoutes"));
app.use("/api/events/decorations", require("./routes/decorationRoutes"));
app.use("/api/events/invites", require("./routes/inviteRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
