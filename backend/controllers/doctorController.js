import Doctor from "../models/DoctorSchema.js";

export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.json({ success: true, doctor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    // Log incoming request details for debugging client connectivity
    console.log('GET /api/doctors called --', {
      time: new Date().toISOString(),
      ip: req.ip,
      origin: req.headers.origin,
      ua: req.headers['user-agent'],
    });

    const doctors = await Doctor.find();
    res.status(200).json({ success: true, data: doctors });
  } catch (err) {
    console.error('Error in getDoctors:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
