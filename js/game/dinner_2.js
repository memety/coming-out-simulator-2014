// PLOT POINTS:
// 1) Studying at Jack's
// 2) Suspecting Jack is gay
// 3) Trying to get you a private tutor (threatening your relationship)

function Start_Dinner_2(){

	m("Szia drága.");
	Show("mom","mom_sit");

	switch($.waiting_action){
		case "eat":
			m("Ó, nélkülem kezdtél enni... Nagyon türelmetlen vagy.");
			n("...öhhm, ja. Bocsi.");
			break;
		case "wait":
			m("Elkezdhetted volna nélkülem is. Nem kellett volna megvárnod, hogy kihűljön.");
			n("...valóban.");
			break;
		case "play":
			m("Tudod, nagyon éretlen dolog, hogy az étellel játszol.");
			n("Persze, persze..");
			break;
	}

	m("Apád késik. Egy órával később fog csatlakozni a vacsorához.");

	Choose({
		"Rendben. Akkor együnk.": function(message){
			n(message);
			n("*nom nom nom*");
			m(". . .");
			m("Mik a terveid holnapra?");
			Start_Dinner_2_1();
		},
		"Van valami, amit mindkettőtöknek el kell mondanom.": function(message){
			n(message);
			m("Rendben. Mondd el nekünk, ha ő is hazaért.");
			n("Oh. Oké.");
			m(". . .");
			n("*nom nom nom*");
			m("Szóval, mik a terveid holnapra?");
			Start_Dinner_2_1();
		},
		"Van valami, amit neked kell elmondanom először.": function(message){
			n(message);
			m("Várj Nick, még nem is kérdeztelek a napodról!");
			n("Jó napom volt.");
			m("Az jó. És mik a terveid holnapra?");
			Start_Dinner_2_1();
		}
	});

}

function Start_Dinner_2_1(){

	n("Öhm, izé... tanulok?")
	n("Ja, holnap tanulni fogok.");
	m("Milyen tárgyat?");
	n("Öhmm...");

	Choose({
		"Kémiát.": function(message){
			$.studying_subject = "kémiá";
			Start_Dinner_2_2(message);
		},
		"Matekot.": function(message){
			$.studying_subject = "matematiká";
			Start_Dinner_2_2(message);
		},
		"Számtech-et.": function(message){
			$.studying_subject = "számítástechniká";
			Start_Dinner_2_2(message);
		}
	});

}

function Start_Dinner_2_2(message){

	n(message);
	m("Remek.");
	m("Már nagyon-nagyon ideje lenne "+$.studying_subject+"ból jobb jegyeket szerezned.");
	n(". . .");
	m("Szóval, holnap a könyvtárban leszek.");
	m("Látlak majd ott tanulni?");
	n("Igazából Jack-hez megyek át tanulni.");
	m("Megint?");
	m("Túl sok időt töltesz vele.");

	Choose({
		"Mi csak együtt tanulunk, ennyi.": function(message){
			$.relationship = "study";
			Buddy_1(message);
		},
		"Anya, Jack... szóval ő több, mint egy barát.": function(message){
			
			$.relationship = "best friend";
			n(message);
			
			$.lying_about_hanging_out = true;
			m("Ó, mint egy legjobb barát?");
			n("Öhm, nos...");
			m("Szóval ti csak szórakoztok tanulás helyett.");
			n("Mi igenis tanulunk!");
			m(". . .");
			m("Rendben, csak ne hazudj nekem.");
			n("Nem hazudok.");
			Buddy_1_point_5();
		},
		"Hát igen, mivel jó barátom.": function(message){
			$.relationship = "friend";
			Buddy_1(message);
		}
	});

}


///////////////////////////////////////
////// 2) SUSPECTING Jack IS GAY ///////
///////////////////////////////////////


function Buddy_1(message){
	n(message);

	if($.relationship!="study"){
		$.lying_about_hanging_out = true;
		m("Ó, szóval ti csak szórakoztok tanulás helyett.");
		n("Mi igenis tanulunk!");
		m(". . .");
		m("Rendben, csak ne hazudj nekem.");
		n("Nem hazudok.");
	}else{
		m("Oké. Csak meg akartam győződni róla.");
		n("Miről?");
	}

	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message,callback){
	n(message);
	m("Várj...");
	m("Mintha azt mondtad volna, hogy csak együtt tanultok.");
	m("Nem mondtad, hogy barátok vagytok.");
	$.lying_about_relationship = true;
	Choose({
		"Izé, hát úgy értettem, hogy csak tanulótársak vagyunk.": callback,
		"Hát lehet, hogy barátok leszünk...": callback,
		"Nem, mindig is azt mondtam, hogy barátok vagyunk.": callback
	});
}

function Buddy_1_point_5(){

	m("Csak...ne lógj vele olyan sokat.");
	m("Az emberek még a végén rosszat fognak feltételezni.");

	Choose({
		"Ó. Nem, mi tényleg csak barátok vagyunk.": function(message){
			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,Buddy_2);
			}else{
				Buddy_2(message);
			}
		},
		"Lehet, hogy valójában jót feltételeznének.": Buddy_4,
		"Hogy érted azt, hogy... rosszat?": Buddy_3
	});

}

function Buddy_2(message){
	n(message);
	m("Oké.");
	if($.lying_about_relationship){
		m("Csak ne hazudj nekem.");
		n("Nem hazudtam.");
		m(". . .");
		m("De... mégis folyton Jack-kel lógsz.");
	}
	m("Csak azért, mert néhányan esetleg feltételezhetnek bizonyos dolgokat, mivel...");
	m("Tudod... olyan, mintha..");
	m("Mintha meleg lenne.");
	Buddy_Choice();
}

function Buddy_3(message){
	n(message);
	m("Csak így köztünk szólva, azt hiszem, ő olyan... na, tudod...");
	n("Nem, mi?");
	m("Meleg!");
	m("Úgy beszél és úgy néz ki, mint egy meleg.");
	Buddy_Choice();
}

function Buddy_4(message){
	n(message);
	m("Ó, ez ilyen zen-dolog, ugye?");
	n("Öhm..");
	m("A zen a természetről szól és a te osztálytársad, Jack, ő...");
	m("...tudod, természetellenesnek tűnik.");
	Choose({
		"Azt hiszed, meleg.": function(message){
			n(message);
			m("Azt!");
			m("Ahogy te is gyanítod.");
			Buddy_Choice();
		},
		"Ne mondd ezt a barátomról!!": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){

					n(message);
					m("Oké.");
					m("Csak ne hazudj nekem.");
					n("Nem hazudtam.");
					m(". . .");

					m("Viszont azt te is elfogadod, hogy rossz dolog, ha valaki ilyen természetellenesnek tűnik.");
					n("Éé-én ezt soha nem mondtam...");
					m("Én csak próbállak megóvni téged ettől! Mert ő tudod, úgy viselkedik, mint, tudod...");
					m("Egy meleg!");
					Buddy_Choice();

				});
			}else{

				n(message);
				m("Én csak próbálok őszinte lenni.");
				m("Viszont azt te is elfogadod, hogy rossz dolog, ha valaki ilyen természetellenesnek tűnik.");
				n("Éé-én ezt soha nem mondtam...");
				m("Én csak próbállak megóvni téged ettől! Mert ő tudod, úgy viselkedik, mint, tudod...");
				m("Egy meleg!");
				Buddy_Choice();

			}

		},
		"Hogy érted azt, hogy természetellenes?": Buddy_3
	});
}

function Buddy_Choice(){
	if($.relationship=="friend"){
		m("És amikor azt mondod, hogy Jack jó barátod...");
		m("Az emberek esetleg azt feltételezik, hogy te is meleg vagy, akárcsak ő.");
	}
	if($.relationship=="best friend"){
		m("És amióta azt mondod, hogy ő a legjobb barátod...");
		m("Az emberek esetleg azt feltételezik, hogy te is meleg vagy, akárcsak ő.");
	}
	Choose({
		"Biztos vagyok benne, hogy csak megjátsza, mert szerencsére nem meleg.": function(message){
			n(message);
			m("Látod? Te is észrevetted, hogy valami nincs rendben vele.");
			n("...öhm, ja.");
			Buddy_Aftermath();
		},
		"Mi a baj azzal, ha valaki meleg?!": function(message){
			n(message);
			m("Semmi! Semmi.");
			Buddy_Aftermath();
		},
		"Lehet, hogy tényleg meleg.": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("Oké.");
					m("Csak ne hazudj nekem.");
					n("Nem teszem.");
					m(". . .");
					Buddy_Aftermath();
				});
			}else{
				n(message);
				Buddy_Aftermath();
			}
			
		}
	});
}


function Buddy_Aftermath(){

	m("Ne ítélj el.");
	m("Én nem mondtam, hogy ezek az emberek rosszak!");
	m("Én csak azt gondolom... hogy talán óvatosabbnak kellene lenned velük.");
	m("Jack talán, tudod, próbál 'megtéríteni' téged.");

	Show("clock_time","clock_1910");
	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Mi?": Buddy_Aftermath_2,
		"Mi van?!": Buddy_Aftermath_2,
		"Hogy miiiiii?": Buddy_Aftermath_2
	});
}

function Buddy_Aftermath_2(message){
	
	n(message);

	n("Hogy vagy képes...");
	n("Eh, mindegy.");
	m("Nick, sajnálom, ha felbosszantottalak.");
	n("Nem, anya, fejezd be ezt az...");
	m("Térjünk vissza a jegyeidhez.");
	m("Szóval, mit is mondtál, mit fogsz tanulni holnap?");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	n("Öhhhhhmmm...");

	Choose({
		"Számtech-et?": function(message){
			$.studying_subject_2 = "számítástechniká";
			Grades_Start(message);
		},
		"Kémiát?": function(message){
			$.studying_subject_2 = "kémiá";
			Grades_Start(message);
		},
		"Matekot?": function(message){
			$.studying_subject_2 = "matematiká";
			Grades_Start(message);
		}
	});

}


//////////////////////////////////////////
////// 3) A POSSIBLE PRIVATE TUTOR ///////
//////////////////////////////////////////

function Grades_Start(message){
	n(message);
	m(". . .");
	if($.studying_subject!=$.studying_subject_2){
		Grades_Start_1();
	}else{
		Grades_Start_2();
	}
}

function Grades_Start_1(){
	m("Először "+$.studying_subject+"t mondtál.");
	m("Most pedig "+$.studying_subject_2+"t.");
	$.lying_about_studying = true;
	n("Anya, csak összezavarodtam...");
	if($.lying_about_hanging_out || $.lying_about_relationship){
		m("Ez a MÁSODIK alkalom, hogy ma este hazudsz nekem!");
		n("De én nem akartam erről hazudni...");
	}
	m("Egyébként a jegyeid mindkét tantárgyból borzalmasak.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2(){
	m("Hezitáltál egy pillanatig.");
	n("Csak ettem.");
	m("Oké.");
	if($.lying_about_hanging_out){
		m("Én csak kíváncsi vagyok, hogy Jack-kel tényleg végig tanultok, vagy hülyeségekkel foglalkoztok.");
		n("Végig tanulunk.");
	}
	m(". . .");
	m("Ennek ellenére a jegyeid ugyanolyan borzalmasak, már ami a "+$.studying_subject_2+" illeti.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Explaining(){
	Start_Dinner_3();
}
