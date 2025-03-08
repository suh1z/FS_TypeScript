import { Entry, Gender, NewPatient } from './types';
import { z } from 'zod';


export const newEntrySchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  entries: z.array(z.any()).transform(val => val as Entry[])
});

const toNewPatientEntry = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'occupation' in object && 'gender' in object && 'ssn' in object && 'entries' in object){
  const newEntry: NewPatient= {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    entries: parseEntries(object.entries),
  };

  return newEntry;
}
throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing Occupation');
  }

  return occupation;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender (male, female or other');
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn|| !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Entries should be an array');
  }
  entries.forEach(entry => {
    if (typeof entry !== 'object' || entry === null) {
      throw new Error('Each entry should be an object');
    }
  });
  return entries as Entry[];
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

export default toNewPatientEntry;