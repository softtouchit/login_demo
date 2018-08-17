/**
 * Registration module:
 *  Validate the registration form and then invoke the registration service
 */
X.sub("init", function() {
    

    var loginForm = {
        id: "regForm",
        validators: {
           "username" : function(el) {
              return el.value.length>=4 && el.value.length<9; 
           } ,   
           "password2" : function(el)  {
               return el.value==X('regForm').password.value;
           }
        } ,
        submit: function(user) {
            //invoking the registration service
            X.post("/user?username="+user.username+"&email="+user.email+"&password="+user.password,{},function(resp) {
              var r = JSON.parse(resp);
              if (r.code==0) {
                  //check the error code, if it is 0, then no errors, let's head to the login page
                  window.location='/';
                  return;
              }
              alert(resp);  
            });
        }
    };
    
    X("regForm").onsubmit=function(e) {
        X.pub('validate', loginForm);
        return false;
    };
    
});
