<template>  
  <div id="informationupload">  
    <!-- 遮罩层 -->  
    <div class="container" v-show="panel">  
      <div>  
        <img id="image" :src="url" alt="Picture">  
      </div>  

      <button type="button" id="button" @click="crop">确定</button>   
      <button type="button"id="cancel" @click="cancel">取消</button> 

    </div>  

    <div style="padding:20px;">  
        <div class="show">  
          <div v-if="headerImage == '' " class="picture" :style="'backgroundImage:url('+houseobj.headUrl+')'"></div>
          <div v-else class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
        </div>  
        <div style="margin-top:20px; position: relative; ">  
          <div class="btn" @click="postImg" >上传图片</div>
          <div class="btn1" @click="postImgTwo" v-show="bgcor" >确认上传</div>
          <input type="file" id="change" accept="image" @change="change" name="123" >
          <label for="change"></label>  
        </div>

    </div>
    <p v-show="bgtishi" class="tishi"> {{tishi}} </p>
  </div>  
</template>  

<script>  
import Cropper from 'cropperjs'
import {getCookie} from '../util/cookie'
export default {
  name: 'informationupload',  
  data () {  
    return {
      headerImage:'',
      headerImageTwo: '',
      headerImageThree: {},
      picValue:'',  
      cropper:'',  
      croppable:false,  
      panel:false,  
      url:'',
      houseobj: {},
      headurl: {},
      tishi: '',
      bgcor: false,
      bgtishi: false
    }  
  },  
  mounted () {
    this.setheadurl ()
    //初始化这个裁剪框  
    var self = this;  
    var image = document.getElementById('image');  
    this.cropper = new Cropper(image, {  
      aspectRatio: 1,  
      viewMode: 1,  
      background:false,  
      zoomable:false,  
      ready: function () {  
        self.croppable = true;  
      }  
    })
  },  
  methods: {
    setheadurl () {
      var infos = {
        id: getCookie('userId')
      }
      this.$http.post(myHost + 'myh_web/selectUser',infos).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.houseobj = data
        if (this.houseobj.headUrl == '') {
          this.houseobj.headUrl = 'static/images/logo.png'
        }
        // console.log(data)
      })
    },
    //取消上传
    cancel() {
        this.panel = false;
        var obj = document.getElementById('change') ; 
        obj.outerHTML=obj.outerHTML;
        this.$router.push('/Information')
    },
    getObjectURL (file) {  
      var url = null ;   
      if (window.createObjectURL!=undefined) { // basic  
        url = window.createObjectURL(file) ;  
      } else if (window.URL!=undefined) { // mozilla(firefox)  
        url = window.URL.createObjectURL(file) ;  
      } else if (window.webkitURL!=undefined) { // webkit or chrome  
        url = window.webkitURL.createObjectURL(file) ;  
      }  
      return url ;  
    },  
    change (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.panel = true;
      this.picValue = files[0];

      this.url = this.getObjectURL(this.picValue);  
      //每次替换图片要重新得到新的url  
      if(this.cropper){  
        this.cropper.replace(this.url);  
      }  
      this.panel = true;

    },  
    crop () {
        this.panel = false;
        this.bgcor = true;
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        // Crop  
        croppedCanvas = this.cropper.getCroppedCanvas();
        // Round  
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);  

        this.headerImage = roundedCanvas.toDataURL();
        this.postImg()

    },  
    getRoundedCanvas (sourceCanvas) {  

      var canvas = document.createElement('canvas');  
      var context = canvas.getContext('2d');  
      var width = sourceCanvas.width;  
      var height = sourceCanvas.height;  

      canvas.width = width;  
      canvas.height = height;  

      context.imageSmoothingEnabled = true;  
      context.drawImage(sourceCanvas, 0, 0, width, height);  
      context.globalCompositeOperation = 'destination-in';  
      context.beginPath();  
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
      context.fill();  

      return canvas;  
    },
    postImg () {
      function convertBase64UrlToBlob(urlData){
          var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte 
          //处理异常,将ascii码小于0的转换为大于0  
          var ab = new ArrayBuffer(bytes.length);  
          var ia = new Uint8Array(ab);  
          for (var i = 0; i < bytes.length; i++) {  
              ia[i] = bytes.charCodeAt(i);  
          }
          return new Blob( [ab] , {type : 'image/png'});  
      }
      var diao = convertBase64UrlToBlob(this.headerImage)
      //这边写图片的上传
      var zipFormData = new FormData();
      // console.log(this.headerImage)
      zipFormData.append('file', diao);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      this.$http.post (myHost + 'myh_web/uploadImage',zipFormData).then ((response) => {
        var data = response.data
        data = data.resultBean
        var code = data.code
        if (code = '0') {
          var headurl = data.object
          this.headerImageTwo = headurl

          // console.log(headurl + 'yes')
          // alert(1)
          // console.log(this.headerImageTwo + 'yess')
        } else {
          // console.log(this.headerImage + 'no')
        }
      });
    },
    postImgTwo () {
      // alert(2)
      // console.log(this.headerImageTwo + 'yesstwo')
      if (this.headerImageTwo == '') {
        this.tishi = '请上传头像！'
        this.bgtishi = true
        this.clearmessage ()
        return
      }
      var setdata = {
        id : getCookie('userId'),
        headUrl : this.headerImageTwo
      }
      this.$http.post (myHost + 'myh_web/updateUser',setdata).then ((response) => { 
        var data = response.data
        data = data.resultBean
        var code = data.code
        if (code == '0') {
          data = data.object
          this.headerImageThree = data
          this.tishi = '成功'
          this.bgtishi = true
          this.clearmessage ()
        } else {
          this.tishi = data.message
          this.bgtishi = true
          this.clearmessage ()
          // console.log(code)
        }
      })
    },
    clearmessage () {
      var thats = this
      setTimeout(function () {
        thats.tishi = ''
        this.bgtishi = false
      }, 3000)
    }
  }  
};
</script>  

<style>
#informationupload .tishi{
  position: fixed;
  top: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  background: #eee;
  border-radius: 0.7rem;
  font-size: 0.4rem;
  color: red;
  text-align: center;
  line-height: 1rem;
}


#informationupload #cancel {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: white;
}
#informationupload #cancel{left:10px;}
#informationupload #button {  
  position: absolute;  
  right: 10px;  
  top: 10px;  
  width: 80px;  
  height: 40px;  
  border:none;  
  border-radius: 5px;  
  background:white;  
}  
#informationupload .show {  
  width: 5rem;  
  height: 5rem;
  margin: 0 auto;
  overflow: hidden;  
  position: relative;  
  border-radius: 50%;  
  border: 1px solid #d5d5d5;  
}  
#informationupload .picture {  
  width: 100%;  
  height: 100%;  
  overflow: hidden;  
  background-position: center center;  
  background-repeat: no-repeat;  
  background-size: cover;   
}  
#informationupload .container {  
    z-index: 99;  
    position: fixed;  
    padding-top: 60px;  
    left: 0;  
    top: 0;  
    right: 0;  
    bottom: 0;  
    background:rgba(0,0,0,1);  
}  

#informationupload #image {  
  max-width: 100%;  
}  
#informationupload .product1-fangdai select, #informationupload input{
  width: 70%;
  height: 1.3rem;
  display: block;
  margin: 0 auto !important;
  opacity: 0;
}
#informationupload .product1-fangdai{
  position: relative;
}
#informationupload .btn{
  width: 70%;
  height: 1.3rem;
  background: #66cc00;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 1.3rem;
  font-size: 0.6rem;
  color: #fff;
}
#informationupload .btn1{
  width: 70%;
  height: 1.3rem;
  background: #66cc00;
  position: absolute;
  top: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 1.3rem;
  font-size: 0.6rem;
  color: #fff;
}
#informationupload .cropper-view-box,.cropper-face {  
  border-radius: 50%;  
}  
/*!  
 * Cropper.js v1.0.0-rc  
 * https://github.com/fengyuanchen/cropperjs  
 *  
 * Copyright (c) 2017 Fengyuan Chen  
 * Released under the MIT license  
 *  
 * Date: 2017-03-25T12:02:21.062Z  
 */  

#informationupload .cropper-container {  
  font-size: 0;  
  line-height: 0;  

  position: relative;  

  -webkit-user-select: none;  

     -moz-user-select: none;  

      -ms-user-select: none;  

          user-select: none;  

  direction: ltr;  
  -ms-touch-action: none;  
      touch-action: none  
}  

#informationupload .cropper-container img {  
  /* Avoid margin top issue (Occur only when margin-top <= -height) */  
  display: block;  
  min-width: 0 !important;  
  max-width: none !important;  
  min-height: 0 !important;  
  max-height: none !important;  
  width: 100%;  
  height: 100%;  
  image-orientation: 0deg  
}  

#informationupload .cropper-wrap-box,  
#informationupload .cropper-canvas,  
#informationupload .cropper-drag-box,  
#informationupload .cropper-crop-box,  
#informationupload .cropper-modal {  
  position: absolute;  
  top: 0;  
  right: 0;  
  bottom: 0;  
  left: 0;  
}  

#informationupload .cropper-wrap-box {  
  overflow: hidden;  
}  

#informationupload .cropper-drag-box {  
  opacity: 0;  
  background-color: #fff;  
}  

#informationupload .cropper-modal {  
  opacity: .5;  
  background-color: #000;  
}  

#informationupload .cropper-view-box {  
  display: block;  
  overflow: hidden;  

  width: 100%;  
  height: 100%;  

  outline: 1px solid #39f;  
  outline-color: rgba(51, 153, 255, 0.75);  
}  

#informationupload .cropper-dashed {  
  position: absolute;  

  display: block;  

  opacity: .5;  
  border: 0 dashed #eee  
}  

#informationupload .cropper-dashed.dashed-h {  
  top: 33.33333%;  
  left: 0;  
  width: 100%;  
  height: 33.33333%;  
  border-top-width: 1px;  
  border-bottom-width: 1px  
}  

#informationupload .cropper-dashed.dashed-v {  
  top: 0;  
  left: 33.33333%;  
  width: 33.33333%;  
  height: 100%;  
  border-right-width: 1px;  
  border-left-width: 1px  
}  

#informationupload .cropper-center {  
  position: absolute;  
  top: 50%;  
  left: 50%;  

  display: block;  

  width: 0;  
  height: 0;  

  opacity: .75  
}  

#informationupload .cropper-center:before,  
  .cropper-center:after {  
  position: absolute;  
  display: block;  
  content: ' ';  
  background-color: #eee  
}  

#informationupload .cropper-center:before {  
  top: 0;  
  left: -3px;  
  width: 7px;  
  height: 1px  
}  

#informationupload .cropper-center:after {  
  top: -3px;  
  left: 0;  
  width: 1px;  
  height: 7px  
}  

#informationupload .cropper-face,  
#informationupload .cropper-line,  
#informationupload .cropper-point {  
  position: absolute;  

  display: block;  

  width: 100%;  
  height: 100%;  

  opacity: .1;  
}  

#informationupload .cropper-face {  
  top: 0;  
  left: 0;  

  background-color: #fff;  
}  

#informationupload .cropper-line {  
  background-color: #39f  
}  

#informationupload .cropper-line.line-e {  
  top: 0;  
  right: -3px;  
  width: 5px;  
  cursor: e-resize  
}  

#informationupload .cropper-line.line-n {  
  top: -3px;  
  left: 0;  
  height: 5px;  
  cursor: n-resize  
}  

#informationupload .cropper-line.line-w {  
  top: 0;  
  left: -3px;  
  width: 5px;  
  cursor: w-resize  
}  

#informationupload .cropper-line.line-s {  
  bottom: -3px;  
  left: 0;  
  height: 5px;  
  cursor: s-resize  
}  

#informationupload .cropper-point {  
  width: 5px;  
  height: 5px;  

  opacity: .75;  
  background-color: #39f  
}  

#informationupload .cropper-point.point-e {  
  top: 50%;  
  right: -3px;  
  margin-top: -3px;  
  cursor: e-resize  
}  

#informationupload .cropper-point.point-n {  
  top: -3px;  
  left: 50%;  
  margin-left: -3px;  
  cursor: n-resize  
}  

#informationupload .cropper-point.point-w {  
  top: 50%;  
  left: -3px;  
  margin-top: -3px;  
  cursor: w-resize  
}  

#informationupload .cropper-point.point-s {  
  bottom: -3px;  
  left: 50%;  
  margin-left: -3px;  
  cursor: s-resize  
}  

#informationupload .cropper-point.point-ne {  
  top: -3px;  
  right: -3px;  
  cursor: ne-resize  
}  

#informationupload .cropper-point.point-nw {  
  top: -3px;  
  left: -3px;  
  cursor: nw-resize  
}  

#informationupload .cropper-point.point-sw {  
  bottom: -3px;  
  left: -3px;  
  cursor: sw-resize  
}  

#informationupload .cropper-point.point-se {  
  right: -3px;  
  bottom: -3px;  
  width: 20px;  
  height: 20px;  
  cursor: se-resize;  
  opacity: 1  
}  

@media (min-width: 768px) {  

  #informationupload .cropper-point.point-se {  
    width: 15px;  
    height: 15px  
  }  
}  

@media (min-width: 992px) {  

  #informationupload .cropper-point.point-se {  
    width: 10px;  
    height: 10px  
  }  
}  

@media (min-width: 1200px) {  

  #informationupload .cropper-point.point-se {  
    width: 5px;  
    height: 5px;  
    opacity: .75  
  }  
}  

#informationupload .cropper-point.point-se:before {  
  position: absolute;  
  right: -50%;  
  bottom: -50%;  
  display: block;  
  width: 200%;  
  height: 200%;  
  content: ' ';  
  opacity: 0;  
  background-color: #39f  
}  

#informationupload .cropper-invisible {  
  opacity: 0;  
}  

#informationupload .cropper-bg {  
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');  
}  

#informationupload .cropper-hide {  
  position: absolute;  

  display: block;  

  width: 0;  
  height: 0;  
}  

#informationupload .cropper-hidden {  
  display: none !important;  
}  

#informationupload .cropper-move {  
  cursor: move;  
}  

#informationupload .cropper-crop {  
  cursor: crosshair;  
}  

#informationupload .cropper-disabled .cropper-drag-box,  
#informationupload .cropper-disabled .cropper-face,  
#informationupload .cropper-disabled .cropper-line,  
#informationupload .cropper-disabled .cropper-point {  
  cursor: not-allowed;  
}  


</style> 