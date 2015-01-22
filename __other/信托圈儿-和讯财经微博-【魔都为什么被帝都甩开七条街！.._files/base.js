/* ��ѶJavaScript���
 * ���԰�  
 *
 *--------------------------------------------------------------------------*/
var HX = {
	//�汾��
	Version:'1.0',
	//���������
	Browser: {
	  IE:!!(window.attachEvent && !window.opera && window.ActiveXObject),
	 // IE6:!!(HX.Browser.IE && navigator.userAgent.toLowerCase().match(/msie([\d.]+)/)[1] == '6.0'),
	  FireFox:!!(document.getBoxObjectFor),
	  Chrome:!!(window.MessageEvent && !document.getBoxObjectFor),
	  Opera:!!(window.opera),
	  Safari:!!(window.openDatabase)
	  }
	};

/**
 *Object�����չ
 *@destination:��չ��
 *@source:��չ����
*/
Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};
Object.extend(Object,{
//1.�Ƿ�Ϊ�ڵ�Ԫ��
isElement:function(object){
 return object && object.nodeType == 1; 
 },
//2.�Ƿ�Ϊ����
isArray:function(object) {
 return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
 },
//3.�Ƿ�ΪHASH
isHash: function(object) {
 return object instanceof Hash;
 },
//4.�Ƿ�Ϊ����
isFunction: function(object) {
 return typeof object == "function";
 },
//5.�Ƿ�Ϊ�ַ���
isString:function(object) {
 return typeof object == "string";
 },
//6.�Ƿ�Ϊ����
isNumber: function(object) {
 return typeof object == "number";
 },
//7.�Ƿ�δ����
isUndefined: function(object) {
 return typeof object == "undefined";
 },
//8.���ض�����е���������ֵ����
values:function(object) {
 var values = [];
 for (var property in object) {
  values.push(object[property]);
  }
  return values;
 },
//9.���ض�����е��������Ƽ���
keys:function(object) {
 var keys = [];
 for(var property in object) {
  keys.push(property);
  }
  return keys;
 },
//10.��������
other:function(object) {}
});

/**
*ȡ����ļ�
*/
var E = function(id) {
	var el;
	if (Object.isString(id)) el = document.getElementById(id);
	else el = id;
	if(el) return el;
	};

/**
*Element�������չ
*/
var Element = {
	//�Ƿ�ΪCSS
	isCss:function(ele,c) {
	var classes = E(ele).className;
    if(!classes) return false;
    if(classes == c) return true;
		},
	//CSS���
	addCss:function(ele,c) {
	if(Element.isCss(ele,c)) return ;
    if(E(ele).className) c = " " + c;
    ele.className +=c;	
		},
	//CSSɾ��
	removeCss:function(ele,c) {
	E(ele).className = E(ele).className.replace(new RegExp("\\b"+c+"\\b\\s*","g"),"");
		},
	//�ж�����
	visible: function(ele) {
    return E(ele).style.display != 'none';
        },
	//��������
    toggle: function(ele) {
    ele = E(ele);
    Element[Element.visible(ele) ? 'hide' : 'show'](ele);
    return ele;
        },
	//����
    hide: function(ele) {
    ele = E(ele);
    ele.style.display = 'none';
    return ele;
        },
	//��ʾ
    show: function(ele) {
        ele = E(ele);
        ele.style.display = '';
        return ele;
        },
	//DOMԪ��ɾ��
	remove:function(ele) {
		ele = E(ele);
		ele.parentNode.removeChild(ele);
		return ele;
		},
	//DOMԪ�ش���
	create:function(tag_name,parent,parameters){
		var ele;
		ele = document.createElement(tag_name);
		parent = parent?parent:document.body;
		parent.appendChild(ele);
		if(parameters) {
			
			}
		return ele;
		},
	//ȥ���հ׽ڵ�
	cleanWhitespace: function(ele) {
        element = E(ele);
        var node = element.firstChild;
        while (node) {
        var nextNode = node.nextSibling;
        if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
        node = nextNode;
        }
        return element;
        }
	};

/**
*Event����
*/
var Event = {
	//�¼�ע��
	addEvent:function(ele,name,fun) {
	  if(document.attachEvent) return ele.attachEvent("on"+name,fun);
	   if(document.addEventListener) return ele.addEventListener(name,fun,false);
	  },
	//�¼�ע��
	removeEvent:function(ele,name,fun) {
	  if(document.detachEvent) return ele.detachEvent("on"+name,fun);
	   if(document.removeEventListener) return ele.removeEventListener(name,fun,false);
	  },
	//��ֹð���¼�
	cancleEventUp:function(e){
	  var e = e?e:event;
      if(document.all) window.event.cancelBubble=true;   
      else e.stopPropagation();  
	  }
	};

/**
*animation����
*/
var animation = {
	timer:"",
	//��չ
	downBig:function(ele,vate,height){
		E(ele).style.height = "0px";
		E(ele).style.display = "";
		animation.timer = setInterval(dobig,vate);
		function dobig() {
			var h = parseInt(E(ele).style.height);
			if(h<height) E(ele).style.height = h+1+"px";
			else {
				E(ele).style.height = height+"px";
				clearInterval(animation.timer);
				}
			}
		},
	//����
	upSmall:function(ele,vate,height){
		E(ele).style.height = height+"px";
		E(ele).style.display = "";
		animation.timer = setInterval(dosmall,vate);
		function dosmall() {
			var h = parseInt(E(ele).style.height);
			if(h>0) E(ele).style.height = h-1+"px";
			else {
				E(ele).style.height = "0px";
				clearInterval(animation.timer);
				E(ele).style.display = "none";
				}
			}		
		}
	};
	
/**
 *Ajax����
 */
var Ajax = {
	
	};
	
/**
 *Form����
 */
var Form = {
	
	};
	
/**
 *Window����
 */
var Window = {
   
    };