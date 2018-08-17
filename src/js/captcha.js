/**
 * Catpcha:
 *  Pops captcha is too many failed login
 */
X.sub("init", function() {
    
    function load() {
    
    X.get("/json/captcha", function(resp) {
        var jresp = JSON.parse(resp);
        
       var  html ="";
        html += '<div id="captcha">';
        html += '<img src="'+jresp.img+'" class="captcha col" >';
        html += '<div class="form-group">';
        html += '<label for="captcha-input">Captcha</label>';
        html += '<input id="captcha-input" name="captcha" data-key="'+jresp.key+'" class="form-control">';
        html += '<div class="container captcha">'     ;
        html += '<div class="row">';
        html += '<button data-onclick="check" class="btn btn-outline-secondary btn-sm col">Check</button>';
        html += '<button data-onclick="replace" class="btn btn-outline-secondary btn-sm col">Replace</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>'; 
        html += '</div>';
        
        X('captcha').innerHTML=html;
        

        
    } );
    
    }
    
    X.sub("check", function() {
        var c = X('captcha-input');
        var req ={
            key: c.dataset.key,
            captcha: c.value
        }
        X.post("/json/captcha", req, function(resp) {
            X('captcha').innerHTML= resp;
        })
    });
    
    X.sub("captcha", function() {
        load();
    });
    

});
