# Next.js Todo App

Eine vollständige Todo-Anwendung mit Next.js 14+, TypeScript und Tailwind CSS.

## Funktionen

- Todos hinzufügen (mit Eingabefeld und Enter-Taste)
- Todos anzeigen (als Liste)
- Todos als erledigt markieren (mit Checkbox)
- Todos löschen
- Filtern: Alle / Aktiv / Erledigt
- Lokale Speicherung im Browser (LocalStorage)
- Dunkles/Helles Theme

## Technologie-Stack

- [Next.js 14+](https://nextjs.org/) mit App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- React Hooks (useState, useEffect)

## Projektstruktur

```
app/
├── page.tsx          # Hauptseite
├── components/
│   ├── TodoList.tsx  # Listen-Komponente
│   ├── TodoItem.tsx  # Einzelnes Todo
│   ├── TodoInput.tsx # Eingabe-Formular
│   └── TodoFilter.tsx # Filter-Buttons
└── ...
```

## Lokale Installation

1. Repository klonen:
   ```bash
   git clone <repo-url>
   ```

2. In das Projektverzeichnis wechseln:
   ```bash
   cd nextjs-todo-app
   ```

3. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

4. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

5. Öffne [http://localhost:3000](http://localhost:3000) im Browser

## Build für Produktion

Um die Anwendung für die Produktion zu erstellen:

```bash
npm run build
```

## Bereitstellung

Die Anwendung kann einfach auf Vercel, Netlify oder anderen Plattformen bereitgestellt werden, die Next.js unterstützen.

## Lizenz

MIT