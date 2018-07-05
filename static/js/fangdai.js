/**
 * 根据2015年10月24日最新银行利率：公积金[5年以下：2.75%（包括5年），5年以上：3.25%]；
 * 商业贷款[0~1年：4.35%（包括1年），1~5年：4.75%（包括5年），5年以上：4.90%]
 * @type {number}
 */



var gjjRate_discount_lt5 = 2.75;//公积金<=5年基准利率
var gjjRate_discount_gt5 = 3.25;//公积金>5年基准利率
var gjjRate_discount_part2_lt5 = 3.03;//公积金<=5年第二套房利率
var gjjRate_discount_part2_gt5 = 3.58;//公积金>5年第二套房利率

var bizRate_discount_lt1 = '4.35';//商业贷款<=1年基准利率
var bizRate_discount_gt1lt5 = '4.75';//商业贷款>1年<=5年基准利率
var bizRate_discount_gt5 = 4.90;//商业贷款>5年基准利率
var bizRate_discount_part2_lt1 = 4.79;//商业贷款<=1年第二套房利率
var bizRate_discount_part2_gt1lt5 = '5.23';//商业贷款>1年<=5年第二套房利率
var bizRate_discount_part2_gt5 = 5.39;//商业贷款>5年第二套房利率

var reg = new RegExp("^[0-9]+(.[0-9]{1,8})?$");//验证有1-8位小数的正实数

//$("title").text("房贷计算器_实用工具");
//计算方式-根据贷款总额
function caltype1 () {

  $("#gjjRateIntroduction").css({top: "268px", left: "425.5px"});
  $("#resultIntroduction").css({top: "303px"});
  $("#caltype1").attr("checked", "true");
  $("#caltype2").attr("checked", "false");
  $("#totalCapital span:first").html('').html("贷款总额");
  $("#capitalPercent").css({display: "none"});
};
//计算方式-根据按揭比例
function caltype2() {
  $("#gjjRateIntroduction").css({top: "313px", left: "425.5px"});
  $("#resultIntroduction").css({top: "395px"});
  $("#caltype1").attr("checked", "false");
  $("#caltype2").attr("checked", "true");
  $("#totalCapital span:first").html('').html("房屋总价");
  $("#capitalPercent").css({display: "block"});
};
//贷款类别-公积金贷
function loantype1 () {
  rateDisplay();
  initValidateValue();
  $("#resultIntroduction").css({top: "303px"});
  $("#gjjRateIntroduction").css({top: "268px", left: "425.5px"});
  $("#totalCapital span:first").html('').html("贷款总额");
  $("#totalCapital span:eq(1)").css({display: "none"});
  $("#gjjCapital span:eq(2)").css({display: "none"});
  $("#bizCapital span:eq(1)").css({display: "none"});
  $("#capitalPercent").css({display: "none"});
  $("#gjjCapital").css({display: "none"});
  $("#bizCapital").css({display: "none"});
  $("#calType").css({display: "block"});
  $("#totalCapital").css({display: "block"});
  $("#bizRate").css({display: "none"});
  $("#discount").css({display: "block"});
  $("#discount input:first").prop("checked", true);
  $("#calType input:first").prop("checked", true);
  $("#discount-part2").css({display: "block"});
  $("#gjjRate span:first").html('').html("利率");
  var loanTime = $("#loanTime").val();
  var discount = $("input[name='discount']:checked").val();
  if (loanTime <= 60) {//贷款时间小于5年，利率为2.75
    if (discount == 1) {//基准利率
      $("#gjjRateValue").val(gjjRate_discount_lt5);
    } else {//第二套房利率
      $("#gjjRateValue").val(gjjRate_discount_part2_lt5);
    }
  } else {
    if (discount == 1) {//基准利率
      $("#gjjRateValue").val(gjjRate_discount_gt5);
    } else {//第二套房利率
      $("#gjjRateValue").val(gjjRate_discount_part2_gt5);
    }
  }

  $("#discount span:gt(0)").css({display: "none"});
};
//贷款类别-商业贷款
function loantype2() {
  rateDisplay();
  initValidateValue();
  $("#resultIntroduction").css({top: "303px"});
  $("#gjjRateIntroduction").css({top: "268px", left: "425.5px"});
  $("#totalCapital span:first").html('').html("贷款总额");
  $("#totalCapital span:eq(1)").css({display: "none"});
  $("#gjjCapital span:eq(2)").css({display: "none"});
  $("#bizCapital span:eq(1)").css({display: "none"});
  $("#capitalPercent").css({display: "none"});
  $("#gjjCapital").css({display: "none"});
  $("#bizCapital").css({display: "none"});
  $("#calType").css({display: "block"});
  $("#totalCapital").css({display: "block"});
  $("#bizRate").css({display: "none"});
  $("#discount").css({display: "block"});
  $("#discount-part2").css({display: "block"});
  $("#calType input:first").prop("checked", true);
  $("#gjjRate span:first").html('').html("利率");
  var loanTime = $("#loanTime").val();
  var discount = $("input[name='discount']:checked").val();
  if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
    if (discount == 1) {//基准利率
      $("#gjjRateValue").val(bizRate_discount_lt1);
    } else if (discount == 0.95) {
      $("#gjjRateValue").val((bizRate_discount_lt1 * 0.95).toFixed(2));
    } else if (discount == 0.85) {
      $("#gjjRateValue").val((bizRate_discount_lt1 * 0.85).toFixed(2));
    } else {//第二套房利率
      $("#gjjRateValue").val(bizRate_discount_part2_lt1);
    }
  } else if (loanTime > 12 && loanTime <= 60) {
    if (discount == 1) {//基准利率
      $("#gjjRateValue").val(bizRate_discount_gt1lt5);
    } else if (discount == 0.95) {
      $("#gjjRateValue").val((bizRate_discount_gt1lt5 * 0.95).toFixed(2));
    } else if (discount == 0.85) {
      $("#gjjRateValue").val((bizRate_discount_gt1lt5 * 0.85).toFixed(2));
    } else {//第二套房利率
      $("#gjjRateValue").val(bizRate_discount_part2_gt1lt5);
    }
  } else {
    if (discount == 1) {//基准利率
      $("#gjjRateValue").val(bizRate_discount_gt5);
    } else if (discount == 0.95) {
      $("#gjjRateValue").val((bizRate_discount_gt5 * 0.95).toFixed(2));
    } else if (discount == 0.85) {
      $("#gjjRateValue").val((bizRate_discount_gt5 * 0.85).toFixed(2));
    } else {//第二套房利率
      $("#gjjRateValue").val(bizRate_discount_part2_gt5);
    }

  }

  $("#discount span:gt(0)").css({display: "inline"});
};
//贷款类别-组合贷
function loantype3() {
  rateDisplay();
  initValidateValue();
  $("#totalCapital span:eq(1)").css({display: "none"});
  $("#gjjCapital span:eq(2)").css({display: "none"});
  $("#bizCapital span:eq(1)").css({display: "none"});
  $("#capitalPercent").css({display: "none"});
  $("#resultIntroduction").css({top: "350px"});
  $("#gjjRate span:first").html('').html("公积金利率");
  $("#calType").css({display: "none"});
  $("#totalCapital").css({display: "none"});
  $("#gjjCapital").css({display: "block"});
  $("#bizCapital").css({display: "block"});
  $("#bizRate").css({display: "block"});
  $("#discount").css({display: "none"});
  $("#discount-part2").css({display: "none"});

  var loanTime = $("#loanTime").val();
  if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
    $("#bizRateValue").val(bizRate_discount_lt1);
    $("#gjjRateValue").val(gjjRate_discount_lt5);
  } else if (loanTime > 12 && loanTime <= 60) {
    $("#bizRateValue").val(bizRate_discount_gt1lt5);
    $("#gjjRateValue").val(gjjRate_discount_lt5);
  } else {
    $("#bizRateValue").val(bizRate_discount_gt5);
    $("#gjjRateValue").val(gjjRate_discount_gt5);
  }
  $("#discount input:first").attr("checked", true);
  $("#discount span:gt(0)").css({display: "none"});
};


//基准利率
function discount1() {
  rateDisplay();
  //获取当前的贷款类别
  var loantype = $("input[name='loantype']:checked").val();
  var loanTime = $("#loanTime").val();
  if (loantype == 1) {//公积金贷款
    if (loanTime <= 60) {//贷款时间小于5年，利率为2.75
      $("#gjjRateValue").val(gjjRate_discount_lt5);
    } else {//贷款时间大于5年，利率为3.25
      $("#gjjRateValue").val(gjjRate_discount_gt5);
    }
  } else if (loantype == 2) {//商业贷款，基准利率为5.15
    if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
      $("#gjjRateValue").val(bizRate_discount_lt1);
    } else if (loanTime > 12 && loanTime <= 60) {
      $("#gjjRateValue").val(bizRate_discount_gt1lt5);
    } else {
      $("#gjjRateValue").val(bizRate_discount_gt5);
    }
  }
};
//首套优惠85折
function discount2() {
  rateDisplay();
  //获取当前的贷款类别
  var loantype = $("input[name='loantype']:checked").val();
  var loanTime = $("#loanTime").val();
  if (loantype == 1) {//公积金贷款
    if (loanTime <= 60) {//贷款时间小于5年，利率为2.75
      $("#gjjRateValue").val((gjjRate_discount_lt5 * 0.85).toFixed(2));
    } else {//贷款时间大于5年，利率为3.25
      $("#gjjRateValue").val((gjjRate_discount_gt5 * 0.85).toFixed(2));
    }
  } else if (loantype == 2) {//商业贷款，基准利率为5.15
    if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
      $("#gjjRateValue").val((bizRate_discount_lt1 * 0.85).toFixed(2));
    } else if (loanTime > 12 && loanTime <= 60) {
      $("#gjjRateValue").val((bizRate_discount_gt1lt5 * 0.85).toFixed(2));
    } else {
      $("#gjjRateValue").val((bizRate_discount_gt5 * 0.85).toFixed(2));
    }
  }
};
//首套优惠95折
function discount3() {
  rateDisplay();
  //获取当前的贷款类别
  var loantype = $("input[name='loantype']:checked").val();
  var loanTime = $("#loanTime").val();
  if (loantype == 1) {//公积金贷款
    if (loanTime <= 60) {//贷款时间小于5年，利率为2.75
      $("#gjjRateValue").val((gjjRate_discount_lt5 * 0.95).toFixed(2));
    } else {//贷款时间大于5年，利率为3.25
      $("#gjjRateValue").val((gjjRate_discount_gt5 * 0.95).toFixed(2));
    }
  } else if (loantype == 2) {//商业贷款，基准利率为5.15
    if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
      $("#gjjRateValue").val((bizRate_discount_lt1 * 0.95).toFixed(2));
    } else if (loanTime > 12 && loanTime <= 60) {
      $("#gjjRateValue").val((bizRate_discount_gt1lt5 * 0.95).toFixed(2));
    } else {
      $("#gjjRateValue").val((bizRate_discount_gt5 * 0.95).toFixed(2));
    }
  }
};
//第二套房利率
function discountp2() {
  rateDisplay();
  //获取当前的贷款类别
  var loantype = $("input[name='loantype']:checked").val();
  var loanTime = $("#loanTime").val();
  if (loantype == 1) {//公积金贷款
    if (loanTime <= 60) {//贷款时间小于5年，利率为3.03
      $("#gjjRateValue").val(gjjRate_discount_part2_lt5);
    } else {//贷款时间大于5年，利率为3.58
      $("#gjjRateValue").val(gjjRate_discount_part2_gt5);
    }
  } else if (loantype == 2) {//商业贷款
    if (loanTime <= 12) {//贷款时间小于1年，利率为5.06
      $("#gjjRateValue").val(bizRate_discount_part2_lt1);
    } else if (loanTime > 12 && loanTime <= 60) {//贷款时间大于1年，小于5年，利率为5.50
      $("#gjjRateValue").val(bizRate_discount_part2_gt1lt5);
    } else {//贷款时间大于5年，利率为5.67
      $("#gjjRateValue").val(bizRate_discount_part2_gt5);
    }
  }
};
function loanTime() {
  rateDisplay();
  var loanTime = $("#loanTime").val();
  //获取当前的贷款类别
  var loantype = $("input[name='loantype']:checked").val();
  var discount = $("input[name='discount']:checked").val();

  if (loantype == 1) {//公积金贷款
    if (loanTime <= 60) {//贷款时间小于5年，利率为2.75
      if (discount == 1) {//基准利率
        $("#gjjRateValue").val(gjjRate_discount_lt5);
      } else {//第二套房利率
        $("#gjjRateValue").val(gjjRate_discount_part2_lt5);
      }
    } else {
      if (discount == 1) {//基准利率
        $("#gjjRateValue").val(gjjRate_discount_gt5);
      } else {//第二套房利率
        $("#gjjRateValue").val(gjjRate_discount_part2_gt5);
      }
    }
  } else if (loantype == 2) {//商业贷款
    if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
      if (discount == 1) {//基准利率
        $("#gjjRateValue").val(bizRate_discount_lt1);
      } else if (discount == 0.95) {
        $("#gjjRateValue").val((bizRate_discount_lt1 * 0.95).toFixed(2));
      } else if (discount == 0.85) {
        $("#gjjRateValue").val((bizRate_discount_lt1 * 0.85).toFixed(2));
      } else {//第二套房利率
        $("#gjjRateValue").val(bizRate_discount_part2_lt1);
      }
    } else if (loanTime > 12 && loanTime <= 60) {
      if (discount == 1) {//基准利率
        $("#gjjRateValue").val(bizRate_discount_gt1lt5);
      } else if (discount == 0.95) {
        $("#gjjRateValue").val((bizRate_discount_gt1lt5 * 0.95).toFixed(2));
      } else if (discount == 0.85) {
        $("#gjjRateValue").val((bizRate_discount_gt1lt5 * 0.85).toFixed(2));
      } else {//第二套房利率
        $("#gjjRateValue").val(bizRate_discount_part2_gt1lt5);
      }
    } else {
      if (discount == 1) {//基准利率
        $("#gjjRateValue").val(bizRate_discount_gt5);
      } else if (discount == 0.95) {
        $("#gjjRateValue").val((bizRate_discount_gt5 * 0.95).toFixed(2));
      } else if (discount == 0.85) {
        $("#gjjRateValue").val((bizRate_discount_gt5 * 0.85).toFixed(2));
      } else {//第二套房利率
        $("#gjjRateValue").val(bizRate_discount_part2_gt5);
      }

    }
  } else if (loantype == 3) {//组合贷
    if (loanTime <= 12) {//贷款时间小于1年，利率为4.60
      if (discount == 1) {//基准利率
        $("#bizRateValue").val(bizRate_discount_lt1);
        $("#gjjRateValue").val(gjjRate_discount_lt5);
      } else {
        $("#bizRateValue").val(bizRate_discount_part2_lt1);
        $("#gjjRateValue").val(gjjRate_discount_part2_lt5);
      }
    } else if (loanTime > 12 && loanTime <= 60) {
      if (discount == 1) {//基准利率
        $("#bizRateValue").val(bizRate_discount_gt1lt5);
        $("#gjjRateValue").val(gjjRate_discount_lt5);
      } else {
        $("#bizRateValue").val(bizRate_discount_gt5);
        $("#gjjRateValue").val(gjjRate_discount_gt5);
      }
    } else {
      if (discount == 1) {//基准利率
        $("#bizRateValue").val(bizRate_discount_gt5);
        $("#gjjRateValue").val(gjjRate_discount_gt5);
      } else {
        $("#bizRateValue").val(bizRate_discount_part2_gt5);
        $("#gjjRateValue").val(gjjRate_discount_part2_gt5);
      }
    }
  }

};

//清空重填
function resetCal() {
  $("#caldefault").css({display: "block"});
  $("#result-table").css({display: "none"});
  $("#gjjCapital").css({display: "none"});
  $("#bizCapital").css({display: "none"});
  $("#calType").css({display: "block"});
  $("#totalCapital").css({display: "block"});
  $("#bizRate").css({display: "none"});
  $("#discount").css({display: "block"});
  $("#discount-part2").css({display: "block"});
  rateDisplay();
  initValidateValue();
  $("#gjjRateIntroduction").css({top: "265px", left: "425.5px"});
  $("#totalCapital span:eq(1)").css({display: "none"});
  $("#gjjCapital span:eq(2)").css({display: "none"});
  $("#bizCapital span:eq(1)").css({display: "none"});
  $("#gjjCapital input:first").val(100);
  $("#bizCapital input:first").val(100);
  $("#loanTime").val(240);
  $("#capitalPercent select:first").val(0.3);
  $("#capitalPercent").css({display: "none"});
  $("#caltype1").prop("checked", true);
  $("#totalCapital input:first").val(100);
  $("#gjjRateValue").val(gjjRate_discount_gt5);
  $("#discount input:first").prop("checked", true);
  $("#calleft input:first").prop("checked", true);

  $("#loantype1").prop("checked", true);
};


function dze() {
  var totalCapital = $("#totalCapital input:first").val();//贷款总额
  if (!reg.test(totalCapital.trim())) {
    $("#totalCapital span:eq(1)").css({display: "inline"});
    $("#validateTotalCapital").val('false');
  } else {
    $("#totalCapital span:eq(1)").css({display: "none"});
    $("#validateTotalCapital").val('true');
  }
};

function gjjd() {
  var gjjCapital = $("#gjjCapital input:first").val();//公积金贷款
  if (!reg.test(gjjCapital.trim())) {
    $("#gjjCapital span:eq(2)").css({display: "inline"});
    $("#validateGjjCapital").val('false');
  } else {
    $("#gjjCapital span:eq(2)").css({display: "none"});
    $("#validateGjjCapital").val('true');
  }
};

function syd() {
  var bizCapital = $("#bizCapital input:first").val();//商业性贷款
  if (!reg.test(bizCapital.trim())) {
    $("#bizCapital span:eq(1)").css({display: "inline"});
    $("#validateBizCapital").val('false');
  } else {
    $("#bizCapital span:eq(1)").css({display: "none"});
    $("#validateBizCapital").val('true');
  }
};

function gjjRate() {
  var gjjRate = $("#gjjRate input:first").val();//利率
  if (gjjRate == '') {//利率不能为空

    $("#gjjRate span:eq(2)").css({display: "none"});
    $("#gjjRate span:eq(3)").css({display: "none"});
    $("#gjjRate span:eq(4)").css({display: "inline"});
    $("#validateGjjRate").val('false');
    return;
  } else {
    $("#gjjRate span:eq(4)").css({display: "none"});
    $("#validateGjjRate").val('true');
    if (!reg.test(gjjRate)) {//利率必须为数字,最多两位小数
      $("#gjjRate span:eq(3)").css({display: "none"});
      $("#gjjRate span:eq(4)").css({display: "none"});
      $("#gjjRate span:eq(2)").css({display: "inline"});
      $("#validateGjjRate").val('false');
      return;
    } else {
      $("#gjjRate span:eq(2)").css({display: "none"});
      $("#validateGjjRate").val('true');
      if (gjjRate >= 100 || gjjRate <= 0 || gjjRate > 99.99) {//利率必须在0-100%之间
        $("#gjjRate span:eq(2)").css({display: "none"});
        $("#gjjRate span:eq(4)").css({display: "none"});
        $("#gjjRate input:first").val(parseFloat(gjjRate).toFixed(2));
        $("#gjjRate span:eq(3)").css({display: "inline"});
        $("#validateGjjRate").val('false');
        return;
      } else {
        $("#gjjRate span:eq(3)").css({display: "none"});
        $("#validateGjjRate").val('true');
        $("#gjjRate input:first").val(parseFloat(gjjRate).toFixed(2));
      }
    }
  }

};

function bizRate() {

  var bizRate = $("#bizRate input:first").val();//商贷利率
  if (bizRate == '') {//利率不能为空
    $("#bizRate span:eq(2)").css({display: "none"});
    $("#bizRate span:eq(3)").css({display: "none"});
    $("#bizRate span:eq(4)").css({display: "inline"});
    $("#validateBizRate").val('false');
    return;
  } else {
    $("#bizRate span:eq(4)").css({display: "none"});
    $("#validateBizRate").val('true');
    if (!reg.test(bizRate)) {//利率必须为数字,最多两位小数
      $("#bizRate span:eq(3)").css({display: "none"});
      $("#bizRate span:eq(4)").css({display: "none"});
      $("#bizRate span:eq(2)").css({display: "inline"});
      $("#validateBizRate").val('false');
      return;
    } else {
      $("#bizRate span:eq(2)").css({display: "none"});
      $("#validateBizRate").val('true');
      if (bizRate >= 100 || bizRate <= 0 || bizRate > 99.99) {//利率必须在0-100%之间
        $("#bizRate span:eq(2)").css({display: "none"});
        $("#bizRate span:eq(4)").css({display: "none"});
        $("#bizRate input:first").val(parseFloat(bizRate).toFixed(2));
        $("#bizRate span:eq(3)").css({display: "inline"});
        $("#validateBizRate").val('false');
        return;
      } else {
        $("#bizRate span:eq(3)").css({display: "none"});
        $("#validateBizRate").val('true');
        $("#bizRate input:first").val(parseFloat(bizRate).toFixed(2));
      }
    }
  }

};
//开始计算
function startCal() {

  var validateTotalCapital = $("#validateTotalCapital").val();
  var validateGjjCapital = $("#validateGjjCapital").val();
  var validateBizCapital = $("#validateBizCapital").val();
  var validateGjjRate = $("#validateGjjRate").val();
  var validateBizRate = $("#validateBizRate").val();
  if ("true" != validateTotalCapital || "true" != validateGjjCapital || "true" != validateBizCapital || "true" != validateGjjRate || "true" != validateBizRate) {//数值输入有误，不进行计算
    return;
  }
  $("#caldefault").css({display: "none"});
  $("#result-table").css({display: "block"});
  var totalCapital = $("#totalCapital input:first").val();//贷款总额
  var gjjCapital = $("#gjjCapital input:first").val();//公积金贷款
  var bizCapital = $("#bizCapital input:first").val();//商业性贷款
  var bizRate = $("#bizRate input:first").val();//商贷利率
  var gjjRate = $("#gjjRate input:first").val();//利率
  var repaytype = $("input[name='repaytype']:checked").val();//还款方式（1.等额本息 2.等额本金）
  var loantype = $("input[name='loantype']:checked").val();//贷款方式（1.公积金贷 2.商业贷款 3.组合贷）
  var caltype = $("input[name='caltype']:checked").val();//计算方式（1.根据贷款总额 2.根据按揭比例）
  var capitalPercent = $("#capitalPercent select:first").val();//首付比例
  var loanTime = $("#loanTime").val();//按揭期数
  var tableHtml;
  var monthRepay;//月均还款
  var totalRepay;//还款总额
  var totalInterest;//支付利息
  var totalMoney;//贷款总额

  if (caltype == 1) {//根据贷款总额
    totalMoney = totalCapital * 10000;
  } else {//根据按揭比例
    totalMoney = (totalCapital - capitalPercent * totalCapital) * 10000;
  }

  if (repaytype == 1) {//等额本息
    if (loantype == 1 || loantype == 2) {//公积金贷款或商业贷款
      var monthRate = gjjRate / 100 / 12;
      var money = Math.pow(1 + monthRate, loanTime);
      /**
       * 等额本息月还款计算公式
       * 月还款额=〔贷款本金×月利率×（1+月利率）^还款月数〕÷〔（1+月利率）^还款月数－1〕
       *
       */
      monthRepay = totalMoney * monthRate * money / (money - 1);
      totalRepay = (monthRepay * loanTime);
      totalInterest = totalRepay - totalMoney;

      if (caltype == 1) {//根据贷款总额
        tableHtml = '<table>'
          + ' <thead>'
          + ' <tr><td colspan="2">等额本息</td></tr>'
          + ' </thead>'
          + ' <tbody>'
          + ' <tr><th>贷款总额</th><td><em>' + totalCapital + '</em>万元</td></tr>';
        if (loantype == 1) {
          tableHtml += '<tr><th>公积金贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        } else {
          tableHtml += '<tr><th>商业贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        }
        tableHtml += ' <tr><th>还款总额</th><td><em>' + (totalRepay / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>支付利息</th><td><em>' + (totalInterest / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>贷款月数</th><td><em>' + loanTime + '</em>月</td></tr>'
          + ' <tr><th>月均还款</th><td><em>' + monthRepay.toFixed(2) + '</em>元</td></tr>'
          + ' </tbody>'
          + ' </table>';
      } else {//根据按揭比例
        var downPayment = capitalPercent * totalCapital;//首付款
        tableHtml = '<table>'
          + ' <thead><tr><td colspan="2">等额本息</td></tr></thead>'
          + ' <tbody>'
          + ' <tr><th>房款总额</th><td><em>' + totalCapital + '</em>万元</td></tr>'
          + ' <tr><th>首付款</th><td><em>' + downPayment.toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>贷款总额</th><td><em>' + (totalMoney / 10000).toFixed(2) + '</em>万元</td></tr>';
        if (loantype == 1) {
          tableHtml += '<tr><th>公积金贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        } else {
          tableHtml += '<tr><th>商业贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        }
        tableHtml += ' <tr><th>还款总额</th><td><em>' + (totalRepay / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>支付利息</th><td><em>' + (totalInterest / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>贷款月数</th><td><em>' + loanTime + '</em>月</td></tr>'
          + '  <tr><th>月均还款</th><td><em>' + monthRepay.toFixed(2) + '</em>元</td></tr>'
          + ' </tbody>'
          + ' </table>';
      }

      $("#table-wrap").html('').html(tableHtml);

    } else {//组合贷

      var gjj_monthRate = gjjRate / 100 / 12;//公积金月利率
      var biz_monthRate = bizRate / 100 / 12;//商业贷款月利率

      var gjj_money = Math.pow(1 + gjj_monthRate, loanTime);
      var biz_money = Math.pow(1 + biz_monthRate, loanTime);
      var gjj_monthRepay = gjjCapital * 10000 * gjj_monthRate * gjj_money / (gjj_money - 1);//公积金月还款
      var biz_monthRepay = bizCapital * 10000 * biz_monthRate * biz_money / (biz_money - 1);//公积金月还款
      monthRepay = gjj_monthRepay + biz_monthRepay;//总共月还款
      totalRepay = (monthRepay * loanTime) / 10000;//还款总额
      totalInterest = totalRepay - (parseFloat(gjjCapital) + parseFloat(bizCapital));//支付利息

      tableHtml = '<table>'
        + '<thead><tr><td colspan="2">等额本息</td></tr></thead>'
        + '<tbody>'
        + '<tr><th>贷款总额</th><td><em>' + (parseFloat(gjjCapital) + parseFloat(bizCapital)) + '</em>万元</td></tr>'
        + '<tr><th>公积金贷款利率</th><td>' + gjjRate + ' %</td></tr>'
        + '<tr><th>商业贷款利率</th><td>' + bizRate + ' %</td></tr>'
        + '<tr><th>还款总额</th><td><em>' + totalRepay.toFixed(2) + '</em>万元</td></tr>'
        + '<tr><th>支付利息</th><td><em>' + totalInterest.toFixed(2) + '</em>万元</td></tr>'
        + '<tr><th>贷款月数</th><td><em>' + loanTime + '</em>月</td></tr>'
        + '<tr><th>月均还款</th><td><em>' + monthRepay.toFixed(2) + '</em>元</td></tr>'
        + '</tbody>'
        + '</table>';

      $("#table-wrap").html('').html(tableHtml);

    }

  } else {//等额本金
    /**
     等额本金计算方式
     设贷款额为a，月利率为i，还款月数为n
     支付利息=（n+1）*a*i/2
     还款总额=（n+1）*a*i/2+a
     计划月还款额=(贷款本金÷还款月数)+(贷款本金-累计已还本金)×月利率
     累计已还本金=已经归还贷款的月数×贷款本金/还款月数

     */
    var firstRepay;//首月还款
    var lastRepay;//末月还款

    if (loantype == 1 || loantype == 2) {//公积金贷款或商业贷款
      var monthRate = gjjRate / 100 / 12;
      firstRepay = (totalMoney / loanTime) + totalMoney * monthRate;
      lastRepay = (totalMoney / loanTime) + (totalMoney - (parseInt(loanTime) - 1) * (totalMoney / loanTime)) * monthRate;
      totalInterest = ((parseInt(loanTime) + 1) * totalMoney * monthRate) / 2;//总利息
      totalRepay = totalInterest + totalMoney;
      if (caltype == 1) {//根据贷款总额
        tableHtml = '<table>'
          + ' <thead>'
          + ' <tr><td colspan="2">等额本金</td></tr>'
          + ' </thead>'
          + ' <tbody>'
          + ' <tr><th>贷款总额</th><td><em>' + (totalMoney / 10000).toFixed(2) + '</em>万元</td></tr>';
        if (loantype == 1) {
          tableHtml += '<tr><th>公积金贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        } else {
          tableHtml += '<tr><th>商业贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        }
        tableHtml += ' <tr><th>还款总额</th><td><em>' + (totalRepay / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>支付利息</th><td><em>' + (totalInterest / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>贷款月数</th><td><em>' + loanTime + '</em>月</td></tr>'
          + ' <tr><th>首月还款</th><td><em>' + firstRepay.toFixed(2) + '</em>元</td></tr>'
          + ' <tr><th>末月还款</th><td><em>' + lastRepay.toFixed(2) + '</em>元</td></tr>'
          + ' </tbody>'
          + ' </table>';
      } else {//根据按揭比例
        var downPayment = capitalPercent * totalCapital;//首付款
        tableHtml = '<table>'
          + ' <thead><tr><td colspan="2">等额本息</td></tr></thead>'
          + ' <tbody>'
          + ' <tr><th>房款总额</th><td><em>' + totalCapital + '</em>万元</td></tr>'
          + ' <tr><th>首付款</th><td><em>' + downPayment.toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>贷款总额</th><td><em>' + (totalMoney / 10000).toFixed(2) + '</em>万元</td></tr>';
        if (loantype == 1) {
          tableHtml += '<tr><th>公积金贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        } else {
          tableHtml += '<tr><th>商业贷款利率</th><td>' + gjjRate + ' %</td></tr>';
        }
        tableHtml += ' <tr><th>还款总额</th><td><em>' + (totalRepay / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>支付利息</th><td><em>' + (totalInterest / 10000).toFixed(2) + '</em>万元</td></tr>'
          + ' <tr><th>贷款月数</th><td><em>' + loanTime + '</em>月</td></tr>'
          + ' <tr><th>首月还款</th><td><em>' + firstRepay.toFixed(2) + '</em>元</td></tr>'
          + ' <tr><th>末月还款</th><td><em>' + lastRepay.toFixed(2) + '</em>元</td></tr>'
          + ' </tbody>'
          + ' </table>';
      }

      $("#table-wrap").html('').html(tableHtml);

    } else {//组合贷

      var gjj_monthRate = gjjRate / 100 / 12;//公积金月利率
      var biz_monthRate = bizRate / 100 / 12;//商业贷款月利率

      var gjj_firstRepay;//公积金首月还款
      var gjj_lastRepay;//公积金末月还款
      var biz_firstRepay;//商业贷款首月还款
      var biz_lastRepay;//商业贷款末月还款
      var gjj_totalInterest;//公积金总利息
      var biz_totalInterest;//商业贷款总利息

      gjj_firstRepay = (gjjCapital * 10000 / loanTime) + gjjCapital * 10000 * gjj_monthRate;
      biz_firstRepay = (bizCapital * 10000 / loanTime) + bizCapital * 10000 * biz_monthRate;
      gjj_lastRepay = (gjjCapital * 10000 / loanTime) + (gjjCapital * 10000 - (parseInt(loanTime) - 1) * (gjjCapital * 10000 / loanTime)) * gjj_monthRate;
      biz_lastRepay = (bizCapital * 10000 / loanTime) + (bizCapital * 10000 - (parseInt(loanTime) - 1) * (bizCapital * 10000 / loanTime)) * biz_monthRate;
      gjj_totalInterest = ((parseInt(loanTime) + 1) * gjjCapital * 10000 * gjj_monthRate) / 2;
      biz_totalInterest = ((parseInt(loanTime) + 1) * bizCapital * 10000 * biz_monthRate) / 2;
      totalInterest = gjj_totalInterest + biz_totalInterest;

      totalRepay = totalInterest + gjjCapital * 10000 + bizCapital * 10000;

      firstRepay = gjj_firstRepay + biz_firstRepay;
      lastRepay = gjj_lastRepay + biz_lastRepay;

      tableHtml = '<table>'
        + '<thead><tr><td colspan="2">等额本息</td></tr></thead>'
        + '<tbody>'
        + '<tr><th>贷款总额</th><td><em>' + (parseFloat(gjjCapital) + parseFloat(bizCapital)) + '</em>万元</td></tr>'
        + '<tr><th>公积金贷款利率</th><td>' + gjjRate + ' %</td></tr>'
        + '<tr><th>商业贷款利率</th><td>' + bizRate + ' %</td></tr>'
        + '<tr><th>还款总额</th><td><em>' + (totalRepay / 10000).toFixed(2) + '</em>万元</td></tr>'
        + '<tr><th>支付利息</th><td><em>' + (totalInterest / 10000).toFixed(2) + '</em>万元</td></tr>'
        + '<tr><th>贷款月数</th><td><em>' + loanTime + '</em>月</td></tr>'
        + ' <tr><th>首月还款</th><td><em>' + firstRepay.toFixed(2) + '</em>元</td></tr>'
        + ' <tr><th>末月还款</th><td><em>' + lastRepay.toFixed(2) + '</em>元</td></tr>'
        + '</tbody>'
        + '</table>';

      $("#table-wrap").html('').html(tableHtml);

    }


  }


}
//公积金利率介绍
function gjjHelp() {
  var loantype = $("input[name='loantype']:checked").val();//贷款方式（1.公积金贷 2.商业贷款 3.组合贷）
  if (loantype != 3) {
    $("#gjjRateIntroduction").css({display: "block"});
  } else {
    $("#gjjRateIntroduction").css({display: "block", top: "328px", left: "385.5px"});
  }

};
function gjjHelpOut() {

  $("#gjjRateIntroduction").css({display: "none"});

};
//商贷利率介绍
function bizHelpOver() {
  var loantype = $("input[name='loantype']:checked").val();//贷款方式（1.公积金贷 2.商业贷款 3.组合贷）
  if (loantype != 3) {
    $("#gjjRateIntroduction").css({display: "block"});
  } else {
    $("#gjjRateIntroduction").css({display: "block", top: "283px", left: "400.5px"});
  }

};
function bizHelpOut() {

  $("#gjjRateIntroduction").css({display: "none"});

};
//还款方式介绍
function rtipsOver() {

  $("#repayTypeIntroduction").css({display: "block"});

};
function rtipsOut() {

  $("#repayTypeIntroduction").css({display: "none"});

};
//计算结果介绍
function rhelpOver() {

  $("#resultIntroduction").css({display: "block"});

};
function rhelpOut() {

  $("#resultIntroduction").css({display: "none"});

};



function rateDisplay() {

  $("#bizRate span:eq(2)").css({display: "none"});
  $("#gjjRate span:eq(2)").css({display: "none"});
  $("#bizRate span:eq(3)").css({display: "none"});
  $("#gjjRate span:eq(3)").css({display: "none"});
  $("#bizRate span:eq(4)").css({display: "none"});
  $("#gjjRate span:eq(4)").css({display: "none"});

}


function initValidateValue() {
  $("#validateTotalCapital").val('true');
  $("#validateGjjCapital").val('true');
  $("#validateBizCapital").val('true');
  $("#validateGjjRate").val('true');
  $("#validateBizRate").val('true');

}

export {
  startCal as startCal,
  caltype1 as caltype1,
  caltype2 as caltype2,
  loantype1 as loantype1,
  loantype2 as loantype2,
  loantype3 as loantype3,
  discount1 as discount1,
  discount2 as discount2,
  discount3 as discount3,
  discountp2 as discountp2,
  loanTime as loanTime,
  resetCal as resetCal,
  dze as dze,
  gjjd as gjjd,
  syd as syd,
  bizRate as bizRate,
  gjjRate as gjjRate,
  gjjHelpOut as gjjHelpOut,
  gjjHelp as gjjHelp,
  bizHelpOver as bizHelpOver,
  bizHelpOut as bizHelpOut,
  rtipsOut as rtipsOut,
  rtipsOver as rtipsOver,
  rhelpOver as rhelpOver,
  rhelpOut as rhelpOut
}
