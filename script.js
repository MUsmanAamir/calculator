let string = "";
let memory = 0;
let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.innerHTML;

        if (buttonValue === '=') {
            try {
                string = eval(string).toString();
            } catch {
                string = "Error";
            }
            document.querySelector('input').value = string;
        } else if (buttonValue === 'C') {
            string = "";
            document.querySelector('input').value = string;
        } else if (buttonValue === 'M+') {
            memory += parseFloat(document.querySelector('input').value) || 0;
        } else if (buttonValue === 'M-') {
            memory -= parseFloat(document.querySelector('input').value) || 0;
        } else if (buttonValue === 'MC') {
            memory = 0;
        } else if (buttonValue === '%') {
            string = (parseFloat(string) / 100).toString();
            document.querySelector('input').value = string;
        } else {
            string += buttonValue;
            document.querySelector('input').value = string;
        }
    });
});
