# Ocean Professional Theme Colors

To change the color scheme, edit the CSS variables in `src/styles/theme.css`.

## Main Variables

```
:root {
  --primary: #2563EB;         /* Blue 600 */
  --secondary: #F59E0B;       /* Amber 500 */
  --success: #F59E0B;
  --error: #EF4444;
  --gradient-start: #2563EB1A; /* from-blue-500/10 */
  --gradient-end: #f9fafb;    /* to-gray-50 */
  --background: #f9fafb;
  --surface: #ffffff;
  --text: #111827;
}
```

- **Primary:** Used for buttons, focus, highlights (`--primary`)
- **Secondary:** Accents and secondary buttons (`--secondary`)
- **Surface:** Note cards/containers (`--surface`)
- **Gradient:** App background (`--gradient-start`, `--gradient-end`)

## How to Customize

Change the values as desired, then reload the app.

## Where Used

- Global layout and color: `src/styles/theme.css`
- Most UI components import styles from this file.

---
For additional customizations, refer to inline comments in `theme.css`.
