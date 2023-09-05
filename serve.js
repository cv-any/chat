import { ChatGPTAPI } from "chatgpt";
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const apiKey = "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";
const app = express()
const port = 3000;
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));
//设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// test
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});
const chatGPTApi = new ChatGPTAPI({
  apiKey,
  fetch,
});
app.get('/sendMsg', async (req, res) => {
  const { query, body } = req;
  console.log({ query, body, }, 'req <<<<<<<')
  // let result = await chatGPTApi.sendMessage(req.body.msg)
  let result = await chatGPTApi.sendMessage(req.query.q)
  console.log('res==>', result)
  res.send(`${result.text}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
