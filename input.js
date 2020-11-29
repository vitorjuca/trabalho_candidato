const fs = require('fs')
const pg = require('pg')

const credentials = "postgres://postgres:admin@localhost:5432/candidatos"
const JSON_PATH = "./candidatos"

const db = new pg.Client(credentials)

const options = {
    'encoding': 'utf-8'
};


db.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
        fs.readdir(JSON_PATH, batchInput);
    }
})


function batchInput(err, files) {
    if (err) throw err;

    const size = files.length
    for (let i = 0; i < size; i++) {
        const fileName = files[i]
        const path = `${JSON_PATH}/${fileName}`
        insert(fs.readFileSync(path, options))
    }
    console.log('executado')
    process.exit(0)
}

function insert(data) {

    const candidato = JSON.parse(data)

    const query = {
        text: 'INSERT INTO candidatos(id, nome_urna) VALUES($1, $2)',
        values: [candidato.id, candidato.nomeUrna],
    }

    console.log(query)
    // db.query(query).then(res => console.log(res.rows[0])).catch(e => console.log(e))
}