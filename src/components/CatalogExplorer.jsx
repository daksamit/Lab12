import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import { workshops } from '../data/workshops.js';
import { addFavorite, removeFavorite, subscribeToFavorites } from '../utils/favoritesStore.js';

const CatalogExplorer = () => {
  const search$ = useMemo(() => new Subject(), []);
  const category$ = useMemo(() => new BehaviorSubject('all'), []);
  const level$ = useMemo(() => new BehaviorSubject('all'), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('Połącz filtry z RxJS i uruchom wyszukiwanie.');
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const favoritesSubscription = subscribeToFavorites(setFavoriteIds);

    return () => {
      favoritesSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // TODO:
    // 1. Dodaj operatory combineLatest, debounceTime, distinctUntilChanged,
    //    map, switchMap, catchError, of i from.
    // 2. Połącz search$, category$ i level$ w jeden przepływ filtrów.
    // 3. Znormalizuj tekst wyszukiwania i opóźnij reakcję dla pola tekstowego.
    // 4. Przed uruchomieniem wyszukiwania ustaw status loading.
    // 5. W switchMap wywołaj funkcję searchWorkshops z src/utils/workshopApi.js.
    // 6. Obsłuż sukces, pusty wynik i błąd.
    // 7. Zwróć funkcję czyszczącą unsubscribe().
    const subscription = search$.subscribe(() => {});

    return () => {
      subscription.unsubscribe();
    };
  }, [category$, level$, search$]);

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearchTerm(nextValue);

    // TODO: przekaż nextValue do search$ przez next().
    void nextValue;
  };

  const handleCategoryChange = (event) => {
    const nextValue = event.target.value;
    setCategory(nextValue);

    // TODO: przekaż nextValue do category$ przez next().
    void nextValue;
  };

  const handleLevelChange = (event) => {
    const nextValue = event.target.value;
    setLevel(nextValue);

    // TODO: przekaż nextValue do level$ przez next().
    void nextValue;
  };

  const toggleFavorite = (id) => {
    if (favoriteIds.includes(id)) {
      removeFavorite(id);
      return;
    }

    addFavorite(id);
  };

  const hasResults = items.length > 0;

  return (
    <section className="main-panel p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <p className="small text-uppercase fw-semibold text-primary mb-2">
            Zadania z RxJS
          </p>
          <h2 className="h3 mb-2">Katalog warsztatów</h2>
          <p className="text-secondary mb-0">
            Zbuduj przepływ, który reaguje na tekst wyszukiwania, kategorię i
            poziom trudności.
          </p>
        </div>
        <div className="status-badge">
          <div className="small text-uppercase fw-semibold text-primary mb-1">
            Status
          </div>
          <div className="fw-semibold">{status}</div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label htmlFor="search" className="form-label fw-semibold">
            Szukaj warsztatów
          </label>
          <input
            id="search"
            className="form-control"
            value={searchTerm}
            placeholder="np. react, accessibility, error"
            onChange={handleSearchChange}
          />
          <div className="form-text">
            Wpisz <code>error</code>, aby zasymulować odpowiedź błędu.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="category" className="form-label fw-semibold">
            Kategoria
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">Wszystkie</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="ux">UX</option>
            <option value="testing">Testowanie</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="level" className="form-label fw-semibold">
            Poziom
          </label>
          <select
            id="level"
            className="form-select"
            value={level}
            onChange={handleLevelChange}
          >
            <option value="all">Wszystkie</option>
            <option value="basic">Podstawowy</option>
            <option value="intermediate">Średni</option>
            <option value="advanced">Zaawansowany</option>
          </select>
        </div>
      </div>

      <article className="hint-card p-3 mb-4">
        <h3 className="h6 mb-2">Dostępne dane</h3>
        <p className="mb-0 text-secondary">
          W starterze masz {workshops.length} warsztatów. Wyniki powinny
          pojawiać się na podstawie połączonych filtrów, a nie pojedynczych
          handlerów działających niezależnie.
        </p>
      </article>

      {status === 'idle' ? (
        <div className="alert alert-secondary mb-4">{message}</div>
      ) : null}

      {status === 'loading' ? (
        <div className="d-flex align-items-center gap-3 loading-panel mb-4">
          <div className="spinner-border" role="status" aria-label="Ładowanie" />
          <span>Ładowanie wyników...</span>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="alert alert-danger mb-4">{message}</div>
      ) : null}

      {status === 'empty' ? (
        <div className="alert alert-warning mb-4">{message}</div>
      ) : null}

      {status === 'success' && hasResults ? (
        <div className="row g-3">
          {items.map((item) => {
            const isFavorite = favoriteIds.includes(item.id);

            return (
              <div className="col-md-6" key={item.id}>
                <article className="workshop-card h-100 p-3">
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                    <div>
                      <span className="badge text-bg-light border mb-2">
                        {item.category}
                      </span>
                      <h3 className="h5 mb-1">{item.title}</h3>
                      <p className="text-secondary small mb-0">{item.levelLabel}</p>
                    </div>
                    <button
                      className={`btn btn-sm ${isFavorite ? 'btn-dark' : 'btn-outline-dark'}`}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                    </button>
                  </div>
                  <p className="mb-0 text-secondary">{item.description}</p>
                </article>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};

export default CatalogExplorer;
