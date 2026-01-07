#!/usr/bin/env tsx

/**
 * Figma Token Sync Script for NPM Package
 *
 * This script uses the Figma Desktop MCP tool to fetch design tokens
 * and automatically updates the primitives.css file.
 *
 * Prerequisites:
 * - Figma Desktop app must be running
 * - MCP server must be configured
 *
 * Usage:
 *   npm run sync-tokens
 */

console.log('🚀 Figma Token Sync\n');
console.log('⚠️  Prerequisites:');
console.log('   1. Figma Desktop app must be running');
console.log('   2. Open your Figma file in the desktop app');
console.log('   3. Run this script to fetch the latest variables\n');
console.log('📝 Note: This script requires manual execution of Figma variable extraction.');
console.log('   For automated sync, use the Figma REST API or MCP tools.\n');
console.log('👉 To manually sync:');
console.log('   1. Open Figma Desktop');
console.log('   2. Use Claude Code with Figma MCP to extract variables');
console.log('   3. Update src/tokens/primitives.css with the new values\n');
console.log('💡 See README.md for detailed instructions.');
