/**
 * Created by Shawn on 2017/6/23.
 */

const DATAEYE = 'dataeye';
const STATS_NODE = 'stats-node';
const PLATFORM_SYS = 'platform-sys';
// const PLATFORM_GATEWAY = 'platform-gateway';
const STATJOB = 'statjob';
// const STATJOB = 'http://localhost:16999';
// const PLATFORM_SYS = '';
// const STATS_NODE = '';

import {fetch, fetchFromNodeJs} from './fetch';

export {STATJOB};

// 首页折线图
export const polyLineChartData = (data) => fetch(DATAEYE + '/stat/polyline', {
  reqParams: data
}, 'POST');
// 首页柱状图
export const barChartData = (data) => fetch(DATAEYE + '/stat/bar', {
  reqParams: data
}, 'POST');
// 登陆
export const login = (data, codeEvents) => fetch('/login', {
  reqParams: data,
  codeEvents: codeEvents
}, 'POST');

// 角色列表
export const roleSearch = (data) => fetch(PLATFORM_SYS + '/role/list', {
  reqBody: data
}, 'POST');

// 角色增加
export const roleAdd = (data) => fetch(PLATFORM_SYS + '/role/save', {
  reqBody: data
}, 'POST');

// 角色编辑
export const roleEdit = (data) => fetch(PLATFORM_SYS + '/role/update', {
  reqBody: data
}, 'POST');

// 角色权限
export const roleResources = (data) => fetch(PLATFORM_SYS + '/role/set', {
  reqBody: data
}, 'POST');

export const roleDelete = (data) => fetch(PLATFORM_SYS + '/role/delete/' + data.id, {}, 'POST');

export const pageCategories = (data) => fetchFromNodeJs(STATS_NODE + '/page/list', {
  reqBody: data
}, 'GET');

export const actionList = (data) => fetchFromNodeJs(STATS_NODE + '/action/list', {
  reqBody: data
}, 'GET');

export const updatePageCategory = (data) => fetchFromNodeJs(STATS_NODE + '/page/update', {
  reqBody: data
}, 'PUT');

export const updateAction = (data) => fetchFromNodeJs(STATS_NODE + '/action/list', {
  reqBody: data
}, 'PUT');

export const deletePageCategory = (data) => fetchFromNodeJs(STATS_NODE + '/page/delete', {
  reqBody: data
}, 'DELETE');

export const deleteAction = (data) => fetchFromNodeJs(STATS_NODE + '/action/delete', {
  reqBody: data
}, 'DELETE');

export const createPageCategory = (data) => fetchFromNodeJs(STATS_NODE + '/page/create', {
  reqBody: data
}, 'POST');

export const createAction = (data) => fetchFromNodeJs(STATS_NODE + '/action/create', {
  reqBody: data
}, 'POST');

export const getCities = (data) => fetchFromNodeJs(STATS_NODE + '/group/citylist', data, 'GET');

export const getVersions = (data) => fetchFromNodeJs(STATS_NODE + '/group/appversions', data, 'GET');

export const getOsVersions = (data) => fetchFromNodeJs(STATS_NODE + '/group/osversions', data, 'GET');

export const getManufacturers = (data) => fetchFromNodeJs(STATS_NODE + '/group/manufacturers', data, 'GET');

export const getPhoneModels = (data) => fetchFromNodeJs(STATS_NODE + '/group/phonemodels', data, 'GET');

export const getScreenResolutions = (data) => fetchFromNodeJs(STATS_NODE + '/group/screenresolutions', data, 'GET');

export const getActions = (data) => fetchFromNodeJs(STATS_NODE + '/group/actions', data, 'GET');

export const getPages = (data) => fetchFromNodeJs(STATS_NODE + '/group/pages', data, 'GET');

export const getGroupSummary = (data) => fetchFromNodeJs(STATS_NODE + '/group/summary', data, 'GET');

export const getGroupDefinition = (data) => fetchFromNodeJs(STATS_NODE + '/group/definition', {
  reqParams: data
}, 'GET');

export const updateGroupDefinition = (data) => fetchFromNodeJs(STATS_NODE + '/group/updategroup', {
  reqBody: data
}, 'PUT');

export const createGroupDefinition = (data) => fetchFromNodeJs(STATS_NODE + '/group/creategroup', {
  reqBody: data
}, 'POST');

export const sysJobList = (data) => fetch(STATJOB + '/sysJob/list', {
  reqBody: data
}, 'GET');

export const creatSysJob = (data) => fetch(STATJOB + '/sysJob/save', {
  reqBody: data
}, 'POST');

export const artJobList = (data) => fetch(STATJOB + '/artJob/list', {
  reqParams: data
}, 'POST');

export const pauseSysJob = (data) => fetch(STATJOB + '/sysJob/pause/' + data['jobName'] + '/' + data['jobGroup'],
  {}, 'POST');

export const resumeSysJob = (data) => fetch(STATJOB + '/sysJob/resume/' + data['jobName'] + '/' + data['jobGroup'],
  {}, 'POST');

export const deleteSysJob = (data) => fetch(STATJOB + '/sysJob/delete/' + data['jobName'] + '/' + data['jobGroup'],
  {}, 'POST');

export const doArtJob = (data) => fetch(STATJOB + '/artJob/doArtJob', {
  reqBody: data
}, 'POST');

export const resourceList = () => fetch(PLATFORM_SYS + '/resource/list', {}, 'POST');

export const resourceGet = (data) => fetch(PLATFORM_SYS + '/resource/get/' + data.id, {}, 'GET');

export const resourceSave = (data) => fetch(PLATFORM_SYS + '/resource/save', {
  reqBody: data
}, 'POST');

export const resourceDelete = (data) => fetch(PLATFORM_SYS + '/resource/delete/' + data.id, {}, 'POST');

export const userList = (data, body) => fetch(PLATFORM_SYS + '/user/page', {
  reqParams: data,
  reqBody: body
}, 'POST');

export const passResest = (data, body) => fetch(PLATFORM_SYS + '/user/resetPwd/' + data.id, {
  reqBody: body
}, 'POST');

export const updatePwd = (body) => fetch(PLATFORM_SYS + '/user/updatePwd/', {
  reqBody: body
}, 'POST');

export const lockUser = (data, body) => fetch(PLATFORM_SYS + '/user/lock/' + data.id, {}, 'POST');

export const saveUser = (body) => fetch(PLATFORM_SYS + '/user/save', {
  reqBody: body
}, 'POST');

export const updateUser = (body) => fetch(PLATFORM_SYS + '/user/update', {
  reqBody: body
}, 'POST');

export const logList = (data, body) => fetch(PLATFORM_SYS + '/syslog/page', {
  reqParams: data,
  reqBody: body
}, 'POST');
