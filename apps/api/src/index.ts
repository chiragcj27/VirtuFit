import express from 'express';
import reportRoutes from './routes/reportRoutes/reportRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the report routes
app.use('/api/report', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});