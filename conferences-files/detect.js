(function(){
  fetch('https://ipapi.co/json')
    .then(resp => resp.json())
    .then(({country}) => {
      document.body.dataset.code = country;
    });
}());
