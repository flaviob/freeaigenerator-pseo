#!/usr/bin/env tsx
/**
 * Script to enable public API permissions for Strapi 5
 * Usage: STRAPI_API_TOKEN="your-token" tsx enable-permissions-v5.ts
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function enablePermissions() {
  if (!STRAPI_API_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN environment variable is required');
    process.exit(1);
  }

  // Get current permissions
  const permissionsResponse = await fetch(`${STRAPI_URL}/api/users-permissions/permissions`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  if (!permissionsResponse.ok) {
    throw new Error(`Failed to get permissions: ${permissionsResponse.status}`);
  }

  const permissionsData = await permissionsResponse.json();

  // Enable find and findOne for our content types
  const updatedPermissions = { ...permissionsData.permissions };

  // Enable tool-page
  if (updatedPermissions['api::tool-page']) {
    updatedPermissions['api::tool-page'].controllers['tool-page'].find.enabled = true;
    updatedPermissions['api::tool-page'].controllers['tool-page'].findOne.enabled = true;
  }

  // Enable comparison-page
  if (updatedPermissions['api::comparison-page']) {
    updatedPermissions['api::comparison-page'].controllers['comparison-page'].find.enabled = true;
    updatedPermissions['api::comparison-page'].controllers['comparison-page'].findOne.enabled = true;
  }

  // Enable category-page
  if (updatedPermissions['api::category-page']) {
    updatedPermissions['api::category-page'].controllers['category-page'].find.enabled = true;
    updatedPermissions['api::category-page'].controllers['category-page'].findOne.enabled = true;
  }

  // Update permissions
  const updateResponse = await fetch(`${STRAPI_URL}/api/users-permissions/permissions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ permissions: updatedPermissions }),
  });

  if (!updateResponse.ok) {
    const error = await updateResponse.text();
    throw new Error(`Failed to update permissions: ${updateResponse.status} - ${error}`);
  }

  console.log('✅ Successfully enabled public API permissions for:');
  console.log('   - Tool Page (find, findOne)');
  console.log('   - Comparison Page (find, findOne)');
  console.log('   - Category Page (find, findOne)');
}

enablePermissions().catch(console.error);
