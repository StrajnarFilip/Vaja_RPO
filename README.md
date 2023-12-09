# Vaja_RPO

![.NET](https://img.shields.io/badge/Zaledni_del_narejen_z_.NET-grey?logo=dotnet&labelColor=purple)


![Angular](https://img.shields.io/badge/Uporabniški_vmesnik_narejen_z_Angular-grey?logo=angular&labelColor=A00000)

## Opis
V tej nalogi bomo ustvarili spletno aplikacijo za napoved vremena. Nalogo opravljamo za predmet `Razvoj programske opreme`.

Projekt je razdeljen na dva dela, `frontend` in `backend`. V `frontend` mapi se nahaja Angular projekt. Ta aplikacija uporabniku prikazuje podatke o vremenu. V `backend` mapi se nahaja .NET projekt. V C# programskem jeziku je napisana REST API strežniška aplikacija, ki pridobiva informacije iz drugih virov, jih shrani in se obnaša kot predpomnilnik (cache).

## Zaslonski posnetki

`Zaenkrat prazno`

## Namestitev

Celoten projekt najprej kloniramo z ukazom:

```pwsh
git clone https://github.com/StrajnarFilip/Vaja_RPO.git
```

Da zaženemo strežniško aplikacijo, se postavimo v mapo `backend`, nastavimo okoljsko spremenljivko `OPENWEATHERMAP_KEY`
in izvedemo `dotnet run` ukaz:

```pwsh
# Za izvajanje potrebujemo .NET orodje
cd Vaja_RPO/backend
$env:OPENWEATHERMAP_KEY="xxx"
# Z Bash je samo: OPENWEATHERMAP_KEY="xxx"
dotnet run
```

Po potrebi se postavimo nazaj v osnovno mapo `Vaja_RPO`.
```pwsh
cd ../../
```

Nato se postavimo v mapo `frontend`, namestimo potrebno programsko opremo in zaženemo projekt:

```pwsh
# Za izvajanje potrebujemo NodeJS in NPM
cd Vaja_RPO/frontend
npm i
npx ng serve
```
Spletna aplikacija napisana v Angular ogrodju je na voljo na vratih 4200.

[Bližnjica do http://127.0.0.1:4200](http://127.0.0.1:4200)


## Uporaba

### Nastavitve
Spletna aplikacija je intuitivna za uporabo. Na vrhu okna je polje za izbiro jezika. Trenutno so na voljo naslednji jeziki:

- Slovenščina
- Angleščina
- Nemščina
- Kitajščina
- Italjanščina

![image](https://github.com/StrajnarFilip/Vaja_RPO/assets/46705237/3523e6c9-2c81-42d0-b28b-e0eb2f0b115a)


Na vrhu okna je možno izbratu tudi željeno temo. Trenutno so na voljo naslednje teme:

- Svetla
- Temna
- Rumena na modrem
- Zelena na črni
- Črna na bež
- Črna na beli
- Bela na črni


![image](https://github.com/StrajnarFilip/Vaja_RPO/assets/46705237/1257a8ee-a046-444a-b251-ce4196b035a2)

---

Na vrhu okna sta tudi dva velika gumba: `Mapa Slovenije` in `Priljubljeni`.

---

### Mapa Slovenije

Gumb `Mapa Slovenije` prikaže veliko mapo Slovenije z regijami in prikazanimi temperaturami
mest v teh regijah. Na poljubno regijo lahko tudi pritisnemo in tako se nam odpre okno s podrobnejšimi podatki o trenutnem vremenu in napovedi vremena za to mesto. Na voljo
so nam novi 3 gumbi. Gumb `Trenutno vreme` (kar je tudi privzeto) nam pokaže podrobne podatke trenutnega vremena. Gumb `Napoved vremena` nam pokaže napoved za naslednjih 7 dni.
Gumb `Dodaj med priljubljene` pa doda ta kraj na seznam priljubljenih krajev.

![image](https://github.com/StrajnarFilip/Vaja_RPO/assets/46705237/ee166446-af37-43b2-aeaa-f23a2f4ca0ba)

---

### Priljubljeni

Gumb `Priljubljeni` nam odpre okno na katerem lahko vidimo in upravljamo s priljubljenimi kraji.
V polje lahko vpišemo ime novega kraja, katerega želimo dodati med priljebljene in nato s pritiskom na gumb
`Dodaj` ga dodamo v seznam. Na desni strani je seznam vse priljubljenih krajev. Vsak kraj lahko pritisnemo
in tako pridemo do napovedi za ta kraj, lahko pa ga tudi odstranimo s pritiskom na gumb za odstranitev (🗑️).
Pritisnemo lako tudi gumb, ki odstrani vse priljubljene kraje.

![image](https://github.com/StrajnarFilip/Vaja_RPO/assets/46705237/40fe8bbd-aaf3-4f98-8eca-af9faceee6fb)


## Podpora

V primeru težav, se zanjdite sami. Tudi mi ne vemo odgovora. 😎


## Testiranje


Aplikacija testirana na realnih podatkih. Vsi testi pokazali previlno delovanje aplikacije.

## Prispevki


`Zaenkrat prazno, CONTRIBUTING.md`

## Avtorji in zahvala

Zahvaljujemo se Žiki Jeram, Damijanu Jančarju in Filipu Strajnarju za potrpežljivost.

## Licenca

Projekt je dostopen pod pogoji licence JAVNA LICENCA EVROPSKE UNIJE v. 1.2. Dokument je dostopen v [LICENSE](https://github.com/StrajnarFilip/Vaja_RPO/blob/master/README.md) datoteki.

`SPDX: EUPL-1.2`.

[Licenca v drugih jezikih](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12)

## Status projekta

Zaključna faza.
