# Z-Index Fixes Applied

## ✅ **What I Fixed:**

### 1. **Standardized Z-Index System**
All sections now use a consistent z-index hierarchy:

```css
/* Background layers */
z-index: -2  /* Overlays (decorative elements) */
z-index: -1  /* Section backgrounds */
z-index: 0   /* Default content */
z-index: 1   /* Main content containers */
z-index: 1000 /* Header */
z-index: 2000 /* Modals */
z-index: 99999 /* Sticky elements */
```

### 2. **Fixed Hero Section**
- `hero__background`: `z-index: -1` (was 0)
- `hero__overlay`: `z-index: -2` (was -3)
- `hero__content`: `z-index: 1` (unchanged)

### 3. **Fixed All Section Backgrounds**
All `__background` elements now use `z-index: -1`:
- `why-choose__background`
- `services__background` 
- `pricing__background`
- `process__background`
- `stats__background`
- `faq__background`
- `contact__background`
- `gallery__background`

### 4. **Fixed All Section Overlays**
All `__overlay` elements now use `z-index: -2`:
- `why-choose__overlay`
- `services__overlay`
- `pricing__overlay`
- `process__overlay`
- `stats__overlay`
- `faq__overlay`
- `contact__overlay`
- `gallery__overlay`

### 5. **Removed Unused CSS**
- Removed old gallery carousel styles (`.gallery-carousel`, `.carousel-*`)
- Removed unused gallery tab styles (`.gallery-tabs`, `.gallery-tab*`)
- Removed unused gallery grid styles (`.gallery-grid`)

## 🎨 **Color Experimentation Options:**

### **Method 1: CSS Variables (Easiest)**
Edit the `:root` section at the top of `style.css`:

```css
:root {
  --color-white: #your-color-here;
  --color-navy: #your-navy-color;
  --color-orange: #your-orange-color;
  --color-teal-500: #your-teal-color;
}
```

### **Method 2: Direct CSS Changes**
Find any color in the CSS and change it directly:

```css
/* Example: Change all white text */
color: var(--color-white);  /* Change this to any color */
```

### **Method 3: Background Images**
All sections have background image support:

```css
.section__background {
  background: 
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('gallery_images/YOUR_IMAGE.jpg');
}
```

## 🔧 **How to Test:**

1. **Open the website** in your browser
2. **Check that all sections are visible** with proper backgrounds
3. **Verify headers and content** are not overlapped
4. **Test background changes** by editing CSS variables

## 📝 **Notes:**

- All z-index values are now consistent across sections
- Background images will work properly with the new z-index system
- You can easily experiment with different colors using CSS variables
- The layout should remain stable when changing backgrounds

The CSS is now much cleaner and easier to work with!
