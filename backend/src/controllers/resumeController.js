// Gestion des CV
const Resume = require('../models/Resume');

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.userId });
    res.json(resumes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createResume = async (req, res) => {
  try {
    const resume = new Resume({
      ...req.body,
      user: req.userId
    });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ message: "CV non trouvé" });
    }
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!resume) {
      return res.status(404).json({ message: "CV non trouvé" });
    }
    res.json({ message: "CV supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};