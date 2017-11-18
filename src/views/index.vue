<template>
  <div style="width: 100%">
    <Card>
      <Row>
        <iCol span="10">
          <Radio-group v-model="source" type="button" size="large">
            <Radio label="2"><span>APP汇总</span></Radio>
            <Radio label="5"><span>IOS</span></Radio>
            <Radio label="4"><span>Android</span></Radio>
            <Radio label="1"><span>PC网站</span></Radio>
            <Radio label="3"><span>3G</span></Radio>
          </Radio-group>
        </iCol>
        <iCol span="8">
          <Radio-group v-model="daily" type="button" size="large">
            <Radio label="TODAY"><span>今天</span></Radio>
            <Radio label="YESTERDAY"><span>昨天</span></Radio>
            <Radio label="DAY7"><span>7天</span></Radio>
            <Radio label="DAY14"><span>14天</span></Radio>
            <Radio label="DAY30"><span>30天</span></Radio>
          </Radio-group>
        </iCol>
        <iCol span="6">
          <Date-picker v-model="daterange" type="daterange" placement="bottom-end" placeholder="选择日期">
          </Date-picker>
        </iCol>
      </Row>
    </Card>


    <Row type="flex" class-name="top-30">
      <iCol span="24">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="uvCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="uuCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>

      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="vcCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <!--新增启动用户-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="nuvCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
      <!--新增注册用户-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="nrnCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <!--投资人数-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="inCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
      <!--新增投资人数-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="finCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <!--日留存（%-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="rrCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
      <!--跳出率（%）-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="brCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <!--访问用户城市分布（%-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="vucCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
      <!--版本（人数、占比）-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="avCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <!--每次平均使用时长-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="autCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
      <!--启动用户来源渠道分布-->
      <iCol span="12">
        <Card>
          <div class="chart-content">
            <div class="charts">
              <div id="csCharts"></div>
            </div>
          </div>
        </Card>
      </iCol>
    </Row>

    <Row type="flex" class-name="top-30" :gutter="30">
      <iCol span="24">
        <Card>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            数据列表
          </p>
          <a href="#" slot="extra">
            <Button type="ghost" shape="circle" icon="ios-download-outline"></Button>
          </a>

          <Table border :columns="columns7" :data="currentList"></Table>
        </Card>
      </iCol>
    </Row>
  </div>
</template>
<script>
  import {polyLineChartData, barChartData} from '../util/interface';
  import {
    uvOptions,
    uuOptions,
    vcOptions,
    nuvOptions,
    nrnOptions,
    inOptions,
    finOptions,
    rrOptions,
    brOptions,
    vucOptions,
    autOptions,
    avOptions,
    csOptions
  } from '../util/echartsOptions';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入折线图组件
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/toolbox');

  export default {
    name: 'vue-line-chart',
    data() {
      return {
        source: '2',
        daily: 'DAY30',
        uvDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        uuDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        vcDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        nuvDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        nrnDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        inDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        finDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        rrDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        brDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        autDatas: {
          xAxis: [],
          yAxis1: [],
          yAxis2: [],
          currentAvg: '',
          rate: ''
        },
        vucDatas: {
          xAxis: [],
          yAxis: [],
          pieDatas: []
        },
        avDatas: {
          xAxis: [],
          yAxis: [],
          pieDatas: []
        },
        csDatas: {
          xAxis: [],
          yAxis: [],
          pieDatas: []
        },
        daterange: '',
        uvOption: {},
        uuOption: {},
        nuvOption: {},
        nrnOption: {},
        vcOption: {},
        inOption: {},
        finOption: {},
        rrOption: {},
        brOption: {},
        autOption: {},
        vucOption: {},
        avOption: {},
        csOption: {},
        columns7: [
          {
            title: '序号',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('strong', params.index + 1)
              ]);
            }
          },
          {
            title: '日期',
            key: 'time'
          },
          {
            title: '启动用户',
            key: 'uv'
          },
          {
            title: '启动登录用户',
            key: 'uu'
          },
          {
            title: '启动次数',
            key: 'visitsCounts'
          },
          {
            title: '新用户',
            key: 'newUniqueVisits'
          },
          {
            title: '新增注册用户',
            key: 'regUserNum'
          },
          {
            title: '投资人数',
            key: 'investorUserNum'
          },
          {
            title: '新增投资人数',
            key: 'firstInvestorUserNum'
          },
          {
            title: '日留存',
            key: 'retentionRate'
          },
          {
            title: '跳出率',
            key: 'bounceRate'
          },
          {
            title: '每次使用时长',
            key: 'avgvisittime'
          }
        ],
        currentList: []
      };
    },
    mounted() {
      this.initInterestChart();
    },
    methods: {
      async initInterestChart() {
        // 基于准备好的dom，初始化echarts实例
        let uvCharts = document.getElementById('uvCharts');
        let uuCharts = document.getElementById('uuCharts');
        let vcCharts = document.getElementById('vcCharts');
        let nuvCharts = document.getElementById('nuvCharts');
        let nrnCharts = document.getElementById('nrnCharts');
        let inCharts = document.getElementById('inCharts');
        let finCharts = document.getElementById('finCharts');
        let rrCharts = document.getElementById('rrCharts');
        let brCharts = document.getElementById('brCharts');
        let vucCharts = document.getElementById('vucCharts');
        let avCharts = document.getElementById('avCharts');
        let autCharts = document.getElementById('autCharts');
        let csCharts = document.getElementById('csCharts');

        let resizeWorldMapContainer = function () {
          uvCharts.style.height = window.innerWidth * 0.23 + 'px';
          uuCharts.style.height = window.innerWidth * 0.23 + 'px';
          vcCharts.style.height = window.innerWidth * 0.23 + 'px';
          nuvCharts.style.height = window.innerWidth * 0.23 + 'px';
          nrnCharts.style.height = window.innerWidth * 0.23 + 'px';
          inCharts.style.height = window.innerWidth * 0.23 + 'px';
          finCharts.style.height = window.innerWidth * 0.23 + 'px';
          rrCharts.style.height = window.innerWidth * 0.23 + 'px';
          brCharts.style.height = window.innerWidth * 0.23 + 'px';
          vucCharts.style.height = window.innerWidth * 0.23 + 'px';
          avCharts.style.height = window.innerWidth * 0.23 + 'px';
          autCharts.style.height = window.innerWidth * 0.23 + 'px';
          csCharts.style.height = window.innerWidth * 0.23 + 'px';
        };
        resizeWorldMapContainer();
        this.uvCharts = echarts.init(document.getElementById('uvCharts'));
        this.uuCharts = echarts.init(document.getElementById('uuCharts'));
        this.vcCharts = echarts.init(document.getElementById('vcCharts'));
        this.nuvCharts = echarts.init(document.getElementById('nuvCharts'));
        this.nrnCharts = echarts.init(document.getElementById('nrnCharts'));
        this.inCharts = echarts.init(document.getElementById('inCharts'));
        this.finCharts = echarts.init(document.getElementById('finCharts'));
        this.rrCharts = echarts.init(document.getElementById('rrCharts'));
        this.brCharts = echarts.init(document.getElementById('brCharts'));
        this.vucCharts = echarts.init(document.getElementById('vucCharts'));
        this.avCharts = echarts.init(document.getElementById('avCharts'));
        this.autCharts = echarts.init(document.getElementById('autCharts'));
        this.csCharts = echarts.init(document.getElementById('csCharts'));

        this.refreshpolyLineChartData();
      },
      async refreshpolyLineChartData() {
        this.uvDatas.yAxis1.length = 0;
        this.uvDatas.yAxis2.length = 0;
        this.uvDatas.xAxis.length = 0;

        this.uuDatas.yAxis1.length = 0;
        this.uuDatas.yAxis2.length = 0;
        this.uuDatas.xAxis.length = 0;

        this.vcDatas.yAxis1.length = 0;
        this.vcDatas.yAxis2.length = 0;
        this.vcDatas.xAxis.length = 0;

        this.nuvDatas.yAxis1.length = 0;
        this.nuvDatas.yAxis2.length = 0;
        this.nuvDatas.xAxis.length = 0;

        this.nrnDatas.yAxis1.length = 0;
        this.nrnDatas.yAxis2.length = 0;
        this.nrnDatas.xAxis.length = 0;

        this.inDatas.yAxis1.length = 0;
        this.inDatas.yAxis2.length = 0;
        this.inDatas.xAxis.length = 0;

        this.finDatas.yAxis1.length = 0;
        this.finDatas.yAxis2.length = 0;
        this.finDatas.xAxis.length = 0;

        this.rrDatas.yAxis1.length = 0;
        this.rrDatas.yAxis2.length = 0;
        this.rrDatas.xAxis.length = 0;

        this.brDatas.yAxis1.length = 0;
        this.brDatas.yAxis2.length = 0;
        this.brDatas.xAxis.length = 0;

        this.autDatas.yAxis1.length = 0;
        this.autDatas.yAxis2.length = 0;
        this.autDatas.xAxis.length = 0;
        let response = await polyLineChartData({'dateType': this.daily, 'platfromTypeCode': this.source});
        this.currentList = response.body.currentList;
        for (let i = 0; i < response.body.currentList.length; i++) {
          this.uvDatas.yAxis1.push(response.body.currentList[i].uv);
          this.uvDatas.yAxis2.push(response.body.lastList[i].uv);
          this.uvDatas.xAxis.push(response.body.currentList[i].time);
          this.uvDatas.rate = response.body.uv_rate;
          this.uvDatas.currentAvg = response.body.uv_currentAvg;

          this.uuDatas.yAxis1.push(response.body.currentList[i].uu);
          this.uuDatas.yAxis2.push(response.body.lastList[i].uu);
          this.uuDatas.xAxis.push(response.body.currentList[i].time);
          this.uuDatas.rate = response.body.uu_rate;
          this.uuDatas.currentAvg = response.body.uu_currentAvg;

          this.vcDatas.yAxis1.push(response.body.currentList[i].visitsCounts);
          this.vcDatas.yAxis2.push(response.body.lastList[i].visitsCounts);
          this.vcDatas.xAxis.push(response.body.currentList[i].time);
          this.vcDatas.rate = response.body.visitsCounts_rate;
          this.vcDatas.currentAvg = response.body.visitsCounts_currentAvg;

          this.nuvDatas.yAxis1.push(response.body.currentList[i].newUniqueVisits);
          this.nuvDatas.yAxis2.push(response.body.lastList[i].newUniqueVisits);
          this.nuvDatas.xAxis.push(response.body.currentList[i].time);
          this.nuvDatas.rate = response.body.newUniqueVisits_rate;
          this.nuvDatas.currentAvg = response.body.newUniqueVisits_currentAvg;

          this.nrnDatas.yAxis1.push(response.body.currentList[i].regUserNum);
          this.nrnDatas.yAxis2.push(response.body.lastList[i].regUserNum);
          this.nrnDatas.xAxis.push(response.body.currentList[i].time);
          this.nrnDatas.rate = response.body.regUserNum_rate;
          this.nrnDatas.currentAvg = response.body.regUserNum_currentAvg;

          this.inDatas.yAxis1.push(response.body.currentList[i].investorUserNum);
          this.inDatas.yAxis2.push(response.body.lastList[i].investorUserNum);
          this.inDatas.xAxis.push(response.body.currentList[i].time);
          this.inDatas.rate = response.body.investorUserNum_rate;
          this.inDatas.currentAvg = response.body.investorUserNum_currentAvg;

          this.finDatas.yAxis1.push(response.body.currentList[i].firstInvestorUserNum);
          this.finDatas.yAxis2.push(response.body.lastList[i].firstInvestorUserNum);
          this.finDatas.xAxis.push(response.body.currentList[i].time);
          this.finDatas.rate = response.body.firstInvestorUserNum_rate;
          this.finDatas.currentAvg = response.body.firstInvestorUserNum_currentAvg;

          this.rrDatas.yAxis1.push(response.body.currentList[i].retentionRate);
          this.rrDatas.yAxis2.push(response.body.lastList[i].retentionRate);
          this.rrDatas.xAxis.push(response.body.currentList[i].time);
          this.rrDatas.rate = response.body.retentionRate_rate;
          this.rrDatas.currentAvg = response.body.retentionRate_currentAvg;

          this.brDatas.yAxis1.push(response.body.currentList[i].bounceRate);
          this.brDatas.yAxis2.push(response.body.lastList[i].bounceRate);
          this.brDatas.xAxis.push(response.body.currentList[i].time);
          this.brDatas.rate = response.body.bounceRate_rate;
          this.brDatas.currentAvg = response.body.bounceRate_currentAvg;

          this.autDatas.yAxis1.push(response.body.currentList[i].avgvisittime);
          this.autDatas.yAxis2.push(response.body.lastList[i].avgvisittime);
          this.autDatas.xAxis.push(response.body.currentList[i].time);
          this.autDatas.rate = response.body.avgvisittime_rate;
          this.autDatas.currentAvg = response.body.avgvisittime_currentAvg;
        }
        this.uvCharts.clear();
        this.uuCharts.clear();
        this.vcCharts.clear();
        this.nuvCharts.clear();
        this.nrnCharts.clear();
        this.inCharts.clear();
        this.finCharts.clear();
        this.rrCharts.clear();
        this.brCharts.clear();
        this.autCharts.clear();

        this.uvOption = uvOptions(this.uvDatas); // 启动用户（日活）
        this.uuOption = uuOptions(this.uuDatas); // 启动登陆用户
        this.vcOption = vcOptions(this.vcDatas); // 启动次数
        this.nuvOption = nuvOptions(this.nuvDatas); // 新增启动用户
        this.nrnOption = nrnOptions(this.nrnDatas); // 新增注册用户
        this.inOption = inOptions(this.inDatas); // 投资人数
        this.finOption = finOptions(this.finDatas); // 新增投资人数
        this.rrOption = rrOptions(this.rrDatas); // 日留存（%）
        this.brOption = brOptions(this.brDatas); // 跳出率（%）
        this.autOption = autOptions(this.autDatas); // 每次平均使用时长

        this.uvCharts.setOption(this.uvOption);
        this.uuCharts.setOption(this.uuOption);
        this.vcCharts.setOption(this.vcOption);
        this.nuvCharts.setOption(this.nuvOption);
        this.nrnCharts.setOption(this.nrnOption);
        this.inCharts.setOption(this.inOption);
        this.finCharts.setOption(this.finOption);
        this.rrCharts.setOption(this.rrOption);
        this.brCharts.setOption(this.brOption);
        this.autCharts.setOption(this.autOption);

        this.vucDatas.yAxis.length = 0;
        this.vucDatas.xAxis.length = 0;
        this.vucDatas.pieDatas.length = 0;

        this.avDatas.yAxis.length = 0;
        this.avDatas.xAxis.length = 0;
        this.avDatas.pieDatas.length = 0;

        this.csDatas.yAxis.length = 0;
        this.csDatas.xAxis.length = 0;
        this.csDatas.pieDatas.length = 0;
        // 柱状、饼状图
        let response1 = await barChartData({'dateType': this.daily, 'platfromTypeCode': this.source});
        for (let i = 0; i < 10; i++) {
          if (response1.body.cityBars.length > 0 && response1.body.cityBars[i]) {
            this.vucDatas.yAxis.push(response1.body.cityBars[i].x);
            this.vucDatas.xAxis.push(response1.body.cityBars[i].y);
            let pie = {
              value: response1.body.cityBars[i].y,
              name: response1.body.cityBars[i].x
            };
            this.vucDatas.pieDatas.push(pie);
          }

          if (response1.body.appVersionBars.length > 0 && response1.body.appVersionBars[i]) {
            this.avDatas.yAxis.push(response1.body.appVersionBars[i].x);
            this.avDatas.xAxis.push(response1.body.appVersionBars[i].y);
            let avPie = {
              value: response1.body.appVersionBars[i].y,
              name: response1.body.appVersionBars[i].x
            };
            this.avDatas.pieDatas.push(avPie);
          }
          if (response1.body.appVersionBars.length > 0 && response1.body.onlineUserSourceBars[i]) {
            this.csDatas.yAxis.push(response1.body.onlineUserSourceBars[i].x);
            this.csDatas.xAxis.push(response1.body.onlineUserSourceBars[i].y);
            let csPie = {
              value: response1.body.onlineUserSourceBars[i].y,
              name: response1.body.onlineUserSourceBars[i].x
            };
            this.csDatas.pieDatas.push(csPie);
          }
        }

        this.vucCharts.clear();
        this.avCharts.clear();
        this.csCharts.clear();
        this.vucOption = vucOptions(this.vucDatas); // 启动次数
        this.avOption = avOptions(this.avDatas); // 启动次数
        this.csOption = csOptions(this.csDatas); // 启动次数
        this.vucCharts.setOption(this.vucOption);
        this.avCharts.setOption(this.avOption);
        this.csCharts.setOption(this.csOption);
      }
    },
    watch: {
      source(curVal, oldVal) {
        this.refreshpolyLineChartData();
      },
      daily(curVal, oldVal) {
        this.refreshpolyLineChartData();
      },
      daterange(curVal, oldVal) {
//        this.refreshpolyLineChartData(3);
      }
    }
  };
</script>
<style>
</style>
