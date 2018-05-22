! function() {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }

    function e(n) {
        return document.getElementsByTagName(n)
    }

    function t() {
        var t = e("script"),
            o = t.length,
            i = t[o - 1];
        return {
            l: o,
            z: n(i, "zIndex", -1),
            o: n(i, "opacity", .5),
            c: n(i, "color", "0,0,0"),
            n: n(i, "count", 99)
        }
    }

    function o() {
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    function i() {
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
        s.forEach(function(i, x) {
            for(i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
        }), x(i)
    }
    var a, c, u, m = document.createElement("canvas"),
        d = t(),
        l = "c_n" + d.l,
        r = m.getContext("2d"),
        x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(n) {
            window.setTimeout(n, 1e3 / 45)
        },
        w = Math.random,
        y = {
            x: null,
            y: null,
            max: 2e4
        };
    m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function(n) {
        n = n || window.event, y.x = n.clientX, y.y = n.clientY
    }, window.onmouseout = function() {
        y.x = null, y.y = null
    };
    for(var s = [], f = 0; d.n > f; f++) {
        var h = w() * a,
            g = w() * c,
            v = 2 * w() - 1,
            p = 2 * w() - 1;
        s.push({
            x: h,
            y: g,
            xa: v,
            ya: p,
            max: 6e3
        })
    }
    u = s.concat([y]), setTimeout(function() {
        i()
    }, 100)
}();
</script>
<script type="text/javascript">

(function(window,document,undefined){
var hearts = [];

window.requestAnimationFrame = (function(){
return window.requestAnimationFrame || 
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function (callback){
 setTimeout(callback,1000/60);
}
})();

init();

function init(){
css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
attachEvent();
gameloop();
}

function gameloop(){
for(var i=0;i<hearts.length;i++){
if(hearts[i].alpha <=0){
    document.body.removeChild(hearts[i].el);
    hearts.splice(i,1);
    continue;
 }

 hearts[i].y--;
 hearts[i].scale += 0.004;
 hearts[i].alpha -= 0.013;
 hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
}

requestAnimationFrame(gameloop);
}

function attachEvent(){
var old = typeof window.onclick==="function" && window.onclick;
window.onclick = function(event){
old && old();
createHeart(event);
}
}

function createHeart(event){
var d = document.createElement("div");
d.className = "heart";
hearts.push({
el : d,
x : event.clientX - 5,
y : event.clientY - 5,
scale : 1,
alpha : 1,
color : randomColor()
});

document.body.appendChild(d);
}

function css(css){
var style = document.createElement("style");
style.type="text/css";
try{
style.appendChild(document.createTextNode(css));
}
catch(ex){
style.styleSheet.cssText = css;
}

document.getElementsByTagName('head')[0].appendChild(style);
}

function randomColor(){
return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
}

})(window,document);