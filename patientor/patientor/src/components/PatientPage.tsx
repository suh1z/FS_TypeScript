import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientData);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosis = async () => {
      try {
        const { data: dianogsisData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(dianogsisData);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDiagnosis();
    void fetchPatient();
  }, [id]);

  const getDiagnosis = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  return (
    <div>
      {patient ? (
        <>
          <h2>{patient.name}</h2>
          <p>Gender: {patient.gender}</p>
          <p>Occupation: {patient.occupation}</p>
          <p>Date of Birth: {patient.dateOfBirth}</p>
          <p>SSN: {patient.ssn}</p>

          <h3>Entries:</h3>
          {patient.entries ? (
            <ul>
              {patient.entries.map((entry) => (
                <li key={entry.id}>
                  <p>Date: {entry.date} <i>{entry.description}</i></p>

                  {entry.diagnosisCodes && (
                    <div>
                      <h4>Diagnoses:</h4>
                      <ul>
                        {entry.diagnosisCodes.map((code) => (
                          <li key={code}>
                            {code} - {getDiagnosis(code)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
            </li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
};

export default PatientDetailsPage;
