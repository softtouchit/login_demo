/**
 * Listen to all button click events
 */
X.sub("init", function() {
     
document.onclick = function(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    while (element) {
        if (element.dataset && element.dataset.onclick ) {
            X.pub(element.dataset.onclick, element.dataset);
            break;
        }
        element = element.parentNode;
    }
  };    
	 
});
