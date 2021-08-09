let divNum = document.querySelector("#num");
let divCalc = document.querySelector("#calc");  
let divDinamicResult = document.querySelector("#dinamicResult");
const opList = [ '+', '-', '*', '/'];
let finished = 0;  // variável que confirma se um calculo foi completo
let aux; 
let qtdParen = 0;

function addNum(num){
    if(finished == 1){
        divNum.innerText = "";
        finished = 0;
    }
    
    if(divNum.innerText == "0"){
        divNum.innerText = "";
    }
    
    divNum.innerText += num;
    refreshDisplay();
}

function refreshDisplay(){
    if (divCalc.innerText == ""){
        aux = "";    
    } else {
        aux = divCalc.innerText;
        if (aux.substring(aux.length -1, aux.length) != ")"  && divNum.innerText != "0"){
                aux += divNum.innerText;
        }

        try {
            aux = eval(aux); 
        } catch (e){
            aux = "";
        }
    }
    divDinamicResult.innerText = aux;
}

function addExpression(op){
    aux = divCalc.innerText;
    let lastChar = aux.substring(aux.length-1, aux.length);
    if(aux != ""){
        if (lastChar == ")" || opList.indexOf(lastChar) == -1 && lastChar != "("){
            divCalc.innerText += " " + op;
            return;
        }
    }
    divCalc.innerText += " " + divNum.innerText + " " + op;
    divNum.innerText = "0";
}

function addParen(paren){
    aux = divCalc.innerText;
    
    if(paren == "("){
        divCalc.innerText += " ( ";
        qtdParen++;
    } else {
        if(aux.length != 0){
            if(qtdParen != 0){
                qtdParen--;
                let lastChar = aux.substring(aux.length-1, aux.length);
                if(lastChar == "(" || opList.indexOf(lastChar) != -1){
                    divCalc.innerText += " " + divNum.innerText;
                }
                divCalc.innerText += " ) ";
                divNum.innerText = "0";
                refreshDisplay();
            }
        }
    }

}

function deleteLastChar(){
    if(divNum.innerText != "0"){
        aux = divNum.innerText;
        aux = aux.substring(0, aux.length-1);
        if(aux == ""){
            aux = "0";
        }
        divNum.innerText = aux;
    } else {
        if(divCalc.innerText != ""){
            aux = divCalc.innerText;
            let lastChar = aux.substring(aux.length-1, aux.length);

            if(lastChar == ")"){
                divCalc.innerText = aux.substring(0, aux.length-1);
                qtdParen++;
            } else if(opList.indexOf(lastChar) == -1){
                divCalc.innerText = aux.substring(0, aux.length-3);
            } else{      
                divCalc.innerText = aux.substring(0, aux.length-1);
            }
        }
    }
    refreshDisplay();
}

function clearDisplay () { 
    divCalc.innerText = "";  
    divNum.innerText = "0";  
    divDinamicResult.innerText = "";
    qtdParen = 0; 
}

function getResult(){
    if(divDinamicResult.innerText != ""){
        divNum.innerText = divDinamicResult.innerText;
        divCalc.innerText = "";
        divDinamicResult.innerText = "";
        finished = 1;
    }
}