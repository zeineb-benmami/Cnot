import axios from 'axios';
const url = 'http://localhost:3000/events';
import {Event} from '../models/event';

export const getallEvents = async (id:string) => {
  id = id || '';
  return await axios.get(`${url}/${id}`);
};
export const addEvent = async (event:Event) => {
  return await axios.post(url, event);
};
export const editEvent = async (id:string, event:Event) => {
  return await axios.put(`${url}/${id}`, event);
};
export const deleteEvent = async (id:string) => {
  return await axios.delete(`${url}/${id}`);
};
