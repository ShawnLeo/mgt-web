/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */

let baseUrl = 'http://localhost:7031';
let nodeUrl = 'http://localhost:7031';

if (process.env.NODE_ENV === 'dev') { // 开发环境
  // baseUrl = 'http://10.133.255.201:5001';
  // nodeUrl = 'http://10.133.255.201:5001';
  // baseUrl = 'http://mob-dev.meimeitech.com:5001';
  // nodeUrl = 'http://mob-dev.meimeitech.com:5001';
} else if (process.env.NODE_ENV === 'test') { // 测试环境
  baseUrl = 'http://10.133.255.201:5001';
  nodeUrl = 'http://10.133.255.201:5001';
} else if (process.env.NODE_ENV === 'pre') { // 预生产环境
  baseUrl = 'https://api-pre.meimeitech.com';
  nodeUrl = 'https://mob-pre-tech.meme2c.com';
} else if (process.env.NODE_ENV === 'prod') { // 生产环境
  baseUrl = 'https://api.meimeitech.com';
  nodeUrl = 'https://mob-tech.meme2c.com';
}

export {baseUrl, nodeUrl};
