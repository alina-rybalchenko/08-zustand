import axios from 'axios';
import type { Note } from '@/types/note';

interface FetchNotesProps {
  search?: string;
  page: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: TOKEN ? `Bearer ${TOKEN}` : undefined,
  },
});

export const fetchNotes = async ({
  search,
  page,
  tag,
}: FetchNotesProps): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page, perPage: 12, search };
  if (tag) params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (data: CreateNoteProps): Promise<Note> => {
  const { data: note } = await api.post<Note>('/notes', data);
  return note;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
