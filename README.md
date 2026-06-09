# Laboratorium 12 - Rozwinięcie RxJS

To repozytorium jest starterem do bardziej praktycznego ćwiczenia z `RxJS`. Tym razem pracujesz na osobnym projekcie katalogu warsztatów, w którym kilka źródeł wejścia wpływa na wspólny wynik wyszukiwania.

## Cel

Po wykonaniu zadania powinieneś umieć:

- połączyć kilka strumieni wejściowych w jeden przepływ
- użyć `debounceTime`, `distinctUntilChanged` i `switchMap`
- anulować poprzednie zapytanie po zmianie warunków wyszukiwania
- obsłużyć stany `loading`, `error`, `empty` i `success`
- wykorzystać `BehaviorSubject` do prostego współdzielenia stanu
- wyjaśnić, po co `RxJS` został użyty w tym projekcie

## Wymagania wstępne

Przed rozpoczęciem laboratorium powinieneś rozumieć:

- materiał z `Lab11`
- podstawy `Promise`
- hooki `useEffect`, `useMemo`, `useRef`, `useState`
- filtrowanie danych i podstawy pracy z formularzem

## Start

```bash
npm install
npm run dev
```

- aplikacja: `http://localhost:5173`

## Kontekst

W projekcie nie korzystamy z prawdziwego backendu. Funkcja `searchWorkshops()` z pliku `src/utils/workshopApi.js` symuluje opóźnione odpowiedzi i pozwala zasymulować błąd dla wybranych zapytań. Dzięki temu można przećwiczyć `switchMap` i obsługę błędów bez dodatkowej konfiguracji serwera.

## Co masz zrobić

Uzupełnij `TODO` w tych plikach:

- `src/components/CatalogExplorer.jsx` - zbuduj główny przepływ `RxJS`
- `src/components/CatalogExplorer.jsx` - połącz tekst wyszukiwania, kategorię i poziom trudności
- `src/components/CatalogExplorer.jsx` - zastosuj `switchMap` do pobierania danych
- `src/components/CatalogExplorer.jsx` - obsłuż błędy przez `catchError`
- `src/components/CatalogExplorer.jsx` - zaktualizuj stan UI na podstawie wyniku
- `src/utils/favoritesStore.js` - użyj `BehaviorSubject` do prostego przechowywania ulubionych

## Zadania

### Zadanie 1 - przepływ główny

Połącz trzy źródła danych:

- tekst wyszukiwania
- kategorię
- poziom trudności

Wynik powinien trafić do jednej subskrypcji, która uruchamia wyszukiwanie.

### Zadanie 2 - anulowanie poprzednich zapytań

Zastosuj `switchMap`, aby szybka zmiana filtrów anulowała poprzednią operację i zachowywała tylko najnowszy wynik.

### Zadanie 3 - stany widoku

Obsłuż:

- ładowanie
- brak wyników
- błąd
- sukces

### Zadanie 4 - wariant rozszerzony

Połącz przycisk dodawania do ulubionych z `BehaviorSubject` w `favoritesStore.js`, tak aby licznik i lista ulubionych reagowały na zmiany bez ręcznego przekazywania danych przez wiele poziomów komponentów.

## Kolejność pracy

1. Uruchom projekt i przejrzyj interfejs.
2. Zobacz dane w `src/data/workshops.js`.
3. Przeanalizuj symulowane API w `src/utils/workshopApi.js`.
4. Uzupełnij główny przepływ w `CatalogExplorer.jsx`.
5. Połącz przepływ z aktualizacją stanu i widokiem.
6. Dodaj obsługę błędów.
7. Na końcu wykonaj wariant z `BehaviorSubject`.

## Jak sprawdzić wynik

- szybka zmiana tekstu lub filtrów nie pokazuje przestarzałych wyników
- wpisanie `error` powoduje kontrolowany komunikat błędu
- pusty wynik pokazuje osobny stan interfejsu
- po zmianie filtrów wyświetla się `loading`
- kliknięcie „Dodaj do ulubionych” aktualizuje licznik bez przeładowania

## Wariant minimum

- `combineLatest` lub równoważne połączenie źródeł
- `switchMap`
- `catchError`
- poprawne stany widoku

## Wariant rozszerzony

- `BehaviorSubject` dla ulubionych
- przycisk „Wyczyść filtry”
- automatyczne odświeżenie przez dodatkowy strumień zdarzeń

## Linki
- [tematy projektowe 9, 16, 23 czerwca](https://pwsztaredupl-my.sharepoint.com/:x:/r/personal/d_aksamit_atar_edu_pl/_layouts/15/Doc.aspx?sourcedoc=%7B738AC0C9-487F-4907-8BF3-488CA1112E56%7D&file=Skoroszyt.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&wdOrigin=WAC.EXCEL.HOME-BUTTON%2CAPPHOME-WEB.FILEBROWSER.RECENT&wdPreviousSession=474313be-3300-f8b8-4128-b126d3029d32&wdPreviousSessionSrc=Wac&ct=1780922519943)