const dbconnection = require('../dbconnection')

module.exports.getAll = async () => {
  const db = await dbconnection.getDb()

  const results = []

  return new Promise((resolve, reject) => {
    db.each("SELECT * FROM model", (err, row) => {
      results.push(row)
    }, (err, rowCount) => {
      if (err) reject(error)
      resolve(results)
    });
  })
}

module.exports.create = async (model) => {
  const db = await dbconnection.getDb()

  db.run(`
    INSERT INTO model (
       name,
       description,
       currency,
       discount_rate,
       depreciation_method
    )
    VALUES (?,?,?,?,?)`, [
      model.name,
      model.description,
      model.currency,
      model.discountRate,
      model.depreciationMethod
  ], (err, res) => {

  });

    // todo insert timeslices etc.
}