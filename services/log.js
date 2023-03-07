function Send(id) {
  var one = Process("models.log.find", id, {});

  var host = Process("models.host.get", {});
  for (var i in host) {
    var url = host[i]["host"] + host[i]["path"];
    Process("tasks.send.Add", url, one.value_json);
  }
}
