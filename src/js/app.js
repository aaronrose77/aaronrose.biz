/*eslint-env node, mocha, browser */
var typeMe = function(selector, interval) { 
  var el = document.querySelectorAll(selector),
      elItem,
      elList = [],
      elAll,
      elText,
      charStart,
      charEnd,
      style,
      clearTimer,
      cursor,
      charContent;

  for (var i=0; i < el.length; i++) {
    elList.push(el[i]);
  } 

   
  style = (function() {
    // Create the <style> tag
    var style = document.createElement("style");
    // WebKit hack
    style.appendChild(document.createTextNode(""));
    // Add the <style> element to the page    
    document.head.appendChild(style);  
    console.log(style.sheet.cssRules); // length is 0, and no rules
    return style;
  })();    

  style.sheet.insertRule("@keyframes caret {50% {border-color: transparent;}}", 0);
  style.sheet.insertRule(".cursor{border-right: .2rem solid #FFF; animation: caret 1s steps(1) infinite;}"); 
  
  for (var j=0; j < elList.length; j++) {   
    elAll = elList[j]; 
    elText = elAll.innerHTML += "<span class='cursor'></span>";
    charStart = 0;
    charEnd = 0;
       
    if (typeof interval === "undefined") {
      interval = 100;
    }
      
    (function(elAll) {
      clearTimer = setInterval(function() {
        var elNewText = elText.substr(charStart, charEnd);
        var elAllChild = elAll.childNodes;
        // Search through children nodes for specific class name.
        for (var i = 0; i < elAllChild.length; i++) { 
          if(elAllChild[i].classname == "cursor") {
            cursor = elAllChild[i];
          }
        }   

        elAll.innerHTML = elNewText;        
        charEnd = charEnd + 1; //loops through the text in the element
        
        if (elNewText === elText) {
          elAll.innerHTML += "<span class='cursor'></span>"
          clearInterval(clearTimer); // Animation end
        }                    
      }, interval);      
    })(elAll);

  }  
  return elAll;  
};

document.addEventListener("DOMContentLoaded", function(event) { 
	typeMe(".typewriter", 100);
});

