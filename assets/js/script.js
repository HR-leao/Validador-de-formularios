let b7Validator = {
    handleSubmit:(event) =>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        b7Validator.clearErrors();
        for(let i=0; i<inputs.length; i++) {
            let input = inputs[i];
            let check = b7Validator.checkInput(input);
            if(check !== true) {
                send = false;
                b7Validator.showError(input, check +` [Caracteres]`)
            }
        }


        if(send) {
            form.submit();
        }
    },
    checkInput:(input) =>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetail = rules[k].split('=');

                switch(rDetail[0]) {

                    case 'required':
                        if(input.value==''){
                            return 'Campo vazio'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetail[1]) {
                            return `Campo tem que ter no mínimo ${rDetail[1]}`
                        }
                    break;
                    
                    case 'email':
                        if(input.value !== '') {
                            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Email não é válído'
                            }
                        }
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#ff0000';


        let erroElement = document.createElement('div');
        erroElement.classList.add('error');
        erroElement.innerHTML = error;

        input.parentElement.insertBefore(erroElement, input.ElementSiblin); //ADD UM ELEMENTO DEPOIS
    },
    clearErrors:() =>{

        let input = form.querySelectorAll('input');
        for(let i=0; i< input.length; i++){
            input[i].style='';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};
let form = document.querySelector('.b7validator');

form.addEventListener('submit',b7Validator.handleSubmit);


