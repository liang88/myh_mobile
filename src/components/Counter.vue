<template>
  <div id="counter">
    <!-- fangdai -->
    <div class="am-panel am-panel-default" id="fangd" name="fangd">
      <div class="am-panel-hd">房贷计算</div>
      <div class="am-panel-bd clear">
        <!--        <%-- fangdai start --%>-->
        <div class="product1-fangdai" style="clear:both">
          <div class="w1180" style="width: 100%;margin-top: 0;">

            <div class="calcontent" style=" width: 100%; margin-bottom: 0;">
              <div class="calleft" id="calleft">
                <i class="icon-arrow"><span></span>
                </i>
                <div class="item-mod item-top">
                  <label class="item-label"><i class="icon icon-help" id="repaytype-tips" @mouseover="rtipsOverClick" @mouseout="rtipsOutClick"></i><span>还款方式</span></label>
                  <span><input type="radio" name="repaytype" class="int-radio r1" value="1" checked="true">等额本息</span>
                  <span><input type="radio" name="repaytype" class="int-radio" value="2">等额本金</span>
                </div>
                <div class="item-mod">
                  <label class="item-label"><span>贷款类别</span></label>
                  <span><input name="loantype" id="loantype1" @click="loantype1Click" type="radio" class="int-radio r1" value="1" checked="true">公积金贷</span>
                  <span><input type="radio" name="loantype" id="loantype2" @click="loantype2Click" class="int-radio" value="2">商业贷款</span>
                  <span><input type="radio"  name="loantype" id="loantype3" @click="loantype3Click" class="int-radio" value="3">组合贷</span>
                </div>
                <div class="item-mod" id="calType">
                  <label class="item-label"><span>计算方式</span></label>
                  <span><input type="radio" name="caltype" id="caltype1" class="int-radio r1" value="1" checked="true" @click="caltype1Click">根据贷款总额</span>
                  <span><input type="radio" name="caltype" id="caltype2" @click="caltype2Click" class="int-radio" value="2">根据按揭比例</span>
                </div>

                <div class="item-mod" id="totalCapital">
                  <label class="item-label" @blur="dzeClick"><span>贷款总额</span></label>
                  <div class="textbox">
                    <input type="text" value="100" maxlength="9"
                           name="total-capital"><em>万元</em>
                  </div>
                  <span class="warn" style="display: none;">金额必须为数字</span> <span
                  class="warn"></span>
                </div>
                <div class="item-mod adTop" id="gjjCapital" style="display:none;">
                  <label class="item-label"><span>贷款金额</span></label> <span class="pre-detail">使用公积金贷款</span>
                  <div class="textbox mid">
                    <input type="text" value="100" maxlength="9" name="gjj-capital" @blur="gjjdClick"><em>万元</em>
                  </div>
                  <span class="warn" style="display: none;">金额必须为数字</span> <span class="warn"></span>
                </div>
                <div class="item-mod adTop" id="bizCapital" style="display:none;">
                  <span class="pre-detail">使用商业性贷款</span>
                  <div class="textbox mid">
                    <input type="text" value="100" maxlength="9" name="biz-capital" @blur="sydClick"><em>万元</em>
                  </div>
                  <span class="warn" style="display: none;">金额必须为数字</span> <span class="warn"></span>
                </div>
                <div class="item-mod adTop pop" id="capitalPercent"
                     style="display:none;">
                  <label class="item-label"><span>首付比例</span>
                  </label>
                  <div id="prePay" style="z-index: 1;">
                    <select
                      style="height: 32px;width:270px;border: 1px solid #e3e3e3;font-family:Microsoft YaHei;font-size: 14px;">
                      <option value="0.1">1&nbsp;成</option>
                      <option value="0.2">2&nbsp;成</option>
                      <option value="0.3" selected="selected">3&nbsp;成</option>
                      <option value="0.4">4&nbsp;成</option>
                      <option value="0.5">5&nbsp;成</option>
                      <option value="0.6">6&nbsp;成</option>
                      <option value="0.7">7&nbsp;成</option>
                      <option value="0.8">8&nbsp;成</option>
                      <option value="0.9">9&nbsp;成</option>

                    </select>
                  </div>
                  <span class="warn"></span>
                </div>
                <div class="item-mod adTop pop">
                  <label class="item-label"><span>按揭年数</span>
                  </label>
                  <div style="z-index: 1;">
                    <select id="loanTime" @chhange="loanTimeClick" style="height: 32px;width:200px;border: 1px solid #e3e3e3;font-family:Microsoft YaHei;font-size: 14px;">
                      <option value="6">6个月（6期）</option>
                      <option value="12">1年（12期）</option>
                      <option value="24">2年（24期）</option>
                      <option value="36">3年（36期）</option>
                      <option value="48">4年（48期）</option>
                      <option value="60">5年（60期）</option>
                      <option value="72">6年（72期）</option>
                      <option value="84">7年（84期）</option>
                      <option value="96">8年（96期）</option>
                      <option value="108">9年（108期）</option>
                      <option value="120">10年（120期）</option>
                      <option value="132">11年（132期）</option>
                      <option value="144">12年（144期）</option>
                      <option value="156">13年（156期）</option>
                      <option value="168">14年（168期）</option>
                      <option value="180">15年（180期）</option>
                      <option value="192">16年（192期）</option>
                      <option value="204">17年（204期）</option>
                      <option value="216">18年（216期）</option>
                      <option value="228">19年（228期）</option>
                      <option value="240" selected="selected">20年（240期）</option>
                      <option value="300">25年（300期）</option>
                      <option value="360">30年（360期）</option>

                    </select>
                  </div>
                  <span class="warn"></span>
                </div>
                <div class="item-mod adTop" id="bizRate" style="display:none;">
                  <label class="item-label"><i class="icon icon-help" id="biz-help" @mouseover="bizHelpOverClick" @mouseout="bizHelpOutClick"></i><span>商贷利率</span></label>
                  <div class="textbox short">
                    <input type="text" id="bizRateValue" value="5.15" @blur="bizRateClick" maxlength="9" name="biz-rate">
                  </div>
                  <span>&nbsp;%</span> <span class="warn" style="display: none;">利率必须为数字</span>
                  <span class="warn" style="display: none;">利率必须在0-100%之间</span> <span
                  class="warn" style="display: none;">利率不能为空</span> <span
                  class="warn"></span>
                </div>
                <div class="item-mod adTop" id="gjjRate">
                  <label class="item-label"><i class="icon icon-help" id="gjj-help" @mouseover="gjjHelpClick" @mouseout="gjjHelpOutClick"></i><span>利率</span></label>
                  <div class="textbox short">
                    <input type="text" value="3.25" id="gjjRateValue" maxlength="9" @blur="bizRateClick" name="gjj-rate">
                  </div>
                  <span>&nbsp;%</span><span class="warn" style="display: none;">利率必须为数字</span>
                  <span class="warn" style="display: none;">利率必须在0-100%之间</span>
                  <span class="warn" style="display: none;">利率不能为空</span>
                  <span class="warn"></span>
                </div>
                <div class="item-mod" id="discount">
                  <span><input checked="checked" type="radio"  name="discount" @click="discount1Click" class="int-radio r1" value="1">基准利率</span>
                  <span style="display:none;"><input type="radio" name="discount" @click="discount2Click" class="int-radio" value="0.85">首套优惠85折</span>
                  <span style="display:none;"><input type="radio" name="discount" @click="discount3Click" class="int-radio" value="0.95">首套优惠95折</span>
                </div>
                <div class="item-mod" id="discount-part2">
                  <span><input type="radio" name="discount" class="int-radio r1" @click="discountp2Click" value="1.1">第二套房利率</span>
                </div>
                <div class="item-bot" id="clickBtn">
                  <input type="hidden" value="true" id="validateTotalCapital" /> <input
                  type="hidden" value="true" id="validateGjjCapital" /> <input
                  type="hidden" value="true" id="validateBizCapital" /> <input
                  type="hidden" value="true" id="validateGjjRate" /> <input
                  type="hidden" value="true" id="validateBizRate" /> <a
                  class="cal-button" href="javascript:" @click = "startCalClick" id="startCal">开始计算</a>
                  <a class="cal-reset" href="javascript:" @click="resetCalClick" id="resetCal">清空重填</a>
                </div>

              </div>
              <div class="calright" style="padding: 15;">
                <div id="caldefault" class="default">
                  <i><img src="../assets/images/house_jx.png" width="80"/></i>
                  <p>快来算算吧</p>
                </div>

                <div class="resultContent" id="result-table" style="display:none">
                  <div id="table-wrap"></div>
                  <p class="result-tip">
                    <i class="icon icon-help" id="result-help" @mouseover="rhelpOverClick" @mouseout="rhelpOutClick"></i>* 以上结果仅供参考
                  </p>
                </div>
              </div>

            </div>

          </div>
          <div style="position: absolute; z-index: 10000; width: 440px; left: 427.5px; top: 268px;display: none"
               id="gjjRateIntroduction">
            <div class="tooltip-wrap">
              <div class="tooltip-arrow arr-bottom"
                   style="right: initial; left: 19px;">
                <div class="tooltip-arrowbg"></div>
              </div>
              <div class="tooltip-msg">根据2015年10月24日最新银行利率：公积金[5年以下：2.75%（包括5年），5年以上：3.25%]；商业贷款[0~1年：4.35%（包括1年），1~5年：4.75%（包括5年），5年以上：4.90%]</div>
            </div>
          </div>

          <div style="position: absolute; z-index: 10000; width: 440px; left: 400.5px; top: 165px;display: none"
               id="repayTypeIntroduction">
            <div class="tooltip-wrap">
              <div class="tooltip-arrow arr-top"
                   style="right: initial; left: 19px;">
                <div class="tooltip-arrowbg"></div>
              </div>
              <div class="tooltip-msg">
                <span style="color:#333">等额本息:</span>
                等额本息还款,也称定期付息,即借款人每月按相等的金额偿还贷款本息,其中每月贷款利息按月初剩余贷款本金计算并逐月结清。<br>
                <span style="color:#333">等额本金:</span>
                又称利随本清、等本不等息还款法。贷款人将本金分摊到每个月内,同时付清上一交易日至本次还款日之间的利息。
              </div>
            </div>
          </div>

          <div style="position: absolute; z-index: 10000; width: 440px; left: 1018.5px; top: 303px; display: none;"
               id="resultIntroduction">
            <div class="tooltip-wrap">
              <div class="tooltip-arrow arr-bottom"
                   style="right: initial; left: 19px;">
                <div class="tooltip-arrowbg"></div>
              </div>
              <div class="tooltip-msg">
                <span style="color:#333">温馨提示:</span> <br>1
                本结果按照房贷计算器2015年10月24日最新利率计算。 <br>2
                对已贷款购买一套住房但人均面积低于当地平均水平，再申请购买第二套普通自住房的居民，比照执行首次贷款购买普通自住房的优惠政策。
              </div>
            </div>
          </div>
        </div>
        <!--<%-- fangdai end --%>-->
      </div>
    </div>

  </div>
</template>

<script>

import {startCal,caltype1,caltype2,loantype1,loantype2,loantype3,discount1,discount2,discount3,discountp2,loanTime,resetCal,dze,gjjd,syd,bizRate,gjjRate,gjjHelp,gjjHelpOut,bizHelpOver,bizHelpOut,rtipsOver,rtipsOut,rhelpOver,rhelpOut} from '../../static/js/fangdai'

  export default {
    name: 'counter',
    methods:{
      loadFun(){
        //console.log(startCal())
      },
      startCalClick(){
        startCal()
      },
      caltype1Click(){
        caltype1()
      },
      caltype2Click(){
        caltype2()
      },
      loantype1Click(){
        loantype1()
      },
      loantype2Click(){
        loantype2()
      },
      loantype3Click(){
        loantype3()
      },
      discount1Click(){
        discount1()
      },
      discount2Click(){
        discount2()
      },
      discount3Click(){
        discount3()
      },
      discountp2Click(){
        discountp2()
      },
      loanTimeClick(){
        loanTime()
      },
      resetCalClick(){
        resetCal()
      },
      dzeClick(){
        dze()
      },
      gjjdClick(){
        gjjd()
      },
      sydClick(){
        syd()
      },
      bizRateClick(){
        bizRate()
      },
      gjjRateClick(){
        gjjRate()
      },
      gjjHelpClick(){
        gjjHelp()
      },
      gjjHelpOutClick(){
        gjjHelpOut()
      },
      bizHelpOverClick(){
        bizHelpOver()
      },
      bizHelpOutClick(){
        bizHelpOut()
      },
      rtipsOverClick(){
        rtipsOver()
      },
      rtipsOutClick(){
        rtipsOut()
      },
      rhelpOverClick(){
        rhelpOver()
      },
      rhelpOutClick(){
        rhelpOut()
      }
    },
    mounted(){
      this.loadFun()
    }
  }
</script>

<style scoped>
  .am-panel-hd{
    font-size:18px;
    line-height: 40px;
    font-weight:bold;
  }
</style>
