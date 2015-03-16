// Plot points:
// Trying to stay overnight.
// Reveal - hippie parents, reading poetry, ...(?)
// Threats -- date your tutor, changing school(?)
// He's distracting you. Movie & Hippies.
// Oh my god, you've been reading my texts!...

function Start_Dinner_3(){

	n("Anya.");

	Choose({
		"Épp emiatt tanulok többet Jackkel.": Tutor,
		"Figyelj, én próbálkozok, de tényleg.": Tutor,
		"A jegyeimmel nincs semmi gond.": Tutor
	});

}

function Tutor(message){

	n(message);
	m("Aggódom érted. Jack egyáltalán nincs rád jó hatással.");

	if($.hippies){
		m("Egyébként is azt hiszem a szülei drogfüggők...");
		n("Miből gondo--");
	}else if($.im_a_poet){
		m("Mást sem csinál, csak verseket ír.");
		n("Miből gondo--");
	}
	
	m("Felfogadok melléd egy segédtanárt.");
	n("...egy mit?");

	if($.studying_subject!=$.studying_subject_2){
		m("Segíteni fog felkészülni "+$.studying_subject+"ból és "+$.studying_subject_2+"ból.");
	}else{
		m("Segíteni fog felkészülni "+$.studying_subject+"ból.");
	}

	m("Clairenek hívják. Okos, csinos és fehér. Ráadásul egyidős veled.");

	Choose({
		"Azt akarod, hogy Jack és én többet ne találkozzunk?": Tutor_Seeing,
		"Összeakarsz vele hozni?": Tutor_Matchmake,
		"Nem beszélhetnénk inkább máskor tanárokról?": Tutor_Forget
	});

}

function Tutor_Seeing(message){
	n(message);
	m("Ne haragudj, hogy mi? <i>Találkozni</i> Jackkel?");
	m("Óvatosan fogalmazz, nehogy úgy értsék, mintha...");
	
	Choose({
		"Mintha járnánk? Pedig igen. Járunk.": function(message){
			n(message);
			m(". . .");
			n(". . .");
			n("Hahó?");
			m(". . .");
			n("Öhm, anya... Itt vagy?");
			m(". . .");
			Threat_School();
		},
		"Úgy értem, csak simán találkozni vele.": function(message){
			n(message);
			m("Rendben. Tisztázzunk néhány dolgot.");
			n("Oké.");
			m(". . .");
			m("Claire nagyon aranyos lány.");
			n("Tényleg az.");
			m("És jó mellei vannak..");
			Threat_Tutor();
		},
		"Mi. Nem. Járunk.": function(message){
			n(message);
			m(". . .");
			m("Jól van.");
			m("Sosem állítottam, hogy jártok, de oké.");
			n("Barátok vagyunk.");

			if($.relationship=="friend"){
				m("\"Jó barátok\"...");
			}
			if($.relationship=="best friend"){
				m("\"LEGJOBB barátok\"...");
			}

			Threat_Tutor();

		}
	});
}

function Tutor_Matchmake(message){
	n(message);
	m("Hát, ha ezt akarod, rendben!");
	n("Jesszus, dehogy!.");
	m("Ne légy szégyenlős! Hamarosan érett férfi leszel!.");
	m("És sok unokával ajándékozol majd meg minket.");

	Choose({
		"Állj már le! Még nem is találkoztam Claire-rel!": function(message){
			n(message);
			m("...még!");
			m("De holnap átjön!");
			n("Mi van? De megígértem Jacknek, hogy--");
			m("Kivasaltam a legjobb ruháidat. Remek első benyomást fogsz kelteni.");
			Threat_Tutor();
		},
		"50 százalék az esélye, mivel bi vagyok.": function(message){

			$.admit_bisexuality = true;

			n(message);
			m("Öhm... Bi?");

			Show("nicky","dinner_nicky_defiant");

			n("Így van. Bi, mint BISZEXUÁLIS.");
			n("Tehát férfiakhoz és nőkhöz egyaránt vonzódok szexuálisan.");
			m(". . .");
			n(". . .");
			Threat_School();
		},
		"Nem. Soha nem akarok gyereket.": function(message){
			n(message);
			m("Ha majd felnősz, máshogy fogod gondolni.");
			m("Felnevelni egy gyereket csodálatos! Fel fognak nézni rád!");
			n("...hát hogyne, te egomán.");
			m("Hogy mit mondtál?");
			n("Semmit.");
			m(". . .");
			Threat_Tutor();
		}
	});
}

function Tutor_Forget(message){
	n(message);
	m("Nem, mert már megbeszéltem Claire-rel a holnapot.");
	n("Mi van?!");
	n("Ne csináld, megígértem Jacknek, hogy holnap együtt tanulunk.");
	m(". . .");
	m("Meddig szándékozol nála maradni?");

	Choose({
		"Ott aludnék.": function(message){
			n(message);
			m(". . .");
			n(". . .");
			n("Mi az?");
			n("Nincs ebben semmi különös, a barátok állandóan ezt csinálják.");
			m(". . .");
			Threat_School();
		},
		"Csak délutánig.": function(message){
			n(message);
			if($.lying_about_hanging_out){
				m("Tudtam. Már korábban is tudtam, hogy nem mondasz igazat.");
				n("Mi?");
			}else{
				m("Tudtam.");
			}
			m("Nem tanulnátok semmit, csak hülyéskednétek.");
			Threat_Tutor();
		},
		"Talán egy órát, vagy kicsit többet.": function(message){
			n(message);
			m("Annyi idő alatt nem lehet rendesen tanulni.");
			if($.lying_about_hanging_out){
				m("Tudtam. Már korábban is tudtam, hogy nem mondasz igazat.");
				n("Mi?");
			}
			m("Nem tanulnátok semmit, csak hülyéskednétek.");
			Threat_Tutor();
		}
	});
}

function Threat_Tutor(){
	
	Show("nicky","dinner_nicky_defiant");
	
	n(". . .");
	m("Holnaptól fogva Claire-rel fogsz tanulni minden egyes nap iskola után.");

	Choose({
		"Minden nap?! Mi lesz a barátaimmal?!":function(message){
			n(message);
			m("Drágám, én vagyok az egyetlen barátod!");
			n(". . .");
			m("És Claire is lehet a barátod. Talán még több is.");
			n(". . .");
			n("Végeztünk?");
			m("Csak még valami.");
			Plot_Twist();
		},
		"Jó, de a hétvégéim ugye szabadok?": function(message){
			n(message);
			m("Igen.");
			n("Oké, akkor ezt megbeszéltük.");
			m("Igen.");
			n(". . .");
			m("Csak még valami.");
			Plot_Twist();
		},
		"Mi lenne, ha egyszerűen csak nem tanulnék Claire-rel?": function(message){
			n(message);
			m("Hát, ha szeretnél vele azon kívül is találkozni, azzal sincs probléma.");
			m("Bármi mehet felőlem, amitől férfiasabb leszel.");
			n("Ez... Ehh, hihetetlen vagy...");
			m("...");
			m("Még valami...");
			Plot_Twist();
		}
	});

}

function Threat_School(){

	$.changing_schools = true;
	
	m("Iskolát fogsz váltani.");

	Show("nicky","dinner_nicky_outrage");

	n("MI VAN?!");
	m("Azt hiszem nem csak Jack, de ez az egész iskola rossz hatással van rád.");
	n("EZ MOST KOMOLY?");
	m("Ez az egész kanadai légkör torzítja az önképedet.");

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Szerintem meg a te ázsiai kulturád van kicsit fejjel lefelé!": function(message){
			n(message);
			m("Ne légy illetlen!");
			m("Ez ugyanúgy a te kulturád is!!");
			n(". . .");
			Plot_Twist();
		},
		"Nem tehetsz a saját gyerekeddel ilyesmit!": function(message){
			n(message);
			m("Ne légy szemtelen!!");
			m("Anyádként jogom van bármit megtenni veled!");
			n(". . .");
			Plot_Twist();
		},
		"Tökmindegy, mindegyik suliban vannak furcsa emberek.": function(message){
			n(message);
			m("Ne légy udvariatlan!");
			m("Egyébként akár meg is gondolhatom magam és taníthatlak téged ÉN is, itthon.");
			n(". . .");
			Plot_Twist();
		}
	});

}

function Plot_Twist(){

	m("Tegnap, mikor elvileg tanulni voltál Jacknél...");
	m("...tudom, hogy valójában ellógtatok a moziba.");

	Show("nicky","dinner_nicky_sit");
	n(". . .");

	Show("clock_time","clock_1920");

	Choose({
		"Jézusom. Elolvastad az üzeneteimet.": function(message){
			n(message);
			m("Így van. Látod milyen okos is tudsz lenni, ha éppen nem Jackkel vagy?");
			Plot_Twist_2();
		},
		"Nem lógtunk ki, tanultunk.": function(message){
			n(message);
			m("Nagyon makacsul ragaszkodsz a hazugságaidhoz.");
			m("Elolvastam az üzeneteidet.");
			Plot_Twist_2();
		},
		"Honnan veszed?": function(message){
			n(message);
			m("Elolvastam az üzeneteidet.");
			Plot_Twist_2();
		}
	});

}

function Plot_Twist_2(){

	n(". . .");
	m("Vacsora előtt a szobádban voltam.");

	// Dinner_1
	m("Azt kiabáltad, hogy '"+$.what_you_called_out+"' a földszintről, mikor épp a kezemben volt a telefonod...");
	m("És elolvastam, hogy miket írogattatok egymásnak Jackkel.");
	m("Az anyád vagyok, jogom van ehhez.");

	n(". . .");

	if($.im_a_poet){
		m("Furcsa költészet, mi?");
	}
	if($.hippies){
		m("Miért beszélgettetek a füvezésről?");
	}
	if($.im_a_poet || $.hippies){
		m("Hogy van képe segíteni neked hazudni a saját anyádnak?");
		m("Mi mást csináltál még a hátam mögött?");
	}

	Choose({
		"Ez csak egy rossz álom.": function(message){
			n(message);
			m("Mint az az álmos film?");
			n("Az az Eredet, anya.");
			m("Ne beszélj vissza.");
			Plot_Twist_3();
		},
		"Nagyon sajnálom.": function(message){
			n(message);
			m("Megbocsátok.");
			m("Te vagy az egyetlen gyermekem, persze, hogy megbocsátok.");
			Plot_Twist_3();
		},
		"Gyűlöllek.": function(message){
			n(message);
			m("Rendben.");
			m("Én így is szeretlek, Nick.");
			Plot_Twist_3();
		},
	});

}

function Plot_Twist_3(){
	Start_Dinner_4();
}
