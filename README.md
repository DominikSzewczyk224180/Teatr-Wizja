# Teatr Wizja — strona internetowa

Statyczna strona (HTML + CSS + JS, bez frameworków i bez kroku budowania).
Gotowa do wrzucenia na **GitHub Pages**.

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

## Co warto uzupełnić / podmienić

W pliku `index.html` znajdziesz miejsca przygotowane jako placeholdery:

- **Adres e-mail** `kontakt@teatrwizja.pl` — występuje w sekcji *Kontakt*
  i w formularzu. Zamień na prawdziwy adres (wyszukaj w pliku `kontakt@teatrwizja.pl`,
  pojawia się też w `script.js` przy wysyłce formularza).
- **Telefon** — formularz ma pole na telefon; jeśli chcesz pokazać numer
  kontaktowy na stronie, można go dodać w sekcji *Kontakt* obok e-maila.
- **Linki** do Facebooka i YouTube są już wpięte (profil i kanał Teatru Wizja).

## Formularz kontaktowy

Strona jest statyczna, więc formularz po wysłaniu otwiera program pocztowy
użytkownika z gotową treścią (mechanizm `mailto:`). Jeśli w przyszłości
będziesz chciała odbierać zgłoszenia bez poczty, można podpiąć darmową usługę
typu Formspree / Getform (wystarczy zmienić obsługę formularza).

## Opinie i posty z Facebooka

Opinie nauczycieli i placówek są **wpisane na stałe** w `index.html`
(sekcja *Opinie*) — to najszybsze i najpewniejsze rozwiązanie dla strony statycznej.
Gdybyś chciała wyświetlać **na żywo** posty/opinie z profilu FB, można dołożyć
oficjalną wtyczkę *Facebook Page Plugin* (osadzany `<iframe>`), bez potrzeby
pisania integracji z API.

## Filmy

Filmy z YouTube ładują się dopiero po kliknięciu (tzw. lazy-loading przez
`youtube-nocookie`), dzięki czemu strona otwiera się szybko.

---

### Pliki

```
index.html      — struktura strony
styles.css      — wygląd (motyw „kosmos”, paleta ze zdjęć ze spektakli)
script.js       — animowane gwiazdy, parallaksa, menu, formularz, filmy
assets/         — logo, zdjęcia założycielek, kadry ze spektakli, favicony
.nojekyll       — informuje GitHub Pages, by nie przetwarzał plików przez Jekyll
```
