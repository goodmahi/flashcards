# Flash Card Generator

This flash card generator allows you to create and display beautiful flash cards from a CSV file. The cards are shown one at a time with a smooth flip animation to reveal the answer.

## Setup

1. Prepare your CSV file with the following format:
   - First column: Question
   - Second column: Answer
   - Save the file as `cards.csv` in the same directory as the HTML file.

   Example CSV content:
   ```
   Question,Answer
   What is the capital of France?,Paris
   What is 2 + 2?,4
   ```

2. Open `index.html` in your web browser.

3. The flash cards will load automatically from the CSV file.

4. Click on a card to flip it and reveal the answer.

5. Use the "Next" and "Previous" buttons to navigate through the cards.

## Features

- Clean, snappy flip animation
- One card at a time display
- Navigation controls
- Responsive design
- Automatic CSV loading

## Files

- `index.html`: Main HTML file
- `style.css`: Stylesheet for layout and animations
- `script.js`: JavaScript for functionality
- `cards.csv`: Your input CSV file (create this)
- `README.md`: This documentation