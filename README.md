# Teatr Wizja – strona internetowa

Statyczna strona (HTML, CSS, JS, bez frameworków i bez kroku budowania).
Gotowa do wrzucenia na GitHub Pages.

## Jak opublikować na GitHub Pages

1. Załóż na GitHubie nowe repozytorium (np. `teatr-wizja`).
2. Wgraj **całą zawartość** tego folderu do repozytorium
   (pliki `index.html`, `styles.css`, `script.js`, folder `assets/` oraz `.nojekyll`).
   - przez stronę GitHuba: *Add file → Upload files* i przeciągnij wszystko,
   - albo przez `git`:
     ```
     git init
     git add .
     git commit -m "Teatr Wizja - strona"
     git branch -M main
     git remote add origin https://github.com/TWOJA-NAZWA/teatr-wizja.git
     git push -u origin main
     ```
3. W repozytorium wejdź w **Settings → Pages**.
4. W sekcji *Build and deployment* ustaw **Source: Deploy from a branch**,
   wybierz gałąź **main** i katalog **/ (root)**, zapisz.
5. Po chwili strona będzie dostępna pod adresem
   `https://TWOJA-NAZWA.github.io/teatr-wizja/`.

> Ważne: `index.html` musi być w głównym katalogu repozytorium (nie w podfolderze).

## Żywy panel Facebooka (w sekcji Kontakt)

W sekcji *Kontakt* znajduje się osadzony, żywy podgląd profilu na Facebooku
(oficjalna wtyczka **Facebook Page Plugin**). Pokazuje najnowsze posty wprost
z Waszego profilu i aktualizuje się sam, bez żadnego backendu i bez własnego
serwera. To najprostszy i najbezpieczniejszy sposób „integracji z Facebookiem"
na stronie statycznej.

Jak podmienić profil (gdyby kiedyś zmienił się adres):
- otwórz `index.html` i znajdź fragment `plugins/page.php`,
- w parametrze `href` wpisz adres swojego profilu (zakodowany), np.
  `href=https%3A%2F%2Fwww.facebook.com%2Fteatrwizja`,
- przycisk pod podglądem („Otwórz nasz profil na Facebooku") też kieruje na ten profil.

Gdyby u kogoś podgląd się nie wyświetlał:
- profil na Facebooku musi być publiczny,
- niektóre przeglądarki blokują treści z Facebooka przy bardzo restrykcyjnej
  ochronie prywatności lub z blokerami; wtedy nadal działa przycisk linkujący
  do profilu,
- jeśli chcesz mieć pewność na własnej domenie, można (bezpłatnie, bez
  programowania) założyć Facebook App ID i dodać swoją domenę w ustawieniach
  aplikacji; Facebook czasem tego wymaga dla osadzonych wtyczek.

Uwaga o opiniach przez API: pobieranie opinii/recenzji przez Facebook Graph API
wymaga własnego serwera, tokenów dostępu i przejścia weryfikacji aplikacji w
Meta. Na czystej stronie statycznej (GitHub Pages) nie da się tego zrobić
w sposób bezpieczny i trwały. Dlatego opinie w sekcji *Opinie* są wpisane
na stałe w `index.html` (można je swobodnie edytować), a żywy strumień postów
zapewnia wtyczka Page Plugin opisana wyżej.

## Spektakle i plakaty (sekcja „Nasze spektakle")

Każdy spektakl ma własną kartę utrzymaną w stylu swojego plakatu (kolory i akcenty).
Karty leżą naprzemiennie (plakat raz z lewej, raz z prawej) i są podzielone na
„Gramy w tym sezonie" (aktualne) oraz „Wcześniej na naszych scenach" (poprzednie).

- podglądy plakatów: `assets/poster-*.jpg`,
- pliki do pobrania: `assets/plakat-*.pdf` (kliknięcie plakatu otwiera PDF,
  przycisk „Pobierz plakat" go pobiera),
- terminy spektakli są wpisane w `index.html` w listach `pcard__meta` (łatwo zmienić).

Wszystkie cztery spektakle mają już komplet: podgląd plakatu (`poster-*.jpg`)
oraz plik PDF do pobrania (`plakat-*.pdf`).

## Logo (`assets/logo-hero.png`)

Logo pochodzi z wektorowego pliku plakatu i jest wycięte do samej treści oraz
podane w bieli na przezroczystym tle, dzięki czemu jest ostre i wyraźne.
Ten sam plik działa w trzech miejscach: w hero (duże, na miękkiej kosmicznej
poświacie, bez ramki), w pasku menu na górze oraz w stopce. Gdy pojawi się nowa
wersja, wystarczy podmienić `logo-hero.png` (biały wordmark, przezroczyste tło,
przycięty do treści). Rozmiary ustawia się w `styles.css`: hero `.brandmark`,
menu `.brand__mark`, stopka `.footer__logo`.

## Kontakt

W sekcji *Kontakt* są dwaj promotorzy kultury (imię, telefon `tel:`, e-mail
`mailto:`) oraz kanały Facebook i YouTube. Dane zmienisz, wyszukując w `index.html`
frazy `Marzena Ciecierska` lub `Maciej Rafałowicz`. Zdjęcia założycielek są
wyświetlane w czerni i bieli (filtr CSS `grayscale` na `.member__photo img`).

## Filmy

Filmy z YouTube ładują się dopiero po kliknięciu (lazy-loading przez
`youtube-nocookie`), dzięki czemu strona otwiera się szybko.

## Wydajność

Strona została zoptymalizowana pod płynność: tło kosmiczne jest na jednej
stałej warstwie, panele nie używają kosztownego rozmycia tła, animowane gwiazdy
mają ograniczoną gęstość i zatrzymują się, gdy karta jest nieaktywna, a duże
zdjęcia są skompresowane i ładują się leniwie. Osoby z włączoną opcją
ograniczenia ruchu (`prefers-reduced-motion`) zobaczą wersję bez animacji.

---

### Pliki

```
index.html      - struktura strony
styles.css      - wygląd (motyw „kosmos", paleta ze zdjęć ze spektakli)
script.js       - animowane gwiazdy, parallaksa, menu, filmy
assets/         - logo, zdjęcia założycielek, kadry ze spektakli, plakaty
                  (poster-*.jpg podglądy, plakat-*.pdf do pobrania), favicony
.nojekyll       - informuje GitHub Pages, by nie przetwarzał plików przez Jekyll
```

## Cache i aktualizacje (ważne)

Pliki `styles.css`, `script.js` i logo są podpięte z końcówką `?v=7`. To wymusza
w przeglądarce pobranie świeżej wersji po każdej aktualizacji. Jeśli zmienisz te
pliki, podbij numer (np. `?v=8`) w `index.html`, a każdy zobaczy nową wersję bez
czyszczenia cache. Podczas testów najpewniej działa okno prywatne (Ctrl+Shift+N).
