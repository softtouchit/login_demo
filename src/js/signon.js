/**
 * Signon module:
 *  Handles the login form
 */
X.sub("init", function() {

    X.sub("error", function(evt, msg) {
        alert(msg);
    });

    function checkSession() {
        X.get("/user/session", function(resp) {
            var jr = JSON.parse(resp);
            if (jr.id) {
                var html = "";

                html += "Welcome " + jr.username+', ';
                html += 'click here to <button class="btn btn-outline-secondary" data-onclick="signOff" >Sign off </button>';

                X('loginPane').innerHTML = html;
            }
        });
    }

    //subscribe the signOff event
    X.sub("signOff", function(evt, data) {
        X.post("/signoff?xsid=" + X.cookie.get('xsid'), null, function(resp) {
            window.location="/";
        });
    });


    var f = X('loginForm', true);
    var logBut = X('loginBtn', true);

    var loginForm = {
        id: "loginForm",
        submit: function(cred) {
            cred.onLoginResponse = onLoginResponse;
            logBut.innerHTML = '<img src="/images/loaderBgWhite.gif"/>';
            X.pub('login', cred);
        }
    };

    X('loginForm').onsubmit = function(e) {
        X.pub('validate', loginForm);
        return false;
    };


    function onLoginResponse(respText) {
        logBut.innerHTML = 'Login';
        var resp = JSON.parse(respText);

        if (resp.code == 31) {
            X.pub('captcha', {});
            return;
        }

        if (resp.code != '0') {
            var obj = {};
            obj.title = "Error";
            obj.msg = resp.msg || 'Username or password error';
            obj.noCancel = true;
            X.pub('showDialog', obj);
            return;
        }

        checkSession();

    }

    checkSession();

});