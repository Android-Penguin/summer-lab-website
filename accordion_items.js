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
    total.innerHTML = "$" + totalSaved
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


function calculateLED() {
    let row = this.parentNode
    bulbs = row.getElementsByTagName("input")[0].value
    hours = row.getElementsByTagName("input")[1].value
    ogCost = bulbs*((60*hours)/1000)*0.25
    newCost = bulbs*((9*hours)/1000)*0.25
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
    input1.addEventListener("input", calculateLED)
    let input2 = createInput(hours)
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