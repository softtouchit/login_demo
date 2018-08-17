/**
 * Form module:
 *  Prepare a form and then invoke the submit function if it passes validation
 */
X.sub("validate", function(evt, form) {

    var formEl = X(form.id);
    form.validators = form.validators || [];

    this.form = form;
    var req = {};

    var validated = true;

    var remote = [];

    for (var i = 0; i < formEl.elements.length && validated; ++i) {
        var el = formEl.elements[i];
        req[el.name] = el.value;
        var v = form.validators[el.dataset.validator || el.name] || defValidator;
        validated &= (v === null) || (v && v(el));
        if (validated) {
            X(el).cnList.remove("error");
            if (el.dataset.remote) {
                remote.push(el);
            }
        } else {
            X(el).cnList.add("error");
        }
    }

    function defValidator(el) {

        if (el.required && (!el.value)) {
            return false;
        }

        if (el.dataset.minLength && el.value.length < el.dataset.minLength) {
            return false;
        }

        if (el.dataset.maxLength && el.value.length > el.dataset.maxLength) {
            return false;
        }

        if (el.type == "number") {
            if (el.value) {
                var iv = parseInt(el.value);
                if (el.dataset.gt && iv <= parseInt(el.dataset.gt)) {
                    return false;
                }
                if (el.dataset.ge && iv < parseInt(el.dataset.gt)) {
                    return false;
                }
                if (el.dataset.le && iv > parseInt(el.dataset.gt)) {
                    return false;
                }
                if (el.dataset.lt && iv >= parseInt(el.dataset.gt)) {
                    return false;
                }
            }
        }

        return true;
    }

    function checkRemote() {
        if (remote.length > 0) {
            var el = remote.pop();
            var r =el.dataset.remote + "?" + el.name + "=" + el.value
            X.get(r, function(resp) {
                var jr = JSON.parse(resp);
                if (jr.code != 0) {
                    validated = false;
                    if (jr.msg) {
                        X(el.id+"Help").innerHTML=jr.msg;
                    }
                     X(el).cnList.add("error");
                } else {
                    checkRemote();
                }
            });
        } else if (validated && form.submit) {
            form.submit(req);
        }
    }

    checkRemote();


});