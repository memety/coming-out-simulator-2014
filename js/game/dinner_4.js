// is short
// What ARE you. Fake crying, and don't tell your dad
// Weave it

function Start_Dinner_4(){

	n(". . .");
	m("Az apád miatt van ez, ugye? Mert soha nincs otthon.");
	m("Egy erős férfiminta nélkül össze vagy zavarodva...");

	Choose({
		"Persze, mert apa aztán mintaférfi.": function(message){
			n(message);
			m("Nick, ő az apád, bármi történjék is, szóval szeretned kell.");
			My_Fault();
		},
		"Ez nem így működik. Egyébként is bi lennék.": function(message){
			n(message);
			m("Honnan tudod? Csak nem lettél hirtelen pszichológus?!");
			My_Fault();
		},
		"Tudod mit, talán igazad van!.": function(message){
			n(message);
			m("Tudom.");
			My_Fault();
		}
	});

}

function My_Fault(){
	
	Show("clock_time","clock_1930");

	n(". . .");
	m("Ez mind az én hibám...");
	m("Mondtam neked, hogy vigyázz az ilyen emberekkel, de túl későn figyelmeztettelek...");

	Show("mom","mom_cry");

	m("[szipog]");
	m("ÓÓ Nick! Drága kisfiam!");

	Show("nicky","dinner_nicky_sit");

	Choose({
		"Anya... kérlek ne sírj...": Cry_1,
		"Hagyd már a műsírást.": Cry_2,
		"[nem reagálsz a sírásra]": Cry_3
	});
}

function Cry_1(message){

	$.crying = "sympathy";

	n(message);
	m("hüü... hüü... hüü...");
	n("Sajnálom. Jacket, a hazugságokat, mindent.");
	m("óóó... óó...");
	n("Visszaszívom.");
	m("szip...");
	n("...kérlek...");
	What_Are_You();
}

function Cry_2(message){

	$.crying = "anger";
	Show("nicky","dinner_nicky_defiant");

	n(message);
	m("hüü... hüü... hüü...");
	n("Ne már, ez annyira mű.");
	m("óó... óó...");
	n("Befognád már?!");
	m("szip...");
	n("FOGD. BE.");
	What_Are_You();

}

function Cry_3(message){

	$.crying = "mocking";
	Show("nicky","dinner_nicky_outrage");

	n("ÁÁÁÁHh");
	m("hüü... hüü... hüü...");
	n("HÜÜÜ HÜÜÜÜ HÜÜ");
	m("óó... óó...");
	n("BRRrrRR-BRR-BRbR BWAH BWAHRR rrrRRR-WaahHH Vöövö RaaahhH");
	m("szip...");

	Show("nicky","dinner_nicky_defiant");
	n("Oké, befejezted?");
	What_Are_You();

}

function What_Are_You(){

	m(". . .");
	m("Nick... mégis mi vagy te?");
	n("Parancsolsz?");

	Show("nicky","dinner_nicky_sit");

	Show("mom","mom_sit");
	m("<i>Mi</i> vagy te?");

	Choose({
		"Biszexuális.": function(message){

			$.what_are_you = "bisexual";

			n(message);
			if($.admit_bisexuality){
				m("...és azt mondtad az azt jelenti, hogy...");
			}
			n("szexuálisan vonzódom a férfiakhoz és a nőkhöz is.");
			m("Az nem lehet.")
			m("Vagy egyik, vagy másik.");
			n("Ez... egyáltalán nem így működik.");
			Have_You_Had_Sex();

		},
		"Csak össze vagyok zavarodva.": function(message){

			$.what_are_you = "confused";

			n(message);
			m("Tudom.");
			m("Sajnálom, hogy Jack összezavart.");
			m("Ez nálad biztosan csak egy átmeneti állapot.");
			n(". . .");
			m("Minden rendben lesz... Minden rendben lesz...");
			Have_You_Had_Sex();

		},
		"A fiad vagyok, az istenit.": function(message){

			$.what_are_you = "son";

			n(message);
			n(". . .");
			n("Nem elég ennyi?");
			Have_You_Had_Sex();

		}
	});
}

function Have_You_Had_Sex(){
	m(". . .");
	m("Lefeküdtél Jackel?");
	Choose({
		"Yes.": function(message){
			n(message);
			m("[ZIHÁL]");
			Have_You_Had_Sex_2();
		},
		"No.": function(message){
			n(message);
			m("Kérlek ne hazudj... Olvastam az smseidet...");
			n("Csak smseztünk, de AZT nem csináltuk.");
			m("...de a képeid...");
			Have_You_Had_Sex_2();
		},
		"Nem mondom meg.": function(message){
			n(message);
			m("Jézusom... szóval igen.");
			Have_You_Had_Sex_2();
		}
	});
}

function Have_You_Had_Sex_2(){

	n(". . .");
	m("Melyikőtök a... lány?");

	Show("nicky","dinner_nicky_outrage");

	n("NE MÁR!");
	n("Ez olyan, mintha azt kérdeznéd melyik evőpálcika a kaná--");
	m("Melyikőtök?");

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Általában én vagyok alul.":function(message){
			$.top_or_bottom = "bottom";

			n(message);
			Throw_Up();
		},
		"Jack, többnyire.":function(message){
			$.top_or_bottom = "top";

			n(message);
			m("E-ez... azt jelenti, hogy még lehetsz hetero, ugye?...");
			m("Ha... tudod... te vagy az, aki beteszi a...");
			m("a...");
			Throw_Up();
		},
		"Felváltva csináljuk.":function(message){
			$.top_or_bottom = "versatile";

			n(message);
			Throw_Up();
		}
	});
}

function Throw_Up(){

	PlaySound("sfx","dinner_vomit");

	Show("clock_time","clock_1940");
	Show("mom","mom_vomit");
	Show("table","dinner_table_2");
	Wait(1000);

	Choose({
		"mi?.": Father_Soon,
		"miiii?": Father_Soon,
		"mi vaaaaaan?": Father_Soon
	});

}

function Father_Soon(message){

	n(message);

	Show("mom","mom_sit");

	m(". . .");
	m("Apád nemsokára itthon lesz.");
	n("Kihűlt a kaja. Kivéve azt a részét, ahova... őő... visszatettél egy keveset.");
	m("SZÓVAL, apád késik. Biztos feszült napja volt.");
	m("Úgyhogy légyszíves, ha hazajön...");
	m("Megígéred, hogy ezt az egészet titokban tartod?");
	n(". . .");

	m("Ne beszélj neki Jackről.");

	switch($.what_are_you){
		case "bisexual":
			m("Ne mondd el neki ezt a biszexuális-dolgot.");
			break;
		case "confused":
			m("Ne mondd neki ezt a szexuális zavarodottság-dolgot.");
			break;
		case "son":
			m("Ne mondd neki, hogy hazudtál mindkettőnknek, csak azért, hogy Jackkel... találkozgathass.");
			break;
	}

	switch($.top_or_bottom){
		case "top":
			m("És ne mondd neki, hogy Jack... nőként viselkedik.");
			break;
		case "bottom":
			m("És ne mondd neki, hogy... nőként viselkedsz Jackkel..");
			break;
		case "versatile":
			m("És ne mondd neki, hogy mindketten... nőként viselkedtek.");
			break;
	}

	m("Rendben?");

	Choose({
		"Rendben.": function(message){
			$.promise_silence = "yes";
			
			n(message);
			m("Oké.");
			m(". . .");
			m("Megjött.");
			Father_Soon_2();
		},
		"Nem, egyáltalán nincs rendben.": function(message){
			$.promise_silence = "no";
			
			n(message);
			m("Nick, ne csináld ezt, kérlek.");
			m("Jaj ne, megjött.");
			Father_Soon_2();
		},
		"Csak ha te sem említed neki.": function(message){
			$.promise_silence = "tit for tat";
			
			n(message);
			m(Nem fogom.");
			n("Ígérd meg!");
			m("Ígé--");
			m("Cssst! Itt van!.");
			Father_Soon_2();
		}
	});

}

function Father_Soon_2(){
	Show("nicky","dinner_nicky_sit");
	Start_Dinner_5();
}
