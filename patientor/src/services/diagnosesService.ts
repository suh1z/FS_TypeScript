import diagnosisEntry from '../../data/diagnoses';

import { Diagnosis} from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosisEntry;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};