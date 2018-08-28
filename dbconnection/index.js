const sqlite3 = require('sqlite3').verbose();
const electron = require('electron')
const path = require('path')
const fs = require('fs');

let db

module.exports.initialize = async () => {
  const userDir = (electron.app || electron.remote.app).getPath('userData');
  const dbPath = path.join(userDir, 'db.sqlite');

  db = new sqlite3.Database(dbPath);
  initializeAsyncFeatures()
  await initializeModels()
  return db
}

module.exports.getDb = async () => {
  if (!db) db = await this.initialize()
  return db
}

function initializeAsyncFeatures() {
  // doing this so we don't need to use callbackfunction, but can use async/await promises
  db.getAsync = (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(query, params, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }
}

async function initializeModels() {
  // check if db file already contains our structure
  const dbStructureExists = await db.getAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='model';");
  if (dbStructureExists) return

  // setup data model

  console.log("start setup")
  db.serialize(() => {
    db.run(`
      CREATE TABLE model (
        name TEXT,
        description TEXT,
        currency TEXT,
        discount_rate REAL,
        depreciation_method INTEGER DEFAULT 1
      )`);

    // table for years
    db.run(`
      CREATE TABLE set_year (
        year INTEGER,
        model INTEGER,
        FOREIGN KEY (model) REFERENCES model (id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`);

    // table for summer/winter distinction
    db.run(`
      CREATE TABLE set_season (
        name TEXT,
        model INTEGER,
        FOREIGN KEY (model) REFERENCES model (id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`);

    // table for day distinction. e.g. 5 workdays, 2 weekenddays
    db.run(`
      CREATE TABLE set_daytype (
        name TEXT,
        number_of_days INTEGER,
        model INTEGER,
        FOREIGN KEY (model) REFERENCES model (id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`);

    // table for daytime distinction. e.g. 14 hours day, 10 hours night
    db.run(`
      CREATE TABLE set_dailytimebracket (
        name TEXT,
        number_of_hours INTEGER,
        model INTEGER,
        FOREIGN KEY (model) REFERENCES model (id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`);

    // table for timeslices, which are a combination of the above. eg. 1 timeslice is the night of a workday in winter
    db.run(`
      CREATE TABLE set_timeslice (
        name TEXT,
        share REAL,
        model INTEGER,
        FOREIGN KEY (model) REFERENCES model (id) ON DELETE CASCADE ON UPDATE NO ACTION
      )`);
  });
  console.log("start setup")

  const test = await db.getAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='model';");
  console.log(test)
}



