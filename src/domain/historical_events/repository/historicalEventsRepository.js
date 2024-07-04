import eventosJSON from '../../../../dataset/historical_data.json'

function isAlphanumericAndLength2(variable) {
    // Verificar si la variable es una cadena
    if (typeof variable !== 'string') {
        return false;
    }

    // Verificar si la longitud de la cadena es 2
    if (variable.length !== 2) {
        return false;
    }

    // Verificar si la cadena contiene solo caracteres alfanuméricos
    const alphanumericRegex = /^[a-z0-9]+$/i;
    return alphanumericRegex.test(variable);
}


exports.getHistoricalEvents = (ocurrence) => {
    let filtered_events = []
    if (ocurrence == 'ac'){
        filtered_events = eventosJSON.result.events.filter((evn) => evn.date < 0)
    } else if(ocurrence =='dc'){
        filtered_events = eventosJSON.result.events.filter((evn) => evn.date > 0)
    } else if(!isAlphanumericAndLength2(ocurrence)){
        filtered_events = {"message"}
    }
    return filtered_events
}