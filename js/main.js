// Monthly Bills
const currentYear = document.getElementById('year')
const currentMonth = document.getElementById('month')
const monthPlus = document.getElementById('monthPlus')
const monthMinus = document.getElementById('monthMinus')
const initialInput = document.getElementById('initialInput')
const enterBtn = document.getElementById('enter')
const userInput = document.getElementById('userInput')
const myForm = document.getElementById('myForm')
const totalBillsBtn = document.getElementById('totalBillsBtn')
const myLine = document.getElementById('myLine')
const totalHolder = document.getElementById('total-holder')
const total = document.getElementById('total')
const printBtn = document.getElementById('print')
const resetAll = document.getElementById('resetAll')
const changeLanguage = document.getElementById('changeLanguage')
const changeTheme = document.getElementById('changeTheme')
let date = new Date
let year = date.getFullYear()
let month = date.getMonth()
const namesOfMonths = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
const namesOfMonthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

currentYear.innerText = year
if (changeLanguage.innerText === 'EN') {
    currentMonth.innerText = namesOfMonths[month]
} else if (changeLanguage.innerText === 'SR') {
    currentMonth.innerText = namesOfMonthsEn[month]
}

printBtn.addEventListener('click', () => window.print())
resetAll.addEventListener('click', () => location.reload())
changeTheme.addEventListener('click', e => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        if (changeLanguage.innerText === 'EN') {
            e.target.innerHTML = 'Tamna Tema'
        } else if (changeLanguage.innerText === 'SR') {
            e.target.innerHTML = 'Dark Theme'
        }
    } else {
        html.classList.add('dark')
        if (changeLanguage.innerText === 'EN') {
            e.target.innerHTML = 'Svetla Tema'
        } else if (changeLanguage.innerText === 'SR') {
            e.target.innerHTML = 'Light Theme'
        }
    }
})

monthPlus.addEventListener('click', () => {
    month++
    if (month > 11) {
        month = 0
    }
    if (changeLanguage.innerText === 'EN') {
        currentMonth.innerText = namesOfMonths[month]
    } else if (changeLanguage.innerText === 'SR') {
        currentMonth.innerText = namesOfMonthsEn[month]
    }
})

monthMinus.addEventListener('click', () => {
    month--
    if (month < 0) {
        month = 11
    }
    if (changeLanguage.innerText === 'EN') {
        currentMonth.innerText = namesOfMonths[month]
    } else if (changeLanguage.innerText === 'SR') {
        currentMonth.innerText = namesOfMonthsEn[month]
    }
})

enterBtn.addEventListener('click', addInputAfterClick);
userInput.addEventListener('keypress', (event) => {
    if (inputLength() > 0 && event.which === 13) {
        createFormElement()
    }
});

function inputLength() {
    return userInput.value.length
}

function addInputAfterClick() {
    if (inputLength() > 0) {
        createFormElement()
    }
}

function createFormElement() {
    billName = userInput.value
    const div = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    const i = document.createElement('i')
    myForm.appendChild(div)
    div.classList.add('form-control')
    const formControls = document.querySelectorAll('.form-control')
    formControls.forEach(formControl => {
        formControl.appendChild(input)
        input.setAttribute('type', 'number')
        input.id = `${billName}`
        if (changeLanguage.innerText === 'EN') {
            input.setAttribute('placeholder', 'din')
        } else if (changeLanguage.innerText === 'SR') {
            input.setAttribute('placeholder', 'usd')
        }
        formControl.appendChild(label)
        label.setAttribute('for', `${billName}`)
        label.innerText = `${billName}`
        formControl.appendChild(i)
        i.classList.add('fa-solid')
        i.classList.add('fa-xmark')
        userInput.value = ''
        const closes = document.querySelectorAll('.fa-solid')
        closes.forEach(close => close.addEventListener('click', deleteFormItem))
    })
    totalBillsBtn.style.display = 'inline-block'
    totalBillsBtn.addEventListener('click', addAllBill)
}

function deleteFormItem() {
    this.classList.add('delete')
    const formControls = document.querySelectorAll('.form-control')
    formControls.forEach(formControl => {
        if (formControl.childNodes[2].classList.contains('delete')) {
            formControl.style.display = 'none'
        }
    })
}

function addAllBill() {
    totalBillsBtn.style.display = 'none'
    let totalAmount = 0
    let amount
    const myInputs = document.querySelectorAll('input[type=number]')
    const formControls = document.querySelectorAll('.form-control')
    formControls.forEach(formControl => {
        formControl.childNodes[2].style.display = 'none'
        if (formControl.childNodes[2].classList.contains('delete')) {
            formControl.childNodes[0].value = 0
        }
        if (formControl.childNodes[0].value === '') {
            formControl.childNodes[0].value = 0
        }
    })
    myInputs.forEach(myInput => {
        amount = parseInt(myInput.value)
        totalAmount += amount
    })
    monthPlus.style.display = 'none'
    monthMinus.style.display = 'none'
    myLine.style.display = 'block'
    total.innerText = totalAmount
    totalHolder.style.display = 'flex'
    resetAll.style.display = 'inline-block'
    initialInput.style.display = 'none'
}