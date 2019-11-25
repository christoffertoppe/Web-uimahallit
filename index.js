2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(
        'Behold The MEVN Stack!'
    );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});