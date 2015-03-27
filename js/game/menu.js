function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>COMING OUT SIMULATOR 2014</b>");
	N("Egy valós eseményeken alapuló játék kiegészítve kitalált dolgokkal.");
	N("Helló és üdv a játékban.");
	N("Mit szeretnél csinálni?");

	Choose({
		"Szeretnék játszani ezzel az, öhmm... izével.": Play,
		"Te ki vagy? (Háttérsztori)": function(){
			Credits("Te ki vagy?");
		},
		"Hmm, mesélj a játékról! (Játékleírás)": function(){
			About("Hmm, mesélj a játékról!");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Remek! Akkor vágjunk is bele!");
		N("Nem volt kedved szórakozni a háttérsztori, vagy a játékleírás olvasásával igaz?");
		p("Hát...");
		N("Oké, oké; nem baj.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Miért lehet többféle válaszra is klikkelni, ha csak egyféle végkimenetel van?");
		N("Gőzöm sincs.");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Rendben.");
	}

	N("Utazzunk vissza az időben öt évet, egészen 2010-ig...");
	p("Ez ÖT éve volt?!");
	N("...addig az estéig, ami örökre megváltoztatta az életemet.");

	N("Mondd csak, kedves játékos, hogy képzeled ennek az egésznek a végkifejletét?");

	Choose({
		"Virágokkal, szivárvánnyal és meleg unikornisokkal?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Igen, pontosan így fog végződni a sztori.");
			p("Tényleg?!");
			N("Nem.");
			Play_2();
		},
		"Nyilvánvalóan veled, miközben a Redditen lógsz egy Starbucksban.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Hé, én programozok ezen a laptopon. Így készült el az előtörténetemből ez a játék is, amivel te most éppen játszol.");
			p("Mintha halogatnád a kezdést...");
			N("És ezt pont te mondod?");
			p("Touché.");
			N("Egyébként...");
			Play_2();
		},
		"MINDEN VÉRBEN FOG ÚSZNI!!": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Uh, kicsit eltúlzod a dolgod, a történetem azért nem ENNYIRE tragikus.");
			p("vééééééééér");
			N("Egyébként...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Ha nem ugrottad át a játékleírást, már tudod, hogy ez egy nagyon személyes sztori.");
		p("Öhm, jaa...");
	}

	N("Ez a játék azokat a dialógusokat tartalmazza, amiket én folytattam a szüleimmel és az exbarátommal.");
	N("Olyan dolgokkal, amiket mi mondtunk, amit kellett volna mondanunk és amiket soha nem mondtunk.");
	N("Nem számít, hogy melyik melyik.");
	N("Többé már nem.");

	Choose({
		"De nem lehet megnyerni egy játékot helyes válaszok nélkül! Vagy?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Pontosan.");
			p(". . .");
			Play_3();
		},
		"Kicsit depressziós vagy, nem? Mármint ez elég lehangoló.": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("Az élet is ELÉGGÉ lehangoló.");
			p("Szóval ez egy igen.");
			Play_3();
		},
		"Akkor ez az igaz történeten alapuló játék tele van hazugságokkal?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Még ha 100%-osan élethűek is a párbeszédek, akkor is lehet bármelyik 100%-ban kamu. ");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("A játék során a 2010-es önmagammal fogsz játszani.");
	if(!$.asked_credits){
		N("Ha nem olvastad el a háttérsztorit, akkor annyit rólam, hogy a (még nem teljesen hivatalos) nevem Nick Case. Csak, hogy tudd.");
		p("Öhm, oké.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Ez a játék nem meleg unikornisokkal fog végződni. "; break;
		case 2: whatISay = "Ez a játék egy előbújás, egy előtörténet és a múlttal való kiegyezés is egyben. "; break;
		case 3: whatISay = "Ez a játék nem vérrel, hanem könnyekkel fog végződni. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Bocsi, amiért kicsit lehangolóra sikerült."; break;
		case 2: whatISay += "És nincsenek jó válaszok."; break;
		case 3: whatISay += "És tele van hazugságokkal."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Hé, én ezt csak úgy mondtam...");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("Amikor játszol...");
	N("Bölcsen válogasd meg a szavaidat.");
	N("Minden karakter emlékezni fog mindenre, amit nekik mondtál. Vagy nem mondtál.");
	p("Jaa. Ennek ellenére te generáltad a választási lehetőségeimet a főmenüben.");
	N("Nagyjából.");

	N(". . .");
	N("Vannak dolgok, amikre nehéz nem emlékezni.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Te ki vagy?");
	}
	
	N("Ó, milyen goromba vagyok! Hadd mutatkozzam be.");
	N("Helló, a nevem Nick Case.");
	N("Ez nem a hivatalos nevem, ez az IGAZI nevem.");

	p("Ez nagyon furcsa, haver.");
	if($.asked_about){
		p("Mintha az előbb azt mondtad volna, hogy ez a saját történeted, ugye?");
	}else{
		p("Mindegy. Végül is akkor te csináltad ezt a játékot, ugye?");
	}

	N("Így van, írója, programozója és grafikusa vagyok egyben a Coming Out Simulator 2014-nek.");

	if($.asked_about){
		p("Mindezt saját magadnak?");
		p("Már mondtam és még mondani fogom...");
		p("Nagyon nárcisztikus vagy.");
		N("Nos, ez nem csak rólam szól.");
		N("Egyébként a zajok és zenék különböző nyilvánosan hozzáférhető forrásokból származnak.");
	}else{
		N("Egyébként zajok és zenék különböző nyilvánosan hozzáférhető forrásokból származnak.");
	}

	N("Bár többnyire a játék mögött csak én vagyok...");
	N("...a sztori mögött sok ember van.");

	if($.asked_about){
		Choose({
			"Ha már így szóba került, játszunk is akkor!": Play
		});
	}else{
		Choose({
			"Most, hogy így ezt megbeszéltük, játszhatunk?": Play,
			"Miért csináltad ezt meg? (Játékleírás)": function(){
				About("Miért csináltad ezt meg?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Szerettem volna elmesélni a történetemet.");
	}else{
		N("Ez a játék...");
		N("...több egy társalgás-szimulátornál, nekem ez tényleg...");
		N("...egy nagyon személyes történet.");
	}
	
	p("Természetesen. Te kis nárcisztikus.");
	N("Természetesen.");

	if($.asked_credits){
		p("Habár ha tényleg az lennél, az igazi nevedet használnád.");
		N("Már mondtam neked hogy ez az IGAZI ne-..");
		p("Okééé, okéé, felfogtam. Bizarr vagy.");
	}

	N("Ezt a játékot a #Nar8 Game Jam-re csináltam. Jó kifogás volt a gép előtt ülésre és biztosított egy határidőt is.");
	p("Gondolom az utolsó pillanatig halogattad az elküldését, ugye?");
	N("Hát ja.");
	N("Jut eszembe, ez a játék nem áll szerzői jogvédelem alatt és nyilvánosan hozzáférhető tárhelyen van tárolva.");
	N("Nyílt forráskódú, akárcsak a szexualitásom.");

	p("Jesszus, ez egy borzalmas szóvicc volt.");
	N("Akarsz még hallani ilyen programozós szóviccet?");
	p("Neeeeeeeeeeem.");

	if($.asked_credits){
		Choose({
			"Csak hadd játszak végre ezzel a játékkal.": Play
		});
	}else{
		Choose({
			"Túl vagyunk a rossz szóvicceken is, most már játszhatunk végre?": Play,
			"Szóval ki is vagy te? (Háttérsztori)": function(){
				Credits("Szóval ki is vagy te?");
			}
		});
	}

}
