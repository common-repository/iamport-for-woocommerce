jQuery.fn.serializeObject=function(){var r,e=null;try{this[0].tagName&&"FORM"==this[0].tagName.toUpperCase()&&(r=this.serializeArray())&&(e={},jQuery.each(r,function(){e[this.name]=this.value}))}catch(r){alert(r.message)}return e},jQuery(function(u){var c=["iamport_subscription","iamport_foreign"],r=function(){for(var r=[],e=c.length,t=0;t<e;t++)r.push("checkout_place_order_"+c[t]);return r}();function p(r,e){"true"===e.reload?window.location.reload():(u(".iamport-error-wrap").remove(),r.prepend('<div class="iamport-error-wrap">'+e.messages+"</div>"),r.removeClass("processing").unblock(),r.find(".input-text, select").blur(),u("html, body").animate({scrollTop:r.offset().top-100},1e3),"true"===e.refresh&&u("body").trigger("update_checkout"),u("body").trigger("checkout_error"))}function d(r){return'<ul class="woocommerce-error">\n\t\t\t<li>'+r+"</li>\n\t</ul>\n"}function s(r,e,t){var i=[];if(jQuery.each(t.find(".iamport-card-form.iamport-required"),function(r,e){i.push(jQuery(e).attr("name"))}),"iamport_subscription"!=r)return"iamport_foreign"==r&&e["iamport_foreign-card-number"]&&e["iamport_foreign-card-expiry"]&&e["iamport_foreign-card-cvc"];for(var o=!1,a=0;a<i.length;a++)o=(0==a||o)&&!!e[i[a]];return o}function m(r,e){var t,i,o,a,n,c,p,d;"iamport_subscription"==r?(o=(i=u("#iamport-subscription-card-holder")).data("module"),a=i.data("exponent"),(n=new RSAKey).setPublic(o,a),c=n.encrypt(e["iamport_subscription-card-number"]||""),p=n.encrypt(e["iamport_subscription-card-expiry"]||""),d=n.encrypt(e["iamport_subscription-card-birth"]||""),t=n.encrypt(e["iamport_subscription-card-pwd"]||""),e["enc_iamport_subscription-card-number"]=c,e["enc_iamport_subscription-card-expiry"]=p,e["enc_iamport_subscription-card-birth"]=d,e["enc_iamport_subscription-card-pwd"]=t,delete e["iamport_subscription-card-number"],delete e["iamport_subscription-card-expiry"],delete e["iamport_subscription-card-birth"],delete e["iamport_subscription-card-pwd"]):"iamport_foreign"==r&&(o=(i=u("#iamport-foreign-card-holder")).data("module"),a=i.data("exponent"),(n=new RSAKey).setPublic(o,a),c=n.encrypt(e["iamport_foreign-card-number"]),p=n.encrypt(e["iamport_foreign-card-expiry"]),d=n.encrypt(e["iamport_foreign-card-cvc"]),e["enc_iamport_foreign-card-number"]=c,e["enc_iamport_foreign-card-expiry"]=p,e["enc_iamport_foreign-card-cvc"]=d,delete e["iamport_foreign-card-number"],delete e["iamport_foreign-card-expiry"],delete e["iamport_foreign-card-cvc"])}function l(r){r=r.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");r=new RegExp("[\\?&]"+r+"=([^&#]*)").exec(location.search);return null===r?"":decodeURIComponent(r[1].replace(/\+/g," "))}u('form[name="checkout"]:not(#order_review)').on(r.join(" "),function(){var e=u(this),r=e.find('input[name="payment_method"]:checked').val(),t=e.serializeObject();return s(r,t,e)?(m(r,t),e.addClass("processing"),1!==e.data()["blockUI.isBlocked"]&&e.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),u.ajax({type:"POST",url:wc_checkout_params.checkout_url,data:jQuery.param(t),dataType:"json",dataFilter:function(r){var e=r.match(/{(.*)}/);return e?e[0]:r},success:function(r){try{if("success"!==r.result)throw r.result,r;-1===r.redirect.indexOf("https://")||-1===r.redirect.indexOf("http://")?window.location=r.redirect:window.location=decodeURI(r.redirect)}catch(r){p(e,r)}},error:function(r,e,t){alert(t),window.location.reload()}})):p(e,{result:"failure",messages:d("카드정보를 입력해주세요."),refresh:!1,reload:!1}),!1}),u("form#order_review").on("submit",function(r){var e=u(this),t=u("#order_review input[name=payment_method]:checked").val();if(!function(r){for(var e=c.length-1;0<=e;e--)if(r===c[e])return 1}(t))return!0;r.preventDefault(),r.stopImmediatePropagation();var i,o,a,n,r=e.serializeObject();return s(t,r,e)?(m(t,r),u.ajax({type:"POST",url:(t=wc_checkout_params.checkout_url,o=l("change_payment_method"),a=l("key"),n=l("pay_for_order"),o&&a&&(i=-1<t.indexOf("?")?"&":"?",t+=i+"key="+a+"&change_payment_method="+o+"&pay_for_order="+n),t),data:jQuery.param(r),dataType:"json",dataFilter:function(r){var e=r.match(/{(.*)}/);return e?e[0]:r},success:function(r){try{if("success"!==r.result)throw r.result,r;-1===r.redirect.indexOf("https://")||-1===r.redirect.indexOf("http://")?window.location=r.redirect:window.location=decodeURI(r.redirect)}catch(r){p(e,r)}},error:function(r,e,t){alert(t),window.location.reload()}})):p(e,{result:"failure",messages:d("카드정보를 입력해주세요."),refresh:!1,reload:!1}),!1})});