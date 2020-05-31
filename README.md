# SNES Wiki 

## Cum va funcționa site-ul:

* exista 3 tipuri de useri: moderatori, user înregistrat și vizitator.
* articolele sunt vizibile tuturor utilizatorilor.
* toți utilizatorii pot semnala informații false dintr-un articol (*).
* informațiile sunt structurate în secțiuni și articole.

## Rolurile utilizatorilor:

* un moderator poate: 
    -
    * accepta sau nu schimbări la articole
    * promova și depromova utilizatori (cu acordul altor moderatori) 
    * activa și dezactiva conturile utilizatorilor
* un utilizator poate:
    -
    * modifica articole
    * comenta asupra articolelor (*)
* un vizitator poate:
    -
    * creea un cont

## Detalii de implementare:

* Modificarea articolului se va face asupra întregului conținut. Moderatorii aprobă sau nu schimbările.
* Odată modificat, articolul se stochează într-un fișier descriptiv cu numele articolului, al utilizatorului și data la care a fost făcută schimbarea.
* Modificările ne-revizuite se stochează într-un tabel cu nume caracteristic, drept cale către acel fișier, alături de numele utilizatorului, al articolului și data.
* Utilizatorii sunt stocați într-o bază de date, unde sunt marcate datele introduse și privilegiile.
* pagina se separă în 5 zone: login, titlu, secțiuni, conținut, subsol.
* secțiunile sunt: pagina principală, link-uri utile, problemele pe care le poate conține site-ul, pagini și documentație.
* acțiunile care nu țin de vizualizarea articolelor se gestionează cu pop-ups, pentru că nu știu cum se pot folosi mai multe layout-uri. Printre acestea se găsesc: creeare de cont/logare, revizuire articol, editare articol. Posibil să adaug mai multe acțiuni dacă totul merge bine.
* se vor folosi stylesheets aleatoare la reîncărcarea paginii