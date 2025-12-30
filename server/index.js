import express from 'express';
import cors from 'cors';
import multer from 'multer';

import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'https://huawei-gesture-send.netlify.app'];

    if (!origin) { // if req coming from some postman thing....
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.set('trust proxy', 1); // trust first proxy

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));

const imageCache = new Map();

const friendsMap = new Map(
  [
    ["id1", "id2"],
    ["id2", "id1"]
  ]);

  // --------------------------------- MULTER SETUP ---------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `image-${name}-${timestamp}-${uniqueString}${ext}`);
  }
});

const upload = multer({ storage });

// --------------------------------- ROUTES ---------------------------------

app.post("/upload", upload.single('image'), (req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({ success: false, message: "No file upload" });
    }

    const userId = req.body.userId;
    const imagePath = `/uploads/${req.file.filename}`;

    imageCache.set(userId, imagePath);

    res.json({ success: true, message: "Image uploaded successfully", imagePath });
  } catch (error) {
    console.log("Error in /upload:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
})

app.get("/drop/:receiverId", (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const senderId = friendsMap.get(receiverId);

    // if not friends
    if(!senderId) {
      return res.status(400).json({ success: false, message: "No friends mapping found" });
    }

    const imagePath = imageCache.get(senderId);

    if(!imagePath) {
      return res.status(404).json({ success: false, message: "Image not found / No img available from your friend." });
    }

    imageCache.delete(senderId); // remove after dropping
    
    return res.json({ success: true, imagePath, message: "Image recieved successfully" });
  } catch (error) {
    console.error("Error in /drop:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
})

app.get("/health", (req, res) => {
  res.json({
    status: "OK"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})