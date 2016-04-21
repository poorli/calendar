/**
 * Created by Liyong on 2016/4/10.
 */
/**
 * 插入文本，解决Firefox不支持innerText属性的问题
 * @param {element} element 接受文本的元素
 * @param {string} value 插入的文本*/
function setTextContent(element, value) {
    if (document.documentElement.innerText) {
        element.innerText = value;
    } else {
        if (document.documentElement.textContent) {
            element.textContent = value;
        }
    }
}

function getClassName(element) {
    var thisClassName = '';
    //console.log(element.className);
    if (element.className) {
        thisClassName = element.className;
    } else if (element.getAttribute("class")) {
        thisClassName = element.getAttribute("class");
    } else if (element.getAttribute("className")) {
        thisClassName = element.getAttribute("className");
    }
    //thisClassName=element.className;
    //if (document.documentElement.className){
    //    thisClassName=element.className;
    //}else if (document.documentElement.getAttribute("class")){
    //    thisClassName = element.getAttribut("class");
    //}else if(document.documentElement.getAttribute("className")){
    //    thisClassName = element.getAttribut("className");
    //}
    return thisClassName;
}

function setClassName(element, value) {
    element.className = value;
    element.setAttribute("class", value);
    if (getClassName(element)) {
        return;
    }
    element.setAttribute("className", value);
    //if (element.className){
    //    element.className=value;
    //}
    //else if (element.getAttribute("class")){
    //    element.setAttribute("class",value);
    //}else if(element.getAttribute("className")) {
    //    element.setAttribute("className",value);
    //}
}
/**
 * 为元素添加类名
 * @param {element} element 元素
 * @param {string} value 类名
 * */

function addClassName(element, value) {
    var oldClassName = getClassName(element);
    if (oldClassName.indexOf(value) > -1) {
        return;
    }
    if (oldClassName == '') {
        setClassName(element, value);
    } else {
        var newClassName = oldClassName + " " + value;
        setClassName(element, newClassName);
    }
    //if (document.documentElement.getAttribute("class")){
    //    var oldClassName=element.getAttribute("class");
    //    var newClassName=oldClassName+" "+value;
    //    element.setAttribute("class",newClassName);
    //}else {
    //    if (document.documentElement.getAttribute("className")){
    //        var oldClassName=element.getAttribute("className");
    //        var newClassName=oldClassName+" "+value;
    //        element.setAttribute("className",newClassName)
    //    }else{
    //        element.setAttribute("class",value)||element.setAttribute("className",value);
    //    }
    //}
}
/**
 * 为元素删除类名
 * @param {element} element 元素
 * @param {string} value 类名
 * */
function removeClassName(element, value) {
    var classNames = getClassName(element).split(/\s/);
    var pos = -1,
        i,
        len;
    for (i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] == value) {
            pos = i;
            break;
        }
    }
    classNames.splice(i, 1);
    var newClassName = classNames.join(" ");
    setClassName(element, newClassName);

}
//removeClassName(returnTodayButton,"name");

//解决IE8之类不支持getElementsByClassName
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = getClassName(child).split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}
//console.log(document.getElementsByClassName("name"));


var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detach) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
}