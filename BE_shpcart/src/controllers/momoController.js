
const paymentMomo = async (req, res) => {
    function handleGetUrlPay(payurl) {
        // res.redirect(payurl)
        return res.status(200).json({
            EM: 'ok', // error message
            EC: 0, // error code
            DT: {
                url: payurl
            },
        })
    }

    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "Thanh Toán Với Momo..!";
    var redirectUrl = "http://localhost:4500/thanks";
    var ipnUrl = "http://localhost:1400/thanksIpnUrl";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = req.body.amount // "10000";
    var requestType = "payWithATM" // "captureWallet"
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    });
    //Create the HTTPS objects
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    //Send the request and get the response
    const request = https.request(options, res => {
        console.log(`Status: ${res.statusCode}`)
        console.log(`Headers: ${JSON.stringify(res.headers)}`)
        res.setEncoding('utf8')
        res.on('data', async (body) => {
            console.log('Body: ')
            console.log(body)
            console.log('payUrl: ')
            console.log(JSON.parse(body).payUrl)
            await handleGetUrlPay(JSON.parse(body).payUrl)
        })
        res.on('end', () => {
            console.log('No more data in response.')
        })
    })

    request.on('error', (e) => {
        console.log(`problem with request: ${e.message}`)
    })


    // write data to request body
    console.log("Sending....")
    request.write(requestBody)
    request.end()
}

module.exports = {
    paymentMomo
}