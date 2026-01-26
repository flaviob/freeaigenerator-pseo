#!/usr/bin/env tsx
/**
 * Script to enable public API permissions for content types
 * Usage: STRAPI_API_TOKEN="your-token" tsx enable-permissions.ts
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function enablePermissions() {
  if (!STRAPI_API_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN environment variable is required');
    process.exit(1);
  }

  // Get the public role ID
  const rolesResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  if (!rolesResponse.ok) {
    throw new Error(`Failed to get roles: ${rolesResponse.status}`);
  }

  const rolesData = await rolesResponse.json();
  const publicRole = rolesData.roles.find((r: any) => r.type === 'public');

  if (!publicRole) {
    throw new Error('Public role not found');
  }

  console.log(`📋 Found public role with ID: ${publicRole.id}`);

  // Update permissions for the public role
  const permissions = {
    'tool-page': {
      controllers: {
        'tool-page': {
          find: { enabled: true },
          findOne: { enabled: true },
        },
      },
    },
    'comparison-page': {
      controllers: {
        'comparison-page': {
          find: { enabled: true },
          findOne: { enabled: true },
        },
      },
    },
    'category-page': {
      controllers: {
        'category-page': {
          find: { enabled: true },
          findOne: { enabled: true },
        },
      },
    },
  };

  // Merge with existing permissions
  const updatedPermissions = {
    ...publicRole.permissions,
    ...permissions,
  };

  const updateResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      name: publicRole.name,
      description: publicRole.description,
      type: publicRole.type,
      permissions: updatedPermissions,
    }),
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
