# starter
Der WDR-Data Starter ermöglicht es JournalistInnen, unsere Design-Patterns und die Komponentenbibliothek für datengesteuerte Journalismusprojekte zu nutzen.

Ziele:
- Einen abgenommenen Rahmen haben, in dem Datenprojekte schneller stattfinden können
- Neue Visualisierungsformen mobile first und accessible erproben
- Entwicklungen wiederverwendbar machen (Als Datengeschichte auf data.wdr.de und als Grafik-iFrame im CMS)

## Für JournalistInnen

### Wie nehme ich ein Datenprojekt ab?
- Ersteller*in schickt Link zu: 
    - Preview bei Netlify - z.B.:  `http://data-wdr.netlify.com/oper-in-nrw`
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

### Wie lege ich ein neues Datenprojekt an?

:globe_with_meridians: https://github.com/wdr-data/starter/
- Für den Zugang ist ein Github Account nötig 

Schritte:
- Für eine neue Story das starter Projekt forken und als als neues, eigenes Projekt bei GitHub anlegen. (Oder jemanden aus dem Datenteam darum bitten)
- Projekte können wahlweise von Anfang an 'öffentlich' sein oder erst später veröffentlicht werden 
- Unter /static werden die Bilddateien für das Projekt abgelegt (HeroImage, weitere Bilder)
  - TODO: Specs für Bilder hinzufügen
- unter /data werden Daten und Datenanalyse-Notebook abgelegt
- Unter /pages die index.md mit eigenem Conten überschreiben:

#### Bilder 

heroImage: 1920x1080 Sophora / Full HD
Twitter: 2:1 - mindestens 300 x 157
Facebook: 1200 x 630 


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

- Per Mail / bei Github darum bitten, Teil des Teams zu werden: [wdr-data@hacking.studio](mailto:wdr-data@hacking.studio)


## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>
<br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">WDR Data Starter</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/wdr-data/starter" property="cc:attributionName" rel="cc:attributionURL">WDR Data</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
