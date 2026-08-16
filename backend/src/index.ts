import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory appointments fallback
interface AppointmentItem {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

const inMemoryAppointments: AppointmentItem[] = [];

// Optional MongoDB connection
let isMongoConnected = false;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('⚡ [Metropolis DB]: MongoDB Connected Successfully');
    })
    .catch(err => console.error('❌ [Metropolis DB Error]:', err));
} else {
  console.log('ℹ️ [Metropolis Server]: Running in standalone mode (no MongoDB configured)');
}

// Appointment booking schema base for MongoDB
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

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    clinic: 'Metropolis Dental Clinic & Implant Centre',
    doctor: 'Dr. Pratim Talukdar',
    timestamp: new Date().toISOString(),
    database: isMongoConnected ? 'connected' : 'standalone/in-memory'
  });
});

app.post('/api/appointments', async (req: Request, res: Response) => {
  try {
    const { patientName, phone, email, treatment, preferredDate, notes } = req.body;
    if (!patientName || !phone || !email || !treatment || !preferredDate) {
      return res.status(400).json({ error: 'Please provide all required appointment fields.' });
    }

    if (isMongoConnected) {
      const newAppointment = await Appointment.create({
        patientName,
        phone,
        email,
        treatment,
        preferredDate,
        notes
      });
      return res.status(201).json({
        success: true,
        message: 'Appointment request received successfully.',
        appointment: newAppointment
      });
    } else {
      const newAppointment: AppointmentItem = {
        id: Date.now().toString(),
        patientName,
        phone,
        email,
        treatment,
        preferredDate,
        notes: notes || '',
        status: 'pending',
        createdAt: new Date()
      };
      inMemoryAppointments.unshift(newAppointment);
      return res.status(201).json({
        success: true,
        message: 'Appointment request received successfully (in-memory).',
        appointment: newAppointment
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to schedule appointment', details: error.message });
  }
});

app.get('/api/appointments', async (req: Request, res: Response) => {
  try {
    if (isMongoConnected) {
      const appointments = await Appointment.find().sort({ createdAt: -1 });
      return res.json({ success: true, appointments });
    } else {
      return res.json({ success: true, appointments: inMemoryAppointments });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 [Metropolis Server] Running on http://localhost:${PORT}`);
});
