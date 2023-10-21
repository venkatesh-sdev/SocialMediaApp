import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url'
import path from 'path';
import morgan from 'morgan';

// Routers
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

// Controllers
import { Register } from './controllers/auth.controller.js';
import { CreatePost } from './controllers/post.controller.js';

// Token
import { verifyToken } from './middlewares/auth.middleware.js';

// Models
import Post from './models/Post.js'
import User from './models/User.js'
import { posts, users } from './data/data.js';

// --- Defaults --- //
dotenv.config();
const app = express();

// Overwriting a Default filename and dirname finder because of using module type exports and imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Parsing the data
app.use(json({ limit: '30mb' }));
app.use(urlencoded({ limit: '30mb', extended: true }));

// For Avoiding Cross-Orgin-Resource-Sharing Error
app.use(cors());

// For Security purpose to avoid Attacks like Xss, Mis-issued SSL Certificates and Clickjacking
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Logger Middleware 
app.use(morgan('common'));

// A express Built-In Middleware used to set the path for directory
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// --- File Storage --- //
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });

// --- Routes With Files --- //
app.post('/auth/register', upload.single('picture'), Register);
app.post('/post', verifyToken, upload.single('picture'), CreatePost);

// --- Router Routes --- //
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);



// --- Connections --- //
const DBConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("DB Connected");
    }
    catch (error) {
        console.log(error);
    }
};
// MongoDB Database Connection Call
DBConnection();

// The App Listing in the PORT of 3001
app.listen(
    process.env.PORT,
    () => {
        console.log("Server Running in http://localhost:" + process.env.PORT);
        // Data Insertion
        // User.insertMany(users)
        // Post.insertMany(posts)
        // console.log("Data Added Succesfully");
    }
)

