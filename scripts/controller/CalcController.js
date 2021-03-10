class CalcController{
    
    constructor(){

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#time");
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime()
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000);
        this.setLastNumberToDisplay();
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, 'click drag', e=> {
                let textBtn = btn.className.baseVal.replace("btn-", '');
                this.execBtn(textBtn);
            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=> {
                btn.style.cursor = 'pointer';
            })
        });
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperator('+');
                break;
            case 'igual':
                this.calc();
                break;
            case 'subtracao':
                this.addOperator('-');
                break;
            case 'multiplicacao':
                this.addOperator('*');
                break;
            case 'divisao':
                this.addOperator('/');
                break;
            case 'porcento':
                this.addOperator('%');
                break;
            case 'ponto':
                this.addOperator('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                    this.addOperator(parseInt(value));
                break;

            default:
                this.setError();
            break;
        }
    }

    clearAll(){
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError(){
        this.displayCalc = 'Error';
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    addOperator(value){

        if(isNaN(this.getLastOpetarion())){

            if(this.isOperator(value)){

                this.setLastOperation(value);

            } else if(isNaN(value)) {
                console.log('Outra coisa');
            } else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        } else{

            if(this.isOperator(value)){
                
                this.pushOperation(value);

            } else {
                
                let newValue = this.getLastOpetarion().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay();
            }            

        }
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc()
        }
    }

    calc(){

        let last = '';
        if(this._operation.length > 3){
            last = this._operation.pop();
        }

        let result = eval(this._operation.join(''));

        if(last == "%"){
            result /= 100;
            this._operation = [result];
        } else {

            this._operation = [result];

            if(last) this._operation.push(last);
        }        

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){
        let lastNumber;
        for (let i = this._operation.length -1; i >= 0; i--) {
            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    getLastOpetarion(){
        return this._operation[this._operation.length - 1]
    }

    isOperator(value){
        return (['+', '-', '*', '/', '%', '='].indexOf(value) > -1);
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date;
    }

    set currentDate(value){
        this._currentDate = value;
    }
}