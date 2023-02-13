// #####################
// # General functions #
// #####################

function createSpan(text) {
    let span = document.createElement("span")
    span.innerHTML = text
    return (span)
}

function updateTotal() {
    let total = document.getElementById("savings-span")
    let sumItems = document.getElementsByClassName("sum")
    let totalSaved = 0
    for(item of sumItems) {
        totalSaved += +item.value
    }
    total.innerHTML = "$" + twoDP(totalSaved)
}


// ###################
// # Title functions #
// ###################

function createCaret() {
    // Create caret container
    let caret = document.createElement("div")
    caret.classList.add("caret-container")
    // Append characters to container
    caret.append(createSpan("&#x2572;"), createSpan("&#x2571;"))
    // Return container
    return(caret)
}

function toggleContent() {
    this.parentNode.classList.toggle("active")
}

function createTitle(titleText) {
    // Create title container
    let titleContainer = document.createElement("div")
    titleContainer.classList.add("title")
    titleContainer.addEventListener("click", toggleContent)
    // Append caret and title to title container
    titleContainer.append(createCaret(), createSpan(titleText))
    return(titleContainer)
}


// #####################
// # Content functions #
// #####################

function createRow() {
    let row = document.createElement("div")
    row.classList.add("row")
    return(row)
}
function createInput(defaultValue, readOnly=false) {
    let input = document.createElement("input")
    input.type = "number"
    input.value = defaultValue
    input.min = 0
    if(readOnly) {
        input.readOnly = true
    } else {
        input.step = 1
    }
    return(input)
}
function twoDP(value) {
    return(parseFloat(value).toFixed(2))
}

// #################
// # Addable items #
// #################

function calculateLED() {
    let row = this.parentNode
    let bulbs = row.getElementsByTagName("input")[0].value
    let hours = row.getElementsByTagName("input")[1].value
    let ogCost = bulbs*((60*hours)/1000)*0.25
    let newCost = bulbs*((9*hours)/1000)*0.25
    row.nextSibling.getElementsByTagName("input")[0].value = twoDP((ogCost-newCost)*365)
    updateTotal()
}
function addLED(bulbs, hours) {
    console.log("adding LED")
    // Create accordion container
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Swap incandescent bulbs for LEDs")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(bulbs)
    let input2 = createInput(hours)
    input1.addEventListener("input", calculateLED)
    input2.addEventListener("input", calculateLED)
    row1.append(
        createSpan("Changing"),
        input1,
        createSpan("bulbs that are used for"),
        input2,
        createSpan("hours every day")
    )
    // Row 2 text and contents
    let row2 = createRow()
    let input3 = createInput(twoDP((bulbs * ((60 * hours) / 1000) * 0.25 - bulbs * ((9 * hours) / 1000) * 0.25) * 365), true)
    input3.classList.add("sum")
    row2.append(
        createSpan("could save you up to"),
        input3,
        createSpan("dollars a year!")
    )
    // Append rows to content
    content.append(row1, row2)
    // Append content to item
    item.appendChild(content)
    // Append item to list
    document.getElementById("accordion-container").appendChild(item)
}

function calculateShower() {
    let row = this.parentNode
    let minutes1 = row.getElementsByTagName("input")[0].value
    let minutes2 = row.getElementsByTagName("input")[1].value
    let hours = (minutes1-minutes2)/60
    row.nextSibling.getElementsByTagName("input")[0].value = twoDP(((3750 * hours) / 1000) * 0.25 * 365)
    updateTotal()
}
function addShower(oldMins, newMins) {
    console.log("adding shower")
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Reducing shower length")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(oldMins)
    let input2 = createInput(newMins)
    input1.addEventListener("input", calculateShower)
    input2.addEventListener("input", calculateShower)
    row1.append(
        createSpan("Shortening your shower time from"),
        input1,
        createSpan("minutes to"),
        input2,
        createSpan("minutes every day")
    )
    let row2 = createRow()
    let input3 = createInput(twoDP(((3750 * ((oldMins-newMins)/60)) / 1000) * 0.25 * 365), true)
    input3.classList.add("sum")
    row2.append(
        createSpan("could save you up to"),
        input3,
        createSpan("dollars a year!")
    )
    // Append rows to content
    content.append(row1, row2)
    // Append content to item
    item.appendChild(content)
    // Append item to list
    document.getElementById("accordion-container").appendChild(item)
}

function calculateTowelHeater() {
    let row = this.parentNode
    let hours1 = row.getElementsByTagName("input")[0].value
    let hours2 = row.getElementsByTagName("input")[1].value
    let hours = hours1 - hours2
    row.nextSibling.getElementsByTagName("input")[0].value = twoDP(((150 * hours) / 1000) * 0.25 * 365)
    updateTotal()
}
function addTowelHeater(oldHours, newHours) {
    console.log("adding towel heater")
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Minimise use of heated towel rack")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(oldHours)
    let input2 = createInput(newHours)
    input1.addEventListener("input", calculateTowelHeater)
    input2.addEventListener("input", calculateTowelHeater)
    row1.append(
        createSpan("On average, heated towel racks are left on for"),
        input1,
        createSpan("hours every day. Reducing usage to"),
        input2,
        createSpan("hours every day")
    )
    let row2 = createRow()
    let input3 = createInput(twoDP(((150 * (oldHours - newHours)) / 1000) * 0.25 * 365), true)
    input3.classList.add("sum")
    row2.append(
        createSpan("could save you up to"),
        input3,
        createSpan("dollars a year!")
    )
    // Append rows to content
    content.append(row1, row2)
    // Append content to item
    item.appendChild(content)
    // Append item to list
    document.getElementById("accordion-container").appendChild(item)
}