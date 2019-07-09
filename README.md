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

#### 

## Für DesignerInnen

## Für EntwicklerInnen

- Per Mail / bei Github darum bitten, Teil des Teams zu werden: [wdr-data@hacking.studio](mailto:wdr-data@hacking.studio)


## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>
<br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">WDR Data Starter</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/wdr-data/starter" property="cc:attributionName" rel="cc:attributionURL">WDR Data</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
