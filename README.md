# Chinese Flashcards

A frontend-only flashcard application designed to help master Mandarin Chinese vocabulary.


## Features

- **Interactive Flashcards**: Tap or click to flip the card and reveal Pinyin, English meanings, and example sentences.
- **Scoring System**: Mark words as "Mastered" to track your progress.
- **Persistence**: Your progress is automatically saved to your browser's local storage.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **High-Quality Content**: Includes a hand-curated list of 100+ Chinese words with rich examples.
- **Auto-Deployment**: Integrated GitHub Actions for automatic deployment to GitHub Pages.

## Future Plans

- Add more words
- Add ability to split vocab into different categories, such as HSK 1, HSK 2, etc.
- Add ability to randomise list
- Add a testing mode where the user tests a small portion of the vocab list at a time
  - Make sure the testing accounts for how often the user has seen the word

## Development

### Prerequisites

- Node.js (LTS version recommended)
- Yarn or NPM

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Office-Stapler/chinese-flashcards.git
   cd chinese-flashcards
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

## Tech Stack

- **React**: UI library
- **Vite**: Modern frontend build tool
- **TypeScript**: Static typing for reliability
- **CSS3**: Custom animations and glassmorphism effects
- **GitHub Actions**: Continuous Deployment

## Project Structure

- `src/components/`: Reusable UI components (Flashcard, etc.).
- `src/data/`: Vocabulary data (`vocab.ts`).
- `src/App.tsx`: Main application logic and state management.
- `.github/workflows/`: Deployment configuration.
