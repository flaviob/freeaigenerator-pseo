#!/bin/bash

# FreeAIGenerator - Strapi Setup Script
# This script initializes a new Strapi project configured for Railway deployment

echo "🚀 Setting up Strapi for FreeAIGenerator..."

# Create Strapi project
npx create-strapi-app@latest strapi-backend --quickstart --no-run

cd strapi-backend

# Install PostgreSQL dependencies for Railway
npm install pg pg-connection-string

# Create database configuration for Railway
cat > config/database.js << 'EOF'
const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true)
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10)
      }
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
EOF

# Create server configuration
cat > config/server.js << 'EOF'
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
EOF

# Create admin configuration
cat > config/admin.js << 'EOF'
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
EOF

echo "✅ Strapi project created!"
echo ""
echo "Next steps:"
echo "1. Copy the schema files from ../strapi-cms/ to this project"
echo "2. Set up environment variables in Railway"
echo "3. Deploy to Railway"
echo ""
echo "Environment variables needed:"
echo "  DATABASE_URL (PostgreSQL connection string from Railway)"
echo "  APP_KEYS (generate with: node -e \"console.log(require('crypto').randomBytes(16).toString('base64'))\")"
echo "  API_TOKEN_SALT (generate same way)"
echo "  ADMIN_JWT_SECRET (generate same way)"
echo "  JWT_SECRET (generate same way)"
echo "  TRANSFER_TOKEN_SALT (generate same way)"
