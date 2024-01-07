import express from "express"
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const { v1: uuid } = require('uuid'); // npm install uuid
const moment = require('moment'); // npm install moment


const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Xin chào -------!!! - Hello các bạn")
    })

    router.get("/home", (req, res) => {
        return res.render("home.ejs")
    })

    router.get("/thanks", (req, res) => {
        return res.send(`
            <div>
                <h4>chúc mừng bạn thanh toán thành công</h4>
                <a href="/home">Back Home<button>
            </div>
        `)
    })

    router.post('/payment/momo', async (req, res) => {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = "Thanh Toán Với Momo..!";
        var redirectUrl = "http://localhost:1400/thanks";
        var ipnUrl = "http://localhost:1400/thanksIpnUrl";
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var amount = "10000";
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

        function handleGetUrlPay(payurl) {
            res.redirect(payurl)
        }

        request.on('error', (e) => {
            console.log(`problem with request: ${e.message}`)
        })


        // write data to request body
        console.log("Sending....")
        request.write(requestBody)
        request.end()

    })

    // router.post('/payment/zalopay', async (req, res) => {
    //     // APP INFO
    //     const  = {
    //         appid: "2553",
    //         key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
    //         key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3"
    //     };

    //     let transID = `${moment().format('YYMMDD')}_${uuid()}`

    //     const order = {
    //         appid: config.appid,
    //         apptransid: transID,
    //         appuser: "demo",
    //         apptime: Date.now(),
    //         item: "[]",
    //         embeddata: "{}",
    //         amount: 50000,
    //         description: `Demoo - Payment for the order` + transID,
    //         bank_code: "zalopayapp"
    //     }

    //     const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
    //     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    //     const b64Order = Buffer.from(JSON.stringify(order)).toString('base64')

    //     res.redirect("https://qcgateway.zalopay.vn/openinapp?order=" + encodeURIComponent(b64Order))
    // })

    router.post('/payment/zalopay', async (req, res) => {
        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/create"
        };

        const embed_data = {};

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "user123",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "zalopayapp",
        };
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const b64Order = Buffer.from(JSON.stringify(order)).toString('base64')
        res.redirect("https://qcgateway.zalopay.vn/openinapp?order=" + encodeURIComponent(b64Order))
    })

    
router.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var config = require('config');
    var dateFormat = require('dateformat');

    
    var tmnCode = config.get('vnp_TmnCode');
    var secretKey = config.get('vnp_HashSecret');
    var vnpUrl = config.get('vnp_Url');
    var returnUrl = config.get('vnp_ReturnUrl');

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
});
// Vui lòng tham khảo thêm tại code demo
    return app.use("/", router)
}

export default initWebRoutes
