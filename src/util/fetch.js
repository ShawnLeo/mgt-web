import {baseUrl} from './env';
import {utils} from 'adm-portal';
import axios from 'axios';
import {Message} from 'iview';
import router from '../router';
import Cookies from 'js-cookie';

/**
 *  公共数据请求参数(全部放在url params 中)
 */
let commonDataStr = () => {
  return utils.joint({
    'xApplication': 'mmt-finance-ios',
    'xVersion': '2.4.1',
    'xChannel': '',
    'xClient': '',
    'xDevice': '',
    'xService': '',
    'xToken': Cookies.get('sessionId') || '',
    'xTimestamp': new Date().getTime(),
    'xRepeat': 0,
    'xSignature': ''
  });
};

const codeEvents = (respose, codeEvents) => {
  if (respose.code === '0') { // 成功
    codeEvents && codeEvents.code0 && codeEvents.code0();
    return true;
  }
  if (respose.code === '-101') { // 请登录
    Cookies.remove('sessionId');
    router.push('/login');
    return false;
  }
  if (respose.code === '-9') { // 失败
    if (!(codeEvents && codeEvents.code9 && codeEvents.code9())) {
      Message.error(respose.message);
    }
    return false;
  }
  if (respose.code === '-114') { // 权限不足
    // Message.error(respose.message);
    // debugger;
    // Vue.router.push('/login');
    // console.log(Vue);
    if (!(codeEvents && codeEvents.code114 && codeEvents.code114())) {
      Message.error(respose.message);
    }
    return false;
  }
  Message.error(respose.message);
  return false;
};
/**
 * 统一数据获取方法
 *  约定：1.公共数据请求参数放在url中
 *       2.GET方法使用reqParams传参，POST支持reqParams/reqBody方式
 *       3.indicator 是否显示加载进度条 （false为不显示。默认：true）
 *       4.codeEvents 特殊响应码事件处理（不传则默认处理）
 *
 * @param url
 * @param options
 * @param type
 * @param method
 * @returns {Promise.<*>}
 */
export const fetch = async (url = '', options = {}, type = 'GET') => {
  url = url + '?' + commonDataStr(); // 公共数据 请求参数
  let res = {};
  // if (options.indicator !== false) {
  // 进度条
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // });
  // }

  await axios.request({
    url: url,
    baseURL: baseUrl,
    method: type.toLowerCase(),
    headers: {'Content-Type': 'application/json'},
    params: options.reqParams || {}, // 业务params 请求参数
    data: options.reqBody || {}
  }).then((response) => {
    console.log(response.data);
    codeEvents(response.data.header, options.codeEvents) && (res = response.data);
  }).catch(function (error) {
    if (error.response) {
      // 存在请求，但是服务器的返回一个状态码
      // 他们都在2xx之外
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // 一些错误是在设置请求时触发的
      console.log('Error', error.message);
    }
    // Toast('网络异常');
    // alert();
    Message.error('服务异常');
    console.log(error.config);
  });

  return res;
};

/**
 *
 * 文件下载
 * @param url
 * @param options
 * @param type
 * @returns {Promise.<void>}
 */
export const download = async (url = '', options = {}, type = 'GET') => {
  url = baseUrl + '/' + url + '?' + commonDataStr() + '&' + utils.joint(options.reqParams);// 公共数据 请求参数
  window.open(url);
};
