import axios from 'axios';
import { Note, NewNote } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllNotes = async () => {
  const response = await axios
    .get<Note[]>(baseUrl);
  return response.data;
};

export const createNote = async (object: NewNote) => {
  try {
  const response = await axios
    .post<Note>(baseUrl, object);
  return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
  };