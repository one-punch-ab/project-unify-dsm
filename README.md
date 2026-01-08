# Astra Design Tokens

Design tokens for the Astra Design System. This package provides a centralized token library that can be used across any project and shared with your team.

## Features

- 🎨 **Complete Token Library** - Colors, typography, spacing, effects, and component dimensions
- 🔄 **Figma Sync** - Keep tokens in sync with your Figma design file
- 🚀 **Framework Agnostic** - Works with React, Vue, Angular, plain HTML/CSS
- 📦 **Easy Distribution** - Install via npm/git in any project
- 💪 **Type-Safe** - CSS custom properties with full IDE support

## Installation

### Option 1: Install from Git Repository

```bash
npm install git+https://github.com/one-punch-ab/project-unify-dsm.git
```

### Option 2: Install from Private NPM Registry

```bash
npm install @astra/design-tokens
```

## Usage

### In CSS/SCSS Files

Import the tokens in your main stylesheet:

```css
/* Import all tokens */
@import '@astra/design-tokens/src/tokens/primitives.css';

/* Now use the tokens */
.button {
  background-color: var(--actions-primary-bg-default);
  color: var(--actions-primary-text-default);
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-lg);
  font-size: var(--typography-font-size-md);
  line-height: var(--typography-line-height-md);
}
```

### In React/TypeScript

```tsx
import '@astra/design-tokens/src/tokens/primitives.css';

function Button() {
  return (
    <button style={{
      backgroundColor: 'var(--actions-primary-bg-default)',
      color: 'var(--actions-primary-text-default)',
      padding: 'var(--spacing-md) var(--spacing-2xl)'
    }}>
      Click me
    </button>
  );
}
```

### In Vite Projects

Add to your `src/main.tsx` or `src/main.ts`:

```tsx
import '@astra/design-tokens/src/tokens/primitives.css';
```

### In Next.js

Add to your `pages/_app.tsx` or `app/layout.tsx`:

```tsx
import '@astra/design-tokens/src/tokens/primitives.css';
```

## Available Tokens

### Colors
- **Actions**: Primary, Secondary, Tertiary, Destructive (background, border, text states)
- **Text**: Primary, Secondary, Tertiary, Placeholder, Link, Destructive
- **Surface**: Background colors, card backgrounds
- **Inputs**: Field backgrounds and borders
- **Component States**: Default, Hover, Active, Disabled, Focus

### Typography
- **Font Family**: Inter
- **Font Sizes**: xs (12px), sm (13px), md (14px), lg (16px), xl (18px), 2xl-5xl
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights**: Optimized for each font size

### Spacing
- **Scale**: 2xs (2px), xs (4px), sm (6px), md (8px), lg (12px), xl (14px), 2xl (16px), 3xl (20px), 4xl (24px), 5xl (32px)

### Borders & Radius
- **Border Widths**: sm (1px), md (1.5px), lg (2px)
- **Border Radius**: sm (4px), md (6px), lg (8px), xl (12px), 2xl (16px), full (9999px)

### Effects
- **Shadows**: Multiple elevation levels with blur, offset, and spread values
- **Blur**: xs (0px) to 2xl (24px)

### Component Dimensions
- Button padding, input dimensions, icon sizes, and more

## Syncing from Figma

### Prerequisites

1. Figma Desktop app installed and running
2. Your Figma design file open in the desktop app
3. Figma MCP server configured (if using Claude Code)

### Manual Sync Process

1. **Open your Figma file** in Figma Desktop
2. **Use Claude Code** with Figma MCP integration:
   ```bash
   # In Claude Code, run:
   Read the variables from my Figma design system and update src/tokens/primitives.css
   ```
3. **Review the changes** to ensure all tokens are correct
4. **Commit and push** the updated tokens:
   ```bash
   git add src/tokens/primitives.css
   git commit -m "Update design tokens from Figma"
   git push
   ```

### Using Figma REST API (Alternative)

If you have a Figma API token with `file_variables:read` scope:

1. Create a `.env` file:
   ```bash
   FIGMA_API_TOKEN=your_token_here
   FIGMA_FILE_KEY=nnDxwHHia8A7KYcsQxjXvd
   ```

2. Run the sync script:
   ```bash
   npm run sync-tokens
   ```

## Updating Tokens in Your Projects

When tokens are updated in this package:

### For Projects Using Git Install

```bash
# Update to latest version
npm update @astra/design-tokens

# Or reinstall
npm install git+https://github.com/one-punch-ab/project-unify-dsm.git
```

### For Projects Using NPM Registry

```bash
# Update to latest version
npm update @astra/design-tokens

# Or install specific version
npm install @astra/design-tokens@latest
```

## Publishing Updates

### Step 1: Update Tokens

Sync your tokens from Figma (see "Syncing from Figma" above).

### Step 2: Version Bump

```bash
# For bug fixes or small changes
npm version patch  # 1.0.0 → 1.0.1

# For new tokens or minor changes
npm version minor  # 1.0.0 → 1.1.0

# For breaking changes
npm version major  # 1.0.0 → 2.0.0
```

### Step 3: Commit and Push

```bash
git push origin main --tags
```

### Step 4: Notify Your Team

Let your team know about the update so they can pull the latest tokens.

## Project Structure

```
astra-design-tokens/
├── src/
│   └── tokens/
│       └── primitives.css      # All design tokens as CSS custom properties
├── scripts/
│   ├── sync-figma-tokens.ts    # Figma sync script
│   └── process-figma-variables.ts
├── package.json                # NPM package configuration
├── README.md                   # This file
└── .gitignore
```

## IDE Support

### VS Code

CSS custom properties will autocomplete automatically. For enhanced IntelliSense:

1. Install the **CSS Variable Autocomplete** extension
2. Tokens will show up in autocomplete with their values

### WebStorm / Cursor

Full autocomplete and IntelliSense support out of the box.

## Contributing

### Adding New Tokens

1. Add tokens to your Figma design file
2. Run sync process (see "Syncing from Figma")
3. Review changes in `src/tokens/primitives.css`
4. Commit and push

### Token Naming Convention

Follow this structure for token names:

```
--{category}-{subcategory}-{property}-{state}

Examples:
--actions-primary-bg-default
--actions-primary-bg-hover
--text-primary
--spacing-md
--typography-font-size-lg
```

## Troubleshooting

### Tokens not updating in my project

1. Clear your build cache
2. Restart your dev server
3. Check that the import path is correct
4. Run `npm update @astra/design-tokens`

### Figma sync not working

1. Ensure Figma Desktop is running
2. Check that your Figma file is open
3. Verify MCP server is configured correctly
4. Try using the Figma REST API method instead

## License

MIT

## Support

For issues or questions:
- Open an issue on GitHub
- Contact the Astra Design System team
