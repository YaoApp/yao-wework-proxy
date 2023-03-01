/**文档
 * https://developer.work.weixin.qq.com/document/path/90238#%E9%AA%8C%E8%AF%81URL%E6%9C%89%E6%95%88%E6%80%A7
 * @param {*} data
 * @returns
 *
 * 加密解密文档:https://developer.work.weixin.qq.com/document/path/90968#%E5%AF%86%E6%96%87%E8%A7%A3%E5%AF%86%E5%BE%97%E5%88%B0msg%E7%9A%84%E8%BF%87%E7%A8%8B
 * yao run scripts.customer.Verify
 */

function Verify(data, query) {
  Process("models.log.save", {
    field_name: "打印data日志",
    value_json: data,
  });
  Process("models.log.save", {
    field_name: "打印quer日志",
    value_json: query,
  });

  var config = Proces("models.secret.get", {});
  if (!config || !config.length) {
    return {
      code: 200,
      message: "success",
    };
  }

  var EncodingAESKey = config[0]["encode_aes_key"];

  if (data.echostr && data.echostr.length) {
    var echostr = data.echostr[0];
    var res = Process("yao.crypto.WeworkDecrypt", EncodingAESKey, echostr);
    if (res.message) {
      return res.message;
    }
  }

  var xml = query;
  var msg = xml.split("<Encrypt><![CDATA[")[1];
  var msg = msg.split("]]></Encrypt>")[0];
  var res = Process("yao.crypto.WeworkDecrypt", EncodingAESKey, msg, true);

  if (res.data && res.data.xml) {
    var event = res.data.xml.MsgType;
    Process("models.log.save", {
      field_name: event,
      value_json: res,
    });
    var host = Process("models.host.get", {});
    for (var i in host) {
      var url = host[i]["host"] + host[i]["path"];
      Process("tasks.send.Add", url, res);
    }
  }
  return {
    code: 200,
    message: "success",
  };
}
