$(document).ready(function(){
	Parse.initialize("KQ46uP4jeqQx4fI5WpukTp1LzwJcDSXoBrtGCr5S","6zAdel7CoK4UAUEDaQJ1p8dJtrbRGPXFiZWGx0KU");
	var idParameter = getUrlParameters("id", "", true);
	
	
	var jContacto = Parse.Object.extend("Contacto");
	var query = new Parse.Query(jContacto);
	var file;

	query.get(idParameter, {
			success: function(contacto) {
				var relation = contacto.relation("Categoria");
				relation.query().find({
					success: function(list){
						var p = "";
						p += '<li class="list-group-item">'
						p += 	'<div class="col-xs-12 col-sm-3">'
						p +=		'<img src="' + contacto.get("Photo").url() + '" alt="Scott Stevens" class="img-responsive img-circle" />'
						p +=	'</div>'
						
						p +=	'<div class="col-xs-12 col-sm-9">' 
						p +=		'<span class="name">'+ contacto.get("Nombre") + '</span><br/>'
						p +=		'<span class="glyphicon glyphicon-earphone text-muted c-info" data-toggle="tooltip" title="'+ contacto.get("Telefono") + '"></span>'
						p +=		'<span class="visible-xs"> <span class="text-muted">' + contacto.get("Telefono") + '</span><br/></span>'
						p +=		'<span class="glyphicon glyphicon-envelope text-muted c-info" data-toggle="tooltip" title="'+ contacto.get("Correo") + '"></span>'
						p +=		'<span class="visible-xs"> <span class="text-muted">'+ contacto.get("Correo") + '</span><br/></span>'
						for ( var i = 0; i < list.length; i++ ) {
							var item = list[i];
							p +=	'<span class="glyphicon glyphicon-tag text-muted c-info" data-toggle="tooltip" title="'+ item.get("Nombre") + '"></span>'
							p +=	'<span class="visible-xs"> <span class="text-muted">'+ item.get("Nombre") + '</span><br/></span>'
						}
						p +=	'</div>'
						p +=	'<div class="clearfix"></div>'
						p +='</li>'
						$("#details-list").html(p);

					}
				});
			}
		});
	});
	
	function getUrlParameters(parameter, staticURL, decode){
   /*
    Function: getUrlParameters
    Description: Get the value of URL parameters either from 
                 current URL or static URL
    Author: Tirumal
    URL: www.code-tricks.com
   */
   var currLocation = (staticURL.length)? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
   }
   
   if(!returnBool) return false;  
}