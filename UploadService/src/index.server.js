const express = require("express");
const env = require("dotenv");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
const cloduinaryRoutes = require("./routes/cloudinary");

env.config();



app.use(express.json());
app.use("/api", cloduinaryRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
