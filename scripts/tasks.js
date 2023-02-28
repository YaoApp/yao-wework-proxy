var id = 1055;

/**
 * Generate job id
 * @returns
 */
function NextID() {
  id = id + 1;
  console.log(`NextID: ${id}`);
  return id;
}

/**
 * 发送邮箱验证用户邮箱
 */
function Send(id, url, res) {
  http.Post(url, res);
}

/**
 * OnAdd add event
 * @param {*} id
 */
function OnAdd(id) {
  log.Error("进入add");
  console.log(`OnAdd: #${id}`);
}

/**
 * OnProgress
 * @param {*} id
 * @param {*} current
 * @param {*} total
 * @param {*} message
 */
function OnProgress(id, current, total, message) {
  console.log(`OnProgress: #${id} ${message} ${current}/${total} `);
}

function OnSuccess(id, res) {
  console.log(`OnSuccess: #${id} ${JSON.stringify(res)}`);
}

function OnError(id, err) {
  console.log(`OnError: #${id} ${err}`);
}
