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
			n("...ja.");
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

	n("Ó. Hmm... tanulok.")
	n("Ja, holnap tanulni fogok.");
	m("Milyen tárgyat?");
	n("Öhmm...");

	Choose({
		"Kémiát.": function(message){
			$.studying_subject = "Chemistry";
			Start_Dinner_2_2(message);
		},
		"Matekot.": function(message){
			$.studying_subject = "Calculus";
			Start_Dinner_2_2(message);
		},
		"Számtech-et.": function(message){
			$.studying_subject = "Computer Science";
			Start_Dinner_2_2(message);
		}
	});

}

function Start_Dinner_2_2(message){

	n(message);
	m("Remek.");
	m("Már nagyon-nagyon ideje lenne jobb "+$.studying_subject+" jegyeket szerezned.");
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
			n("Öhm, nos...--");
			m("Szóval ti csak szórakoztok tanulás helyett.");
			n("Mi igenis tanulunk!");
			m(". . .");
			m("Rendben, csak ne hazudj nekem.");
			n("Nem hazudok.");
			Buddy_1_point_5();
		},
		"Hát igen, mivel jó haverom.": function(message){
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
			m("Ahogy te is gyanítod");
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

					m("But yes, even you agree that it's bad to be seen as 'not natural'.");
					n("I never said--");
					m("And I'm just looking out for you! Because he acts like, you know...");
					m("A gay!");
					Buddy_Choice();

				});
			}else{

				n(message);
				m("Én csak próbálok őszinte lenni.");
				m("But yes, even you agree that it's bad to be seen as 'not natural'.");
				n("I never said--");
				m("And I'm just looking out for you! Because he acts like, you know...");
				m("A gay!");
				Buddy_Choice();

			}

		},
		"What do you mean, he's not natural?": Buddy_3
	});
}

function Buddy_Choice(){
	if($.relationship=="friend"){
		m("And since you say he's a 'good pal'...");
		m("People might think you're a gay like him, too.");
	}
	if($.relationship=="best friend"){
		m("And since you say he's your BEST friend...");
		m("People might think you're a gay like him, too.");
	}
	Choose({
		"Ha, he sure acts gay. Luckily, he's not.": function(message){
			n(message);
			m("See? You also think there's something not right about it.");
			n("...sure.");
			Buddy_Aftermath();
		},
		"What's wrong with being gay?!": function(message){
			n(message);
			m("Nothing! Nothing.");
			Buddy_Aftermath();
		},
		"Maybe... my friend might be gay.": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("Okay.");
					m("Just don't lie to me.");
					n("I won't.");
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

	m("Don't get me wrong.");
	m("I'm not saying those kind of people are bad!");
	m("I just think... you should be careful around one of them.");
	m("Jack might, you know, try to recruit you.");

	Show("clock_time","clock_1910");
	Show("nicky","dinner_nicky_defiant");

	Choose({
		"what.": Buddy_Aftermath_2,
		"whaaat.": Buddy_Aftermath_2,
		"whaaaaaaaaaaaaaaat.": Buddy_Aftermath_2
	});
}

function Buddy_Aftermath_2(message){
	
	n(message);

	n("How do you even...");
	n("Ugh, nevermind.");
	m("Nick, I'm sorry you find me annoying.");
	n("No, mom, stop doing th--");
	m("Let's go back to talking about your grades.");
	m("Now, what did you say you were studying tomorrow?");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	n("Errrmmmmm...");

	Choose({
		"Compsci?": function(message){
			$.studying_subject_2 = "Computer Science";
			Grades_Start(message);
		},
		"Chemistry?": function(message){
			$.studying_subject_2 = "Chemistry";
			Grades_Start(message);
		},
		"Calculus?": function(message){
			$.studying_subject_2 = "Calculus";
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
	m("You first told me it was "+$.studying_subject+".");
	m("Now you tell me it's "+$.studying_subject_2+"?");
	$.lying_about_studying = true;
	n("Mom, I was just confus--");
	if($.lying_about_hanging_out || $.lying_about_relationship){
		m("This is TWICE you've lied to me during this dinner.");
		n("I didn't lie about--");
	}
	m("Either way, your grades in both subjects are terrible.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2(){
	m("You hesitated for a moment there.");
	n("I was eating.");
	m("Okay.");
	if($.lying_about_hanging_out){
		m("I wonder if you're studying with Jack at all, or just always hanging out.");
		n("We study.");
	}
	m(". . .");
	m("Still, your grades in your "+$.studying_subject_2+" class are terrible.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Explaining(){
	Start_Dinner_3();
}
