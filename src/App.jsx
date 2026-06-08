import CatalogExplorer from './components/CatalogExplorer.jsx';
import FavoritesPanel from './components/FavoritesPanel.jsx';

const App = () => (
  <main className="container py-4 py-lg-5">
    <section className="hero-panel p-4 p-lg-5 mb-4">
      <p className="text-uppercase fw-semibold text-primary-emphasis mb-2">
        Laboratorium 12
      </p>
      <h1 className="display-5 fw-bold hero-title mb-3">
        RxJS w bardziej praktycznym przepływie
      </h1>
      <p className="lead text-secondary mb-0">
        Projekt łączy kilka źródeł wejścia, symulowane API i prosty stan
        współdzielony przez `BehaviorSubject`.
      </p>
    </section>

    <div className="row g-4 align-items-start">
      <div className="col-xl-8">
        <CatalogExplorer />
      </div>
      <div className="col-xl-4">
        <FavoritesPanel />
      </div>
    </div>
  </main>
);

export default App;
