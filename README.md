# Playing CSS vars with JS

# CSS Variables and JavaScript Interaction

This project is based on an example by programmer [Wes Bos](https://wesbos.com/). It demonstrates how to interact with CSS variables (`--custom-properties`) using JavaScript. By leveraging HTML input elements (`<input>`), users can dynamically adjust styles such as spacing, blur effects, and base color. It’s a simple yet effective exercise for learning how JavaScript can manipulate DOM and custom CSS properties.

## Features

- **Dynamic CSS Variables Adjustment**  
  Utilizes `document.documentElement.style.setProperty()` to update CSS variables in real-time.

- **Event Handling with `change` and `mousemove`**  
  Adjusts CSS variables based on user interactions with range sliders and color pickers.

- **Custom Attributes (`data-*`) Usage**  
  Employs the `data-sizing` attribute to append units (e.g., `px`) to variable values dynamically.

- **Styling with SCSS**  
  CSS variables control styles like `text-transform`, `filter`, and `background-color`, making the UI flexible and customizable.

- **Minimalistic UI**  
  Provides an intuitive interface with three sliders for spacing, blur, and color adjustments.

## How It Works

1. **HTML**  
   Contains a simple structure with input elements for user interaction.

2. **SCSS**  
   Defines CSS variables and applies them to various styles, such as padding and filters.

3. **JavaScript**  
   Adds event listeners to inputs to update CSS variables dynamically, reflecting real-time changes in the UI.

