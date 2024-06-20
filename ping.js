// Importiamo il modulo ping
const ping = require('ping');

// Funzione per eseguire il ping n volte a un host specificato con un intervallo di tempo specificato
async function pingNTimesWithInterval(host, count, packetSize, interval) {
    console.log(`Eseguo il ping a ${host} ${count} volte con un pacchetto di ${packetSize} bytes e intervallo di ${interval} ms.`);

    for (let i = 0; i < count; i++) {
        try {
            // Eseguiamo il ping all'host specificato con il pacchetto di dimensione specificata
            const res = await ping.promise.probe(host, { timeout: 1, packetSize });

            // Stampiamo i risultati di ogni ping
            console.log(`Ping ${i + 1}: ${host} risponde in ${res.time} ms`);

            // Attendi l'intervallo specificato prima di eseguire il prossimo ping
            await new Promise(resolve => setTimeout(resolve, interval));
        } catch (error) {
            console.error(`Errore durante il ping ${i + 1} a ${host}: ${error.message}`);
        }
    }
}

// Esempio di utilizzo della funzione pingNTimesWithInterval
const hostToPing = '192.168.1.104'; // Sostituisci con l'host che desideri pingare
const numberOfPings = 1000; // Numero di ping da eseguire
const packetSize = 60000; // Dimensione del pacchetto in bytes
const pingInterval = 1; // Intervallo di tempo tra ogni ping in millisecondi (es. ogni 2 secondi)

pingNTimesWithInterval(hostToPing, numberOfPings, packetSize, pingInterval)
    .then(() => console.log('Test di ping completato.'))
    .catch(err => console.error('Errore durante il test di ping:', err));
