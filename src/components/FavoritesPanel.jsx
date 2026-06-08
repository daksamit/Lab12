import { useEffect, useState } from 'react';
import { workshops } from '../data/workshops.js';
import { subscribeToFavorites } from '../utils/favoritesStore.js';

const FavoritesPanel = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const subscription = subscribeToFavorites(setFavoriteIds);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const favoriteItems = workshops.filter((item) => favoriteIds.includes(item.id));

  return (
    <aside className="side-panel p-4">
      <p className="small text-uppercase fw-semibold text-primary mb-2">
        Wariant rozszerzony
      </p>
      <h2 className="h4 mb-3">Ulubione</h2>
      <p className="text-secondary">
        Ten panel ma reagować na wspólny stan oparty o `BehaviorSubject`.
      </p>

      <div className="count-card p-3 mb-3">
        <div className="small text-uppercase fw-semibold text-primary mb-1">
          Licznik
        </div>
        <div className="display-6 fw-bold mb-0">{favoriteIds.length}</div>
      </div>

      {favoriteItems.length === 0 ? (
        <p className="text-secondary mb-0">
          Po wykonaniu zadania tutaj pojawi się lista wybranych warsztatów.
        </p>
      ) : (
        <ul className="list-group list-group-flush">
          {favoriteItems.map((item) => (
            <li className="list-group-item px-0 bg-transparent" key={item.id}>
              <div className="fw-semibold">{item.title}</div>
              <div className="small text-secondary">{item.levelLabel}</div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default FavoritesPanel;
