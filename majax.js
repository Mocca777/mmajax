   var AjaxConsolLog = function(data){ console.log(data);};
  function sendAjax(method, url, data, rtype, progressbar, success){
   if(typeof method != 'string' && typeof url != 'string'){ return false;}
   method = method.toUpperCase();
   if(typeof progressbar != 'boolean'){
    if(progressbar != false&&progressbar != 'auto'){
     progressbar = true;
    }
   }
   if(method == 'POST' && typeof data != 'string' && typeof data != 'object'){ return false;}
   if(method == 'POST'){
    var params;
    var type;
    var file = 'application/x-www-form-urlencoded; charset=UTF-8';
    switch(typeof data){
    default:
     type = '';
     break;
    case 'object':
     type = data.constructor.name;
     if(type == 'HTMLFormElement'){
      var k;
      for(k in Object.keys(data)){
       if(data[k].type == 'file'){
        file = '';
        type = 'ValidateFormData';
       }
      }
     }
     if(type == 'FormData'){
      file = '';
     }
     break;
    }
    switch(type){
    default:
     params = typeof data == 'string' ? data : Object.keys(data).map(function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }).join('&');
     break;
    case 'HTMLFormElement':
     var k, v, i;
     v = '';
     for(k in Object.keys(data)){
      switch(data[k].type){
      default:
       if(v != ''){ v += '&' }
       v += encodeURIComponent(data[k].name) + '=' + encodeURIComponent(data[k].value);
       break;
      case 'checkbox':
      case 'radio':
       if(data[k].name != i){
        if(v != ''){ v += '&' }
        v += encodeURIComponent(data[k].name) + '=';
        i = data[k].name;
       }
       if(data[k].value == ''){ data[k].value = true }
       if(data[k].checked == true){
        v += encodeURIComponent(data[k].value);
       }
       break;
    	}
     }
     params = v;
     break;
    case 'FormData':
     params = data;
     break;
    case 'ValidateFormData':
     var k, v, i;
     v = new FormData();
     for(k in Object.keys(data)){
      if(data[k].type == 'file'){
       for(i = 0; i < data[k].files.length; i++){
        v.set(data[k].name + i, data[k].files[i] , data[k].files[i].name);
       }
      }
      else{
       v.set(data[k].name, data[k].value);
      }
     }
     params = v;
     break;
    }
   }
   var dpc = document.createElement('div');
   var dpb = document.createElement('div');
   var dpf = document.createElement('div');
   var dpt = document.createTextNode('Percent / Time');
   var dcb = document.createElement('a');
   var dct = document.createTextNode('Save File');
   var dfo;
   var dfn;
   var upc = document.createElement('div');
   var upb = document.createElement('div');
   var upf = document.createElement('div');
   var upt = document.createTextNode('Percent / Time');
   dpc.appendChild(dpb);
   dpf.appendChild(dpt);
   dcb.appendChild(dct);
   upc.appendChild(upb);
   upf.appendChild(upt);
   if(progressbar == true){
    document.body.appendChild(upc);
    document.body.appendChild(upf);
    if(typeof data != 'object'){
     data = new Object();
     data.offsetWidth = '500';
     data.offsetHeight = '20';
     data.offsetTop = document.body.offsetHeight / 2 - 10;
     data.offsetLeft = document.body.offsetWidth / 2 - 200;
    }
    dpc.setAttribute('style', 'position:absolute; width:'+data.offsetWidth+'px; height:'+data.offsetHeight+'px; top:'+data.offsetTop+'px; left:'+data.offsetLeft+'px; border:1px solid #2980b9; background-color:#ffffff; display:none; padding:5px;');
    dpf.setAttribute('style', 'position:absolute; width:'+data.offsetWidth+'px; height:'+data.offsetHeight+'px; top:'+data.offsetTop+'px; left:'+data.offsetLeft+'px; display:none; padding:5px; color:#000000; font-weight:bolder; text-align:center; vertical-align:middle;');
    dcb.setAttribute('style', 'position:absolute; width:'+data.offsetWidth+'px; height:'+data.offsetHeight+'px; top:'+data.offsetTop+'px; left:'+data.offsetLeft+'px; border:1px solid #2980b9; background-color:#ffffff; display:none; padding:5px; color:#2980b9; text-align:center; vertical-align:middle;');
    dpb.setAttribute('style', 'width:0%; height:100%; background-color:#2980b9; color:#000000; display:inline-block;');
    upc.setAttribute('style', 'position:absolute; width:'+data.offsetWidth+'px; height:'+data.offsetHeight+'px; top:'+data.offsetTop+'px; left:'+data.offsetLeft+'px; border:1px solid #2980b9; background-color:#ffffff; display:none; padding:5px;');
    upb.setAttribute('style', 'width:0%; height:100%; background-color:#2980b9; color:#000000; display:inline-block;');
    upf.setAttribute('style', 'position:absolute; width:'+data.offsetWidth+'px; height:'+data.offsetHeight+'px; top:'+data.offsetTop+'px; left:'+data.offsetLeft+'px; display:none; padding:5px; color:#000000; font-weight:bolder; text-align:center; vertical-align:middle;');
   }
   var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
   xhr.onreadystatechange = function(){
    if(this.readyState == 2 && this.status == 200){
     if(this.getResponseHeader('CONTENT-TRANSFER-ENCODING') == 'binary' || this.getResponseHeader('ACCEPT-RANGES') == 'bytes'){
      document.body.appendChild(dpc);
      document.body.appendChild(dcb);
      document.body.appendChild(dpf);
      if(progressbar == true){
       dpc.style.display = 'block';
       dpf.style.display = 'block';
      }
     }
    }
    else{if(this.readyState == 3 && this.status == 200){
     if(this.getResponseHeader('CONTENT-TRANSFER-ENCODING') == 'binary' || this.getResponseHeader('ACCEPT-RANGES') == 'bytes'){
      if(progressbar == true){
      }
     }
    }
    else{if(this.readyState > 3 && this.status == 200){
     if(typeof success == 'function'){ success(this.responseText); }
     if(this.getResponseHeader('CONTENT-TRANSFER-ENCODING') == 'binary' || this.getResponseHeader('ACCEPT-RANGES') == 'bytes'){
      if(progressbar == true){
       dpc.style.display = 'none';
       dpf.style.display = 'none';
       dcb.style.display = 'block';
      }
      if(typeof this.getResponseHeader('CONTENT-DISPOSITION') == 'string'){
       dfn = this.getResponseHeader('CONTENT-DISPOSITION');
       dfn = dfn.substr(dfn.indexOf('=') + 1);
      }
      else{
       dfn = url;
       dfn = dfn.substr(dfn.lastIndexOf('/') + 1);
      }
      dct.nodeValue = dfn;
      dfo = URL.createObjectURL(this.response);
      dcb.setAttribute('href', dfo);
      dcb.setAttribute('download', dfn);
      dcb.onclick = function(){
       dcb.style.display = 'none';
       document.body.removeChild(dpc);
       document.body.removeChild(dpf);
       document.body.removeChild(dcb);
      };
      if(progressbar == 'auto'){
       dcb.click();
      }
     }
    }}}
   };
   xhr.open(method, url, true);
   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
   if(method == 'POST' && file != ''){ xhr.setRequestHeader('Content-Type', file); }
   if(typeof rtype == 'string'){
    xhr.responseType = rtype;
   }
   else{if(typeof data.responseType == 'object'){
    xhr.responseType = data.responseType.value;
   }
   else{if(url.indexOf('responseType') >= 0){
    rtype = url.substr(url.indexOf('responseType') + 13);
    if(rtype.indexOf('&') >= 0){
     rtype = rtype.substr(0, rtype.indexOf('&'));
    }
    xhr.responseType = rtype;
   }}}
   if(progressbar == true){
    var xhrGT = new Date().getTime();
    xhr.upload.addEventListener('progress', function(e){
     upc.style.display = 'block';
     upf.style.display = 'block';
     var percent = (e.loaded / e.total) * 100;
     var xhrP = Math.round(percent) + '%';
     var xhrST = new Date().getTime();
     xhrST = (xhrST - xhrGT) / 1000;
     var xhrDT = (100 - percent) * (xhrST / percent);
     xhrDT = ValidateTime(xhrDT);
     var xhrCT = xhrST / percent * 100;
     xhrCT = ValidateTime(xhrCT);
     var xhrLD = e.loaded;
     xhrLD = ValidateByte(xhrLD);
     var xhrCD = e.total;
     xhrCD = ValidateByte(xhrCD);
     var xhrDS = e.loaded / xhrST;
     xhrDS = ValidateByte(xhrDS) + '/s';
     xhrTXT = xhrP;
     if(upf.offsetWidth >= 300){ xhrTXT += ' / ' + xhrDT + ' / ' + xhrCT; }
     if(upf.offsetWidth >= 500){ xhrTXT += ' / ' + xhrLD + ' / ' + xhrCD; }
     if(upf.offsetWidth >= 100){ xhrTXT += ' / ' + xhrDS; }
     upb.style.width = percent + '%';
     if(upf.offsetWidth >= 50){
      upt.nodeValue = xhrTXT;
     }
     else{
      upt.nodeValue = '';
     }
    });
    xhr.addEventListener('load', function(e){
     upc.style.display = 'none';
     upf.style.display = 'none';
     document.body.removeChild(upc);
     document.body.removeChild(upf);
    });
    xhr.addEventListener('progress', function(e){
     var percent = (e.loaded / e.total) * 100;
     var xhrP = Math.round(percent) + '%';
     var xhrST = new Date().getTime();
     xhrST = (xhrST - xhrGT) / 1000;
     var xhrDT = (100 - percent) * (xhrST / percent);
     xhrDT = ValidateTime(xhrDT);
     var xhrCT = xhrST / percent * 100;
     xhrCT = ValidateTime(xhrCT);
     var xhrLD = e.loaded;
     xhrLD = ValidateByte(xhrLD);
     var xhrCD = e.total;
     xhrCD = ValidateByte(xhrCD);
     var xhrDS = e.loaded / xhrST;
     xhrDS = ValidateByte(xhrDS) + '/s';
     xhrTXT = xhrP;
     if(dpf.offsetWidth >= 300){ xhrTXT += ' / ' + xhrDT + ' / ' + xhrCT; }
     if(dpf.offsetWidth >= 500){ xhrTXT += ' / ' + xhrLD + ' / ' + xhrCD; }
     if(dpf.offsetWidth >= 100){ xhrTXT += ' / ' + xhrDS; }
     dpb.style.width = percent + '%';
     if(dpf.offsetWidth >= 50){
      dpt.nodeValue = xhrTXT;
     }
     else{
      dpt.nodeValue = '';
     }
    });
   }
   switch(method){
   default:
    break;
   case 'GET':
    xhr.send();
    break;
   case 'POST':
    xhr.send(params);
    break;
   }
   return xhr;
  }
  function ValidateTime(times){
   if(times <= 60){
    times = Math.floor(times);
    times += 's';
   }
   else{if(times <= 3600){
    times /= 60;
    times = Math.floor(times);
    times += 'm';
   }
   else{if(times <= 86400){
    times /= 3600;
    times = Math.floor(times);
    times += 'h';
   }
   else{
    times /= 86400;
    times = Math.floor(times);
    times += 'd';
   }}}
   return times;
  }
  function ValidateByte(bytes){
   if(bytes <= 1024){
    bytes = Math.round(bytes);
    bytes += 'B';
   }
   else{if(bytes <= 1048576){
    bytes /= 1024;
    bytes *= 100;
    bytes = Math.round(bytes);
    bytes /= 100;
    bytes += 'KiB';
   }
   else{if(bytes <= 1073741824){
    bytes /= 1048576;
    bytes *= 100;
    bytes = Math.round(bytes);
    bytes /= 100;
    bytes += 'MiB';
   }
   else{if(bytes <= 1099511627776){
    bytes /= 1073741824;
    bytes *= 100;
    bytes = Math.round(bytes);
    bytes /= 100;
    bytes += 'GiB';
   }
   else{
    bytes /= 1099511627776;
    bytes *= 100;
    bytes = Math.round(bytes);
    bytes /= 100;
    bytes += 'TiB';
   }}}}
   return bytes;
  }
  function dropAjax(id){
   var DropZone = document.getElementById(id);
   DropZone.addEventListener('dragover', handleAjaxDragOver, false);
   DropZone.addEventListener('drop', handleAjaxDrop, false);
  }
  function handleAjaxDragOver(e){
   e.stopPropagation();
   e.preventDefault();
   e.dataTransfer.dropEffect = 'copy'; 
  }
  function handleAjaxDrop(e){
   var file;
   var i;
   e.stopPropagation();
   e.preventDefault();
   if(e.dataTransfer.files.length > 0){
    file = new FormData();
    for(i = 0; i < e.dataTransfer.files.length; i++){
     file.append('file'+i, e.dataTransfer.files[i], e.dataTransfer.files[i].name);
    }
    sendAjax('post', document.URL, file, false, false, false);
   }
  }
