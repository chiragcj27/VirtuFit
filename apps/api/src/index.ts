import express from 'express';
import cookieParser from "cookie-parser"; // Required for accessing cookies
import reportRoutes from './routes/reportRoutes/reportRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

// Use the report routes
app.use('/api/report', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});