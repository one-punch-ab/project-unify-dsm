#!/usr/bin/env node

/**
 * Process Figma Variables from MCP
 * Takes the raw variable data and generates token files
 */

import * as fs from 'fs';
import * as path from 'path';

const figmaVariables = {"wati-spacing/xl":"12","wati-spacing/xs":"6","wati-icons/light":"#505451","wati-radii/l":"8","wati-icons/negative":"#ffffff","wati-text/negative":"#ffffff","wati-font-size/sm":"14","wati-font-weight/semibold":"semibold","wati-font/inter":"Inter","wati-line-height/sm":"20","wati-spacing/2xs":"4","wati-radii/m":"6","wati-radius/full":"99","wati-divider/light":"#e7e9e8","wati-surface/primary-default":"#23a455","wati-font-size/xs":"12","wati-font-weight/medium":"medium","wati-line-height/xs":"16","wati-text/primary-default":"#23a455","wati-spacing/s":"8","wati-spacing/none":"0","wati-text/body":"#353735","wati-icons/primary-default":"#23a455","wati-surface/primary-subtle":"#ebf7f0","wati-border/primary-default":"#23a455","wati-spacing/3xs":"2","wati-radius/xs":"2","wati-text/caption":"#848a86","wati-text/title":"#1b1d1c","wati-font-size/3xl":"32","wati-font-weight/bold":"bold","wati-font-size/l":"16","wati-line-height/md":"22","wati-spacing/3xl":"16","wati-spacing/l":"10","wati-spacing/6xl":"32","wati-text/subtitle":"#505451","wati-spacing/10xl":"48","wati-surface/default":"#ffffff","wati-border/default":"#e7e9e8","gray/700":"#3f3f46","gray/200":"#e4e4e7","blue/700":"#173da6","gray/800":"#27272a","gray/950":"#111111","gray/300":"#d4d4d8","gray/900":"#18181b","gray/100":"#f4f4f5","gray/400":"#a1a1aa","blue/600":"#2563eb","gray/600":"#52525b","blue/300":"#a3cfff","blue/400":"#60a5fa","blue/50":"#eff6ff","gray/500":"#71717a","white":"#FFFFFF","green/500":"#22c55e","green/300":"#86efac","green/50":"#f0fdf4","green/200":"#bbf7d0","green/600":"#16a34a","green/800":"#124a28","green/100":"#dcfce7","green/700":"#116932","wati-spacing/4xl":"20","wati-color/blue/default":"#1b74e3","wati-color-label/green/dark":"#2bbe32","wati-color-label/green/light":"#cdf4cf","wati-color-label/purple/dark":"#563db8","wati-color-label/purple/light":"#e9dff7","wati-icon/s":"16","wati-surface/subtle":"#f6f7f6","wati-font-weight/regular":"regular","wati-icons/success-subtle":"#ebf7f0","Spacing/100":"8","Spacing/4":"16","Spacing/3":"12","Spacing/md":"8","Spacing/2xl":"16","Spacing/xl":"12","Spacing/lg":"10","Radii/Round":"999","Radii/Semantic_tokens/l3":"6","Radii/8x":"8","Radii/0px":"0","Radii/6x":"6","Radii/Global_tokens/full":"9999","Borders/sm":"1","Size/4_5":"18","Size/5":"20","Size/4":"16","Size/2_5":"10","Size/8":"32","fontSizes/xs":"12","fontSizes/sm":"14","fontSizes/md":"16","fonts/body":"Inter","fontWeights/normal":"400","fontWeights/semibold":"600","Typography/Font Size/md":"14","Typography/Font Weight/Medium":"Medium","Typography/Font Family/Inter":"Inter","Typography/Line height/md":"20","Typography/Font Size/sm":"12","Typography/Font Weight/Semibold":"Semibold","Typography/Line height/sm":"16","Typography/Font Weight/Regular":"Regular","Actions/Tabs/Text/Default - Selected":"#476f25","Actions/Tabs/Bg/Default - Selected":"#ffffff","Actions/Tabs/Border/Default":"#476f25","Actions/Tabs/Text/Default - Unselected":"#476f25","Actions/Tabs/Bg/Default - Unselected":"#f2f9ed","Actions/Tabs/Container Bg/Default":"#f2f9ed","Actions/Secondary/Text/Default":"#476f25","Actions/Secondary/Bg/Default":"#ffffff","Actions/Secondary/Border/Default":"#7ebd4f","Actions/Primary/Text/Default":"#ffffff","Actions/Primary/Text/Hover":"#ffffff","Actions/Primary/Bg/Default":"#7ebd4f","Actions/Tertiary/Text/Default":"#476f25","Actions/Tertiary/Bg/Default":"#ffffff00","Border/Default":"#7ebd4f","Border/Highlight":"#7ebd4f","Surface/Background/Active":"#e0f0d3","Surface/Cards/Background/Default":"#ffffff","Surface/Cards/Border/Default":"#b8beb5","Text/Heading":"#1a1f1c","Text/Body":"#2a2f2c","Text/Placeholder":"#8c9489","Inputs/Field/Bg/Default":"#ffffff","Inputs/Field/Border/Default":"#b8beb5","Inputs/Field/Bg/Disabled":"#f4f4f5","Inputs/Field/Border/Disabled":"#cdd2cb","Color/Dark/Tertiary/5":"#1a1f1c0d","Color/Dark/Tertiary/10":"#1a1f1c1a","Color/Dark/Tertiary/6":"#1a1f1c0f","Color/Shadow/5%":"#12334c0d","Color/Shadow/10%":"#12334c1a","Effects/Offset/xs":"0","Effects/Blur/xs":"0","Effects/Offset/sm":"1","Effects/Spread/2xl":"0","Effects/Offset/lg":"4","Effects/Offset/md":"2","Effects/Blur/md":"4","Effects/Blur/lg":"8","Effects/Spread/xl":"-1","Effects/Spread/lg":"-2","bg/panel":"#ffffff","bg/default":"#000000","border/default":"#e4e4e7","Radius/lg":"8","8x":"8","0x":"0","2x":"2","6x":"6","4x":"4","16x":"16","Primary button":"#0b66d8","Blue light fill":"#eef4ff","White":"#FFFFFF","Gray/900":"#101828","Astra Text/Secondary":"#52525B","Black/B0":"#E3E3E3","whiteAlpha/0":"#ffffff","blue/fg":"#173da6","blackAlpha/0":"#000000","greyscale/text/title":"#1b1d1c","text-black":"#202020,#000000,#000000,#000000,#000000,#000000,#000000"};

interface Token {
  name: string;
  value: string;
  category: string;
}

/**
 * Categorize token
 */
function categorizeToken(name: string, value: string): string {
  const nameLower = name.toLowerCase();

  // Check if it's a color (hex or rgb)
  if (value.startsWith('#') || value.startsWith('rgb')) {
    return 'colors';
  }

  if (nameLower.includes('spacing') || nameLower.includes('size')) {
    return 'spacing';
  }

  if (nameLower.includes('font') || nameLower.includes('typography') || nameLower.includes('text')) {
    return 'typography';
  }

  if (nameLower.includes('radius') || nameLower.includes('radii')) {
    return 'radius';
  }

  if (nameLower.includes('shadow') || nameLower.includes('effect') || nameLower.includes('blur')) {
    return 'effects';
  }

  if (nameLower.includes('border')) {
    return 'borders';
  }

  return 'other';
}

/**
 * Convert to CSS variable name
 */
function toCSSVar(name: string): string {
  return `--${name.toLowerCase().replace(/[\s\/]/g, '-')}`;
}

/**
 * Format value for CSS
 */
function formatValue(value: string, category: string): string {
  // If it's a number and in spacing/sizing, add px
  if (!isNaN(Number(value)) && (category === 'spacing' || category === 'radius' || category === 'borders')) {
    return `${value}px`;
  }
  return value;
}

/**
 * Generate primitives.css
 */
function generatePrimitivesCSS(tokens: Token[]): string {
  const grouped: Record<string, Token[]> = {};

  tokens.forEach(token => {
    if (!grouped[token.category]) {
      grouped[token.category] = [];
    }
    grouped[token.category].push(token);
  });

  let css = `/**
 * Design System Primitive Tokens
 * Auto-generated from Figma on ${new Date().toLocaleString()}
 * Total tokens: ${tokens.length}
 *
 * DO NOT EDIT MANUALLY - Run 'npm run sync-figma' to update
 */

:root {
`;

  const categoryTitles: Record<string, string> = {
    colors: 'COLORS',
    spacing: 'SPACING',
    typography: 'TYPOGRAPHY',
    radius: 'BORDER RADIUS',
    borders: 'BORDERS',
    effects: 'EFFECTS & SHADOWS',
    other: 'OTHER TOKENS',
  };

  Object.entries(grouped).forEach(([category, categoryTokens]) => {
    css += `\n  /* ============================================\n`;
    css += `     ${categoryTitles[category] || category.toUpperCase()}\n`;
    css += `     ============================================ */\n\n`;

    categoryTokens.forEach(token => {
      css += `  ${toCSSVar(token.name)}: ${formatValue(token.value, category)};\n`;
    });
  });

  css += `}\n`;
  return css;
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Processing Figma variables from MCP...\n');

  // Convert to token array
  const tokens: Token[] = Object.entries(figmaVariables)
    .filter(([name, value]) => {
      // Filter out complex Font() and Effect() values
      return !String(value).startsWith('Font(') &&
             !String(value).startsWith('Effect(') &&
             name !== 'Selected' &&
             name !== 'astra-ai' &&
             name !== 'Clare-B' &&
             !name.startsWith('var(') &&
             !name.startsWith('--');
    })
    .map(([name, value]) => ({
      name,
      value: String(value),
      category: categorizeToken(name, String(value)),
    }));

  console.log(`📊 Processed ${tokens.length} tokens\n`);

  // Show breakdown
  const breakdown: Record<string, number> = {};
  tokens.forEach(t => {
    breakdown[t.category] = (breakdown[t.category] || 0) + 1;
  });

  console.log('📋 Breakdown:');
  Object.entries(breakdown).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });

  // Backup existing
  const primitivesPath = path.join(process.cwd(), 'src', 'tokens', 'primitives.css');
  if (fs.existsSync(primitivesPath)) {
    const backupPath = primitivesPath + '.backup';
    fs.copyFileSync(primitivesPath, backupPath);
    console.log(`\n📦 Backed up primitives.css`);
  }

  // Generate and save
  const css = generatePrimitivesCSS(tokens);
  fs.writeFileSync(primitivesPath, css);
  console.log(`✅ Generated primitives.css with ${tokens.length} tokens`);

  // Save JSON for reference
  const dataPath = path.join(process.cwd(), 'scripts', 'figma-data', 'variables.json');
  fs.writeFileSync(dataPath, JSON.stringify({ tokens, timestamp: new Date().toISOString() }, null, 2));
  console.log(`💾 Saved variables.json\n`);

  console.log('✨ Sync complete!\n');
  console.log('📝 Files updated:');
  console.log('   - src/tokens/primitives.css');
  console.log('   - scripts/figma-data/variables.json');
  console.log('\n💡 Note: semantic.css is preserved (manually maintained)');
}

main();
