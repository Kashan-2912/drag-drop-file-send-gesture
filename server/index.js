import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/health", (req, res) => {  
    res.json({
        status: "OK"
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});