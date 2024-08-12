import express from "express";
import mysql from "mysql";
import cors from "cors";
import 'dotenv/config'

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// middlwares
app.use(express.json());
app.use(cors());

// For Checking

// app.get("/",(req,res)=>{
//     res.json("Hello this is the backend");
// })

// Getting All Flash Cards

app.get("/api/get-all-cards",(req, res) => {
    const q = "Select * FROM flashcard";
    db.query(q, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json(data);
    });
  }
);

//Add Flash Card

app.post("/api/add-card", (req, res) => {
    const q = "INSERT INTO flashcard (`Questions`, `Answers`) VALUES(?)";
    const values = [
        req.body.question,
        req.body.answer
    ];
    
    db.query(q, [values], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Card has created", result });
    });
  });
  
  // Delete flashcard

  app.delete("/api/delete-card/:id",(req,res)=>{
    const cardId = req.params.id;
    const q = "DELETE FROM flashcard WHERE id = ?"
    
    db.query(q, [cardId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Card has been deleted"});
    });

  })

  // Edit FlashCard

  app.put("/api/edit-card/:id", (req,res)=>{
    const cardId = req.params.id;

    const q = "UPDATE flashcard SET `Questions` = ? , `Answers` = ? WHERE id = ?"

    const values = [
      req.body.question,
      req.body.answer
    ];

    db.query(q, [...values,cardId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Card has been Updated"});
    });

  })

app.listen(3000, () => {
  console.log("Server Running On Port 3000.");
});
