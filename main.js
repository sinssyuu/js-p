console.log("main.js")

document.getElementById("click").addEventListener("click", function() {
    document.getElementById("message").textContent = "おはよー";
});
function addNunbers(num1,num2,num3) {
    return num1-num2+num3;
}

// const result = addNunbers(2,5,4);
// console.log(result);

for(let i = 0; i < 100 ; i++){
    if (i % 2 !== 0){
        continue;
    }
    if(i >= 50) {
        break;
    }
    console.log(i);
}
