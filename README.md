# starter

Der WDR-Data Starter ermöglicht es JournalistInnen, unsere Design-Patterns und die Komponentenbibliothek für datengesteuerte Journalismusprojekte zu nutzen.

Ziele:

- Einen abgenommenen Rahmen haben, in dem Datenprojekte schneller stattfinden können
- Neue Visualisierungsformen mobile first und accessible erproben
- Entwicklungen wiederverwendbar machen (Als Datengeschichte auf data.wdr.de und als Grafik-iFrame im CMS)

## Für JournalistInnen

### Wie nehme ich ein Datenprojekt ab?

- Ersteller\*in schickt Link zu:

  - Preview bei Netlify - z.B.: `http://data-wdr.netlify.com/oper-in-nrw`
  - Markdown-File dazu in Github - z.B.: `https://github.com/wdr-data/starter/pages/index.md`

- Zum Bearbeiten:

  - Auf Stift-Icon oben rechts: Edit this File
  - Änderungen vornehmen / Preview ansehen
  - Zum Abschluss unten unter 'Commit changes' die Änderung dokumentieren
  - Auf 'commit changes' klicken

- Commit löst aus:
  - Änderungen werden dokumentiert (und sind rückgängig zu machen)
  - Änderungen werden im Slack gepostet
  - Automatische Veröffentlichung der Änderung bei Netlify

### Wie lege ich ein neues Datenprojekt an? (Alternativ Datenteam darum bitten)

:globe_with_meridians: https://github.com/wdr-data/starter/

- Für den Zugang ist ein Github Account nötig

Schritte:

- Für eine neue Story
:globe_with_meridians: [How To Fork Your Own GitHub Repository](https://medium.com/@mikezrimsek/fork-your-own-github-repository-19ad4582b50a)

1. Ein neues, leeres Repo unter data.wdr.de anlegen

- Projekte können wahlweise von Anfang an 'öffentlich' sein oder erst später veröffentlicht werden

2. `git clone <new repository>.git` des neuen Repos auf dem eigenen Rechner
3. In das neue Verzeichnis wechseln: `cd <new repository>`
4. Die Referenz zum starter Verzeichnis hinzufügen `git remote add upstream https://github.com/wdr-data/starter.git`
5. Alle Inhalte aus dem Starter ins neue Verzeichnis ziehen: `git pull upstream main`
6. Alle Inhalte zum neuen Verzeichnis pushen: `git push origin master`

#### Mit Netlify verbinden
:arrow_right: [Netlify.com](https://www.netlify.com/)
Eigenen kostenlosen Account anlegen oder WDR Data fragen
- New site from git
- Github auswählen
- Ggf. mit Github verbinden / authentifizieren (nur einmal nötig)
- Repo auswählen
- Branch to deploy: master
- Build command: yarn build
- Publish directory: public
- Ggf. unter Site Details: Change site name

#### Mit Slack verbinden (optional)
- ggf. neuen Channel für das Projekt anlegen
- `/github subscribe wdr-data/ddj-test`

### Meine Story bearbeiten

Unter /pages die index.md mit eigenen Inhalten überschreiben:

#### Metadatenfelder für SEO, Twitter-Cards, Facebook Open-Graph

```
---
title: "Opern-Spielpläne in NRW: tot und männlich"
description: WDR 3 Datenanalyse der Opern-Spielzeit 2018/2019
author: Niklas Rudolph, Patricia Ennenbach
pub_date: "2019-07-15"
heroImage: "richard-wagner-und-freunde.jpg"
heroAlt: "Richard Wagner und seine Freunde"
heroCredit: "Richard Wagner und seine Freunde"
sharingImageFacebook: "richard-wagner-und-freunde_facebook.jpg"
sharingImageTwitter: "richard-wagner-und-freunde_twitter.jpg"
cg1: "WDR"
cg2: "Data"
cg3: "WDR 3"
cg4: "Opern-Spielpläne in NRW: tot und männlich"
---
```

- `title` - **Überschrift**
- `description` - **Beschreibung**
  - für das Google-Suchergebnis
  - ca. 160 Zeichen
- `author` - **Liste der AutorInnen**
  - als Liste (Spiegelstriche, eingerückt)
- `pub_date` - **Veröffentlichungsdatum**
  - z.B. `2019-06-27`
- `heroImage` - **Titelbild**
- `heroAlt` - **Alt-Attribut für Titelbild**
- `heroCredit` - **Credit für Titelbild**
- `sharingImageFacebook:` - **Bild für Faceook open graph**
- `sharingImageTwitter:` - **Bild für Twitter card**

- Die Bilder für Facebook und Twitter werden in static/ abgelegt

#### Webtrekk
Im Kopf der src/pages/index.md: 
  - ! `pub_date: "2019-07-15"` muss in diesem Datums-Format vorhanden sein
  - Anhand dieses Schemas ausfüllen:
    - cg1: "WDR"
    - cg2: "Data"
    - cg3: "WDR 3" - Partnerredaktion
    - cg4: "Opern-Spielpläne in NRW: tot und männlich" - H1 (Hauptüberschrift) des Stücks
 - Optional kann auch eine `cg5: ` vergeben werden 

#### Sharing

Die Inhalte der Komponente werden auch im Kopf der index.md festgelegt:



### Texte in Markdown

Die eigentliche Geschichte wird in **Markdown** geschrieben, das ist eine vereinfachte Auszeichnungssprache fürs Web.

:bulb: [Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

#### Bilder

- Unter /static werden die Bilddateien für das Projekt abgelegt (HeroImage, weitere Bilder)

heroImage: 1920x1080 Sophora / Full HD
Twitter: 2:1 - mindestens 300 x 157
Facebook: 1200 x 630

Weitere Bilder:

- 1920x1080 Sophora / Full HD

Bild einfügen:

```
<figure role="group">
<img src="berthold-schneider-credit-jens-grossmann.jpg" alt="Der Wuppertaler Opernintendant Berthold Schneider, fotografiert von Jens Grossmann" />
<figcaption style="text-align: end;">Berthold Schneider</figcaption>
</figure>
```

### Weitere Komponenten in Markdown einbinden

Es können Komponenten aus der Bibliothek unter wdr-data.netlify.com/components eingebunden werden. Dazu wird die Markdown-Erweiterung [MDX](https://mdxjs.com/) verwendet.

Um Komponeneten nutzen zu können, müssen sie in der index.md importiert werden. Laut Konvention oben unter den Metadaten.

```
import DataWrapper from '../components/datawrapper/datawrapper.jsx'
import Quote from '../components/quote/quote.jsx'
import Accordion from '../components/accordion/accordion.jsx'
import Webtrekk from '../components/webtrekk/webtrekk.jsx'
import Sharing from '../components/sharing/sharing.jsx'
```

### Datawrapper

#### Beim Grafiken bauen beachten

- Design: Datawrapper
- Titel ausblenden, Subtitle weglassen (passiert im Markdown des Projekts)
- Datenquelle, Link zur Datenquelle und Verfasserzeile ausfüllen
- Social Media Sharing aus
- Farbskala anpassen: Für unterschiedliche Graphentypen stehen Möglichkeiten der farblichen Modifizierbarkeit zur Verfügung. Beispielhaft folgen zwei Optionen.

1. Farben > importieren `#dadfdf,#b6cad1,#5bb1c0,#365886,#1d2124`
   ![](https://i.imgur.com/VhffYRF.png)

2. Farbwerte ersetzen:
   #1D2124 (WDR Dunkelblau)
   #00345E (WDR Blau)
   #007381 (WDR Petrol)
   #B37500 (WDR Honiggelb)

Fertige Grafik veröffentlichen und Datawrapper-Pfad kopieren:
`//datawrapper.dwcdn.net/6D2bM/4/`

#### Maps und Charts einbinden

Um eine im Datawrapper erstellte Grafik einzubinden, wird in den Fließtext folgendes eingebaut:

```
### Jeder dritte Komponist lebt - wird aber kaum aufgeführt

<figure role="group">
    <figcaption> Bei Klick auf 'KomponistInnen' ist zu sehen, wie das Verhältnis von verstorbenen zu lebenden KomponistInnen ist.</ figcaption>
    <DataWrapper
        alt="Fast jede dritte KomponistIn lebt, aber nur 9 % der Aufführung stammen von ihnen."
        title="Nur 9 % der Aufführungen stammen von lebenden KomponistInnen."
        src="//datawrapper.dwcdn.net/6D2bM/4/"
    />

</figure>
```

- H3-Überschrift der Grafik - möglichst sprechend: So what? Was ist die Erkenntnis?
- Figcaption: Erklärung der Grafik, was ist zu sehen? Was kann wie angeklickt werden?
- alt: Alternativ-Text: Textlichte Beschreibung des Inhalts
- title: Wird aus der H3-Überschrift der Grafik übernommen
- scr: Datawrapper-Pfad einfügen

### Quote

Zitat mit Nennung des Urhebers, Verlinkung möglich.

Ohne Link:

```
<Quote author="Berthold Schneider, Intendant Oper Wuppertal">Die Oper ist stark genug, dass sie sich immer wieder verändern wird.</Quote>
```

Mit Link:

```
<Quote author={
<a href="https://blogs.nmz.de/badblog/2018/04/10/die-ernuechternde-opernstatistik-der-spielzeit-2017-2018/" target="_blank" rel="noopener noreferrer">Moritz Eggert</a>
}>Überlebenschance der Gattung Oper, wenn sich nicht grundlegend etwas ändert: 0%</Quote>
```

### Accordion
  - Die Inhalte liegen als einzelne .md Dateien in /accordion
  - Um Inhalte zu ändern, wird die entsprechende .md Datei geändert: 
  [authors.md](https://github.com/wdr-data/starter/blob/master/accordion/authors.md)
  [credits.md](https://github.com/wdr-data/starter/blob/master/accordion/credits.md)
  [hints.md](https://github.com/wdr-data/starter/blob/master/accordion/hints.md)
  [sources.md](https://github.com/wdr-data/starter/blob/master/accordion/sources.md)

#### Data

- unter /data werden Daten (.csv, .json etc.) und Datenanalyse-Notebook abgelegt

## Für DesignerInnen

### Typografie

Im Design greifen wir auf die u.g. Schriften zurück:

- Google Font [Merriweather](https://fonts.google.com/specimen/Merriweather?selection.family=Merriweather) in Regular 400
- Google Font [Open Sans](https://fonts.google.com/specimen/Open+Sans) in Light 300 und Semibold 600

Eine Übersicht zur Typografie befindet sich hier: https://wdr-data.netlify.com/components/?path=/story/typography--default

### Farben

Die Farbkontraste für das gesamte Design sind im [Kontrast Checker](https://contrast-ratio.com/) überprüft worden.

- Schriftfarbe: #1D2124 (WDR Dunkelblau)
- Flächenfarbe: #00345E (WDR Blau)
- Highlightfarbe für Links: #007381 (WDR Petrol)
- Akzentfarbe: #B37500 (WDR Honiggelb)

### Logo & Header

Im oberen Bereich einer jeden Dataseite befindet sich lediglich das WDR Logo, mithilfe dessen man aus der Datawelt zurück in die WDR Welt navigieren kann.

- Falls ein Hero Image vorhanden ist: Weißes WDR Logo im Rechteck auf Blau
- Falls kein Hero Image vorhanden ist: Blaues WDR Logo auf weiß

### Iconography

https://icomoon.io/#preview-free

### Designprinzipien

- Arbeite mit einfach erkennbaren visuellen Hierachien
- Nutze ein klar strukturiertes Layout ohne Ablenkungen mit Fokus auf Inhalten
- Erschaffe ein konsistentes Design mit modular einsetzbaren und wiederkehrenden Elementen
- Gestalte ein leichtes, modernes und ansprechendes Design mit Mut zu Weißraum

### Sketch files

> ToDo: Sketch Datei hinterlegen

## Für EntwicklerInnen

- Pull-Request stellen oder per Mail / bei Github darum bitten, Teil des Teams zu werden: [wdr-data@hacking.studio](mailto:wdr-data@hacking.studio)

Repository: https://github.com/wdr-data/starter

### Wie entwickle ich lokal?

Voraussetzungen:
- Git installieren
- Code Editor (z.B. VS Code installieren)
- Node installieren
- Yarn installieren 

Entwicklung: 
- Zu Repo hinzufügen lassen
- `Git clone Name-des-repos` kopiert das Projekt auf den eigenen Rechner
- Änderungen machen in `src/pages/index.md` - Änderungen speichern 
-  Um das Projekt zu lokal zu starten: `yarn start` (Solange das läuft, werden gespeicherte Änderungen automatisch erkannt und die Seite neu compiliert)  
- Um die Änderungen zu dokumentieren und zu veröffentlichen: 
``` 
git status
git add name-der-datei.md
git commit -m ":bento: Grund für die Änderung"
git status (Alles grün?)
git push
```
:globe_with_meriadians: [Git cheat sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)

### Wie baue ich eine neue Komponente?

Komponenten liegen im Git Repo unter `src/components`. Jede Komponente hat einen eigenen Unterordner mit folgenden Dateien:

- JSX-Datei - React-Code der Komponente
- CSS-Datei - Styling
- `.stories.jsx` - Enthält die Stories für das Storybook

### Wie integriere ich React Komponenten?

Am Beispiel [Semiotic](https://semiotic.nteract.io/)

- Neuen Branch anlegen feature/semiotic
- yarn add xy
- Unterordner für die Komponente anlegen
- JSX, CSS und `stories.jsx` Datei anlegen

### Guides / Manuals für React

- https://reacttraining.com/blog/javascript-the-react-parts/
- https://reactjs.org/tutorial/tutorial.html
- https://leanpub.com/the-road-to-learn-react/
- https://reactpatterns.com/
- https://www.learnstorybook.com/react/en/simple-component/
- https://reactjs.org/docs/faq-styling.html
- https://github.com/css-modules/css-modules/blob/master/README.md

#### Storybook

:bulb: [Storybook Dokumentation](https://storybook.js.org/)

Eine lebende Dokumentation der Komponentenbibliothek. Hier kann jede Komponente in ihren Ausprägungen angesehen und ausprobiert werden.

:arrow_right: [Starter-Komponenten](https:/wdr-data.netlify.com/components) (unser Storybook)

Das Ziel ist die Funktion der Komponente greifbar zu machen. Dazu können entweder mehrere Stories pro Komponente erstellt oder [Knobs](https://github.com/storybookjs/storybook/blob/master/addons/knobs/README.md#available-knobs) benutzt werden.

> ToDo: Screenshot hinzufügen

### Gatsby: Publishing-Umgebung

Der Starter nutzt [Gatsby](https://www.gatsbyjs.org/) zum Generieren von statischen HTML-Seiten aus unserem Basis-Layout und Markdown-Inhalten.

Das Gatsby-Setup wurde auf Basis des [Schnellstart-Tutorial](https://www.gatsbyjs.org/docs/quick-start) aufgebaut.

Ein Großteil der Konfiguration von Gatsby befindet sich in `gatsby-config.js`.

#### Relevante Ordner für Gatsby

- `src/pages`
  - Ablage für statische Inhaltsseiten
  - :bulb: [Gatsby: Mit Seiten arbeiten](https://www.gatsbyjs.org/tutorial/part-one/#familiarizing-with-gatsby-pages)
  - aus jeder JS(X)-Datei wird eine statische Seite generiert
  - der Dateiname dient als URL
  - `index.md` wird zur Startseite
- `src/templates`
  - Ablage für Seitenvorlagen
  - :bulb: [Gatsby: Seiten generieren](https://www.gatsbyjs.org/tutorial/part-seven/#creating-pages)
  - enthält `default.jsx` - bestimmt Grundlayout und Metadaten

#### Wie wird Markdown zu HTML?

:bulb: _Tipp: GraphQL-Playground unter http://localhost:8000/__graphql benutzen_

Wenn ich `yarn start` oder `yarn gatsby build` ausführe werden folgende Schritte ausgeführt:

1. Einlesen der Markdown-Dateien als Gatsby-Nodes
   - via [`gatsby-source-filesystem`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
   - Das Plugin `gatsby-source-filesystem` liest alle Dateien im Ordner `content` ein
   - Erstellt werden Nodes vom Typ `File`
   - _Beispiel-Query:_
     ```graphql
     query MyQuery {
       allFile {
         edges {
           node {
             name
             extension
           }
         }
       }
     }
     ```
2. Parsen der Dateien in MDX-Nodes
   - via [`gatsby-plugin-mdx`](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/)
   - Nimmt alle File-Nodes mit Extension `md` oder `mdx`
   - Wandelt Markdown zu JSX
   - Macht Frontmatter in Gatsby verfügbar
   - Erstellt Nodes vom Typ `MDX`
   - _Beispiel-Query:_
     ```graphql
     query MyQuery {
       allMdx {
         nodes {
           frontmatter {
             title
             author
             description
             pub_date
             slug
           }
           rawBody
         }
       }
     }
     ```
3. Erstellen von Gatsby Pages
   - Custom Code in `gatsby-node.js`
   - Weist eine URL aus `slug` zu oder macht `title` URL-fähig (TODO)
   - Weist der Seite ein [Template](#%C3%9Cber-Seiten-Templates) zu
4. Generieren der statischen Seiten aus Inhalt und Template
   - Ausführen der GraphQL-Query im zugewiesenen Template-File
     - Query in Named Export `pageQuery`
     - `context` aus `createPage` dient als Parameter der Query (z.B. `$id`)
   - Rendern der Template-Komponente
     - Komponente als Default Export
     - Ergebnis der GraphQL wird als `data` Property gesetzt

##### Inhalte als Markdown

- `pages/index.md`
  - Ablage für Datengeschichten
  - pro Geschichte ein repo mit einer eine Markdown-Datei
  - Die [MDX-Erweiterung](https://mdxjs.com/) wird genutzt um inline Komponenten einsetzen zu können
  - :bulb: [Gatsby and MDX](https://www.gatsbyjs.org/docs/mdx/)

#### Über Seiten-Templates

:bulb: [Gatsby: Templates für MDX-Seiten](https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#make-a-template-for-your-posts)

Was ein Template machen sollte:

- Header einbinden
- Markdown-Inhalt einheitlich stylen
- Meta-Tags für die Seite setzen
- Breadcrumb erstellen
- Footer einbinden

#### Plugins

Genutzte Plugins:

- [Source Filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
  - Einlesen der Inhalte als Gatsby-Nodes zur Weiterverarbeitung
- [MDX Plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/)
  - Parsing von MDX-Dateien zu Gatsby Pages
  - Genutzte Extensions: `md` & `mdx`
  - Ziel: Verarbeiten von Seiten aus dem Filesystem-Plugin
- [Remark Images](https://www.gatsbyjs.org/packages/gatsby-remark-images/)
  - Extrahiert Bilder, die in Markdown referenziert werden
  - **Wichtig:** Es können nur Bilder aus dem gleichen Ordner referenziert werden
- [Sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/)
  - Skaliert verwendete Bilder in verschiedene Größen
- [React Helmet Plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/)
  - fügt Metadaten dem `<head>` hinzu
  - [React Helmet](https://github.com/nfl/react-helmet) kann aus jeder Komponente zum Setzen von Metadaten genutzt werden
  - Globale Metadaten werden in der Komponente `SEO` verwaltet
- [Manifest Plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/)
  - Erzeugt ein PWA-Manifest

_TODO: Erklären_

- CSS Modules
- [SEO](https://www.gatsbyjs.org/docs/seo/)
- [Google Analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/)

### Code-Style

TODO

### Deployment

Der DDJ-Editor wird bei [Netlify](https://www.netlify.com/docs/) gebaut & gehostet.
(PBI-Kreditkarte hinterlegt.)

_Was passiert?_

- Push ins Git-Repository
- Netlify CI baut das Projekt automatisiert
- Bereitstellung des Build-Outputs auf dem Netlify CDN (bei erfolgreichem Build)

_Warum?_

- Nachvollziehbarer Output basierend auf einer automatisierten Umgebung
- Klare Verknüpfung zwischen Git-Commit und veröffentlichtem Ergebnis

#### CI & Hosting

Konfiguration ist definiert in [`netlify.toml`](https://github.com/wdr-data/starter/tree/main/netlify.toml). Sie überschreibt die Einstellungen, die man im Netlify-UI vornimmt.

:arrow_right: [netlify.toml Docs](https://www.netlify.com/docs/netlify-toml-reference/)

Die Netlify Build-Umgebung geht so vor:

- Installieren der Dependencies (yarn)
- Ausführen des Build-Kommandos
- Hochladen des Ergebnis ins CDN

Automatisch von der CI-Umgebung gebaut werden Main-Branch und alle Pull-Requests. Netlify stellt für Pull Requests sog. "Preview Builds" bereit, die eine LIVE-Vorschau von Änderungen unter einer URL ermöglicht.

`/public` dient als Deployment-Ordner und wird von Netlify nach erfolgreichem Build aus der CI im CDN veröffentlicht.

Das zentrale Build-Kommando (`yarn build`) baut 3 Teile:

#### Storybook

- Befehl: `yarn build-storybook`
  - Build-Tooling: npm-Modul `storybook`
  - Konfiguriert in `.storybook`
- Ergebnis liegt in: `public/components`
- Ergebnis URL-Pfad `/components`

#### Publikation

- im URL-Pfad: `/`
- Befehl: `yarn build-gatsby`
  - Build-Tooling: Gatsby
- Ergebnis liegt in: `public`

#### Auf data.wdr.de

Per Mail an Dittmann um neuen Ordner auf data.wdr.de bitten. Mit den Zugangsdaten Daten aus dem Build-Ordner auf den Server hochladen.

### Tests

_TODO_

#### Visual Regression Testing

- Snapshot: https://www.npmjs.com/package/@storybook/addon-storyshots-puppeteer
- Compare: https://github.com/reg-viz/reg-cli

#### Accessability testing

- https://github.com/dequelabs/axe-core
- https://github.com/dequelabs/react-axe
- https://developers.google.com/web/tools/lighthouse/

#### Content checks

- Dead links
- Missing URLs
