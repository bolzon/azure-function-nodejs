
/**
 * Azure Function que recebe dois parâmetros no
 * corpo da mensagem: numA e numB, e retorna sua soma.
 *
 * @author Bolzon <blzn@mail.ru>
 * @date 21 de abril de 2018
 */

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
