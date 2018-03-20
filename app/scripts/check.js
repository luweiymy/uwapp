/*
* 页面校验
* author:ymy
* description:登录和注册页面的校验
* 用法：vertifyPhone(param)
*/
// 校验手机号
function vertifyPhone(phoneval){
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if ( phoneval.length===0 ) {
    alert("请输入手机号！");
    $('#Phone').focus();
    return false;
  }
  if (phoneval.length != 11) {
    alert('请输入有效的手机号！')
    $('#Phone').focus();
    return false;
  }
  if (!myreg.test(phoneval)) {
    alert('请输入有效的手机号码！');
    $('#Phone').focus();
    return false;
  }
  return true;
}

// 校验密码
function vertifyPasswod(psw){
  var codereg = /^[a-zA-Z0-9]{6,12}$/;
  if (psw.length === 0) {
    alert('请输入密码');
    return false;
  }
  if (!codereg.test(psw)) {
    alert('请输入6-12位密码！');
    return false;
  }
  return true;
}
// 倒计时
function startCountDown() {
    $("#obtainMobileAuthCode").attr("disabled", true);
    $("#obtainMobileAuthCode").removeClass("s-b-blue");
    var c = 60;
    var b = setInterval(a, 1000);
    function a() {
        $("#obtainMobileAuthCode").val(c + "s后获取");
        if (c == 0) {
            // authCodeClick = true;
            $("#obtainMobileAuthCode").val("重新获取");
            $("#obtainMobileAuthCode").removeAttr("disabled");
            clearInterval(b)
        }
        c--
    }
}


$(function(){

  //点击删除图片，清空input框中内容
  $('.del').on('click',function(){
    $(this).siblings('input').val('')
  });


  //点击获取验证码的时候，验证手机号
  $('.verbutton').on('click',function(){
    var
        url = 'http://yearnhome.com/api/User/GetSmsCode',
        phoneNum = $('#Phone').val(),
        data = "{'mobile': "+ phoneNum +"}",
        that = this;
        console.log(data);
    if (vertifyPhone(phoneNum)) {
      $.ajax({
        url:url,
        type:'post',
        dataType:'json',
        data: data,
        contentType:'application/json;charset=utf-8',
        success:function(responsedata){
          window.localStorage.name = phoneNum;
          console.log(responsedata);
          // 成功后给获取验证码的按钮加上60秒的倒计时
          startCountDown();

        },
        error:function(){
          console.log(data);
        }
      });
    }
  })


  /*
  * 点击确定时需要的校验
  * 是否为空
  * 手机号是否正确
  * 密码6-12字母加数字
  */
  $('#regSubmit').on('click',function(){
    var phoneNum = $('#Phone').val(),
        vercode = $('#verCode').val(),
        psw = $('#Password').val(),
        url = 'http://yearnhome.com/api/User/Register',
        // data = "{'phoneNumber':" + phoneNum + ",'verificationCode':" + vercode + ",'password':" + psw + ",'userName': '','cPassword':''" + "}";
        data = "{'userName': '小优','verificationCode':'"+ vercode +  "','password':'" + psw +  "','cPassword': '"+ psw +"','phoneNumber':'" + phoneNum + "'}";
    if(vertifyPhone(phoneNum)){
      if(vercode.length === 0){
        alert('请输入验证码！');
        return false;
      }
      if (vertifyPasswod(psw)) {
        $.ajax({
          url:url,
          type:'post',
          data:data,
          dataType:'json',
          contentType:'application/json',
          success:function(respondata){
            if (respondata.successed) {
              window.location.href = 'personalCenter.html';
            }else {
              alert(respondata.message)
            }
          },
          error:function(){

          }
        })
      }
    }
  })
  $('#loginSubmit').on('click',function() {
    var phoneNum = $('#Phone').val(),
        psw = $('#Password').val(),
        url = 'http://yearnhome.com/api/User/Login',
        data = "{'userName': '" + phoneNum + "','password':'" + psw + "' }";
    if(vertifyPhone(phoneNum) && vertifyPasswod(psw)){
      $.ajax({
        url:url,
        type:'post',
        contentType:'application/json',
        data:data,
        dataType:'json',
        success:function(responsedata){
          if (responsedata.successed) {
            window.localStorage.status = 1;
            window.localStorage.phonenum = phoneNum;
            window.location.href = 'personalCenter.html';
          }
          else {
            alert(responsedata.message)
          }
        },
        error:function(){
          alert('用户名或者密码不对')
        }
      })
    }
  })

})
