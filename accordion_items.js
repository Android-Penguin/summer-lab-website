// #####################
// # General functions #
// #####################

function createSpan(text) {
    let span = document.createElement("span")
    span.innerHTML = text
    return (span)
}

function updateTotal() {
    console.log("updating total")
    let total = document.getElementById("savings-span")
    let sumItems = document.getElementsByClassName("sum")
    let totalSaved = 0
    for(item of sumItems) {
        totalSaved += +item.value
    }
    total.innerHTML = "$" + oneDP(totalSaved) + "0"
}


// ###################
// # Title functions #
// ###################

function toggleContent() {
    this.parentNode.classList.toggle("active")
}

function removeItem() {
    this.parentNode.parentNode.remove()
    updateTotal()
}

function createCaret() {
    // Create caret container
    let caret = document.createElement("div")
    caret.classList.add("caret-container")
    // Append characters to container
    caret.append(createSpan("&#x2572;"), createSpan("&#x2571;"))
    // Return container
    return(caret)
}

function createRemoveIcon() {
    // Create img
    let icon = document.createElement("img")
    icon.classList.add("remove-icon")
    icon.src = "./assets/remove_blue.svg"
    icon.alt = "remove item"
    icon.addEventListener("click", removeItem)
    return (icon)
}

function createTitle(titleText) {
    // Create title container
    let titleContainer = document.createElement("div")
    titleContainer.classList.add("title")
    titleContainer.addEventListener("click", toggleContent)
    // Append caret and title to title container
    titleContainer.append(createCaret(), createSpan(titleText), createRemoveIcon())
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
function oneDP(value) {
    return(parseFloat(value).toFixed(1))
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
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP((ogCost-newCost)*365)
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
    let input3 = createInput(oneDP((bulbs * ((60 * hours) / 1000) * 0.25 - bulbs * ((9 * hours) / 1000) * 0.25) * 365), true)
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
    updateTotal()
}

function calculateShower() {
    let row = this.parentNode
    let minutes1 = row.getElementsByTagName("input")[0].value
    let minutes2 = row.getElementsByTagName("input")[1].value
    let hours = (minutes1-minutes2)/60
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP(((3750 * hours) / 1000) * 0.25 * 365)
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
    // Row 2 text and contents
    let row2 = createRow()
    let input3 = createInput(oneDP(((3750 * ((oldMins-newMins)/60)) / 1000) * 0.25 * 365), true)
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
    updateTotal()
}

function calculateTowelHeater() {
    let row = this.parentNode
    let hours1 = row.getElementsByTagName("input")[0].value
    let hours2 = row.getElementsByTagName("input")[1].value
    let hours = hours1 - hours2
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP(((150 * hours) / 1000) * 0.25 * 365)
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
    // Row 2 text and contents
    let row2 = createRow()
    let input3 = createInput(oneDP(((150 * (oldHours - newHours)) / 1000) * 0.25 * 365), true)
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
    updateTotal()
}

function calculateWashingMachine() {
    let row = this.parentNode
    let weeklyRuns = row.getElementsByTagName("input")[0].value
    let wattage1 = row.getElementsByTagName("input")[1].value
    let wattage2 = row.getElementsByTagName("input")[2].value
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP(((wattage1 / 1000)-(wattage2/1000)) * 0.25 * weeklyRuns * 52)
    updateTotal()
}
function addWashingMachine(weeklyRuns, wattage1, wattage2) {
    console.log("adding washing machine")
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Upgrading to a more energy efficient washing machine")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(weeklyRuns)
    let input2 = createInput(wattage1)
    let input3 = createInput(wattage2)
    input1.addEventListener("input", calculateWashingMachine)
    input2.addEventListener("input", calculateWashingMachine)
    input3.addEventListener("input", calculateWashingMachine)
    row1.append(
        createSpan("Older washing machines consumer much higher amounts of power. If you run your washing machine"),
        input1,
        createSpan("times per week, upgrading from a"),
        input2,
        createSpan("watt washing machine to a"),
        input3,
        createSpan("watt machine")
    )
    // Row 2 text and contents
    let row2 = createRow()
    let input4 = createInput(oneDP(((wattage1 / 1000) - (wattage2 / 1000)) * 0.25 * weeklyRuns * 52), true)
    input4.classList.add("sum")
    row2.append(
        createSpan("could save you up to"),
        input4,
        createSpan("dollars a year!")
    )
    // Append rows to content
    content.append(row1, row2)
    // Append content to item
    item.appendChild(content)
    // Append item to list
    document.getElementById("accordion-container").appendChild(item)
    updateTotal()
}

function calculateDryer() {
    let row = this.parentNode
    let hours1 = row.getElementsByTagName("input")[0].value
    let hours2 = row.getElementsByTagName("input")[1].value
    let hoursPerWeek = hours1 - hours2
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP(((1500 * hoursPerWeek) / 1000) * 0.25 * 52)
    updateTotal()
}
function addDryer(weeklyHours1, weeklyHours2) {
    console.log("adding dryer")
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Minimise use of dryer")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(weeklyHours1)
    let input2 = createInput(weeklyHours2)
    input1.addEventListener("input", calculateDryer)
    input2.addEventListener("input", calculateDryer)
    row1.append(
        createSpan("Dryers are costly to run but the sun is free! Reducing dryer usage from"),
        input1,
        createSpan("hours per week to"),
        input2,
        createSpan("hours per week")
    )
    // Row 2 text and contents
    let row2 = createRow()
    let input3 = createInput(oneDP(((1500 * (weeklyHours1-weeklyHours2)) / 1000) * 0.25 * 52), true)
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
    updateTotal()
}

function calculateMonitor() {
    let row = this.parentNode
    let dailyHours = row.getElementsByTagName("input")[0].value
    let wattage1 = row.getElementsByTagName("input")[1].value
    let wattage2 = row.getElementsByTagName("input")[2].value
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP((((wattage1 * dailyHours) / 1000) - ((wattage2 * dailyHours) / 1000)) * 0.25 * 365)
    updateTotal()
}
function addMonitor(dailyHours, wattage1, wattage2) {
    console.log("adding washing monitor")
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Upgrading to a more energy efficient computer monitor")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(dailyHours)
    let input2 = createInput(wattage1)
    let input3 = createInput(wattage2)
    input1.addEventListener("input", calculateMonitor)
    input2.addEventListener("input", calculateMonitor)
    input3.addEventListener("input", calculateMonitor)
    row1.append(
        createSpan("It's often tempting to find the cheapest monitor available, but spending more on an efficient monitor can have power savings in the long run. Using a monitor for"),
        input1,
        createSpan("hours per day, upgrading from a"),
        input2,
        createSpan("watt monitor to a"),
        input3,
        createSpan("watt monitor")
    )
    // Row 2 text and contents
    let row2 = createRow()
    let input4 = createInput(oneDP((((wattage1 * dailyHours) / 1000) - ((wattage2 * dailyHours) / 1000)) * 0.25 * 365), true)
    input4.classList.add("sum")
    row2.append(
        createSpan("could save you up to"),
        input4,
        createSpan("dollars a year!")
    )
    // Append rows to content
    content.append(row1, row2)
    // Append content to item
    item.appendChild(content)
    // Append item to list
    document.getElementById("accordion-container").appendChild(item)
    updateTotal()
}

function calculateTV() {
    let row = this.parentNode
    let dailyHours = row.getElementsByTagName("input")[0].value
    let wattage1 = row.getElementsByTagName("input")[1].value
    let wattage2 = row.getElementsByTagName("input")[2].value
    row.nextSibling.getElementsByTagName("input")[0].value = oneDP((((wattage1 * dailyHours) / 1000) - ((wattage2 * dailyHours) / 1000)) * 0.25 * 365)
    updateTotal()
}
function addTV(dailyHours, wattage1, wattage2) {
    console.log("adding washing monitor")
    let item = document.createElement("div")
    item.classList.add("accordion-item")
    // Create and append title
    let title = createTitle("Purchasing a more energy efficient TV")
    item.appendChild(title)
    // Create pane container
    let content = document.createElement("div")
    content.classList.add("pane")
    // Row 1 text and contents
    let row1 = createRow()
    let input1 = createInput(dailyHours)
    let input2 = createInput(wattage1)
    let input3 = createInput(wattage2)
    input1.addEventListener("input", calculateMonitor)
    input2.addEventListener("input", calculateMonitor)
    input3.addEventListener("input", calculateMonitor)
    row1.append(
        createSpan("Upgrading your TV can improve your entertainment experience and save on electricity bills. If you watch TV for"),
        input1,
        createSpan("hours a day, switching from a"),
        input2,
        createSpan("watt TV to a"),
        input3,
        createSpan("watt TV")
    )
    // Row 2 text and contents
    let row2 = createRow()
    let input4 = createInput(oneDP((((wattage1 * dailyHours) / 1000) - ((wattage2 * dailyHours) / 1000)) * 0.25 * 365), true)
    input4.classList.add("sum")
    row2.append(
        createSpan("could save you up to"),
        input4,
        createSpan("dollars a year!")
    )
    // Append rows to content
    content.append(row1, row2)
    // Append content to item
    item.appendChild(content)
    // Append item to list
    document.getElementById("accordion-container").appendChild(item)
    updateTotal()
}