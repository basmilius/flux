# Binnenruimte van het tags-veld

`FluxFormTagsInput` gebruikt nu `--field-padding` aan beide zijkanten:
9px in compact en 12px in Comfortable, tegenover de eerdere 3px.
De verticale padding blijft 3px. De lege invoer heeft geen extra eigen padding,
waardoor placeholder en eerste tag op dezelfde lijn beginnen.

19 gerichte browserasserties slagen voor beide presets: binnenruimte, veldhoogte,
lege invoer, toevoegen met Enter, verwijderen met Backspace, wrapping zonder
overflow en een aangepaste veldpadding van 15px. De screenshots zijn visueel
gecontroleerd. Components en docs bouwen succesvol; gridcheck en diffcheck slagen.

- [Compact](flux-v4-screenshots/tags-inset-compact.png)
- [Comfortable](flux-v4-screenshots/tags-inset-comfortable.png)
- [Metingen](flux-v4-tags-inset-check.json)
