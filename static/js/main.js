/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 512:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: function() { return /* binding */ CalendarDateField; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(120);


class CalendarDateField {
    /**
     *
     * @param {HTMLElement} field
     */
    constructor(field) {
        this._oldValue = undefined
        this._newValue = undefined
        this.field = field
        this._input = field?.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.data.input)
        this._button = field?.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.data.del)
        if (this._input) {
            this._focusInput()
            this._blurInput()
            this._inputInput()
        }
        if (this._button) {
            this._cleanInfo()
        }
    }

    get oldValue() {
        return this._oldValue
    }

    /**
     *
     * @param {Date||undefined} value
     */
    set oldValue(value) {
        this._oldValue = value
        this._newValue = value
        this.input.value = value ? value.toLocaleDateString() : ''
    }

    get newValue() {
        return this._newValue
    }

    /**
     *
     * @param {date||undefined} value
     */
    set newValue(value) {
        this._newValue = value
    }

    isChange() {
        return this._newValue?.toLocaleDateString() !== this._oldValue?.toLocaleDateString()
    }

    get input() {
        return this._input
    }

    get cleanBtn() {
        return this._button
    }

    /**
     *
     * @return {Date || undefined}
     * @description return date from input if it is correct date
     */
    get date() {
        let inputInfo = this.input?.value.split('.').reverse()
        if (!inputInfo || inputInfo.length < 2) {
            return
        }
        let date = new Date(inputInfo[0], inputInfo[1] - 1, inputInfo[2])
        if (date.toString() !== 'Invalid Date') {
            return date;
        }
    }

    /**
     * @description add focus of event on input.
     * @description add class while for field
     * @description call _setMonthNumberForSting
     * @see _setMonthNumberForSting
     * @private
     */
    _focusInput() {
        this._input.addEventListener('focus', event => {
            if(!this.field.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)){
                this.field.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)
            }
            this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.voled)
        })
    }

    _blurInput() {
        this._input.addEventListener('blur', () => {
            if (!this.date) {
                this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)
                this.input.value = ''
            } else {
                this.input.value = this.date.toLocaleDateString()
            }
            // this.field.classList.remove(SELECTORS.elements.fields.modifiers.voled)
        })
    }

    _inputInput() {
        let currectInput = (str, functionTestCurrect, positionCursor) => {
            let newRes = str.split('')

            if (newRes.length > 1) {
                newRes.splice(positionCursor, 1)
            }

            if (functionTestCurrect(newRes.join(''))) {
                return  newRes.join('')
            } else {
                if (newRes.join('') !== '') {

                    return newRes.splice(positionCursor-1, 1)
                } else {
                    return '1'
                }
            }
        }
        let toChange = (e) => {
            let positionCursor = e.currentTarget?.selectionStart
            let remainder;
            let res = this._input.value.split('.')
            console.log(positionCursor,'toChange')
            if( this._input.value[positionCursor]==='.'){
                let indexEl = positionCursor <=3 ? 0 : 1
                if(res[indexEl].length ===3){
                    res[indexEl] = res[indexEl].split('')
                    remainder =  res[indexEl].splice(2)
                    res[indexEl] = res[indexEl].join('')
                    res[indexEl+1] = res[indexEl+1].split('')
                    if( remainder[0]==='1'&& indexEl===0 ||
                        (remainder[0]==='1' || remainder[0]==='2') && indexEl===1){
                        res[indexEl+1][0]=remainder[0]
                    }
                    res[indexEl+1] = res[indexEl+1].join('')
                }
            }

            if (positionCursor <3) {

                res[0] = currectInput(res[0], CalendarDateField._isValedDD, positionCursor)
                if (positionCursor === 2) {
                    positionCursor += 1
                }
            }
            if(positionCursor===3 && !res[1]){
                res[1]='1'
            }
            if (positionCursor < 6 && positionCursor > 3) {

                res[1] = currectInput(res[1], CalendarDateField._isValedMonth, positionCursor-3)
                if (positionCursor === 5) {
                    positionCursor += 1
                }

            }

            if (positionCursor > 6) {

                if(  res[2][0] ==='1' ||  res[2][0] === '2'){
                    res[2] = currectInput(res[2],CalendarDateField._isValedYear,positionCursor-6)
                }else{
                    res[2] = res[2].substring(1)
                }
            }



            this._input.value = res.join('.')

            e.currentTarget.selectionStart = positionCursor
            e.currentTarget.selectionEnd = positionCursor
        }
        let toInput = (e) => {
            let res = this._input.value.split('').filter(value => value !== '' && !Number.isNaN(+value))
            if (res.length < 3) {
                if(!CalendarDateField._isValedDD(res.join(''))){
                    res.splice(res.length-1,1)
                }
            }
            if (res.length < 5 && res.length > 3) {
                if(!CalendarDateField._isValedMonth(res.slice(2).join(''))){
                    res.splice(res.length-1,1)
                }
            }
            if (res.length >= 5) {
                if( res.slice(4,5)[0] ==='1' || res.slice(4,5)[0] === '2'){
                }else{
                    res.splice(res.length-1,1)
                }
            }
            res = CalendarDateField._maskData(res)
            this._input.value = res.join('')
        }

        this._input.addEventListener('input', (e) => {
            let positionCursor = e.currentTarget?.selectionStart
            let isChange = this.input.value.length > positionCursor;

            // if (this.input.value.length > 0 &&
            //     positionCursor > 0 &&
            //     (Number.isNaN(+this.input.value[positionCursor - 1])) || this.input.value[positionCursor - 1]==='.')
            if(!this.input.value  && !this.date) {
                let res = this.input.value.split('')
                res.splice(positionCursor - 1, 1)
                this.input.value = res.join('')
            }

            if (isChange) {
                console.log('change')
                toChange(e)
            } else {
                console.log('input')
                toInput(e)
            }


            this._newValue =  this.date

        })
    }

    /**
     *
     * @param {string||number} dd
     * @return {boolean}
     * @private
     */
    static _isValedDD(dd) {
        return +dd > 0 && +dd < 32
    }

    /**
     *
     * @param {string||number} month
     * @return {boolean}
     * @private
     */
    static _isValedMonth(month) {
        return +month > 0 && +month < 13
    }

    /**
     *
     * @param {string} year
     * @private
     */
    static _isValedYear(year) {
        return year.length === 4 && +year > 1000 && +year < 3000
    }

    /**
     *@description преобразует лист строк к маске DD.MM.YYYY
     *
     * @param {Array<string>} arrayStr
     * @static
     * @return {Array<string>}
     */
    static _maskData(arrayStr) {

        return arrayStr.filter((v, i) => i <= 7).map((v, i) => {
            if (i === 2 || i === 4) {
                return '.' + v
            }
            return v
        })

    }

    _cleanInfo() {
        this._button.addEventListener('click', (e) => {
            e.preventDefault()
            this.oldValue = undefined
            this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)
            this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.voled)

        })
    }

}


/***/ }),

/***/ 634:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: function() { return /* binding */ CalendarMonth; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(120);


class CalendarMonth {

    /**
     *
     * @param {HTMLInputElement} monthPage
     */
    constructor(monthPage) {
        this._oldValue = undefined
        this._newValue = undefined
        this._monthPage = monthPage
        this._days = []
        // this.createDays()
    }

    /***
     *
     * @param {number} value
     */
    set oldValue(value) {
        this._oldValue = value
        this._newValue = value
    }

    /**
     *
     * @param {number} value
     */
    set newValue(value) {
        this._newValue = value
    }

    get newValue() {
        return this._newValue
    }

    get field() {
        return this._monthPage
    }

    /**
     *
     * @param {Date||undefined} from
     * @param {Date||undefined} to
     * @param {Array<number>||undefined} selectDays
     */
    createDays(from, to= undefined, selectDays=[]) {
        this._removeDays()

        let fromDay = from ? from.getDate() : undefined
        let toDay = to ? to.getDate() : undefined

        let existData = from ?? to

        //add empty day
        if (existData) {
            for (let i = 1; i < new Date(existData.getFullYear(), existData.getMonth()).getDay(); i++) {
                let p = document.createElement('p')

                p.className = _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.block
                this._monthPage.append(p)
            }

            //add day in this month
            for (let i = 1; i <= 31; i++) {
                if (existData.getMonth() === new Date(existData.getFullYear(), existData.getMonth(), i).getMonth()) {
                    this._createDay(i, selectDays, fromDay, toDay)
                }
            }

                this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.modifiers.hidden)

        } else {
            // //add day in this month
            // for (let i = 1; i <= 31; i++) {
            //     this._createDay(i, selectDays, fromDay, toDay)
            // }
            //hiding monthPage
            if(this.field && !this.field?.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.modifiers.hidden)){
                this.field.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.modifiers.hidden)
            }
        }
    }

    /**
     *
     * @param {number} numberDay
     * @param {Array<number> ||undefined} selectDays
     * @param {number||undefined} fromDay
     * @param {number||undefined} toDay
     * @private
     */
    _createDay(numberDay, selectDays, fromDay, toDay) {

        let p = this._days.find(el=>+el.dataset.value === numberDay)
        if(!p){
            p = document.createElement('p')
            let span = document.createElement('span')
            span.textContent = `${numberDay.toString()}`
            p.append(span)
            p.className = _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.block
            p.dataset.value = numberDay + ''
            p.addEventListener('click', this._clickOnDay)
            this._days.push(p)
        }


        if (selectDays && selectDays.includes(numberDay)) {
            if(!p.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.modifiers.select)){
                p.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.modifiers.select)
            }
        }else{
            p.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.modifiers.select)
        }

        if (fromDay && toDay && fromDay <= numberDay && numberDay <= toDay) {
            if(!p.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.modifiers.inRange)){
                p.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.modifiers.inRange)
            }
        }else{
            p.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.modifiers.inRange)
        }
        this._monthPage.append(p)
    }

    _clickOnDay = (e) => {
        if (e.currentTarget.dataset?.value !== "") {
            // this._newValue = this._oldValue ? new Date(this._oldValue) : new Date()
            this._newValue = +e.currentTarget.dataset.value
            this.field.dispatchEvent(new CustomEvent('change', {bubbles: true}))
        }

    }


    isChange() {
        return this._oldValue !== this._newValue
    }

    _removeDays() {
        if (this._monthPage) {
            this._monthPage.querySelectorAll('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.elements.date.block)
                .forEach(value => {
                    value.remove()
                })
        }
    }

    setDefault() {
        this._oldValue = undefined
        this._newValue = undefined
        // this.createDays()
    }

}

/***/ }),

/***/ 142:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: function() { return /* binding */ CalendarPage; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(120);
/* harmony import */ var _CalendarDateField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(512);
/* harmony import */ var _CalendarSelectField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(762);
/* harmony import */ var _CalendarMonth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(634);






class CalendarPage {
    constructor(page) {
        this._inputDateMonthType = 'number'
        this._page = page
        this._fieldDate = new _CalendarDateField__WEBPACK_IMPORTED_MODULE_1__/* .CalendarDateField */ .F(page?.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.data))
        this._fieldSelectYear = new _CalendarSelectField__WEBPACK_IMPORTED_MODULE_2__/* .CalendarSelectField */ .q(page?.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.selectYear), 'year')
        this._fieldSelectMonth = new _CalendarSelectField__WEBPACK_IMPORTED_MODULE_2__/* .CalendarSelectField */ .q(page?.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.selectMonth), 'month')
        this._monthPage = new _CalendarMonth__WEBPACK_IMPORTED_MODULE_3__/* .CalendarMonth */ .C(page?.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.block))
        this._bntRestet = this.page.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.block)
        this._bntUse = this.page.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.block)

        if (this._fieldDate.input) {
            this._focusInputDate()
            this._blurInputDate()
            this._InputInputDate()
            this._fieldDate.cleanBtn.addEventListener('click', () => {
                this.setDefault()
            })
        }
        if(this._page){
            // this._activePage()
        }
        if(this._bntRestet){
            this._bntRestet.addEventListener('click',this._toReset)
        }
    }

    get bntUse(){
        return this._bntUse
    }
    _toReset =(e)=>{
        e.preventDefault()
        this.resetValue()
        this.changeStatusButtons()
    }

    changeStatusButtons() {
        let listParams = [
            this.fieldMonth.isChange() && this.fieldMonth.newValue,
            this.fieldYear.isChange() && this.fieldYear.newValue,
            this.monthPage.isChange() && this.monthPage.newValue,
        ]
        if (listParams.every((isTrue) => isTrue) || this.monthPage.isChange()) {
            if (!this._bntUse.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.modifiers.active)) {
                this._bntUse.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.modifiers.active)
            }
        } else {
            this._bntUse.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.modifiers.active)

        }
        if(listParams.some((isTrue) => isTrue)){
            if (!this._bntRestet.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.modifiers.active)) {
                this._bntRestet.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.modifiers.active)
            }
        }else{
            this._bntRestet.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.modifiers.active)
        }

    }


    setDefault() {
        this.monthPage.setDefault()
        this.fieldYear.setDefault()
        this.fieldMonth.setDefault()
    }

    setInputDateStrMonth() {
        if (this._inputDateMonthType === 'number')
            this._setMonthStrFromNumber(this)
        this._inputDateMonthType = 'str'
    }

    setInputDateNumberMonth() {
        if (this._inputDateMonthType === 'str')
            this._setMonthNumberForSting(this)
        this._inputDateMonthType = 'number'
    }

    setVoledField = () => {
        //add class voled on this._fieldDate if input data are correct.
        if ( this._fieldDate.date && !this._fieldDate.isChange()) {
            if (!this._fieldDate.field.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.voled)) {
                this._fieldDate.field.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.voled)
            }
        }
    }


    isMonthAndYearNotEmpty(){

    return  this.fieldMonth.input.value && this.fieldYear.input.value
    }


    _blurInputDate() {
        this._fieldDate.input.addEventListener('blur',()=>{
            this.setVoledField()
        } )
    }

    _activePage(){
        document.body.addEventListener('click',(e)=>{
            if(this.page.contains(e.target)){
                if(!this.page.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)){
                    this.page.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
                }
            }else{
                this.page.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
            }
        })
    }

    _focusInputDate() {
        this._fieldDate.input.addEventListener('focus', () => {
            //this._setMonthNumberForSting(this._fieldDate.input)

            //remove class voled from classList of field
            //this._fieldDate.field.classList.remove(SELECTORS.elements.fields.modifiers.voled)

        })
    }
    _InputInputDate(){
        this._fieldDate.input.addEventListener('input', () => {
            console.log('input this._fieldDate.input')
            let newDate = this._fieldDate.date

            this.fieldMonth.oldValue = newDate
            this.fieldYear.oldValue = newDate
            this.monthPage.oldValue = newDate?.getDate()
            //
            // this.fieldMonth.setDefault()
            // this.fieldYear.setDefault()
            // this.monthPage.setDefault()
            this._fieldDate.input.dispatchEvent(new CustomEvent('change',{bubbles:true}))
        })
    }

    /**
     * @description replace the month string with a month number in the format ru.
     * @description set number from sessionStorage
     * @param {CalendarPage} page
     * @private
     */
    _setMonthStrFromNumber(page) {
        let arrayDataNumber = page.fieldData.input.value.split('.')
        if (arrayDataNumber.length > 2) {
            sessionStorage.setItem(page.page.id + 'numberMonth', arrayDataNumber[1])
            arrayDataNumber[1] = new Date(new Date(Date.now()).getFullYear(), arrayDataNumber[1] - 1)
                .toLocaleString("ru", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timezone: 'UTC'
                }).split(' ')[1]
            page.fieldData.input.value = arrayDataNumber.join('.')
        }
    }

    /**
     * @description replace the month number with a month string in the format ru
     * @description get number from sessionStorage
     * @param {CalendarPage} page
     * @private
     */
    _setMonthNumberForSting(page) {
        let arrayDataNumber = page.fieldData.input.value.split('.')
        if (arrayDataNumber.length > 2) {
            let numberMonth = sessionStorage.getItem(page.page.id + 'numberMonth')
            if (numberMonth) {
                arrayDataNumber[1] = numberMonth
            }
        }
        page.fieldData.input.value = arrayDataNumber.join('.')
    }

    get page() {
        return this._page
    }

    get fieldData() {
        return this._fieldDate
    }

    get fieldYear() {
        return this._fieldSelectYear
    }

    get fieldMonth() {
        return this._fieldSelectMonth
    }

    get monthPage() {
        return this._monthPage
    }

    fixateChange() {
        console.log('this.fieldData.isChange() '  )
        if(this.fieldData.isChange() ){
            this.fieldData.oldValue = this.fieldData.newValue
            this._monthPage.oldValue =  this.fieldData.newValue?.getDate()
            this._fieldSelectYear.oldValue =  this.fieldData.newValue
            this._fieldSelectMonth.oldValue = this.fieldData.newValue
        }else{
            this._monthPage.oldValue = this._monthPage.newValue
            this._fieldSelectYear.oldValue = this._fieldSelectYear.newValue
            this._fieldSelectMonth.oldValue = this._fieldSelectMonth.newValue

            let newYear = this._fieldSelectYear.newValue?.getFullYear()
            let newMonth = this._fieldSelectMonth.newValue?.getMonth()
            let newDay = this._monthPage.newValue

            if (newYear && Number.isInteger(newMonth) && newDay && newDay !=='') {
                // this.fieldData.input.value = `${newDay >= 10 ? newDay : "0" + newDay.toString()}.${newMonth + 1 >= 10 ? newMonth + 1 : "0" + (newMonth + 1).toString()}.${newYear}`
                this.fieldData.oldValue = new Date(newYear,newMonth,newDay)

            }
        }
        this.fieldData.input.dispatchEvent(new CustomEvent('change',{bubbles:true}))
        this.fieldData.input.dispatchEvent(new MouseEvent('blur',))

    }
    resetValue = ()=>{
        console.log('resetValue'  ,this.fieldData.oldValue)
        this.fieldData.newValue = this.fieldData.oldValue
        this._monthPage.oldValue =  this.fieldData.oldValue?.getDate()
        this._fieldSelectYear.oldValue =  this.fieldData.oldValue
        this._fieldSelectMonth.oldValue =  this.fieldData.oldValue
        this._fieldDate.input.value = this._fieldDate.oldValue ? this._fieldDate.oldValue.toLocaleDateString():''

        this._fieldDate.input.dispatchEvent(new MouseEvent('blur'))
    }
}


/***/ }),

/***/ 762:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: function() { return /* binding */ CalendarSelectField; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(120);



class CalendarSelectField {
    /**
     *
     * @param {HTMLElement} field
     * @param {string} type year or month
     */
    constructor(field, type) {
        this.type = type
        this.field = field
        this._buttonNext = field.querySelector('.field__button_next')
        this._buttonPrev = field.querySelector('.field__button_prev')
        this._select = field.querySelector('ul')
        this._input = field.querySelector('input')
        this._oldValue = undefined
        this._newValue = undefined
        this.emptyEmptyOption = undefined
        this._setDropList()
        //add Listener click event
        if (this.field) {
            this.setColorClassNotEmpty()
            this.field.addEventListener('click', (e) => {
                e.preventDefault()
                if(e.target === this._select){
                    this._setFullPageClass()
                }
                this.setColorClassNotEmpty()
                this.btnWork()

            })
        }

        //show Option
        this._select.addEventListener('mouseup', this._showOption)

        //add Listener click event of buttons
        if (this._buttonNext) {
            this._buttonNext.addEventListener('click', (e) => {
                console.log('_buttonNext')
                e.preventDefault()
                this._delEmptyOption()
                this._setNextOption()
                this._setActionOptionInInput()
            })
        }
        if (this._buttonPrev) {
            this._buttonPrev.addEventListener('click', (e) => {
                e.preventDefault()
                this._delEmptyOption()
                this._setPrevOption()
                this._setActionOptionInInput()
            })
        }

        if(this._buttonNext && this._buttonPrev){
            this.btnWork()
        }
    }

    get input() {
        return this._input
    }

    /***
     *
     * @param {Date} value
     */
    set oldValue(value) {
        this._oldValue = value
        this._newValue = value
        if(value){
            this._rotateDesiredValue(value)
        }else{
            this._addEmptyOption()
        }
        this._setActionOptionInInput()
        this.setColorClassNotEmpty()
        this.btnWork()
    }

    /***
     *
     * @param {Date} value
     */
    set newValue(value) {
        this._newValue = value
    }

    get newValue() {
        return this._newValue
    }

    _setFullPageClass(){
        //add full-page class
        if(!this.field.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)){
            this.field.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
        }else{
            this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
        }
    }

    /**
     * @description 'turn on' or 'turn of' is drive button
     * @private
     */
    btnWork(){
        console.log('btnWork')
        let range = this.type === 'month' ? [11,0] : [2000,new Date().getFullYear()]
        if(this._buttonNext){
            if(+this._select.querySelector('li').dataset.value === range[1]){
                if(!this._buttonPrev.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.select.modifiers.noPointEffect)){
                    this._buttonPrev.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.select.modifiers.noPointEffect)
                }
            }else{
                this._buttonPrev.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.select.modifiers.noPointEffect)
            }
        }
        if(this._buttonPrev){
            if(+this._select.querySelector('li').dataset.value === range[0]){
                if(!this._buttonNext.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.select.modifiers.noPointEffect)){
                    this._buttonNext.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.select.modifiers.noPointEffect)
                }
            }else{
                this._buttonNext.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.select.modifiers.noPointEffect)
            }
        }
    }

    _showOption = () => {
        console.log('_showOption')
        let isAdd = this.field.classList.toggle(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.showOption)
        if (isAdd) {
            this._rotateDesiredValue()
            if (this.type === 'month') {
                this._setNextOption()
            }
            this._addEmptyOption()
        } else {
            if (this._oldValue || this._newValue) {
                this._rotateDesiredValue(this._newValue || this._oldValue)
                this._delEmptyOption()

            }
        }
    }

    /**
     *
     * @param {Date} value
     * @description rotate of options to Desired value
     * @private
     */
    _rotateDesiredValue(value = undefined) {
        let date = value || new Date()
        switch (this.type) {
            case 'year':
                if (this._select.querySelector(`li[data-value="${date.getFullYear()}"]`)) {
                    while (true) {
                        if (+this._select.querySelector('li').dataset.value === date.getFullYear()) {
                            break
                        }
                        this._setNextOption()
                    }
                }

                break;
            case 'month':
                if (this._select.querySelector(`li[data-value="${date.getMonth()}"]`)) {
                    while (true) {
                        if (+this._select.querySelector('li').dataset.value === date.getMonth()) {
                            break
                        }
                        this._setNextOption()
                    }
                }
                break;
        }
    }

    _setNextOption() {
        console.log('_setNextOption')
        let listEl = this._select.querySelectorAll('li')
        if (listEl.length > 0) {
            this._select.append(listEl[0])
        }

    }

    _setPrevOption() {
        console.log('_setPrevOption')
        let listEl = this._select.querySelectorAll('li')
        if (listEl.length > 0) {
            this._select.prepend(listEl[listEl.length - 1])
        }

    }

    _setActionOptionInInput() {

        let value = this._select.querySelector('li')?.dataset.value
        this._input.value = value
        if (value) {
            let newDate = this._oldValue || new Date()
            switch (this.type) {
                case 'year':
                    this._newValue = new Date(newDate)
                    this._newValue.setFullYear(+this._input.value)
                    break;
                case 'month':
                    this._newValue = new Date(newDate)
                    this._newValue.setMonth(+this._input.value)
                    break;
            }
            this._input.dispatchEvent(new CustomEvent('change', {bubbles: true}))
        }
        console.log('_setActionOptionInInput',this._oldValue,this._newValue)

    }

    /**
     *
     * @param {Event} e
     * @private
     */
    _searchFocus = e =>{
        this._select.removeEventListener('mouseup',this._showOption)
    }
    /**
     *
     * @param {Event} e
     * @private
     */
    _searchBlur = e =>{
        this._select.addEventListener('mouseup',this._showOption)
        this._select.querySelectorAll('li:not([data-value=""])').forEach(el=>{
            el.removeAttribute('style')
        })
    }

    _searchInput = e =>{
        let map = {
            'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', '\\[' : 'Х', '\\]' : 'Ъ', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', '\\;' : 'Ж', "\\'" : 'Э', 'Z' : '?', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь', '\\,' : 'Б', '\\.' : 'Ю'
        };

        let val = "";
        for(let i = 0; i < e.currentTarget.value.length;i++)
            if(map[e.currentTarget.value[i]]){
                val+=map[e.currentTarget.value[i]];
            }else{
                val+=e.currentTarget.value[i];
            }
        e.currentTarget.value = val;




       this._select.querySelectorAll('li:not([data-value=""])').forEach(el=>{
           if(!el.textContent.startsWith(e.currentTarget.value)){
               el.style.display = 'none'
           }else{
               el.removeAttribute('style')
           }

       })

    }

    _addEmptyOption() {
        if(this.field === undefined ){
            return;
        }
        console.log('_addEmptyOption')
        if ( this.field.querySelector('li[data-value=""]')) {
            this._select.prepend( this.field.querySelector('li[data-value=""]'))
            return
        }
        if(!this.emptyEmptyOption){
            this.emptyEmptyOption = document.createElement('li')
            this.emptyEmptyOption.dataset.value = ""
            this.emptyEmptyOption.textContent = `Выбрать ${this.type === 'year' ? "год" : "месяц"}`

            let inputEl = document.createElement('input')
            inputEl.placeholder ='поиск'
            inputEl.className = _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.search
            inputEl.onfocus = this._searchFocus
            inputEl.onblur = this._searchBlur
            inputEl.oninput = this._searchInput
            let label = document.createElement('label')
            label.append(inputEl)
            this.emptyEmptyOption.append(label)
        }

        this._select.prepend(this.emptyEmptyOption)
    }

    _delEmptyOption() {
        if (this._oldValue || this._newValue) {
            let emptyOption = this._select.querySelector('li[data-value=""]')
            if (emptyOption) {
                console.log('_delEmptyOption', emptyOption)
                this.emptyEmptyOption.remove()
            }
        }
    }

    setColorClassNotEmpty() {

        if (this._input.value !== '') {
            if (!this.field.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)) {
                this.field.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)
            }
        } else {
            this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.while)
        }

    }

    _setDropList() {
        switch (this.type) {
            case 'year':
                this._setDropListYear()
                break;
            case 'month':
                this._setDropListMonth()
                break;
        }
    }

    isChange() {

        if (this.type === 'year') {
            return this._newValue?.getFullYear() !== this._oldValue?.getFullYear()
        }
        if (this.type === 'month') {
            return this._newValue?.getMonth() !== this._oldValue?.getMonth()
        }
        return this._newValue !== this._oldValue
    }

    _createOption(text, value) {
        let option = document.createElement('li')
        option.textContent = `${text}`
        option.dataset.value = value + ''
        option.addEventListener('click', () => {
            this._delEmptyOption()
            while (true) {
                if (this._select.firstElementChild === option) {
                    break
                }
                this._setNextOption()
            }
            this._setActionOptionInInput()
            this.field.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
        })
        return option
    }

    _setDropListYear() {
        let year = new Date().getFullYear() //this._oldValue ? this._oldValue.getFullYear():new Date().getFullYear()
        this._removeOldOption()
        //add an empty option
        if (!this._oldValue) {
            this._addEmptyOption()
        }
        console.log('_setDropListYear',this._oldValue)
        //create new
        let oldYear = this._oldValue ? this._oldValue.getFullYear() : year;
        //before current year
        for (let i = year; i >= 2000; i--) {
            let option = this._createOption(`${i}`, `${i}`)
            this._select.append(option)
        }
        //after current year
        for (let i = 1; i <= year - oldYear; i++) {
            let option = this._createOption(`${year - i}`, `${year - i}`)
            this._select.append(option)
        }
    }

    _setDropListMonth() {
        this._removeOldOption()
        let creatOption = (numperMonth) => {
            let month = new Date(new Date().getFullYear(), numperMonth)
                .toLocaleString("ru", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timezone: 'UTC'
                }).split(' ')[1]
            return this._createOption(month, numperMonth)
        }
        //add an empty option
        if (!this._oldValue) {
            this._addEmptyOption()
        }
        //create new
        let oldMonth = this._oldValue ? this._oldValue.getMonth() : 0;
        //before current month
        for (let i = oldMonth; i <= 11; i++) {
            this._select.append(creatOption(i))
        }
        //after current month
        for (let i = 0; i <= oldMonth - 1; i++) {
            this._select.append(creatOption(i))
        }

    }

    _removeOldOption() {
        //remove old options
        if(this.field){
            this.field.querySelectorAll('li').forEach(option => {
                option.remove()
            })
        }

    }

    setDefault() {
        this.oldValue = undefined
    }
}


/***/ }),

/***/ 97:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: function() { return /* binding */ Calendar; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(120);
/* harmony import */ var _CalendarPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);




class Calendar {

    /**
     *
     * @param {string} selectionCalendar
     */
    constructor(selectionCalendar) {
        this.calendar = document.querySelector(selectionCalendar)
        this.from = new _CalendarPage__WEBPACK_IMPORTED_MODULE_1__/* .CalendarPage */ .V(this.calendar.querySelector("#" + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.idFrom))
        this.to = new _CalendarPage__WEBPACK_IMPORTED_MODULE_1__/* .CalendarPage */ .V(this.calendar.querySelector("#" + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.idTo))

        this.fromError = this.calendar.querySelector('#calendar-from-error')
        this.toError = this.calendar.querySelector('#calendar-to-error')

        this._bntRestet = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.block+" "+'.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.block)
        this._bntUse = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.block+" "+'.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.block)
        this._bntBack = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.elements.btnBack)
        this._bntX = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.elements.btnX)
        this._trackMouseClick()

        if (this.to) {
            this._EventsDateField(this.to)
            this.to.fieldData.input.addEventListener('input',()=>{
                this._createMonthPages()
            })

            if (this.to.fieldData.input) {
                this.to.fieldData.oldValue =  new Date()
                this.to.setVoledField()
                this.to.setInputDateStrMonth()
                this.to.fieldYear.oldValue =  new Date()
                this.to.fieldMonth.oldValue =  new Date()
                this.to.monthPage.oldValue =  new Date().getDate()
                this.to.fieldMonth.btnWork()
            }
            // if (this.to.monthPage.field) {
            //     this.to.monthPage.createDays(
            //         undefined,
            //         newDate,
            //         [newDate.getDate()])
            // }
        }
        if (this.from) {
            this._EventsDateField(this.from)
            if (this.from.fieldData.input) {
                this.from.fieldMonth.input.value = ''
                this.from.fieldYear.input.value = ''
                this.from.fieldData.input.value = ''
                this.from.fieldData.input.dispatchEvent(new MouseEvent('blur', {bubbles: true}))
            }
        }

        if(this.to && this.from){
            this._headerEffects()
        }

        //add Listener on change of this form
        this.calendar.addEventListener('change', this._listenerChangeForm)

        //add Listener to use Button
        if (this._bntUse) {
            this._bntUse.addEventListener('click', this._toUse)
            if(this.from.bntUse){
                this.from.bntUse.addEventListener('click', this._toUse)
            }
            if(this.to.bntUse){
                this.to.bntUse.addEventListener('click', this._toUse)
            }
        }
        if(this._bntRestet){
            this._bntRestet.addEventListener('click', this._toRestet)
        }

        if(this._bntBack){
            this._bntBack.addEventListener('click',this._toBack)
        }
        if(this._bntX){
            this._bntX.addEventListener('click',this._toBack)
        }
    }

    _setHeadMobile(){
        let headMobile = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.elements.headMobile)
        let head = 'Выберите '
        if(headMobile){
            let fieldFullPage = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
            if(fieldFullPage){
                if( fieldFullPage.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.selectYear)){
                    head += 'год'
                }else{
                    head += 'месяц'
                }
                headMobile.textContent = head
                return;
            }

            head += 'период'
            headMobile.textContent = head
        }
    }

    _headerEffects(){
        let listPage = [this.to.page,this.from.page]
        let main = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.block)

        main?.addEventListener('click',(e)=>{
                this._setHeadMobile()
                //show header and del not-touch class
                let header = this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.block)
                if (header) {
                    if(header.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.modifiers.hidden)){
                        header.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.modifiers.hidden)
                        main.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.modifiers.notTouch)
                    return
                    }
                }

                //switch active page
                let isDelButtonsClick = []
                this.calendar.querySelectorAll('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.elements.data.del)
                    .forEach((btnDel=>{
                        isDelButtonsClick.push( btnDel.contains(e.target) )
                    }))

                if(!isDelButtonsClick.some(el=>el===true) &&
                    !this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)){
                    listPage.map(page=>{
                        if(page.contains(e.target) ){
                            if(!page.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)){
                                page.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
                            }
                            page.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden)
                        }else{
                            if(!page.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden)){
                                page.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden)
                            }
                            page.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
                        }
                    })
                }
                if(!this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)){
                    listPage.map(page=>{
                        page.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden)
                    })
                }

            })
    }

    _showMonthPage(){
        if (  this.from.isMonthAndYearNotEmpty() || this.to.isMonthAndYearNotEmpty()){
            this._createMonthPages()
        }

    }
    _listenerChangeForm = (e) => {
        this._changeStatusButtons()
        this._showMonthPage()
    }

    _createMonthPages() {
        //могут быть назначены, а могут и нет
        let fromDate = this.from.fieldData.date
        let toDate = this.to.fieldData.date
        //могут быть назначены, а могут и нет
        let fromMonth =this.from.fieldMonth.newValue?.getMonth();
        let fromYear =  this.from.fieldYear.newValue?.getFullYear();
        let fromDay = this.from.monthPage.newValue
        //могут быть назначены, а могут и нет
        let toYear = this.to.fieldYear.newValue?.getFullYear();
        let toMonth = this.to.fieldMonth.newValue?.getMonth();
        let toDay = this.to.monthPage.newValue



        if(toYear && toMonth !== undefined && toDay){
            let newDate = new Date(toYear, toMonth,toDay)
            if(newDate.getMonth() === toMonth){
                console.log('newDate.getMonth() === toMonth')
                toDate = new Date(toYear, toMonth,toDay)
            }
        }
        if(fromYear && fromMonth !== undefined  && fromDay){
            let newDate = new Date(fromYear, fromMonth, fromDay)
            if(newDate.getMonth() === fromMonth) {
                console.log('newDate.getMonth() === fromMonth')
                fromDate = new Date(fromYear, fromMonth, fromDay)
            }
        }

        let fromLastDay = new Date(fromYear, fromMonth + 1, 0)
        let toLastDay = new Date(toYear, toMonth + 1, 0)
        let toFirstDay = new Date(toYear, toMonth, 1)



        if (!fromDate && !toDate) {
            console.log('!fromDate && !toDate')
            if( !fromMonth && !fromYear && !toMonth && !toYear){
                this.from.monthPage.createDays()
                this.to.monthPage.createDays()
            }else{
                if(fromMonth !==undefined && fromYear){
                    this.from.monthPage.createDays(undefined, new Date(fromYear, fromMonth))
                }else{
                    this.from.monthPage.createDays()
                }
                if(toMonth !==undefined && toYear){
                    this.to.monthPage.createDays(undefined, new Date(toYear, toMonth))
                }else{
                    this.to.monthPage.createDays()
                }
            }
            return
        }

        if (!fromDate) {
            console.log('!fromDate')
            if(fromMonth !==undefined && fromYear){
                this.from.monthPage.createDays(undefined, new Date(fromYear, fromMonth))
                // if(fromDay){
                //     this.from.monthPage.createDays(undefined, new Date(fromYear, fromMonth),[fromDay])
                // }
            }else{
                this.from.monthPage.createDays()
            }
            this.to.monthPage.createDays(undefined, new Date(toYear, toMonth), [toDate.getDate()])
            return;
        }
        if (!toDate) {
            console.log('!toDate')
            if(toMonth !==undefined && toYear){
                this.to.monthPage.createDays(undefined, new Date(toYear, toMonth))
                // if(toDay){
                //     this.to.monthPage.createDays(undefined, new Date(toYear, toMonth),[toDay])
                // }
            }else{
                this.to.monthPage.createDays()
            }

            this.from.monthPage.createDays(undefined, new Date(fromYear, fromMonth), [fromDate.getDate()])
            return;
        }


        //если даты равны по году и месяцу
        if (fromDate.getFullYear() === toDate.getFullYear() &&
            fromDate.getMonth() === toDate.getMonth()) {
            console.log('fromDate.getFullYear() === toDate.getFullYear() &&\n' +
                '            fromDate.getMonth() === toDate.getMonth()')
            this.from.monthPage.createDays(fromDate, toDate, [fromDate.getDate(), toDate.getDate()])
            this.to.monthPage.createDays(fromDate, toDate, [fromDate.getDate(), toDate.getDate()])
            return;
        }

        if(fromDate.getMonth() === fromMonth && fromDate.getFullYear() === fromYear){
            console.log('fromDate.getMonth() === fromMonth && fromDate.getFullYear() === fromYear')
            this.from.monthPage.createDays(fromDate, fromLastDay, [fromDate.getDate()])
        }else{
            console.log('!(fromDate.getMonth() === fromMonth && fromDate.getFullYear() === fromYear)')
            this.from.monthPage.createDays(new Date(fromYear,fromMonth, fromLastDay.getDate()))
        }
        if(toDate.getMonth() === toMonth && toDate.getFullYear() === toYear){
            console.log('toDate.getMonth() === toMonth && toDate.getFullYear() === toYear')
            this.to.monthPage.createDays(toFirstDay, toDate, [toDate.getDate()])
        }else{
            console.log('!(toDate.getMonth() === toMonth && toDate.getFullYear() === toYear)')
            console.log(toLastDay)
            this.to.monthPage.createDays(
                undefined,
                toLastDay,
                 )
        }
    }
    _switchLevelApp(){
        let main = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.block)
        let header = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.block)
        let fieldFullPage = this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
        if (fieldFullPage) {
            fieldFullPage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
            fieldFullPage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.showOption)
            // if(fieldFullPage.classList.contains(SELECTORS.elements.fields.modifiers.showOption)){
            //     // fieldFullPage.querySelector('ul').dispatchEvent(new MouseEvent('click'))
            // }
            return
        }
        // let actionPage = this.calendar.querySelector('.'+SELECTORS.elements.modifiers.action)
        // if(actionPage){
        //     actionPage.classList.remove(SELECTORS.elements.modifiers.action)
        //     this.calendar.querySelectorAll('.'+SELECTORS.elements.modifiers.hidden).forEach(el=>{
        //         el.classList.remove(SELECTORS.elements.modifiers.hidden)
        //     })

        //del action class from pages
        let actionPage = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
        if(actionPage){
            actionPage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
            //del hidden class from pages
            this.calendar.querySelectorAll('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden).forEach(
                page=>{
                    console.log('page hidden',page)
                    page.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden)
                })
            return;
        }

        if(main){
            if(!main.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.modifiers.notTouch)){
                main.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.modifiers.notTouch)
            }
        }
        if(header){
            if(!header.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.modifiers.hidden)){
                header.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.modifiers.hidden)
            }
        }
        this._setCloseTemplate()
    }
    _toUse = (e) => {
        e.preventDefault()
        this.from.fixateChange()
        this.to.fixateChange()
        this._createMonthPages()
    }
    _toRestet = e =>{
        e.preventDefault()
        this.from.resetValue()
        this.to.resetValue()
    }
    _toBack = (e)=> {

        e.preventDefault()
        this._switchLevelApp()
        this._setHeadMobile()

    }


    _changeStatusButtons() {
        this.to.changeStatusButtons()
        this.from.changeStatusButtons()
        let listParams = [
            this.to.fieldMonth.isChange(),
            this.to.fieldYear.isChange(),
            this.to.monthPage.isChange(),
            this.to.fieldData.isChange(),

            this.from.fieldData.isChange(),
            this.from.fieldMonth.isChange(),
            this.from.fieldYear.isChange(),
            this.from.monthPage.isChange(),
        ]
        console.log(listParams)
        if (listParams.some((isTrue) => isTrue)) {
            if (!this._bntRestet.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.modifiers.active)) {
                this._bntRestet.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.modifiers.active)
            }
            if (!this._bntUse.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.modifiers.active)) {
                this._bntUse.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.modifiers.active)
            }
        } else {
            this._bntRestet.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonReset.modifiers.active)
            this._bntUse.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.elements.buttonUse.modifiers.active)

        }

    }

    /**
     *
     * @param {CalendarPage} calendarPage
     * @private
     */
    _EventsDateField(calendarPage) {
        if(calendarPage.fieldData.input){
            calendarPage.fieldData.input.addEventListener('focus', () => {
                this.from.setInputDateNumberMonth()
                this.to.setInputDateNumberMonth()

                //show footer of calendar
                let footer = this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.block)
                if (footer) {
                    footer.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.modifiers.hidden)
                }

                //show field select
                this.calendar.querySelectorAll('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.hidden).forEach(el => {
                    el.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.hidden)
                })

                // //show monthPage
                // this.calendar.querySelectorAll('.' + SELECTORS.elements.monthPage.modifiers.hidden).forEach(el => {
                //     el.classList.remove(SELECTORS.elements.monthPage.modifiers.hidden)
                // })

                //hidden errors
                this._hiddenErrors()

                this._createMonthPages()

            })
            calendarPage.fieldData.cleanBtn.addEventListener('click', () => {
                this._createMonthPages()
            })
        }

    }


    _setCloseTemplate(){
        this.from.setInputDateStrMonth()
        this.to.setInputDateStrMonth()
        this.to.setVoledField()
        //hidden footer of calendar
        let footer = this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.block)
        if (footer && !footer.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.modifiers.hidden)) {
            footer.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.footer.modifiers.hidden)
        }

        //hidden header
        let header = this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.block)
        if (header  && !header.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.modifiers.hidden)) {
            header.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.header.modifiers.hidden)
        }

        //hidden field select
        this.calendar.querySelectorAll('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.select)
            .forEach(el => {
                if (!el.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.hidden))
                    el.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.hidden)
            })

        //hidden monthPage
        this.calendar.querySelectorAll('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.block)
            .forEach(el => {
                if (!el.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.modifiers.hidden))
                    el.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.monthPage.modifiers.hidden)
            })
        //show errors if they exist
        this._showErrors()

        let main = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.block)
        let fieldFullPage = this.calendar.querySelector('.' + _constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
        if (fieldFullPage) {
            fieldFullPage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.fullPage)
            fieldFullPage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.fields.modifiers.showOption)
        }
        //del action class from pages
        let actionPage = this.calendar.querySelector('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
        if(actionPage){
            actionPage.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.action)
            //del hidden class from pages
            this.calendar.querySelectorAll('.'+_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden).forEach(
                page=>{
                    console.log('page hidden',page)
                    page.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.modifiers.hidden)
                })
        }
        if(main){
            if(!main.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.modifiers.notTouch)){
                main.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.main.modifiers.notTouch)
            }
        }



    }

    _trackMouseClick() {
        document.body.addEventListener('click', event => {
            let boundsCalendar = this.calendar.getBoundingClientRect()
            let targetBound = event.target.getBoundingClientRect()
            console.log('_trackMouseClick',event.target)

            if ( !(boundsCalendar.left <= targetBound.left  &&
                 boundsCalendar.right >= targetBound.right &&
                boundsCalendar.top <= targetBound.top &&
                boundsCalendar.bottom >= targetBound.bottom)) {
                console.log(boundsCalendar.left ,targetBound.left ,
                    boundsCalendar.right, targetBound.right ,
                    boundsCalendar.top , targetBound.top ,
                    boundsCalendar.bottom , targetBound.bottom)
                this._setCloseTemplate()
            }
        })
    }

    _showErrors(){
        console.log('_showErrors')
        if(this.from && this.fromError && this.to){
            if(this.from.fieldData.oldValue > this.to.fieldData.oldValue){
                this.fromError.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)
            }else{
                if(!this.fromError.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden))
                    this.fromError.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)
            }
        }

        if(this.to && this.toError){
            if ( this.to.fieldData.oldValue > new Date() ){
                this.toError.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)
            }else{
                if(!this.toError.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden))
                    this.toError.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)
            }
        }
    }
    _hiddenErrors(){
        console.log('_hiddenErrors')
        if(!this.fromError?.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)){
            this.fromError.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)
        }

        if(!this.toError?.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)){
            this.toError.classList.add(_constants__WEBPACK_IMPORTED_MODULE_0__/* .SELECTORS */ .I.elements.errors.elements.modifiers.hidden)
        }


    }


}


/***/ }),

/***/ 120:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: function() { return /* binding */ SELECTORS; }
/* harmony export */ });
const SELECTORS = {

    block: 'calendar',

    elements: {
        idFrom: 'calendar-from',
        idTo: 'calendar-to',
        page: 'calendar__page',
        main:{
            block:'calendar__main',
            modifiers:{
                notTouch:'calendar__main_not-touch'
            }
        },

        header:{
          block:'calendar__header',
          elements:{
              btnBack:'calendar__back',
              btnX:'calendar__x',
              headMobile:'calendar__head-mobile'
          },
            modifiers: {
                hidden: 'calendar__header_hidden'
            },
        },
        footer: {
            block: 'calendar__footer',
            modifiers: {
                hidden: 'calendar__footer_hidden'
            },
            elements: {
                buttonReset: {
                    block: 'calendar__rest',
                    modifiers: {
                        active: 'calendar__rest_active'
                    }
                },
                buttonUse: {
                    block: 'calendar__use',
                    modifiers: {
                        active: 'calendar__use_active'
                    }
                }
            }
        },
        modifiers:{
            action:'calendar__page_active',
            hidden:'calendar__page_hidden',
        },

        fields: {
            block: 'field',
            modifiers: {
                while: 'field_while',
                voled: 'field_voled',
                data: 'field_data',
                select: 'field_select',
                selectYear: 'field_select-year',
                selectMonth: 'field_select-month',
                hidden: 'field_hidden',
                showOption: 'field_show-option',
                fullPage:'calendar__field_full-page'
            },
            elements: {
                data: {
                    input: 'field__input-data',
                    del: 'field__del'
                },
                select: {
                    year: 'field__year',
                    month: 'field__month',
                    next: 'field__button_next',
                    prev: 'field__button_prev',
                    modifiers:{
                        noPointEffect:'field__button_no-effect'
                    }
                },
                search:'field__search'
            }


        },
        monthPage: {
            block: 'month',
            modifiers: {
                hidden: 'calendar__month_hidden'
            },
            elements: {
                headers: 'month__header',
                date: {
                    block: 'month__data',
                    modifiers: {
                        select: 'month__data_select',
                        inRange: 'month__data_in-range'
                    }
                },

            }

        },


        errors:{
            block:'calendar__errors',
            elements:{
                block:'calendar__error',
                modifiers:{
                    hidden:'calendar__error_hidden'
                }
            }
        }

    }

}

/***/ }),

/***/ 693:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _component_Calendat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97);
/* harmony import */ var _component_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(120);




new _component_Calendat__WEBPACK_IMPORTED_MODULE_0__/* .Calendar */ .f('.'+_component_constants__WEBPACK_IMPORTED_MODULE_1__/* .SELECTORS */ .I.block)







/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(693);
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(512);
/******/ 	__webpack_require__(634);
/******/ 	__webpack_require__(142);
/******/ 	__webpack_require__(762);
/******/ 	__webpack_require__(97);
/******/ 	var __webpack_exports__ = __webpack_require__(120);
/******/ 	
/******/ })()
;