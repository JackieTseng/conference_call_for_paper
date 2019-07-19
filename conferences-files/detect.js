(function(){
  fetch('http://ip-api.com/json/?fields=countryCode')
    .then(resp => resp.json())
    .then(({countryCode}) => {
      document.body.dataset.code = countryCode;
    });
}());
