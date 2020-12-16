let html_app, html_toggle;
let celsius;

const returnMonth = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
};

const convertCelsius = (celcius) => {
    return (celcius - 32) / 1.8;
};

const showSolInformation = async () => {
    html_app = document.querySelector(".js-app");

    url = "https://api.nasa.gov/insight_weather/?api_key=UQ1RpaxdQagk6ZQ0dUTw93vbFufX0BoybMLaroJa&feedtype=json&ver=1.0";
    const data = await fetch(url).then(response => response.json()).catch(error => console.error("An error occured: ", error));

    // const data = await fetch("dumydata.json").then(response => response.json()).catch(error => console.error("An error occured: ", error));
    console.log(data);

    let sols = [];
    for(sol of data.sol_keys) {
        sols.push(sol);
    }


    html_app.innerHTML = "";

    for(let i = 0; i < 4; i++) {
        const date = new Date(data[sols[i]].First_UTC);
        const month = returnMonth(date.getMonth());
        const day = date.getDate();
        
        let avgTemp, maxTemp, minTemp, symbol;

        if(data[sols[i]].AT === undefined) { // AANPASSEN -> !==      uncomment en delete test values
            if(celsius) {
                // avgTemp = convertFahrenheit(data[sols[i]].AT.av).toFixed(1);
                // maxTemp = convertFahrenheit(data[sols[i]].AT.mx).toFixed(1);
                // minTemp = convertFahrenheit(data[sols[i]].AT.mn).toFixed(1);

                avgTemp = convertCelsius(80).toFixed(1);
                maxTemp = convertCelsius(85).toFixed(1);
                minTemp = convertCelsius(75).toFixed(1);
                symbol = "°F";
            } else {
                // avgTemp = data[sols[i]].AT.av.toFixed(1);
                // maxTemp = data[sols[i]].AT.mx.toFixed(1);
                // minTemp = data[sols[i]].AT.mn.toFixed(1);

                avgTemp = (80).toFixed(1);
                maxTemp = (85).toFixed(1);
                minTemp = (75).toFixed(1);
                symbol = "°C";
            };
        } else {
            avgTemp = "-";
            maxTemp = "-";
            minTemp = "-";
        }

        let html = `
        <div class="c-sol">
            <p>Sol ${sols[i]}</p>
            <p>${month} ${day}</p>
            <div class="c-sol__information">
                <div>
                    <p>Temperature</p>
                    <p>${avgTemp}${symbol} AV</p>
                    <p>${maxTemp}${symbol} MAX</p>
                    <p>${minTemp}${symbol} MIN</p>
                </div>
                <div>
                    <p>Windspeed</p>
                    <p>${(data[sols[i]].HWS !== undefined) ? data[sols[i]].HWS.av.toFixed(1) : "-"}m/s AV</p>
                    <p>${(data[sols[i]].HWS !== undefined) ? data[sols[i]].HWS.mn.toFixed(1) : "-"}m/s MAX</p>
                    <p>${(data[sols[i]].HWS !== undefined) ? data[sols[i]].HWS.mx.toFixed(1) : "-"}m/s MIN</p>
                </div>
                <div class="c-sol__information-presure">
                    <p>Presure</p>
                    <p>${(data[sols[i]].PRE !== undefined) ? data[sols[i]].PRE.av.toFixed(1) : "-"}Pa AV</p>
                    <p>${(data[sols[i]].PRE !== undefined) ? data[sols[i]].PRE.mx.toFixed(1) : "-"}Pa MAX</p>
                    <p>${(data[sols[i]].PRE !== undefined) ? data[sols[i]].PRE.mn.toFixed(1) : "-"}Pa MIN</p>
                </div>
            </div>
        </div>`;

        html_app.innerHTML += html;
    }
};

const changeTempUnit = () => {
    if(celsius) {
        celsius = false;
    } else {
        celsius = true;
    }

    showSolInformation();
};

const init = () => {
    html_toggle = document.querySelector(".js-celcius");

    celsius = false;
    html_toggle.addEventListener("click", changeTempUnit);
    showSolInformation();
};

document.addEventListener("DOMContentLoaded", init);