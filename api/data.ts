import axios from 'axios';
import { IExploreData, ICardData, IRoomData } from '../typings/airbnd';

export async function getExploreData() {
  const { data } = await axios.get<IExploreData[]>('https://links.papareact.com/pyp');
  return data;
}

export async function getCardData() {
  const { data } = await axios.get<ICardData[]>('https://links.papareact.com/zp1');
  return data;
}

export async function getRoomsData() {
  const { data } = await axios.get<IRoomData[]>('https://links.papareact.com/isz');
  return data;
}
