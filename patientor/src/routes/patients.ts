import express from 'express';

import patientsService from '../services/patientsService';
import { newEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientsService.idPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send("Patient not found");
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = newEntrySchema.parse(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;