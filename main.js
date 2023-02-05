const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

//消費電力のハッシュマップ
let powerConsumptionList = {};
for (let i = 0; i < camera.length; i++) {
	if (powerConsumptionList[camera[i].model] === undefined) powerConsumptionList[camera[i].model] = camera[i].powerConsumptionWh;
};

//最大放電量のハッシュマップ
let maxDischargeAmountList = {};
for(let i=0; i<battery.length; i++){
    if(maxDischargeAmountList[battery[i].batteryName] === undefined) maxDischargeAmountList[battery[i].batteryName] = battery[i].maxDraw * battery[i].endVoltage;
};

//
let batteryCapacityList = {}
for(let i=0; i<battery.length; i++){
    if(batteryCapacityList[battery[i].batteryName] === undefined) batteryCapacityList[battery[i].batteryName] = battery[i].voltage * battery[i].capacityAh; 
}

class View{
    //タイトル部分
    static createTitle(){
        let target = document.getElementById("target");
        let titleDiv = document.createElement("div");
        let titleH1 = document.createElement("h1");
        titleH1.classList.add("bg-primary","text-white","text-center","p-3");
        titleH1.innerHTML = "Battery Finder Program";

        titleDiv.append(titleH1);
        target.append(titleH1);
    }

    static createStep(){
        let target = document.getElementById("target");
        let stepDiv = document.createElement("div");
        stepDiv.classList.add("col-10","m-auto");


        //step1
        let step1Div = document.createElement("div");
        step1Div.classList.add("p-3");
        let step1P = document.createElement("p");
        step1P.innerHTML = "step1: Select your brand";
        let step1Select = document.createElement("select");
        step1Select.setAttribute("id","brandSelect");
        let option1 = document.createElement("option");
        step1Select.append(option1);
        step1Div.append(step1P);
        step1Div.append(step1Select);

        //step2
        let step2Div = document.createElement("div");
        step2Div.classList.add("p-3");
        let step2P = document.createElement("p");
        step2P.innerHTML = "Step2: Select your model";
        let step2Select = document.createElement("select");
        step2Select.setAttribute("id","modelSelect");
        let option2 = document.createElement("option");
        step2Div.append(step2P);
        step2Div.append(step2Select);

        //step3
        let step3Div = document.createElement("div");
        step3Div.classList.add("p-3");
        let step3P = document.createElement("p");
        step3P.innerHTML = "Step3: Input accessory power consumption";
        let step3Input = document.createElement("input");
        step3Input.setAttribute("id","wattageNumber");        
        step3Input.setAttribute("type","number");
        step3Input.setAttribute("value","50");
        step3Input.setAttribute("min","0");
        step3Input.setAttribute("max","1000");
        step3Div.append(step3P);
        step3Div.append(step3Input);

        //step4
        let step4Div = document.createElement("div");
        step4Div.classList.add("p-3");
        let step4P = document.createElement("p");
        step4P.innerHTML = "Step4: Choose your battery";
        let step4DivSecond = document.createElement("div");
        step4DivSecond.setAttribute("id","batteryList");
        step4Div.append(step4P); 
        step4Div.append(step4DivSecond);   

        //sum
        stepDiv.append(step1Div,step2Div,step3Div,step4Div);
        target.append(stepDiv);

        View.getAccessoryPC();
    }
    //step1のカメラブランド作成
    static createBrandMenu(){
        const brandSelect = document.getElementById("brandSelect");
        brandSelect.innerHTML = View.getOptionString(Setting.getBrandList());
        View.getModelOption();

        brandSelect.addEventListener("change",function(){
            View.getModelOption();
        });
    }

    //step1のoptionに入れるカメラブランド名の作成
    static getOptionString(optionList){
        let brandOptionString = "";
        for(let i=0; i<optionList.length; i++){
            brandOptionString +=
            `
            <option class="bg">${optionList[i]}</option>
            `;
        }
        return brandOptionString;
    }

    //step2のモデルリスト作成
    static getModelOption(){
        const modelSelect = document.getElementById("modelSelect");

        modelSelect.innerHTML = View.getOptionString(Setting.getModelList(document.getElementById("brandSelect").value.replace(/-/g," ")));

        let totalConsumption = Setting.getTotalCosumption();
        View.createBatteryList(Setting.getBatteryList(totalConsumption),totalConsumption);

        modelSelect.addEventListener("change",function(){
            totalConsumption = Setting.getTotalCosumption();
            View.createBatteryList(Setting.getBatteryList(totalConsumption),totalConsumption);
        });
    }

    //step3で任意のワット数を入力し、それに対応するバッテリーを呼び出す。
    static getAccessoryPC(){
        document.getElementById("wattageNumber").addEventListener("input",function(){
            let totalConsumption = Setting.getTotalCosumption();
            View.createBatteryList(Setting.getBatteryList(totalConsumption),totalConsumption);
        });
    }

    //step4のバッテリーリスト作成
    static createBatteryList(selectBatteryList,totalConsumption){
        let batteryListString = "";

        if (selectBatteryList.length === 0){
            batteryListString +=
            `
            <div class="justify-content-center text-center>
                <p>There is no battery fo you./p>
            `;
        }

        for(let i=0; i<selectBatteryList.length; i++){
            batteryListString +=
            `
            <div class="d-flex justify-content-between border border-secondary col-11 row bg">
                <h5 class="m-3">${selectBatteryList[i]}</h5>
            `
            let duration = (Math.round(batteryCapacityList[selectBatteryList[i]] / totalConsumption * 10)) / 10;
            batteryListString +=
            `
                <h6 class="m-3">Estimate ${duration} hours</h6>
            </div>
            `
        }
        document.getElementById("batteryList").innerHTML = batteryListString;
    }
}

class Setting{
    //カメラブランド名のリストを作成。
    static getBrandList(){
        let result = []
        for(let i=0; i<camera.length; i++){
            result.push(camera[i].brand);
        }
        let brandList = [...new Set(result)];
        return brandList;
    }

    //カメラブランド名のリストを受け取り、ブランド名に該当するカメラモデルのリストを作成。
    static getModelList(brandList){
        let modelList = [];
        for(let i=0; i<camera.length; i++){
            if(camera[i].brand === brandList) modelList.push(camera[i].model);
        }
        return modelList
    }
    
    //消費電力を計算。
    static getTotalCosumption(){
        return powerConsumptionList[document.getElementById("modelSelect").value.replace(/-/g," ")] + parseInt(document.getElementById("wattageNumber").value,10);
    }

    //各条件に対応するバッテリーのリストを作成。
    static getBatteryList(totalConsumption){
        let selectBatteryList = [];
        for(let i=0; i<battery.length; i++){
            if(maxDischargeAmountList[battery[i].batteryName] > totalConsumption){
                selectBatteryList.push(battery[i].batteryName);
            }
        }
        return selectBatteryList.sort();
    }
}

View.createTitle();
View.createStep();
View.createBrandMenu();