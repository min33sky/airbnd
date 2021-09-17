import { IExploreData, ICardData } from './../pages/index';
import axios from 'axios';

export async function getExploreData() {
  const { data } = await axios.get<IExploreData[]>('https://links.papareact.com/pyp');
  return data;
}

export async function getCardData() {
  const { data } = await axios.get<ICardData[]>('https://links.papareact.com/zp1');
  return data;
}
