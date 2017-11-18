<template>
  <div class="large-header" id="home">
    <canvas id="canvas" class="canvas"></canvas>
    <div class="lg-txt-pic"></div>
    <div class="login-box">
      <div class="account-box" v-show="account">
        <div class="top">
          <span class="lg-title">登录</span><span class="sign-title">SIGN IN</span>
        </div>
        <Form class="login-form" ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="username">
            <Input type="text" v-model="formValidate.username" placeholder="用户名"
                   @on-enter="handleSubmit('formValidate')"></Input>
          </Form-item>

          <Form-item prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="密码"
                   @on-enter="handleSubmit('formValidate')"></Input>
          </Form-item>

          <!--<Form-item prop="remember">-->
            <!--<Checkbox-group v-model="formValidate.remember">-->
              <!--<Checkbox label="记住我"></Checkbox>-->
            <!--</Checkbox-group>-->
          <!--</Form-item>-->

          <!--<div class="login-loading" v-show="login_loading">-->
            <!--<Spin fix class="spin">-->
              <!--<Icon type="load-c" size=18   class="spin-icon-load"></Icon>-->
              <!--<div>登陆中...</div>-->
            <!--</Spin>-->
          <!--</div>-->

          <Form-item>
            <Button type="primary" :loading="login_loading" @click="handleSubmit('formValidate')">
              <span v-if="!login_loading">提交</span>
              <span v-else>登陆中...</span>
            </Button>
          </Form-item>

        </Form>

      </div>

    </div>
  </div>
</template>
<script>
//  import {canvas} from '&/canvas/star';
  import {login} from '../util/interface';
  import {setStore} from '../util/storage';
  export default {
    name: 'login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length < 6 || value.length > 32) {
            callback(new Error('密码长度6-32个字符'));
          }
          callback();
        }
      };
//      const validateCode = (rule, value, callback) => {
//        if (!value) {
//          return callback(new Error('验证码不能为空'));
//        }
//        let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
//        if (!reg.test(value)) {
//          callback(new Error('验证码只能中文数字'));
//        } else {
//          callback();
//        }
//      };
      return {
        formValidate: {
          username: '',
          password: ''
//          code: ''
        },
        ruleValidate: {
          username: [
            {required: true, message: '帐号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ]
//          code: [
//            {required: true, message: '验证码不能为空', trigger: 'blur'},
//            {validator: validateCode, trigger: 'blur'}
//          ]
        },
        account: true,
        scan: false,
        verifyUrl: '',
        login_loading: false
      };
    },
    beforeCreate: function () {
//      document.getElementsByTagName('body')[0].className = 'login_body';
//      // 计算屏幕高度宽度 让其自适应
//      document.getElementsByTagName('body')[0].style.width = window.innerWidth + 'px';
//      document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
    },
    methods: {
      handleSubmit(name) { // login
        this.$refs[name].validate(async (valid) => {
          this.login_loading = true;
          // 登陆
          if (valid) {
            let response = await login({
              username: this.formValidate.username,
              password: this.formValidate.password
            });
            if (response && response.header) {
              if (response.header.code === '0') {
                this.$Message.success('登录成功!');
                setStore('sessionId', response.body);
                this.$router.push('/index');
              }
            }
          } else {
            this.$Message.error('表单验证失败!');
              this.$Notice.warning({
                title: '登录提示',
                desc: '用户名/密码 输入有误.'
              });
          }
          this.login_loading = false;
//          setTimeout(() => {
//            this.login_loading = false;
//            if (valid) {
//              this.$Message.success('登录成功!');
//              this.$router.push('/');
//            } else {
//              this.$Message.error('表单验证失败!');
//              this.$Notice.warning({
//                title: '登录提示',
//                desc: '用户名/密码 随意输入...'
//              });
//            }
//          }, 2000);
        });
      }
    },
    mounted() {
//      canvas();
    }
  };
</script>
<style lang="less">
  .login_body {
    width: 100%;
    height: 100%;
  }

  .large-header {
    height: 100%;
    overflow: hidden;
    position: relative;
    background-image: url(../assets/img/lg-bg.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .lg-txt-pic{
      position: absolute;
      top:28%;
      left:7%;
      background-image: url(../assets/img/lg-txt-pic.png);
      background-position: 22% 48%;
      background-repeat: no-repeat;
      background-size:40% 20%;
      background-color: rgba(255, 255, 255,0.5);
      background-attachment:fixed;
      border-radius: 8px;

      width: 86%;
      height: 308px;
    }
    .login-box {
      width: 380px;
      min-height: 400px;
      background-color: #F8F9FA;
      position: absolute;
      top: 22%;
      left: 60%;
      /*transform: translate(-50%, -50%);*/
      /*margin: 0 auto;*/
      border-radius: 8px;
      opacity: .95;
      border: 1px solid #dedede;

      .top {
        height: 40px;
        margin-top: 50px;
        margin-bottom: 25px;
        line-height: 40px;

        .lg-title{
          font-size: 28px;
          font-family: PingFangSC-Regular;
          color: #5583FF;
        }
        .sign-title{
          font-family: ArialMT;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          font-size: 14px;
          margin-left: 12px;
        }
      }
      .account-box {
        text-align: left;
        margin-left: 25px;
        margin-right: 25px;
        height: 310px;
        .login-form{
          background: #EAEAEC;
          border-radius: 4px;
          margin-top: 20px;
          .ivu-form-item{
            padding-left: 10px;
            padding-top: 24px;
            padding-right: 10px;
            margin-bottom: 0;
            &:last-child{
              padding-left: 0;
              padding-right: 0;
            }
          }
        }
        .ivu-input {
          border: 1px solid #f4f4f4;
          vertical-align: middle;
          border-radius: 3px;
          height: 40px;
          padding: 0 14px;
          font-size: 14px;
          color: #555555;
          outline: none;
        }
        .ivu-btn-primary {
          display: block;
          padding: 9px;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          color: #ffffff;
          background-color: #5583FF;
          border-radius: 0 0 3px 3px;
          border: none;
          -webkit-appearance: none;
          outline: none;
          width: 330px;
        }
        .code-img {
          position: absolute;
          top: 0;
          right: 25px;
          width: 140px;
          height: 50px;
          cursor: pointer;
        }
      }
    }

    .login-loading {
      position: relative;
      width: 330px;
      height: 48px;
      background-color: #27A9E3;
      color: white;

      .spin {
        background-color: #27A9E3;
        color: white
      }
    }
    .spin-icon-load {
      animation: ani-spin 1s linear infinite;
    }
    @keyframes ani-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>
