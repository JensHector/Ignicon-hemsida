# Ignicon-hemsida

Ignicon AB:s webbplats (ignicon.se) – statisk sajt i Maverick-designprofil.

- **Design**: Playfair Display + Plus Jakarta Sans · navy #202032 · orange #E36020 · greige #E7E3DA
- **Hosting**: Netlify (redirects och headers i `netlify.toml`)
- **Struktur**: startsida, /tjanster/ (6 tjänstesidor), /om/, /artiklar/ (index), /inlagg/<slug>/ (artiklar), /integritetspolicy/
- **Nya artiklar**: skapa `inlagg/<slug>/index.html` från befintlig artikelmall, lägg till kort i `artiklar/index.html` och rad i `sitemap.xml`
