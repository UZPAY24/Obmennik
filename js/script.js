const modalCach = document.getElementById('modalCach')
const buttonContinue = document.getElementById('buttonContinue')

const cancelButton = document.getElementById('cancelButton')
const applyButton = document.getElementById('applyButton')

const sumInput = document.getElementById('sumInput')
const selectPay = document.getElementById('selectPay')
const inputBankAccount = document.getElementById('inputBankAccount')

const sumOutput = document.getElementById('sumOutput')
const inputUserAccount = document.getElementById('inputUserAccount')

const emailField = document.getElementById('emailField')


const errorModal = document.getElementById('errorModal')
const closeErrorWindow = document.getElementById('closeErrorWindow')
const messageErrorText = document.getElementById('messageErrorText')

const messageModal = document.getElementById('messageModal')
const closeMessageModal = document.getElementById('closeMessageModal')
const messageModalText = document.getElementById('messageModalText')

const burger = document.querySelector('.burger')
const navbar_menu = document.querySelector('.navbar-menu')

const wait_div = document.querySelector('.wait-div')


const RATES = 1500
const MINSUM = 2500

const QIWI = '+7 928 543 4455'
const YANDEX = '4140456732452356'
const BANK = '4243 3000 1254 8976'

let exchangeForm = {}
let flag = true


burger.addEventListener('click', () =>{
      if(flag){
         burger.classList.add('is-active')
         navbar_menu.classList.add('is-active')
         
      }else{
         burger.classList.remove('is-active')
         navbar_menu.classList.remove('is-active')
         
      }
      flag = !flag
})




sumInput.addEventListener('change', () => {
   let tmp = sumInput.value/RATES
   sumOutput.value = tmp
   sumInput.classList.remove('is-danger')
} )

sumOutput.addEventListener('change', () => {
   let tmp = sumOutput.value*RATES
   sumInput.value = tmp
} )


closeMessageModal.addEventListener('click', () => {
   messageModal.classList.remove('is-active')
})


buttonContinue.addEventListener('click', () =>{
   if(validateSum()){

      if(validateForms()){
         
         exchangeForm = {
            id: Math.floor(1000 + Math.random() * 9000),
            walletUser: inputUserAccount.value,
            fromAccount: inputBankAccount.value,
            transferAmount: sumInput.value,
            purse: selectPay.value,
            score: null,
            userEmail: emailField.value
            
         };
        
         startExchangeForm(exchangeForm)

      }else{
         messageErrorText.innerHTML = 'Сначала заполните все формы!'
         errorModal.classList.add('is-active')
         inputBankAccount.classList.add('is-danger')
         inputUserAccount.classList.add('is-danger')
      }


   }else{
      messageErrorText.innerHTML = `Минимальная сумма обменна ${MINSUM} руб.`
      errorModal.classList.add('is-active')
      sumInput.classList.add('is-danger')
   }


  
} )


closeErrorWindow.addEventListener('click', () => {
   errorModal.classList.remove('is-active')
})


cancelButton.addEventListener('click', () => {
   modalCach.classList.remove('is-active')
   wait_div.classList.remove('is-active')
   applyButton.classList.remove('is-loading')
   cancelButton.innerText = "Отказаться"
} )



inputBankAccount.addEventListener('change', () => {
   inputBankAccount.classList.remove('is-danger')
} )

inputUserAccount.addEventListener('change', () => {
   inputUserAccount.classList.remove('is-danger')
})


function validateSum(){
   if(sumInput.value < MINSUM)
      return false;
   else return true;   
}

function validateForms(){
   if(inputBankAccount.value == '' || inputUserAccount.value == '')
      return false;
      else return true;
}


function startExchangeForm(obj){

   headerCash.innerHTML = `Заявка №${obj.id} | Купить биткоин`
   walletUser.innerHTML = obj.walletUser
   fromAccount.innerHTML = obj.fromAccount
   transferAmount.innerHTML = obj.transferAmount
   if(obj.purse == 'Qiwi RUB'){ 
      purse.innerHTML = `${obj.purse} ${QIWI}`;
      exchangeForm.score = QIWI
   } 
   else if (obj.purse == 'Сбербанк VISA') {
      purse.innerHTML = `${obj.purse} ${BANK}`;
      exchangeForm.score = BANK
   }
   else if (obj.purse == 'Яндекс деньги') {
      purse.innerHTML = `${obj.purse} ${YANDEX}`
      exchangeForm.score = YANDEX
   }
   emailUser.innerHTML = obj.userEmail

  
   modalCach.classList.add('is-active')
}

applyButton.addEventListener('click', () => {
   // modalCach.classList.remove('is-active')
   resetInputs()
   wait_div.classList.add('is-active')
   applyButton.classList.add('is-loading')
   cancelButton.innerText = "Закрыть"

   if(exchangeForm != ''){
      async function sendMailUser(){
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: exchangeForm
         })
      }
   }

   
})


function resetInputs(){
   sumInput.value = 0
   inputBankAccount.value = '0'
   inputUserAccount.value = '0'
   sumOutput.value = 0
   emailField.value = ''
}


