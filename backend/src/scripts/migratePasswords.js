import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { sequelize } from '../database/database.js';
import { Estudiante } from '../models/Estudiante.js';
import { Propietario } from '../models/Propietario.js';

async function backupTable(model, name) {
  const rows = await model.findAll({ raw: true });
  const file = path.resolve(`./backup_${name}_${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify(rows, null, 2), 'utf8');
  return file;
}

function isHashed(pw) {
  if (!pw || typeof pw !== 'string') return false;
  return pw.startsWith('$2'); // bcrypt hashes start with $2a/$2b/$2y
}

async function migrateModelPasswords(model, keyField) {
  const items = await model.findAll();
  let updated = 0;
  for (const item of items) {
    const pw = item.password;
    if (!isHashed(pw)) {
      const hashed = await bcrypt.hash(pw, 10);
      item.password = hashed;
      await item.save();
      updated++;
      console.log(`Hashed ${keyField}=${item[keyField]}`);
    }
  }
  return updated;
}

async function main() {
  try {
    console.log('Connecting to DB...');
    await sequelize.authenticate();
    console.log('Connected. Creating backups...');
    const backupEst = await backupTable(Estudiante, 'estudiantes');
    const backupProp = await backupTable(Propietario, 'propietarios');
    console.log('Backups written to:', backupEst, backupProp);

    console.log('Migrating estudiantes...');
    const u1 = await migrateModelPasswords(Estudiante, 'email');
    console.log(`estudiantes updated: ${u1}`);

    console.log('Migrating propietarios...');
    const u2 = await migrateModelPasswords(Propietario, 'email');
    console.log(`propietarios updated: ${u2}`);

    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

main();
