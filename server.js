import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import connectDB from './config/db.js';
import adminRoutes from './routes/admin.routes.js';
import locationRoutes from './routes/location.route.js';
import courseRoutes from './routes/Course/course.routes.js';
import subjectRoutes from './routes/Subject/subject.routes.js';
import subSubjectRoutes from './routes/Sub-subject/subSubject.routes.js';
import chapterRoutes from './routes/Chapter/chapter.routes.js';
import mcqRoutes from './routes/MCQs/mcq.routes.js';
import bookmarkRoutes from './routes/bookmark.routes.js';
import adminTestRoutes from './routes/admin/testRoutes.js';
import userTestRoutes from './routes/user/testRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors';

import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID = '407408718192.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Environment variables load karo

// Express app initialize karo
const app = express();

// Database connect karo
connectDB();
app.use(cors());
// static uploads
app.use('/uploads', express.static(path.resolve('uploads')));

// Middleware
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL encoded body parser

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/admin/courses', courseRoutes);
app.use('/api/admin/subjects', subjectRoutes);
app.use('/api/admin/sub-subjects', subSubjectRoutes);
app.use('/api/admin/chapters', chapterRoutes);
app.use('/api/admin/mcqs', mcqRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/admin/tests', adminTestRoutes);
app.use('/api/tests', userTestRoutes);


app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        // Step: Google Token ko verify karna
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Isse pakka hota hai ki token aapki hi app ke liye hai
        });

        const payload = ticket.getPayload();
        
        // User ki details jo Google se mili
        const userInfo = {
            googleId: payload['sub'],
            email: payload['email'],
            name: payload['name'],
            picture: payload['picture']
        };

        console.log("User Verified:", userInfo);

        // Yaha aap Database logic likh sakte hain (e.g., Save User to MongoDB)

        res.status(200).json({
            message: "Success",
            user: userInfo
        });

    } catch (error) {
        console.error("Verification Error:", error);
        res.status(401).json({ message: "Invalid Token" });
    }
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running', // Server chal raha hai
  });
});

// 404 handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.use(notFound);

// Error handler middleware (sabse last mein)
app.use(errorHandler);

// Server start karo
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || 'development'
    } mode on port ${PORT}`
  );
});
