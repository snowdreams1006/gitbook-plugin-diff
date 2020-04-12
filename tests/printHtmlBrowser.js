var one = 'beep boop',
    other = 'beep boob blah',
    color = '',
    span = null;

var display = document.getElementById('display');
var fragment = document.createDocumentFragment();
var diff = Diff.diffChars(one, other);
diff.forEach(function(part){
    color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    span = document.createElement('span');
    span.style.color = color;
    span.appendChild(document.createTextNode(part.value));
    fragment.appendChild(span);
});
display.appendChild(fragment);