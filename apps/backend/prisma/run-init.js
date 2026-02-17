const { Client } = require('pg');
const fs = require('fs');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://postgres.fgirxxgqeagjcqmubccs:PetVerse2026Secure@aws-0-eu-west-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Connected to Supabase!');
    
    const sql = fs.readFileSync(__dirname + '/init.sql', 'utf8');
    // Split by statements and execute one by one
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    
    for (let i = 0; i < statements.length; i++) {
      try {
        await client.query(statements[i]);
        process.stdout.write('.');
      } catch (err) {
        if (err.message.includes('already exists')) {
          process.stdout.write('s');
        } else {
          console.error(`\nError on statement ${i + 1}: ${err.message}`);
          console.error(statements[i].substring(0, 100));
        }
      }
    }
    console.log('\nDone! All tables created.');
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
  }
}

main();
