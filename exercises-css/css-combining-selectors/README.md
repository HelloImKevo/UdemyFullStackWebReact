# CSS Combining Selectors - Localized Website

This project demonstrates CSS selector combinations while implementing native HTML localization for multiple languages.

## 🌍 Supported Languages

- **English (EN)** - `index.html` (default)
- **Spanish (ES)** - `index-es.html`
- **German (DE)** - `index-de.html`

## 📁 Project Structure

```
css-combining-selectors/
├── index.html          # English version (default)
├── index-es.html       # Spanish version
├── index-de.html       # German version
├── style.css           # Shared CSS styles
└── README.md           # This documentation
```

## 🎯 Localization Features

### 1. **Language Attribute**
Each HTML file includes the appropriate `lang` attribute:
```html
<html lang="en">    <!-- English -->
<html lang="es">    <!-- Spanish -->
<html lang="de">    <!-- German -->
```

### 2. **Language Navigation**
All pages include a language switcher with:
- Visual flag indicators (🇺🇸 🇪🇸 🇩🇪)
- `hreflang` attributes for SEO
- Trilingual labels for accessibility

### 3. **Localized Content**
Each version contains fully translated content:

| Element | English | Spanish | German |
|---------|---------|---------|---------|
| **Title** | Combining CSS Selectors | Combinando Selectores CSS | CSS-Selektoren Kombinieren |
| **Main Heading** | To Do List | Lista de Tareas | Aufgabenliste |
| **Day** | Monday | Lunes | Montag |
| **Action Text** | Do these things today! | ¡Haz estas cosas hoy! | Erledige diese Dinge heute! |
| **Tasks** | Wash Clothes, Read, Maths Questions | Lavar la Ropa, Leer, Problemas de Matemáticas | Wäsche Waschen, Lesen, Mathe-Aufgaben |
| **Other Items** | Other items | Otros elementos | Andere Punkte |
| **Quote** | The best preparation for tomorrow is doing your best today. | La mejor preparación para mañana es hacer lo mejor que puedas hoy. | Die beste Vorbereitung für morgen ist, heute dein Bestes zu geben. |

## 🎨 CSS Selector Demonstrations

The project maintains the original CSS selector teaching objectives:

### 1. **Group Selectors**
```css
h1, h2 {
  color: blueviolet;
}
```
*Groups multiple elements to apply the same styling*

### 2. **Child Selectors**
```css
.box > p {
  color: firebrick;
}
```
*Selects direct children only*

### 3. **Descendant Selectors**
```css
.box li {
  color: blue;
}
```
*Selects all descendants within the container*

### 4. **Chained Selectors**
```css
li.done {
  color: green;
}
```
*Combines element and class selectors*

### 5. **Multiple Combiners**
```css
ul p.done {
  font-size: 0.5rem;
}
```
*Complex selector combining multiple techniques*

### 6. **Language Navigation Styling**
```css
.language-nav {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 2px solid #dee2e6;
}
```
*Additional styling for localization UI*

## 🚀 How to Use

### 1. **Local Development**
```bash
# Navigate to the project directory
cd css-combining-selectors/

# Open any version in your browser
open index.html      # English
open index-es.html   # Spanish  
open index-de.html   # German
```

### 2. **Live Server (VS Code)**
1. Install the "Live Server" extension
2. Right-click on any HTML file
3. Select "Open with Live Server"
4. Use the language navigation to switch between versions

### 3. **Web Server**
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Then access: http://localhost:8000
```

## 🌐 SEO and Accessibility Features

### 1. **Language Declaration**
- Proper `lang` attributes for screen readers
- Helps search engines understand content language
- Improves accessibility for users with disabilities

### 2. **Hreflang Attributes**
```html
<a href="index.html" hreflang="en">🇺🇸 English</a>
<a href="index-es.html" hreflang="es">🇪🇸 Español</a>
<a href="index-de.html" hreflang="de">🇩🇪 Deutsch</a>
```
- Tells search engines about language alternatives
- Helps with international SEO
- Provides better user experience

### 3. **Character Encoding**
```html
<meta charset="UTF-8">
```
- Supports international characters (ñ, ü, ß, etc.)
- Ensures proper display across all languages

## 🔧 Technical Implementation

### Native HTML Localization Benefits:
- ✅ **No JavaScript Required** - Works without client-side scripting
- ✅ **SEO Friendly** - Search engines can index each language separately
- ✅ **Fast Loading** - No dynamic translation overhead
- ✅ **Accessible** - Screen readers understand language context
- ✅ **Offline Compatible** - Works without internet connection

### Alternative Approaches:
- **JavaScript-based**: Dynamic translation (requires JS)
- **Server-side**: PHP/Node.js internationalization
- **Framework-based**: React i18n, Angular i18n
- **Translation APIs**: Google Translate integration

## 🎓 Learning Objectives

This project teaches:

1. **CSS Selector Mastery**
   - Group, child, descendant, and chained selectors
   - Complex selector combinations
   - Specificity and cascade understanding

2. **Internationalization (i18n)**
   - HTML language attributes
   - SEO-friendly localization
   - Accessibility considerations
   - Navigation between language versions

3. **Web Standards**
   - Semantic HTML structure
   - Proper meta tag usage
   - Link relationship attributes

## 📚 Resources

### CSS Selectors:
- [MDN CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.asp)

### Internationalization:
- [HTML lang Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
- [Hreflang Implementation](https://developers.google.com/search/docs/advanced/crawling/localized-versions)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html)

---

*This project demonstrates both CSS fundamentals and international web development best practices using native HTML capabilities.*
