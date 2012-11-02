var actual = 0;


var amp_foto	= 1680;
var alt_foto	= 1050;
var relacio		= amp_foto/alt_foto;

jQuery("body").ready(function(){
	actual = primera;
	mostrar();
	jQuery(window).resize(canvi_mida);
	jQuery('.imatge').click(canvi_foto);
	jQuery('.none');
	
	jQuery('#info').click(saltar_info);
	jQuery('#info').hover(sobre, fora);
	
	jQuery('#nick').click(saltar_nick);
	jQuery('#nick').hover(sobre, fora);
	
	jQuery('#victor').click(saltar_victor);
	jQuery('#victor').hover(sobre, fora);
	
	jQuery('#jim').click(saltar_jim);
	jQuery('#jim').hover(sobre, fora);
	
	jQuery('#anne').click(saltar_anne);
	jQuery('#anne').hover(sobre, fora);
	
	jQuery('#oscar').click(saltar_oscar);
	jQuery('#oscar').hover(sobre, fora);
	
	jQuery('#napi').click(saltar_napi);
	jQuery('#napi').hover(sobre, fora);
	
	jQuery('#jun').click(saltar_jun);
	jQuery('#jun').hover(sobre, fora);
	
	jQuery('#taichi').click(saltar_taichi);
	jQuery('#taichi').hover(sobre, fora);
		/*if(actual==1){
			jQuery('#idioma').show();	
		}else{
			jQuery('#idioma').hide();
		}*/
});

function canvi_mida(){
	
	var ample_pantalla 	= jQuery(window).width();
	var alcada_pantalla	= jQuery(window).height();
	
	if(ample_pantalla/alcada_pantalla >relacio){
		//es poc alta
		ample_foto	= ample_pantalla;
		alcada_foto = ample_pantalla/relacio;	
	}else{
		//es poc ampla
		alcada_foto	= alcada_pantalla;
		ample_foto 	= alcada_pantalla * relacio;
	}
	
	var pos_x	= (ample_pantalla-ample_foto)/2;
	
	if(alcada_foto>=alcada_pantalla){
		var pos_y	= (alcada_pantalla-alcada_foto)/2;
	}else{
		var pos_y	= 0;	
	}
	
	jQuery('#foto'+actual).width(ample_foto);
	jQuery('#foto'+actual).height(alcada_foto);
	
	jQuery('#div'+actual).css({top: pos_y+"px", left: pos_x+"px"});
	
}

function mostrar(){
	canvi_mida();
	//jQuery('#div'+actual).fadeIn('slow');
	jQuery('#div'+actual).show();
}

function canvi_foto(){
	if(!esta_sobre){
		/*jQuery('#div'+actual).fadeOut('fast',function(){
			actual++;
			if(actual==8){ actual=1; }
			canvi_mida();
			jQuery('#div'+actual).fadeIn('slow');
		});*/
		jQuery('#div'+actual).hide();
		actual++;
		if(actual==8){ actual=1; }
		canvi_mida();
		jQuery('#div'+actual).show();
		
		/*if(actual==1){
			jQuery('#idioma').show();	
		}else{
			jQuery('#idioma').hide();
		}*/
	}
}

var esta_sobre=false;
function sobre(){
	esta_sobre=true;
}

function fora(){
	esta_sobre=false;
}

function canvi_idioma(idi){
	document.location.href='index.php?lang='+idi+'&pos='+actual;	
}