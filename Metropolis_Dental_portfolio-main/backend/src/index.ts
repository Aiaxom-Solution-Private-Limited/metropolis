import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/metropolis_dental';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('⚡ [Metropolis DB]: MongoDB Connected Successfully'))
  .catch(err => console.error('❌ [Metropolis DB Error]:', err));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    clinic: 'Metropolis Dental Clinic & Implant Centre',
    doctor: 'Dr. Pratim Talukdar',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Appointment booking endpoint schema base
const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  treatment: { type: String, required: true },
  preferredDate: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

app.post('/api/appointments', async (req: Request, res: Response) => {
  try {
    const { patientName, phone, email, treatment, preferredDate, notes } = req.body;
    if (!patientName || !phone || !email || !treatment || !preferredDate) {
      return res.status(400).json({ error: 'Please provide all required appointment fields.' });
    }

    const newAppointment = await Appointment.create({
      patientName,
      phone,
      email,
      treatment,
      preferredDate,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Appointment request received successfully.',
      appointment: newAppointment
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to schedule appointment', details: error.message });
  }
});

app.get('/api/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 [Metropolis Server] Running on http://localhost:${PORT}`);
});
