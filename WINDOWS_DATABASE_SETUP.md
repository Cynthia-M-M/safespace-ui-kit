# Database Setup Guide for Windows

## Problem: PostgreSQL Commands Not Found

On Windows PowerShell, PostgreSQL tools like `createdb` and `psql` are not in the system PATH by default.

## Solution 1: Use Full Path to PostgreSQL

Find your PostgreSQL installation (usually `C:\Program Files\PostgreSQL\15\bin`):

```powershell
# Replace 15 with your PostgreSQL version number
$PG_PATH = "C:\Program Files\PostgreSQL\15\bin"

# Create database
& "$PG_PATH\createdb.exe" safespace

# Access database
& "$PG_PATH\psql.exe" -U postgres -d safespace
```

## Solution 2: Add PostgreSQL to PATH (Recommended)

1. Open **Environment Variables**:
   - Press `Win + X` → Choose "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"

2. Under "System variables", find `Path` and click "Edit"

3. Click "New" and add:
   ```
   C:\Program Files\PostgreSQL\15\bin
   ```
   (Replace `15` with your version)

4. Click OK, restart PowerShell

5. Then use commands normally:
   ```powershell
   createdb safespace
   psql -U postgres -d safespace
   ```

## Solution 3: Use Node Script (Easiest for Development)

Create a file `BACKEND/setup-db.js`:

```javascript
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find PostgreSQL bin directory
const pgBinPaths = [
  'C:\\Program Files\\PostgreSQL\\15\\bin',
  'C:\\Program Files\\PostgreSQL\\14\\bin',
  'C:\\Program Files\\PostgreSQL\\13\\bin',
  'C:\\Program Files (x86)\\PostgreSQL\\15\\bin',
];

let pgBin = null;
for (const p of pgBinPaths) {
  if (fs.existsSync(p)) {
    pgBin = p;
    break;
  }
}

if (!pgBin) {
  console.error('PostgreSQL not found. Please install PostgreSQL or add it to PATH');
  process.exit(1);
}

const createdbPath = path.join(pgBin, 'createdb.exe');
const psqlPath = path.join(pgBin, 'psql.exe');
const schemaPath = path.join(__dirname, 'db', 'schema.sql');

// Step 1: Create database
console.log('Creating database...');
exec(`"${createdbPath}" safespace`, (err, stdout, stderr) => {
  if (err && !stderr.includes('already exists')) {
    console.error('Error creating database:', err);
    process.exit(1);
  }
  
  if (stderr.includes('already exists')) {
    console.log('Database already exists');
  } else {
    console.log('Database created successfully');
  }

  // Step 2: Run schema
  console.log('Creating tables...');
  exec(`"${psqlPath}" -U postgres -d safespace -f "${schemaPath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error running schema:', err);
      process.exit(1);
    }
    console.log('Schema loaded successfully');
    process.exit(0);
  });
});
```

Then run:
```powershell
cd BACKEND
node setup-db.js
```

## Solution 4: Direct PowerShell Command

```powershell
# Connect to PostgreSQL and create database
$pgPath = "C:\Program Files\PostgreSQL\15\bin\psql.exe"

# Create database
& $pgPath -U postgres -c "CREATE DATABASE safespace;"

# Load schema
& $pgPath -U postgres -d safespace -f "BACKEND\db\schema.sql"
```

## Solution 5: Use pgAdmin GUI (Visual Option)

1. Open pgAdmin (came with PostgreSQL)
2. Right-click "Databases" → "Create" → "Database"
3. Name: `safespace`
4. Click "Save"
5. Open SQL Editor and paste contents of `BACKEND/db/schema.sql`

---

## Recommended for Development

Use **Solution 3** (Node script) - it's platform-independent and will work even if PostgreSQL path varies.

---

## Verify PostgreSQL Installation

```powershell
# Check if PostgreSQL is installed
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | 
  Where-Object { $_.DisplayName -like "*PostgreSQL*" } | 
  Select-Object DisplayName, DisplayVersion
```

## Find Your PostgreSQL Version

```powershell
# Look for PostgreSQL directories
Get-ChildItem "C:\Program Files\PostgreSQL" -ErrorAction SilentlyContinue
Get-ChildItem "C:\Program Files (x86)\PostgreSQL" -ErrorAction SilentlyContinue
```

---

**Choose one solution above and let me know which one you'd like to use!**
