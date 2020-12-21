var search = location.search.substring(1);
console.log(search);
var request;
function invalid(){
    $('.valid').css('display', 'none');
    $('.invalid').css('display', 'inline-block');
}
if(search){
    var request = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    if(request.num){
        if(request.num > 1){
            $('#print-header').html('Make sure to have these QR Codes visible when entering the Irvington Choice Awards.');
            $('#main-header').html('Thanks for purchasing tickets for the Irvington Choice Awards.');
        }
        for(var i = 0; i < request.num; i++){
            if(request['place' + i] && request['id' + i]){
                if(data[request['place' + i]].id == request['id' + i]){
                    var codeElement = '<div id="qrcode' + i + '" class="valid qr"></div>';
                    $("body").append(codeElement);
                    var qrcode = new QRCode("qrcode" + i);
                    qrcode.makeCode(request['id' + i] + '-' + request['place' + i]);
                }
                else {
                    invalid();
                    break;
                }
            } else {
                invalid();
                break; 
            }
        }
    } else {
        invalid();
    }
} else {
    invalid();
}
