module.exports = function (context, req) {

    context.res = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    var params = req.body.split('&');

    var keyValues = {};
    params.forEach(p => {
        var splitted = p.split('=');
        keyValues[splitted.shift()] = splitted.shift();
    });

    var keys = Object.keys(keyValues);

    if (keys.includes('numA') && keys.includes('numB')) {
        var response = {
            numA: parseInt(keyValues.numA),
            numB: parseInt(keyValues.numB)
        };

        response.result = response.numA + response.numB;
        context.res.body = response;
    }
    else {
        context.res.status = 400;
        context.res.body = {
            error: 'Mensagem tem que ser { numA, numB }'
        };
    }

    context.done();
};
