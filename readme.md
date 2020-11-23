# Hópverkefni 2

## Keyrsla verkefnis

Til þess að keyra verkefnið er keyrt skipunina `npm run dev`

Tryggt verður að allt SCSS og JS sé með löglegum hætti með skipuninni `npm run test`

## Uppsetning verkefnis
### Almennt
Verkefnið notfærir sér Sass, Browser-Sync, Concurrently, RollUp, Babel, ESLint og StyleLint, öll dependencies finnast í package.json. 

Til þess að tryggja að allar SCSS og JS skrár séu með réttu lint er keyrt skipunina `npm run test`. Til að setja upp verkefnið til keyrslu er keyrt skipunina `npm run build` og til að keyra verkefnið er keyrt skipunina `npm run dev`

### Hvar má finna skrár
* *src* mappan geymir allar *.js* og *.scss* skrár, þær fyrrnefndu í *lib* möppu og þlr seinni í *styles* möppu. Þýddar skrár eru settar í *dist* möppu verkefnisins. Myndbönd og forskoðanir þeirra (*thumbnails*) finnast í videos möppunni. Aðrar skrár (t.d `index.html` og þessi readme) finnast í rótarmöppu verkefnisins. 

### Uppbygging SCSS skjala
* `config.scss` skráin geymir breytur sem notast í öðrum scss skrám
* `footer.scss` geymir stíla fyrir fót síðu
* `grid.scss` geymir stíla fyrir skalanleika síðu og röðun hluta
* `global.scss` geymir stíla fyrir helstu *element* síðunnar
* `video_cards.scss` er potturinn og pannan í verkefninu, og geymir alla stíla fyrir myndbandsspjöld
* `styles.scss` sameinar allar fyrrnefndu skrár saman
### Uppbygging JS skjala
* `utils.js` geymir helstu föll fyrir uppsetningu elementa og formats
* `video-watch.js` geymir helstu föll og virkni fyrir uppsetningu og afspilun myndbanda
* `videos.js` geymir helstu föll og virkni fyrir uppsetningu yfirlits myndbanda

## Þáttakendur verkefnis

Þáttakendur þessa verkefnis eru: 

* Tryggvi Freyr Sigurgeirsson - tfs2@hi.is - `Tryggvi F`
* Jóhannes Kári Sólmundarson - jks21@hi.is - `jaykaytherobot`
* Marcelo Felix Auditbert - mfa5@hi.is - `Gitcelo`
* Andreas Máni Helgason - amh50@hi.is - `amh50`

> Útgáfa 1.0
