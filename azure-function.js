/**
 * Azure Function que recebe dois parâmetros no
 * corpo da mensagem: numA e numB, e retorna sua soma.
 *
 * @author Bolzon <blzn@mail.ru>
 * @date 21 de abril de 2018
 */

module.exports = function (context, req) {

    // inicia com response de erro

    context.res = {
        status: 400,
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            error: 'Mensagem tem que ser { numA, numB }'
        }
    };

    // faz validações e parse da mensagem

    if (req.body) {

        var keyValues = {};
        var params = req.body.split('&');

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

            // calcula resultado

            response.result = response.numA + response.numB;

            // retorna sucesso

            context.res.status = 200;
            context.res.body = response;
        }
    }

    context.done();
};
