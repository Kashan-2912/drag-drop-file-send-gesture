# 🤲 Huawei Gesture - Gesture-Based File Sharing

A modern web application that enables users to share images using hand gestures. Inspired by Huawei's gesture-based file sharing feature, this project uses machine learning to detect hand gestures via webcam, allowing users to "grab" and "drop" files between connected devices.

## ✨ Features

- **🤖 Real-time Gesture Detection**: Uses ML5.js and Google's Teachable Machine to detect hand gestures through your webcam
- **📤 Grab to Send**: Make a "grab" gesture to capture and send an image
- **📥 Drop to Receive**: Make a "drop" gesture to receive images from connected friends
- **🔄 Peer-to-Peer Sharing**: Simple friend mapping system for direct image transfer
- **🎨 Modern UI**: Built with React 19 and Tailwind CSS 4
- **⚡ Fast Performance**: Powered by Vite for lightning-fast development and builds

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **ML5.js** - Machine learning library for gesture detection
- **Lucide React** - Icon library

### Backend
- **Express 5** - Web framework
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Webcam access for gesture detection
- Modern web browser (Chrome, Firefox, or Edge recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/huawei-gesture.git
cd huawei-gesture
```

### 2. Install Dependencies

Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Start the Development Servers

**Terminal 1 - Start the Backend Server:**

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

**Terminal 2 - Start the Frontend Client:**

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

- Grant webcam permissions when prompted
- Navigate between pages:
  - `/` - Grab Page (send images)
  - `/drop` - Drop Page (receive images)

## 📁 Project Structure

```
huawei-gesture/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── GestureDetector.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── GrabPage.jsx
│   │   │   └── DropPage.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend application
│   ├── uploads/          # Uploaded images storage
│   ├── index.js          # Express server
│   └── package.json
│
└── README.md
```

## 🎮 How to Use

### Sending an Image (Grab Page)

1. Navigate to the home page (`/`)
2. Position your hand in front of the webcam
3. Make a "grab" gesture (closed fist)
4. Capture or select an image to send
5. The image will be uploaded to the server

### Receiving an Image (Drop Page)

1. Navigate to the drop page (`/drop`)
2. Position your hand in front of the webcam
3. Make a "drop" gesture (open palm facing down)
4. If a friend has sent you an image, it will be downloaded

## 🔧 Configuration

### Friend Mapping

The friend mapping is currently hardcoded in `server/index.js`. To add or modify friend connections:

```javascript
const friendsMap = new Map([
  ["id1", "id2"],
  ["id2", "id1"]
]);
```

### Gesture Model

The gesture detection model is loaded from Google's Teachable Machine. To use a custom model:

1. Train your model at [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Update the `MODEL_URL` in `client/src/components/GestureDetector.jsx`

```javascript
const MODEL_URL = "YOUR_MODEL_URL_HERE";
```

### CORS Configuration

Update allowed origins in `server/index.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-domain.com'
];
```

## 📦 Building for Production

### Build the Client

```bash
cd client
npm run build
```

The production build will be in the `client/dist` directory.

### Run the Server in Production

```bash
cd server
npm start
```

## 🌐 Deployment

### Frontend (Client)
- Can be deployed to Netlify, Vercel, or any static hosting service
- Build the project first using `npm run build`
- Deploy the `client/dist` folder

### Backend (Server)
- Can be deployed to Heroku, Railway, Render, or any Node.js hosting service
- Make sure to set the appropriate environment variables
- Update CORS settings to include your production frontend URL

## 🔐 Environment Variables

Create a `.env` file in the server directory (optional):

```env
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Gesture detection requires good lighting conditions
- WebRTC/Webcam access requires HTTPS in production
- Friend mapping is currently static (no database integration)

## 🔮 Future Enhancements

- [ ] User authentication and registration
- [ ] Dynamic friend system with pairing codes
- [ ] Support for multiple file types (not just images)
- [ ] Real-time notifications using WebSockets
- [ ] Gesture training interface
- [ ] Mobile app support
- [ ] Encrypted file transfers
- [ ] File history and gallery

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This project requires webcam access and uses machine learning for gesture detection. Make sure to grant the necessary permissions when prompted by your browser.
