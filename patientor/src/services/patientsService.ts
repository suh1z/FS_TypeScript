import patientEntry from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NewPatient, Patient } from '../types';

const getEntries = (): Patient[] => {
    return patientEntry.map(({ id, name, occupation, gender, dateOfBirth, entries }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
        entries
      }));};

const addPatient = ( entry: NewPatient ): Patient => {
  const id = uuidv4();
  const newPatient = {
    id: id,
    ...entry
  };
  patientEntry.push(newPatient);
  return newPatient;
};

const idPatient = (id: string): Patient | undefined => {
  return patientEntry.find(patient => patient.id === id);
};

export default {
  getEntries,
  addPatient,
  idPatient
};


