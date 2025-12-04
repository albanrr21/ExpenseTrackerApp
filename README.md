# ExpenseTrackerApp

Simple expense tracker React Native app (Expo) for adding, listing and visualizing expenses.

## Overview

ExpenseTrackerApp is a small mobile application to track personal expenses. It includes a form to add expenses, a list to view them, and a spending chart to visualize expense distribution.

## Features

- Add and categorize expenses
- View a list of recorded expenses
- Visual chart of spending by category
- Simple, component-based structure for easy extension

## Tech Stack

- React Native (Expo)
- JavaScript
- Project structure includes components and context for state management

## Project Structure

- `App.js` — Application entry
- `index.js` — Metro/Expo entry
- `package.json` — Dependencies and scripts
- `app.json` — Expo config
- `src/components/ExpenseForm.js` — Expense input form
- `src/components/ExpenseList.js` — Expense list view
- `src/components/SpendingChart.js` — Chart view
- `src/context/ExpenseContext.js` — App context and state

## Installation

Open a terminal (cmd.exe) in the project root (`c:\Users\alban\Desktop\react-apps\ExpenseTrackerApp`) and run:

```cmd
npm install
```

If you use Expo CLI globally, start the app with:

```cmd
expo start
```

Or use the npm script if configured:

```cmd
npm start
```

## Running on a device or simulator

- Scan the QR code in the Expo devtools with the Expo Go app on your phone.
- Or launch an Android/iOS simulator from the Expo devtools.

## Screenshots

Place screenshots in `assets/screenshots/` and reference them here. Example placeholders:

- `assets/screenshots/screenshot-01.png` — Home / list view
- `assets/screenshots/screenshot-02.png` — Add expense form
- `assets/screenshots/screenshot-03.png` — Spending chart

Add screenshots below (replace with actual images):

![Screenshot 1](assets/screenshots/screenshot-01.png)

![Screenshot 2](assets/screenshots/screenshot-02.png)

![Screenshot 3](assets/screenshots/screenshot-03.png)

## Customization

- Update theme values in `src/constants/theme.js`.
- Modify or extend components in `src/components/`.

## Contributing

Feel free to open issues or PRs. Suggested next improvements:

- Persist expenses to local storage or a backend
- Add filter / sort for the expense list
- Improve input validation and UI polish

## License

Add your preferred license here.

---

If you'd like, I can add badges, fill in license text, or insert real screenshots — tell me which.
