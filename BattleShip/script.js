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
            document.getElementById("alphaLog").innerText = count + " (" + sumHp + ")";
            break;
        case "bravoHp":
            document.getElementById("bravoLog").innerText = count + " (" + sumHp + ")";
            break;
    }
}

function ValueArrayToTable(id, array) {
    let table = document.getElementById(id);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        switch (element) {
            default:
                if (element[layerIndex] === undefined) {
                    table.getElementsByTagName("td")[index].innerText = "N/A";
                } else {
                    switch (element[layerIndex]) {
                        case -2:
                            table.getElementsByTagName("td")[index].setAttribute("class", "table-dark");
                            break;
                        case -1:
                            table.getElementsByTagName("td")[index].setAttribute("class", "table-secondary");
                            break;
                        default:
                            table.getElementsByTagName("td")[index].setAttribute("class", "");
                            break;
                    }
                    if (0 < element[layerIndex] && element[layerIndex] < 10) {
                        table.getElementsByTagName("td")[index].setAttribute("class", "table-warning");
                    } else if (10 <= element[layerIndex]) {
                        table.getElementsByTagName("td")[index].setAttribute("class", "table-danger");
                    }
                    table.getElementsByTagName("td")[index].innerText = element[layerIndex];
                }
                break;
        }

    }
}

function EnableAttacksArrayToTable(id, array) {
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
    ValueArrayToTable("alphaValue", json[index][true]["values"]);
    EnableAttacksArrayToTable("alphaEnableAttack", json[index][true]["enableAttack"]);
    HpArrayToTable("bravoHp", json[index][false]["hp"]);
    ValueArrayToTable("bravoValue", json[index][false]["values"]);
    EnableAttacksArrayToTable("bravoEnableAttack", json[index][false]["enableAttack"]);
    document.getElementById("alphaAlertLog").style.display = 'block';
    document.getElementById("bravoAlertLog").style.display = 'block';

    document.getElementById("alphaAlertLog").innerText = "α";
    if (json[index][true]["lastMoveVector"] === undefined && json[index][true]["lastAttackPoint"] === undefined) {
    } else if (json[index][true]["lastAttackPoint"] !== undefined) {
        json[index][true]["lastAttackResult"].sort(function (a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        });;
        document.getElementById("alphaAlertLog").innerText = "α攻撃 " + json[index][true]["lastAttackPoint"] + "\n";
        switch (json[index][true]["lastAttackResult"][0]) {
            case 3:
                document.getElementById("alphaAlertLog").innerText += "撃沈！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 2:
                document.getElementById("alphaAlertLog").innerText += "命中！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 1:
                document.getElementById("alphaAlertLog").innerText += "波高し！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-warning");
                break;
            case 0:
                document.getElementById("alphaAlertLog").innerText += "ハズレ！";
                document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-secondary");
                break;
        }
        for (let i = 1; i < json[index][true]["lastAttackResult"].length; i++) {
            let element = json[index][true]["lastAttackResult"][i];
            switch (element) {
                case 3:
                    document.getElementById("alphaAlertLog").innerText += "\n撃沈！";
                    break;
                case 2:
                    document.getElementById("alphaAlertLog").innerText += "\n命中！";
                    break;
                case 1:
                    document.getElementById("alphaAlertLog").innerText += "\n波高し！";
                    break;
                case 0:
                    document.getElementById("alphaAlertLog").innerText += "\nハズレ！";
                    break;
            }
        }
    } else if (json[index][true]["lastMoveVector"] !== undefined) {
        document.getElementById("alphaAlertLog").innerText = "α移動 " + json[index][true]["lastMoveVector"];
        document.getElementById("alphaAlertLog").setAttribute("class", "alert alert-success");
    }

    document.getElementById("bravoAlertLog").innerText = "β";
    if (json[index][false]["lastMoveVector"] === undefined && json[index][false]["lastAttackPoint"] === undefined) {
    } else if (json[index][false]["lastAttackPoint"] !== undefined) {
        json[index][false]["lastAttackResult"].sort(function (a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        });;
        document.getElementById("bravoAlertLog").innerText = "β攻撃 " + json[index][false]["lastAttackPoint"] + "\n";
        switch (json[index][false]["lastAttackResult"][0]) {
            case 3:
                document.getElementById("bravoAlertLog").innerText += "撃沈！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 2:
                document.getElementById("bravoAlertLog").innerText += "命中！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-danger");
                break;
            case 1:
                document.getElementById("bravoAlertLog").innerText += "波高し！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-warning");
                break;
            case 0:
                document.getElementById("bravoAlertLog").innerText += "ハズレ！";
                document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-secondary");
                break;
        }
        for (let i = 1; i < json[index][false]["lastAttackResult"].length; i++) {
            let element = json[index][false]["lastAttackResult"][i];
            switch (element) {
                case 3:
                    document.getElementById("bravoAlertLog").innerText += "\n撃沈！";
                    break;
                case 2:
                    document.getElementById("bravoAlertLog").innerText += "\n命中！";
                    break;
                case 1:
                    document.getElementById("bravoAlertLog").innerText += "\n波高し！";
                    break;
                case 0:
                    document.getElementById("bravoAlertLog").innerText += "\nハズレ！";
                    break;
            }
        }
    } else if (json[index][false]["lastMoveVector"] !== undefined) {
        document.getElementById("bravoAlertLog").innerText = "β移動 " + json[index][false]["lastMoveVector"];
        document.getElementById("bravoAlertLog").setAttribute("class", "alert alert-success");
    }

    if (json[index]["alphaSide"]) {
        document.getElementById("bravoAlertLog").setAttribute("class", "alert  alert-light");
    } else {
        document.getElementById("alphaAlertLog").setAttribute("class", "alert  alert-light");
    }
}

let json;
let layerIndex = 0;

document.getElementById("progressDownButton").addEventListener('click', function () {
    if (json === undefined) {
        return;
    }
    if (document.getElementById("progressRange").value !== 0) {
        document.getElementById("progressRange").value--;
        document.getElementById("progressValueLabel").innerText = document.getElementById("progressRange").value;
        TableRefresh();
    }
});

document.getElementById("progressValueLabel").addEventListener('click', function () {
    document.getElementById("progressRange").value = 1;
    document.getElementById("progressValueLabel").innerText = document.getElementById("progressRange").value;
    TableRefresh();
})


document.getElementById("progressUpButton").addEventListener('click', function () {
    if (json === undefined) {
        return;
    }
    if (document.getElementById("progressRange").value !== document.getElementById("progressRange").attributes["max"]) {
        document.getElementById("progressRange").value++;
        document.getElementById("progressValueLabel").innerText = document.getElementById("progressRange").value;
        TableRefresh();
    }
});

document.getElementById("progressRange").addEventListener('input', function () {
    if (json === undefined) {
        return;
    }
    document.getElementById("progressValueLabel").innerText = document.getElementById("progressRange").value;
    TableRefresh();
});

document.getElementById("fileInput").addEventListener('change', function () {
    let fileReader = new FileReader();
    fileReader.readAsText(document.getElementById("fileInput").files[0]);
    fileReader.addEventListener("load", function () {
        json = JSON.parse(fileReader.result);
        document.getElementById("progressRange").value = 1;
        document.getElementById("progressValueLabel").innerText = document.getElementById("progressRange").value;
        document.getElementById("progressRange").setAttribute("max", Object.keys(json).length);
        layerIndex = 0;
        TableRefresh();
    });
});

document.getElementById("layerUpButton").addEventListener('click', function () {
    if (json === undefined) {
        return;
    }
    layerIndex++;
    document.getElementById("layerIndexLabel").innerText = layerIndex;
    TableRefresh();
});

document.getElementById("layerIndexLabel").addEventListener('click', function () {
    layerIndex = 0;
    document.getElementById("layerIndexLabel").innerText = layerIndex;
    TableRefresh();
})

document.getElementById("layerDownButton").addEventListener('click', function () {
    if (json === undefined) {
        return;
    }
    layerIndex--;
    document.getElementById("layerIndexLabel").innerText = layerIndex;
    TableRefresh();
});