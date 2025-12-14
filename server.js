const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// ✅ Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // serve HTML files

// ✅ Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// ✅ Contact form submission
app.post("/api/contact", (req, res) => {
  const contact = req.body;

  fs.readFile("data.json", "utf8", (err, data) => {
    let contacts = [];
    if (!err && data) {
      try {
        contacts = JSON.parse(data);
      } catch (e) {
        contacts = [];
      }
    }

    contacts.push({
      ...contact,
      date: new Date().toLocaleString(),
    });

    fs.writeFile("data.json", JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("❌ Error writing to data.json:", err);
        return res.status(500).json({ message: "Error saving data." });
      }
      console.log("✅ Contact saved:", contact.name);
      res.json({ message: "✅ Message saved successfully!" });
    });
  });
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
