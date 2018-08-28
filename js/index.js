const spawn = require('child_process').spawn;
const { dbModel } = require('./model')

window.addEventListener("load", async () => {
  const models = await dbModel.getAll()
  const modelsTable = document.getElementById("models")

  models && models.length && models.forEach((model) => {
    const row = modelsTable.insertRow(modelsTable.rows.length)
    const cell = row.insertCell(0)
    cell.innerHTML = model.name
  })
});


function solve() {
  const value = parseInt(document.querySelector('#value').value)
  // const output = document.querySelector('#output')
  // output.innerHTML = 'Initializing...'
  //
  // const solver = spawn('glpsol', ['-m', 'example/osemosys_model.txt', '-d', 'example/data_utopia.txt', '-o', 'example/results.txt'])
  //
  // solver.stdout.on('data', data => {
  //   output.innerHTML += data + "\n"
  // })
  //
  // solver.stderr.on('data', function (data) {
  //   console.log('stderr: ' + data.toString());
  // });
  //
  // solver.on('exit', function (code) {
  //   console.log(code)
  //   output.innerHTML += 'FINISHED'
  // })
}