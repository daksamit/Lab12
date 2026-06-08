import { BehaviorSubject } from 'rxjs';

const favorites$ = new BehaviorSubject([]);

export const subscribeToFavorites = (callback) => favorites$.subscribe(callback);

export const addFavorite = (id) => {
  const current = favorites$.getValue();

  if (current.includes(id)) {
    return;
  }

  favorites$.next([...current, id]);
};

export const removeFavorite = (id) => {
  const current = favorites$.getValue();
  favorites$.next(current.filter((itemId) => itemId !== id));
};

export const clearFavorites = () => {
  favorites$.next([]);
};
