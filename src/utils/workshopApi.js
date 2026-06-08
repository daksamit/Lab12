import { workshops } from '../data/workshops.js';

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const searchWorkshops = async ({ searchTerm, category, level }) => {
  await delay(450);

  if (searchTerm.includes('error')) {
    throw new Error('Symulowany błąd API. Złap go przez catchError.');
  }

  return workshops.filter((item) => {
    const matchesSearch =
      searchTerm.length === 0 ||
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || item.category === category;
    const matchesLevel = level === 'all' || item.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });
};
