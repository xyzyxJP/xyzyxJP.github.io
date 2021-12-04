function HpArrayToTable(id, array) {
    let sumHp = 0;
    let count = 0;
    let table = document.getElementById(id);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        switch (element) {
            case 3:
                sumHp += 3;
                count++;
                table.getElementsByTagName("td")[index].setAttribute("class", "table-success");
                break;
            case 2:
                sumHp += 2;
                count++;
                table.getElementsByTagName("td")[index].setAttribute("class", "table-warning");
                break;
            case 1:
                sumHp += 1;
                count++;
                table.getElementsByTagName("td")[index].setAttribute("class", "table-danger");
                break;
            case 0:
                table.getElementsByTagName("td")[index].setAttribute("class", "table-dark");
                break;
            default:
                table.getElementsByTagName("td")[index].setAttribute("class", "");
                break;
        }
    }
    switch (id) {
        case "alphaHp":
            document.getElementById("alphaLog").innerText = "α残機 = " + count + "(総HP : " + sumHp + ")";
            break;
        case "bravoHp":
            document.getElementById("bravoLog").innerText = "β残機 = " + count + "(総HP : " + sumHp + ")";
            break;
    }
}

function ValueArrayToTable(id, array) {
    let table = document.getElementById(id);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        switch (element) {
            default:
                table.getElementsByTagName("td")[index].innerText = element;
                break;
        }

    }
}

function IsAttackArrayToTable(id, array) {
    let table = document.getElementById(id);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        switch (element) {
            case true:
                table.getElementsByTagName("td")[index].setAttribute("class", "table-danger");
                break;
            case false:
                table.getElementsByTagName("td")[index].setAttribute("class", "");
                break;
            default:
                table.getElementsByTagName("td")[index].setAttribute("class", "");
                break;
        }

    }
}

function TableRefresh() {
    let index = document.getElementById("progressRange").value;
    HpArrayToTable("alphaHp", json[index][true]["hp"]);
    ValueArrayToTable("alphaValue", json[index][true]["value"]);
    IsAttackArrayToTable("alphaIsAttack", json[index][true]["isAttack"]);
    HpArrayToTable("bravoHp", json[index][false]["hp"]);
    ValueArrayToTable("bravoValue", json[index][false]["value"]);
    IsAttackArrayToTable("bravoIsAttack", json[index][false]["isAttack"]);
    document.getElementById("alphaAlertLog").style.display = 'block';
    document.getElementById("bravoAlertLog").style.display = 'block';
    if (json[index][true]["lastMoveVector"] === undefined) {
        switch (json[index][true]["lastAttackResult"]) {
            case 3:
                document.getElementById("alphaAlertLog").innerText = "α攻撃 " + json[index][true]["lastAttackPoint"] + " 撃沈！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 2:
                document.getElementById("alphaAlertLog").innerText = "α攻撃 " + json[index][true]["lastAttackPoint"] + " 命中！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 1:
                document.getElementById("alphaAlertLog").innerText = "α攻撃 " + json[index][true]["lastAttackPoint"] + " 波高し！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-warning");
                break;
            case 0:
                document.getElementById("alphaAlertLog").innerText = "α攻撃 " + json[index][true]["lastAttackPoint"] + " ハズレ！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-secondary");
                break;
        }
    } else {
        document.getElementById("alphaAlertLog").innerText = "α移動 " + json[index][true]["lastMoveVector"];
        document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-success");
    }
    if (json[index][false]["lastMoveVector"] === undefined) {
        switch (json[index][false]["lastAttackResult"]) {
            case 3:
                document.getElementById("bravoAlertLog").innerText = "β攻撃 " + json[index][false]["lastAttackPoint"] + " 撃沈！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 2:
                document.getElementById("bravoAlertLog").innerText = "β攻撃 " + json[index][false]["lastAttackPoint"] + " 命中！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 1:
                document.getElementById("bravoAlertLog").innerText = "β攻撃 " + json[index][false]["lastAttackPoint"] + " 波高し！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-warning");
                break;
            case 0:
                document.getElementById("bravoAlertLog").innerText = "β攻撃 " + json[index][false]["lastAttackPoint"] + " ハズレ！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-secondary");
                break;
        }
    } else {
        document.getElementById("bravoAlertLog").innerText = "β移動 " + json[index][false]["lastMoveVector"];
        document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-success");
    }
}

let json;

document.getElementById("previousButton").addEventListener('click', function () {
    if (json === undefined) {
        return;
    }
    if (document.getElementById("progressRange").value !== 0) {
        document.getElementById("progressRange").value--;
        TableRefresh();
    }
});

document.getElementById("nextButton").addEventListener('click', function () {
    if (json === undefined) {
        return;
    }
    if (document.getElementById("progressRange").value !== document.getElementById("progressRange").attributes["max"]) {
        document.getElementById("progressRange").value++;
        TableRefresh();
    }
});

document.getElementById("progressRange").addEventListener('input', function () {
    if (json === undefined) {
        return;
    }
    TableRefresh();
});

document.getElementById("fileInput").addEventListener('change', function () {
    let fileReader = new FileReader();
    fileReader.readAsText(document.getElementById("fileInput").files[0]);
    fileReader.addEventListener("load", function () {
        json = JSON.parse(fileReader.result);
        document.getElementById("progressRange").value = 1;
        document.getElementById("progressRange").setAttribute("max", Object.keys(json).length);
    });
});