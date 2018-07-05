const timeFormat = (data) => {
  if(data){
    let myDate;

    if(data !== 1){
      myDate = new Date(data);
    }else{
      myDate = new Date();
    }

    let Y = myDate.getFullYear(),
      M = myDate.getMonth() + 1,
      D = myDate.getDate() + 1,
      H = myDate.getHours(),
      Min = myDate.getMinutes(),
      S = myDate.getSeconds();

    if(M < 10){
      M = '0' + M ;
    }
    if(D < 10){
      D = '0' + D ;
    }
    if(H < 10){
      H = '0' + H ;
    }
    if(Min < 10){
      Min = '0' + Min ;
    }
    if(S < 10){
      S = '0' + S ;
    }
    return Y + '-' + M + '-' + D ;

  }
}
export{
  timeFormat
}
