//宣告
let today = new Date()
let month = today.getMonth()
let year = today.getFullYear()
//DOM
let preMonthBtn = document.getElementById('preMonth')
let thisMonthBtn = document.getElementById('thisMonth')
let nextMonthBtn = document.getElementById('nextMonth')
let yearMonthDOM = document.querySelector('h3')
let tbodyDOM = document.querySelector('tbody')
//addModal
// let addModal = document.getElementById('addModal')
const addModal = new bootstrap.Modal('#addModal')
let addModalDate = document.getElementById('addModalDate')
let addModalTime = document.getElementById('addModalTime')
let addModalTitle = document.getElementById('addModalTitle')
let addModalInfo = document.getElementById('addModalInfo')
//editModal
const editModal = new bootstrap.Modal('#editModal')
let editModalDate = document.getElementById('editModalDate')
let editModalTime = document.getElementById('editModalTime')
let editModalTitle = document.getElementById('editModalTitle')
let editModalInfo = document.getElementById('editModalInfo')
let editBtn = document.getElementById('editBtn')
let editBtnDelete = document.getElementById('editBtnDelete')

//addEventListener 事件
preMonthBtn.addEventListener('click', function () {
    month--
    if (month === -1) {
        year--
        month = 11
    }
    renderDate()
})

thisMonthBtn.addEventListener('click', function () {
    let thisDate = new Date()
    month = thisDate.getMonth()
    year = thisDate.getFullYear()
    renderDate()
})

nextMonthBtn.addEventListener('click', function () {
    month++
    if (month === 11) {
        year++
        month = 0
    }
    renderDate()
})

window.onload = function () {
    renderDate()
}

//function 渲染
function renderDate() {
    tbodyDOM.innerHTML = ''
    yearMonthDOM.innerText = `${year}年${month + 1}月`

    //這個月的第一天是禮拜幾
    let dayOfMonth = new Date(year, month, 1).getDay()
    //這個月有幾天
    let dateOfMonth = new Date(year, month + 1, 0).getDate()
    //這個月有幾週
    let allDays = dateOfMonth + dayOfMonth
    let weeks = Math.ceil(allDays / 7)

    let day = 1
    //tr
    for (let i = 0; i < weeks; i++) {
        let trDOM = document.createElement('tr')
        for (let j = 0; j < 7; j++) {
            let tdDOM = document.createElement('td')
            //i=0代表第一週
            if (i === 0 && j < dayOfMonth) {
                tdDOM.innerText = ''
            } else {
                if (day <= dateOfMonth) {
                    let monthString = month + 1 > 9 ? month + 1 : `0${month + 1}`
                    let dayString = day > 9 ? day : `0${day}`
                    let key = `${year}-${monthString}-${dayString}`
                    let toDoList = getToDoList(key)
                    let span = document.createElement('span')
                    tdDOM.append(span)
                    span.innerText = day
                    // tdDOM.addEventListener('click', tdClick.bind(null, year, month, day))
                    span.onclick = () => [
                        showAddModal(key)
                    ]
                    toDoList.forEach((data, index) => {
                        let p = document.createElement('p')
                        p.innerText = `${data.time} ${data.title}`
                        p.addEventListener('click', () => {
                            showEditModal(data, index)
                        })
                        tdDOM.append(p)
                    })
                    day++
                } else {
                    tdDOM.innerText = ''
                }
            }
            trDOM.append(tdDOM)
        }
        tbodyDOM.append(trDOM)
    }
}


function getToDoList(key) {
    let result = JSON.parse(localStorage.getItem(key))
    return result != null ? result : []
}

function showAddModal(date) {
    //將日期取到Modal的input value
    addModalDate.value = date
    addModal.show()
}

function addCalendar() {
    let array = getToDoList(addModalDate.value)
    let obj = { date: addModalDate.value, time: addModalTime.value, title: addModalTitle.value, info: addModalInfo.value }
    array.push(obj)
    localStorage.setItem(addModalDate.value, JSON.stringify(array))
    addModal.hide()
    renderDate()
}

function editCalendar() {
    let array = getToDoList(editModalDate.value)
    let number = parseInt(editBtn.dataset.number)
    let obj = { date: editModalDate.value, time: editModalTime.value, title: editModalTitle.value, info: editModalInfo.value }
    array.splice(number, 1)
    array.push(obj)
    localStorage.setItem(editModalDate.value, JSON.stringify(array))
    editModal.hide()
    renderDate()
}

function deleteCalendar() {
    let array = getToDoList(editModalDate.value)
    let number = parseInt(editBtnDelete.dataset.number)
    array.splice(number, 1)
    localStorage.setItem(editModalDate.value, JSON.stringify(array))
    editModal.hide()
    renderDate()
}

function showEditModal(data, number) {
    editModalDate.value = data.date
    editModalTime.value = data.time
    editModalTitle.value = data.title
    editModalInfo.value = data.info
    editBtn.dataset.number = number
    editBtnDelete.dataset.number = number
    editModal.show()
}
