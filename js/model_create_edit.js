const { dbModel } = require('./model')

const seasonTable = document.getElementById("seasons")
const dayTypeTable = document.getElementById("daytypes")
const timeBracketTable = document.getElementById("timebrackets")
const timeSliceTable = document.getElementById("timeslices")

const model = {}

function recalculateTimeslices() {
  parseModel()
  model.timeSlices = []
  model.seasons.forEach((season) => {
    model.dayTypes.forEach((dayType) => {
      model.timeBrackets.forEach((timeBracket) => {
        model.timeSlices.push({
          name: `${season.name}_${dayType.name}_${timeBracket.name}`,
          share: 0.1, // whatever formula can caluclate this
        })
      })
    })
  })

  model.timeSlices.forEach((timeSlice) => {
    const row = timeSliceTable.insertRow(timeSliceTable.rows.length)
    const cell = row.insertCell(0)
    const cell2 = row.insertCell(1)
    cell.innerHTML = `<input type="text" name="name" class="trigger-time-slice-calculation" value="${timeSlice.name}">`
    cell2.innerHTML = `<input type="number" name="share" class="trigger-time-slice-calculation" value="${timeSlice.share}">`
  })
}

function addSeason() {
  const row = seasonTable.insertRow(seasonTable.rows.length)
  const cell = row.insertCell(0)
  cell.innerHTML = `<input type="text" class="trigger-time-slice-calculation" placeholder="e.g. Summer">`
  bindListener()
}

function addDayType() {
  const row = dayTypeTable.insertRow(dayTypeTable.rows.length)
  const cell = row.insertCell(0)
  const cell2 = row.insertCell(1)
  cell.innerHTML = `<input type="text" name="name" class="trigger-time-slice-calculation" placeholder="e.g. Weekday">`
  cell2.innerHTML = `<input type="number" name="number-of-days" class="trigger-time-slice-calculation" placeholder="5">`
  bindListener()
}

function addTimeBracket() {
  const row = timeBracketTable.insertRow(dayTypeTable.rows.length)
  const cell = row.insertCell(0)
  const cell2 = row.insertCell(1)
  cell.innerHTML = `<input type="text" name="name" class="trigger-time-slice-calculation" placeholder="e.g. Day">`
  cell2.innerHTML = `<input type="number" name="number-of-hours" class="trigger-time-slice-calculation" placeholder="12">`
  bindListener()
}

function bindListener() {
  const timeSliceInputs = document.getElementsByClassName("trigger-time-slice-calculation")
  Array.from(timeSliceInputs).forEach((element) => {
    element.oninput = recalculateTimeslices
  })
}

function parseModel() {
  // to do use react or angular for databinding
  model.name = document.querySelector('#name').value
  model.description = document.querySelector('#description').value
  model.yearStart = parseInt(document.querySelector('#yearstart').value)
  model.yearEnd = parseInt(document.querySelector('#yearend').value)
  model.currency = document.querySelector('#currency').value
  model.discountRate = parseFloat(document.querySelector('#discount-rate').value)
  model.depreciationMethod = parseInt(document.querySelector('#depreciation-method').value)

  model.seasons = [
    {
      name: "dummySeason1"
    },
    {
      name: "dummySeason2"
    },
  ]

  model.dayTypes = [
    {
      name: "dummyDayType1",
      numberOfDays: 5,
    },
    {
      name: "dummyDayType2",
      numberOfDays: 2,
    },
  ]

  model.timeBrackets = [
    {
      name: "dummyTimeBracket1",
      numberOfHours: 14,
    },
    {
      name: "dummyTimeBracket2",
      numberOfHours: 10,
    },
  ]
}

function saveModel() {
  dbModel.create(model)
}

bindListener()