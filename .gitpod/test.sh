#!/bin/bash

# Test script to verify Gitpod setup
echo "🧪 Testing Gitpod setup..."

# Check if PostgreSQL is running
if sudo service postgresql status > /dev/null; then
  echo "✅ PostgreSQL is running"
else
  echo "❌ PostgreSQL is not running"
fi

# Check if database exists
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw url_shortener; then
  echo "✅ Database 'url_shortener' exists"
else
  echo "❌ Database 'url_shortener' does not exist"
fi

# Check if table exists
if sudo -u postgres psql -d url_shortener -c "\dt" | grep -q urls; then
  echo "✅ Table 'urls' exists"
else
  echo "❌ Table 'urls' does not exist"
fi

# Check if ports are available
if nc -z localhost 3001; then
  echo "✅ API server is running on port 3001"
else
  echo "⏳ API server is not yet running on port 3001"
fi

if nc -z localhost 3000; then
  echo "✅ Frontend server is running on port 3000"
else
  echo "⏳ Frontend server is not yet running on port 3000"
fi

echo "🎉 Gitpod setup test complete!" 