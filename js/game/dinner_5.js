// Dad's home!
// Calm conversation about going to the movies.
// Mother brings up tutoring and/or school. (if you try to bring anyting up, it'll skip to this.)
// Argue or agree?
// Everything in the past hour comes crashing back.
// You can attempt to blame them, too. (but they justify it all)
// Agree (calm dinner) --- Stressed Dinner, storms off --- Punches you in the damn face.

function Start_Dinner_5(){

	PlaySound("sfx","dinner_door");
	
	f("Szia Qiying! Szia Nick!");
	f("Hazaértem!");
	
	Show("dad","dad_serious");

	m("Szia drágám.");
	n("Mi újság apa, milyen volt a napod?");

	f("Túlóráztam. Remélhetőleg a főnök észreveszi még a teljesítményértékelés előtt.");
	f("De végig csak netes játékokat toltam. Höhö.");
	n("Haha.");

	f("Nick, a <i>te</i> netes játékaid miért nem ilyen jók?");

	Choose({
		"Én azt hittem, hogy jók...": function(message){
			n(message);
			f("Hát, ezek szerint nincs valami jó ízlésed. Höhö!");
			n(". . .");
			Casual();
		},
		"Mert az emberek ízlése különböző": function(message){
			n(message);
			f("Na igen. Ez igaz.");
			f("Ami rossz az rossz. Höhö!");
			n(". . .");
			Casual();
		},
		"Apa, ez MŰVÉSZET!": function(message){
			n(message);
			f("Pfff. Annak meg mi haszna?");
			f("Legközelebb meg már amatőr költő leszel, vagy mi?");
			n(". . .");
			Casual();
		}
	});

}

function Casual(){
	
	f("Hé Qi, mi az a szósz a tányérodon?");
	f("Fúj...");

	Show("clock_time","clock_1950");

	Choose({
		"Az ott hányás.": function(message){
			
			n(message);

			$.grounded = 2;
			f("Nick! Egy hét szobafogság!");
			f("Ne sértegesd anyád főztjét!");
			f("Így is épp elég büntetés az nekünk, hogy ilyen borzalmasan főz. Höhö!");

			Casual_2();

		},
		"Ne egyél belőle, öhm... nem lett valami túl jó.": function(message){
			
			n(message);

			$.grounded = 1;
			f("Nick! Egy nap szobafogság!");
			f("Mutass némi tiszteletet! És persze becsüld meg az ételt.");
			f("Mert ahogy anyád főz, olyan rosszul más úgysem fog soha! Höhö!");

			Casual_2();

		},
		"Miért nem kóstolod meg, apa?": function(message){
			
			n(message);

			$.grounded = 0;
			m("Nick...");
			f("Nem gond?");
			f("[eszik egy kanállal]");
			f(". . .");
			n(". . .");
			m(". . .");
			f("Hát, főztél már rosszabbat is. Höhö!");

			Casual_2();

		}
	});

}

function Casual_2(){
	
	m("Drágám...");
	f("Na fiam, mi újság a sulival?");

	Choose({
		"A sulival minden rendben van.": function(message){

			n(message);

			f("Igen? Minden?");
			if($.studying_subject!=$.studying_subject_2){
				f("Milyen jegyeket hoztál mostanában "+$.studying_subject+"ból és "+$.studying_subject_2+"ból?");
			}else{
				f("Milyen jegyeket hoztál mostanában "+$.studying_subject+"ból?");
			}

			m("Nick és én pont erről beszélgettünk, amikor hazajöttél.");
			Getting_A_Tutor();

		},
		"Hát például holnap pont egy barátomnál fogok tanulni.": function(message){
			n(message);

			$.tried_talking_about_it = true;

			if($.grounded>0){

				if($.grounded==1){
					f("Emlékeztetnélek, hogy pont az előbb kaptál egy nap szobafogságot.");
				}
				if($.grounded==2){
					f("Emlékeztetnélek, hogy pont az előbb kaptál egy hét szobafogságot.");
				}
				f("Szóval itthon leszel és ostoba maradsz anyád mellett! Höhöhö.");
				
				n("Öhm... Én...");

				$.grounded++;
				if($.grounded==2){
					f("Meggondoltam magam. Mostantól egy hétig leszel szobafogságban.");
				}
				if($.grounded==3){
					f("Meggondoltam magam. Mostantól KÉT hétig leszel szobafogságban.");
				}

			}

			m("Visszatérve a tanulásra...");
			Getting_A_Tutor();

		},
		"APA, BISZEXUÁLIS VAGYOKÉS JACKKEL KEFÉLEK!!!": function(message){
			$.tried_talking_about_it = true;

			Show("nicky","dinner_nicky_outrage");
			n("APA ÉN BI--");
			Show("nicky","dinner_nicky_sit");

			m("BICIKLIVEL fog járni minden nap az iskolába jövő héttől.");
			f("Ó, remek!");
			f("Szedned kell magadra némi izmot, különben hogy fogsz barátnőt szerezni?");
			f("Ezt a tunyaságot az anyádtól örökölted. Haha!");
			n("Ha-ha.");
			m("VISSZATÉRVE az iskolára...");
			Getting_A_Tutor();
		}

	});

}

function Getting_A_Tutor(){

	m("Arról beszélgettünk, hogy Nicknek esetleg szerezhetnénk valakit, aki korrepetálja.");
	f("A valaki alatt azt a dögös kis Claire-t érted, ugye?");

	// Oh dang!
	Show("nicky","dinner_nicky_defiant");

	switch($.promise_silence){
		case "yes":
			n("Anya, tudod, <i>megegyeztünk abban</i>, hogy nem beszélünk többet erről, mert...");
			if($.tried_talking_about_it){
				m("Igaz, tényleg nem hozom szóba többet és <i>neked sem kell</i>...");
			}
			break;
		case "no":
			n("Anya, megígérted, hogy nem beszélsz erről többet...");
			m("Kettőnk közül pont, hogy te vagy az, aki nem tartja be, amit mond!");
			break;
		case "tit for tat":
			n("Anya, azt mondtad, nem hozod ezt szóba többet, ha én sem hozom szóba, hogy...");
			if($.tried_talking_about_it){
				m("Nem is akarsz igazából semmit se szóba hozni.");
			}
			break;
	}

	f("Mit nem akartok szóba hozni?");
	f("Ebben a családban én vagyok főnök, ti ketten pedig titkoltok valamit előlem!");
	m("Ó.. hát tulajdonképpen csak arról van szó, hogy Nick nagyon-nagyon kedveli Claire-t.");

	Choose({
		"Mi van?! Nem, dehogy!": function(message){
			n(message);
			f("Jaj ne legyél ilyen kis szégyellős.");
			Getting_A_Tutor_2();
		},
		"Végre. Most már talán neked is kezd derengeni a dolog! Claire egyébként nekem is nagyon bejön!": function(message){
			n(message);
			Getting_A_Tutor_2();
		},
		"Már van pasim.": function(message){
			n(message);
			f("Így van fiam! Te leszel a pasija!");
			n("<i>Nekem van</i>. Nekem van pa--");
			Getting_A_Tutor_2();
		}
	});

}

function Getting_A_Tutor_2(){
	
	f("Nemsokára férfi leszel, fiam!");
	f("Ha annyi idős lennék mint te, dobnám anyádat és ráhajtanék Claire-re, ahogy te is! Haha!");

	n("Ez nagyon bizarr, apa.");
	f("Visszadumálsz? Lekeverek egyet, fiam!");

	if($.changing_schools){
		m("Arra gondoltunk, hogy Nicknek iskolát kellene váltani.");
		m("Mondjuk átiratkozhatna Claire iskolájába.");
	}
	if($.studying_subject!=$.studying_subject_2){
		m("És korrepetálhatná őt iskola után minden nap "+$.studying_subject+"ból and "+$.studying_subject_2+"ból.");
	}else{
		m("És korrepetálhatná őt iskola után minden nap "+$.studying_subject+"ból.");
	}

	f("Nick, te mit szólsz mindehhez?");
	m("Ó, Nick igazán egyeté-");
	f("Fogd be, Qui. A fiamat kérdeztem.");
	m(". . .");

	Show("dad","dad_threat");

	f("Mister Nicklaus Liow.");
	if($.changing_schools){
		f("Akarsz iskolát váltani, hogy aztán összejöjj a dögös korrepetálólánnyal?");
	}else{
		f("Akarsz minden iskola utáni órát a dögös korrepetálólánnyal tölteni?");
	}

	n("Ez bonyolult, én, szóval--");
	f("Nincs átmenet, vagy kompromisszumos megoldás.");
	f("Igen. Vagy. Nem.");

	n(". . .");

	Choose({
		"Igen.": Agree_With_Dad,
		"Nem.": Argue_With_Dad
	});

}

function Agree_With_Dad(){
	
	n("...Igen.");

	f("Hmm.");
	f("Ti ketten nagyon igyekeztekn eltitkolni valamit előlem!");
	f("Nagyon-nagyon igyekeztek, pedig ez a dolog szerintem kevesebb, mint egy órája történt és ti mégis próbáljátok előlem elrejteni.");
	m(". . .");
	n(". . .");

	f("Nick, valami nagy baromságot csináltál, ugye?");
	f("Mit csináltál?");

	Choose({
		"Elszúrtam a félévi jegyeimet.": function(message){
			
			n(message);

			f("...Óó.");
			f("Hát igen, miuszáj lesz feltornásznod őket.");

			Show("dad","dad_serious");

			f("Vagy különben te megrekedsz egy tanári állásnál, mint az anyád! Haha!");
			n(". . .");
			Agreeable_Ending();

		},
		"Lefeküdtem Jackkel.": function(message){
			
			n(message);
			
			Show("mom","mom_cry");
			m("[szipog]");
			f(". . .");
			Argument_Ending();

		},
		"Lefeküdtem Claire-rel.": function(message){
			
			n(message);
			
			m("...Nick!");
			f(". . .");
			f("Széééééééép!");
			m("...de drágám!");
			f("Várj csak, ugye nem azért volt ez annyira titkos, mert öhm.. teherbe ejtetted?");
			n("Dehogy. Nem vagyok hülye.");
			
			Show("dad","dad_serious");

			f("Remek. Különben te is két évtizedre gyereknevelésre lennél kárhoztatva, ahogy én! Haha!");
			n("Ha-ha.");
			Agreeable_Ending();

		}
	});

}

function Agreeable_Ending(){

	$.father_oblivious = true;

	f("Egy pillanattal ezelőtt még azt hittem, azt fogod mondani, hogy füveztél azzal a hippi Jack-gyerekkel, vagy valami hasonló szörnyűséget!");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	f("Szóóóval...");
	f("Ki akar moziba menni a hétvégén? Úgy hallottam, az Eredet remek film.");

	Choose({	
		"Persze, nézzük meg! Még úgysem láttam.": function(message){
			n(message);
			f("Akkor meg is van a terv szombatra.");
			f("Hé Nick, hogy is hívják azt a híres színészt, aki ebben a filmben játszik?");
			n("Öhm, Leonardo Dicaprio?");
			f("Neem, nem, egy nő. Tudom is! Ellen Page.");
			f("Szerinted is hasonlít rá kicsit Claire?");
			n("Jaa, szerintem is.");
			Dinner_Ending();
		},
		"Öhm... Inkább nézzünk meg valami mást.": function(message){
			n(message);
			f("Na mi az, talán túl összetett neked az Eredet?");
			n("Héé...");
			if($.studying_subject!=$.studying_subject_2){
				f("Komolyan, most már értem, miért olyan rosszak a jegyeid "+$.studying_subject+"ból és "+$.studying_subject_2+"ból.");
			}else{
				f("Komolyan, most már értem, miért olyan rosszak a jegyeid "+$.studying_subject+"ból.");
			}
			f("Viszont ez <i>csak egy film</i>!");
			f("Ugyan, ennyi sötétséget csak nem örököltél az anyádtól! Haha!");
			n("Ha-ha.");
			Dinner_Ending();
		},
		"Hát.. Igazából én már láttam az Eredetet.": function(message){
			n(message);
			f("Óóó, értem már...");
			f("Egy laza kis mozis randin voltál Claire-rel, a <i>különleges</i> barátoddal, mi?");
			n("Jaa.");
			n("Egy randin a különleges <i>barátommal</i>.");
			Dinner_Ending();
		}
	});

}

function Argue_With_Dad(){

	n("Nem.");

	f("Parancsolsz?");
	n("Nem. Anya azt mondta, hogy nem találkozhatok többé Jackkel.");
	f("Öhm.. Jack?");
	n("A barátom.");

	Choose({
		"A párom.": function(message){
			
			n(message);

			Show("mom","mom_cry");
			m("[szipog]");

			m("Jack tette ezt a fiúnkkal!");
			f("Az a gyerek ezt az életmódot választotta, de te nem fogod, Nick!");
			Argument_Ending();
		},
		"Anya utálja őt, mert kiderült róla, hogy meleg.": function(message){

			n(message);

			Show("mom","mom_cry");
			m("[szipog]");

			f("Megríkattad anyádat.");
			if($.hippies){
				m("Ráadásul a szülei is közönséges drogosok!");
			}
			f("Az a gyerek ezt az életmódot választotta, de te nem fogod, Nick!");
			Argument_Ending();
		},
		"Anya utálja őt, mert azt HISZI, hogy meleg.": function(message){

			n(message);

			Show("mom","mom_cry");
			m("[szipog]");

			m("Nem, hiszem, TUDOM!");
			if($.hippies){
				m("Ráadásul a szülei is közönséges drogosok!");
			}
			f("Az a gyerek ezt az életmódot választotta, de te nem fogod, Nick!");
			Argument_Ending();
		}
	});

}

function Argument_Ending(){

	$.father_oblivious = false;

	n(". . .");

	if($.top_or_bottom=="top"){
		m("De kettejük kapcsolatában Jack a nő...");
	}
	switch($.what_are_you){
		case "bisexual":
			m("Nick nem teljesen meleg, nekem mondta, hogy vonzódik a lányokhoz is!");
			n(". . .");
			break;
		case "confused":
			m("Korábban Nick még azt is mondta, hogy nagyon össze van zavarodva!");
			f("Persze, nyilvánvalóan.");
			n(". . .");
			break;
		case "son":
			n("Nézd, mondtam anyának is, a fiatok vagyok, ez nem elé--");
			break;
	}
	
	f("Nick, iskolát fogsz váltani.");
	n(". . .");
	m("bruhuuu... bruhuuuhu... bruhuhuuu...");

	f("Anyád és én random ellenőrizgettük az üzeneteidet az utóbbi időben.");
	n(". . .");
	m("brüüh... brühühühüh... [szipog] brühühhh...");

	f("Azt hiszem, képes lennék akár extra díjat is fizetni Claire-nek, ha rá tudna ébreszteni, hogy igazából heteró vagy.");
	n(". . .");

	Show("mom","mom_sit");
	if($.crying=="anger"){
		m("Még nem voltál itthon, amikor először sírtam el magam és Nick műsírással vádolt!");
		f("Qui, fogd be. Most nem rólad beszélünk.");
	}
	if($.crying=="mocking"){
		m("Még nem voltál itthon, amikor először sírtam el magam és Nick szörnyen érzéketlen volt!");
		f("Qui, fogd be. Most nem rólad beszélünk.");
	}

	f("SZÓVAL, Nick...");
	f("Kívánsz hozzáfűzni bármit az elhangzottakhoz?");

	Choose({
		"Igen. Leszarom, hogy mit gondoltok. És basszátok meg.": function(message){

			n("Igen.");
			n("Leszarom, hogy mit gondoltok.");
			n("És BASSZÁTOK MEG!");
			
			Show("nicky","dinner_nicky_outrage");
			n("Basszátok meg mindketten, ti nárcisztikus, érzéketlen, homofób faszfe--");
			
			Dinner_Ending_Punch();

		},
		"Nem. Elfogadom a büntetést.": function(message){

			n(message);
			f("Helyes. Úgy állszhozzá, ahogy egy igazi férfinek kell.");
			n(". . .");

			Show("dad","dad_serious");

			m("[halkan szipog]");
			f("Elmegyek egy bárba és rendelek valami emberi fogyasztásra alkalmasat, mivel ez a vacsora nem volt az.");

			Show("dad",null);

			f("Édes kis drágám? A főztöd egy nagy határ fos.");
			PlaySound("sfx","dinner_door");

			m(". . .");
			
			Show("mom","mom_cry");

			m("BRÜÜÜÜHÜHÜÜÜÜHÜÜÜÜÜÜÜÜÜÜÜÜÜÜ");
			
			Dinner_Ending();

		},
		"Nem tudsz nekem fájdalmat okozni.": function(message){

			n(message);
			f(". . .");
			m("Drágám, ne...");
			f("Kissé erős szavak ezek, fiam!");
			m("Édesem, kérlek ne tedd!");
			f("Legalább állj elém, mint egy férfi.");
			m("Kérlek!!! Ez az én hibám! NE CSINÁ--");
			f("Majd a jég leviszi a daganatot.");
			m("KÉRLEK!!!");
			
			Dinner_Ending_Punch();

		}
	});

}

function Dinner_Ending_Punch(){

	Wait(500);

	queue(ClearDialogue,0);

	StopSound("clock");
	PlaySound("sfx","dinner_punch");

	Show("dad",null);
	Show("mom","mom_cry");
	Show("nicky","dinner_nicky_punched");
	Show("dinner_punch_arm","dinner_punch_arm",{x:0,y:300});
	
	$.punched = true;
	Dinner_Ending();	
	
}

function Dinner_Ending(){

	Wait(500);

	queue(ClearDialogue,0);

	Wait(500);

	PlaySound("clock","dinner_meowing",{loop:-1});
	Show("clock","clock_meowing");
	Show("clock_time","clock_2000");

	Wait(1000);

	Clear();
	Start_Jack_2();

}

