function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
$('#form').on('submit', function () {
    $('#submit').css('display', 'none');
    $('#loader').css('display', 'block');
    $.post("https://script.google.com/macros/s/AKfycbyY6xORoNPGv-V1uQAAuBeMohVVFvoqTWu102h3B1DSzt5yZMx3/exec",
    JSON.stringify({
        type: 'login',
        email: $("#email").val(),
        password: $("#password").val()
    }),
    function(data, status){
        result = JSON.parse(data);
        console.log(result);
        if(result.success == true){
            setCookie('auth', result.token, 175);
            window.location = './account';
        } else {
            $('#password').val('');
            $('#submit').css('display', 'block');
            $('#fail').css('display', 'block');
            $('#loader').css('display', 'none');
        }
    });
    return false;
});