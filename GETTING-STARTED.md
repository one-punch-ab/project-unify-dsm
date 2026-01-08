# Getting Started with Astra Design Tokens

Your design token library is now set up and ready to use! Here's how to get started.

## 📦 Package Location

Your token package is located at:
```
/Users/abhilash/Documents/Project unify/astra-design-tokens/
```

## 🚀 Quick Start Guide

### Step 1: Push to GitHub

First, create a repository on GitHub and push your token package:

```bash
cd "/Users/abhilash/Documents/Project unify/astra-design-tokens"

# Push to GitHub
git push -u origin main
```

### Step 2: Use in Your Current Project

Test it in your existing project right away:

```bash
cd "/Users/abhilash/Documents/Project unify/claude-designs"

# Install from local path (for testing)
npm install ../astra-design-tokens

# Or install from GitHub (after pushing)
npm install git+https://github.com/one-punch-ab/project-unify-dsm.git
```

### Step 3: Use in Any New Project

In any new project:

```bash
npm install git+https://github.com/one-punch-ab/project-unify-dsm.git
```

Then import in your main CSS/TypeScript file:

```tsx
import '@astra/design-tokens/src/tokens/primitives.css';
```

## 🔄 Updating Tokens from Figma

When you make changes in Figma:

### Method 1: Using Claude Code (Recommended)

1. Open Figma Desktop with your design file
2. Open Claude Code in the token package directory:
   ```bash
   cd "/Users/abhilash/Documents/Project unify/astra-design-tokens"
   ```
3. Ask Claude: "Read the variables from my Figma design system and update src/tokens/primitives.css"
4. Review and commit:
   ```bash
   git add src/tokens/primitives.css
   git commit -m "Update tokens from Figma"
   git push
   ```

### Method 2: Manual Sync

You can also manually update `src/tokens/primitives.css` with new token values from Figma.

## 📤 Publishing Updates to Your Team

After updating tokens:

```bash
cd "/Users/abhilash/Documents/Project unify/astra-design-tokens"

# Bump version (choose one)
npm version patch  # 1.0.0 → 1.0.1 (small fixes)
npm version minor  # 1.0.0 → 1.1.0 (new tokens)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)

# Push with tags
git push origin main --tags
```

Then team members update in their projects:

```bash
npm update @astra/design-tokens
```

## 🎨 Using Tokens in Your Projects

### In CSS Files

```css
.button {
  background-color: var(--actions-primary-bg-default);
  color: var(--actions-primary-text-default);
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-lg);
}
```

### In React Components

```tsx
import '@astra/design-tokens/src/tokens/primitives.css';

function MyComponent() {
  return (
    <div style={{
      padding: 'var(--spacing-2xl)',
      backgroundColor: 'var(--surface-background-primary)',
      color: 'var(--text-primary)'
    }}>
      Content
    </div>
  );
}
```

### In CSS Modules

```css
/* Component.module.css */
.container {
  padding: var(--spacing-2xl);
  background: var(--surface-cards-background-default);
  border-radius: var(--dimentions-mdl-radius);
}
```

## 📋 Available Token Categories

- **Actions**: Button states (primary, secondary, tertiary, destructive)
- **Text**: All text colors (primary, secondary, tertiary, link, placeholder)
- **Surface**: Background colors and card backgrounds
- **Inputs**: Form field styling
- **Spacing**: Consistent spacing scale (2xs to 5xl)
- **Typography**: Font sizes, weights, line heights
- **Borders & Radius**: Border widths and corner radius
- **Effects**: Shadows, blur, and visual effects
- **Dimensions**: Component-specific sizing

## 🌐 Sharing with Your Team

### Option A: GitHub (Free)

1. Push to GitHub (private or public repo)
2. Team installs: `npm install git+https://github.com/one-punch-ab/project-unify-dsm.git`
3. Update: `npm update @astra/design-tokens`

### Option B: Private NPM Registry

For larger teams, consider:
- GitHub Packages (free with GitHub)
- npm Private Registry (paid)
- Verdaccio (self-hosted, free)

## 🆘 Troubleshooting

### Tokens not showing in project

1. Make sure you've imported the CSS file in your entry point
2. Clear your build cache and restart dev server
3. Check browser DevTools to verify CSS variables are loaded

### Can't update from Git

```bash
# Force reinstall
npm uninstall @astra/design-tokens
npm install git+https://github.com/one-punch-ab/project-unify-dsm.git
```

### IDE not showing autocomplete

- **VS Code**: Install "CSS Variable Autocomplete" extension
- **Cursor**: Works out of the box
- **WebStorm**: Works out of the box

## 📚 Next Steps

1. ✅ Push your token package to GitHub
2. ✅ Install it in your current project
3. ✅ Share the GitHub URL with your team
4. ✅ Document any custom tokens you add
5. ✅ Set up a regular sync schedule from Figma

## 💡 Pro Tips

- **Version everything**: Use semantic versioning for clear updates
- **Communicate changes**: Let team know about breaking changes
- **Sync regularly**: Keep tokens in sync with Figma weekly
- **Document custom tokens**: Add comments for team-specific tokens
- **Test before pushing**: Always test token updates in a project first

---

Need help? Check the [README.md](./README.md) or contact the Astra Design System team.
