// Then we broke up soon/X...
// Three stories (Lie / Truth / Half-truth) ... one interaction with each.
// Did you skip or not? Tie that into the sections.
// Your final choice, a whaaaaaat.

function Start_Outro(){

	// Just clear dialogue & stuff.
	queue(ClearScene,0);
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse_2");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	///////////////////////////////

	if($.breaking_up_soon){
		N("Aztán három hét múlva szakítottunk.");
	}else{
		N("Aztán három hét múlva szakítottunk.");
	}

	// Weave - intro
	if($.main_menu_convo_1==1){
		p(". . .");
		N("Mondtam, hogy nem meleg unikornisokkal végződik majd a sztori.");
	}else if($.main_menu_convo_1==3){
		p(". . .");
		N("Megmondtam. Semmi vér, csak könnyek.");
	}else if($.main_menu_convo_2==1){
		p(". . .");
		N("Igazad van. Kicsit depressziós vagyok.");
	}

	Choose({
		"Ez nagyon... megindító.":function(message){
			p(message);
			N("Engedd szabadjára az érzéseidet, barátom.");
			Closure();
		},
		"Ó, jesszus, ez rideg, haver.":function(message){
			p(message);
			N("Az, nem tagadom.");
			Closure();
		},
		"Nem számítottam rá, hogy ez következik majd...":function(message){
			p(message);
			N("Hát ja... Mi se számítottunk rá.");
			Closure();
		}
	});

}

function Closure(){

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Ugh.");
	p("Vacakul érzem magam, amiért ugyanolyanok a párbeszéd buborékjaim, mint az apádnak.");

	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Érdekes, hogy emlékszel rá. Csak az övé különbözik a többi karaktertől.");
	N("Egyébként minden nevet megváltoztattam természetesen, kivéve az enyémet.");
	N("Ezt a kicsöcsém érdekében tettem, mert ő még olyan ártatlan.");
	N("És zépámat csak visszatettem a történetbe, mert egyébként még 2010 előtt elhagyta a családunkat.");

	if($.main_menu_convo_2==3){
		N("Látod mondtam, ez egy igaz történeten alapuló játék tele hazugságokkal.");
	}
	
	p("Akkor is adhattál volna nekem egy másik színt.");
	N("Akkor, amikor csináltam, nem igazán volt prioritása a dolognak.");
	N("Mit gondolsz ezek után, hogy zárult végül a sztori?");

	if($.main_menu_convo_2==2){
		N("Ne aggódj, ahogy az elején is mondtam, itt nincsenek jó vagy rossz válaszok.");
	}

	$.coming_out_stories_left = 3;
	$.order_of_stories = [];

	Choose({
		"Haver, tényleg nem tudom, nyögd már ki!.": function(message){
			p(message);
			N("Oké-oké, már is elmondom, mi történt végül.");
			N("...és mi történt azután, meg azután.");
			p("MONDD MÁR!");
			Closure_Story();
		},
		"Nyugtass meg, azért végül jobbara fordultak a dolgok, ugye?": function(message){
			p(message);
			N("Persze! Mindhárom verzióban ez történt.");
			p("DE MI?.");
			Closure_Story();
		},
		"Virágok, szivárványok és meleg unikornisok?": function(message){
			p(message);
			N("Naná! Legalább egy verziónak így kellett végződnie.");
			p("Naná, haver.");
			Closure_Story();
		}
	});

}

function Closure_Story(){

	if($.coming_out_stories_left==3){
		N("Melyik epilógot akarod először hallani?");
		N("Nyugi, elmondom amúgy mind a hármat.");
	}else if($.coming_out_stories_left==2){
		N("Oké, melyik legyen a következő?");
	}else if($.coming_out_stories_left==1){
		N("Végül, íme az utolsó verzió...");
	}else{
		Finale_1();
		return;
	}

	$.coming_out_stories_left -= 1;

	var options = [];
	if(!$.told_story_lie) options["A hazugság."]=Tell_Me_A_Lie;
	if(!$.told_story_truth) options["Az igazság."]=Tell_Me_A_Truth;
	if(!$.told_story_half_truth) options["A féligazság."]=Tell_Me_A_Half_Truth; 
	Choose(options);

}

function Is_Last_Story(){
	if($.coming_out_stories_left==0){
		if($.asked_about && $.asked_credits){
			p("Megint jössza válaszlehetőségekkel, holott így is, úgyis ugyanoda lyukadunk ki...");
		}else{
			p("Miért csináltál több különböző válaszlehetőséget, ha mindegy hová klikkelek, mert csak egyféle vége van a sztorinak?.");
			N("Nem tudom. Haladjunk.");
		}
	}
}



function Tell_Me_A_Lie(message){

	$.told_story_lie = true;
	$.order_of_stories.push("lie");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Very well.");
	Is_Last_Story();

	N("Elmenekültem otthonról és nem volt nálam más, csak egy sporttáska, tele ehető alsónadrágokkal.");
	if($.im_a_poet){
		N("Elutaztam a nagy fehér Északra. Amatőr verseket írtam idegeneknek, ebből tartottam fenn magam.");
	}else{
		N("Elutaztam a nagy fehér Északra. Nem-vicces web-játékokat csináltam, ebből tartottam fenn magam.");
	}
	N("Virágokat ettem. Követtem a szivárványt. És persze összebarátkoztam egy meleg unikornissal.");
	p(". . .");
	N("Végül Alaszkában kötöttem ki, ahol összebarátkoztam egy biszexuális párral, Bonnie-val és Clyde-dal.");
	N("Bonnie egy harmincas évei közepén járó cougar volt, Clyde pedig egy alig negyvenes manther.");

	// FAMILY WITH BENEFITS
	// Weave in -- top or bottom

	Choose({
		"Asszem az ehető alsó ruházkodást és kajálást is egyszerre jelent.": function(message){
			$.outro_convo_lie = 1;
			p(message);
			N("A rugalmasságomnak hála kevés helyet foglalok!");
			Tell_Me_A_Lie_2();
		},
		"Ez egy elbaszott sztori a baszásról.": function(message){
			$.outro_convo_lie = 2;
			p(message);
			N("AZ ÉN SZTORIM. AZ ÉN SZABÁLYAIM.");
			Tell_Me_A_Lie_2();
		},
		"...\"manther\".": function(message){
			$.outro_convo_lie = 3;
			p(message);
			N("Faguarként is ismerik.");
			Tell_Me_A_Lie_2();
		}
	});
}
function Tell_Me_A_Lie_2(){
	
	N("Befogadtam mint árvát és én lettem a kis játékszerük.");

	if($.outro_convo_lie==1){
		p("...Kösz mégegyszer a rugalmasságodnak.");
	}

	switch($.top_or_bottom){
		case "top": N("Mint tudjuk, általában a féfri vagyok a párkapcsolatokban."); break;
		case "bottom": N("Mint tudjuk, általában én vagyok a nő a párkapcsolatokban."); break;
		case "versatile": N("Mint tudjuk, szeretek lány is lenni a párkapcsolatokban."); break;
	}

	N("Felneveltek, szerettek és a társadalom produktív tagjává tettek.");

	switch($.outro_convo_lie){
		case 2: p("És ha közelebbről megnézed ezt a repedést, benne mégtöbb repedés van."); break;
		case 3: p("...\"MANTHER\"."); break;
	}

	N("Ők lettek az új családom.");
	N("Család... extrákkal.");

	p(". . .");

	Closure_Story();

}





function Tell_Me_A_Truth(message){

	$.told_story_truth = true;
	$.order_of_stories.push("truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Íme.");
	Is_Last_Story();

	N("Megfogadtam Jack tanácsát és kiparodizáltam az Eredetet az új játékomban.");
	switch($.inception_answer){
		case "awake": N("Nem mondtam, hogy Cobbs ébren volt a végén."); break;
		case "dream": N("Nem is mondtam hogy a film csak álom lett volna."); break;
		case "neither": N("Még mindig nem hiszem hogy számítana hogy Cobbs még álmodik-e."); break;
	}
	N("Reimagine :The Game: got internet-famous-ish! A good portfolio piece.");
	N("Néhány hónappal később gyakornok lettem az EA-nál Bay Area-ban. Messze a családomtól.");

	Choose({
		"Őő, Electronic Arts...?": function(message){
			$.outro_convo_truth = 3;
			p(message);

			N("Ja, tudom, tudom.");
			N("Már bánom, hogy ilyen kis béna játékokat csináltam, mint ez is.");
			p("Hát bánjad is, de gyorsan.");
			Tell_Me_A_Truth_2();
		},
		"És a Bay Area LGBT barát.": function(message){
			$.outro_convo_truth = 2;
			p(message);

			N("Ezért hívják meleg vidéknek!");
			p("Senki nem hívja így.");
			Tell_Me_A_Truth_2();
		},
		"Ó, az EA király, ők csináltál a Simset, nem?": function(message){
			$.outro_convo_truth = 1;
			p(message);

			N("Ja! Bár én nem azon dolgozom, hanem egy webes verzióján a--");
			N("[NEM FEDHETEM FEL]");
			p("Ó.");
			Tell_Me_A_Truth_2();
		}
	});

}
function Tell_Me_A_Truth_2(){
	
	N("Az EA után független lettem.");
	N("De még mindig beszélek a barátaimmal az EA-tól, és Bay Area-ban maradtam.");

	N("Professzionálisan is fejlődtem.");
	N("És szociálisan is.");
	N("És itt... Végre kezdek magamra találni.");

	switch($.outro_convo_truth){
		case 1: p("Alig várom hogy bejelentsem a játékot."); break;
		case 2: p("De komolyan, senki sem hívja meleg vidéknek."); break;
		case 3: p("De most komolyan. Electronic Arts."); break;
	}

	Closure_Story();

}





function Tell_Me_A_Half_Truth(message){
	$.told_story_half_truth = true;
	$.order_of_stories.push("half-truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Ahogy kívánod.");
	Is_Last_Story();

	N("Ironikus, de Claire is kiderült hogy bi.");
	N("Egy "+$.studying_subject+" órán derült ki.");

	p("Micsoda csavar!");

	N("Claire is bizonytalan volt az identitásában, akárcsak én.");
	N("Mindketten tapasztalatlanok voltunk. Claire lányokkal volt csak addig én meg csak Jackkel.");

	// CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
	// Weave in -- studying what

	Choose({
		"Egy tükörkép rólad, csak fordítva...": function(message){
			$.outro_convo_half_truth = 1;
			p(message);
			N(Hát, a tükörképek fordítottak.");
			p("Tudod hogyan értem.");
			N("De amúgy ja, cseréltünk ám tapasztalatokat.");
			Tell_Me_A_Half_Truth_2();
		},
		"Szóval megmutattátok egymásnak az ellenkező nem szépségeit?": function(message){
			$.outro_convo_half_truth = 3;
			p(message);
			Tell_Me_A_Half_Truth_2();
		},
		"Végül kefélni kezdtetek?": function(message){
			$.outro_convo_half_truth = 2;
			p(message);
			N("Olyan mintha a húgom lenne. Az ember nem kefél a húgával.");
			p("Nem kell ám belemenni a részletekbe.");
			N("De amúgy ja, cseréltünk ám tapasztalatokat.");
			Tell_Me_A_Half_Truth_2();
		}
	});

}
function Tell_Me_A_Half_Truth_2(){
	
	N("És tippeket!");
	N("És nyelvmozdulatokat.");
	p("Jó, nyugi, haver...");

	if($.changing_schools || !$.father_oblivious){
		N("A végén mégis átkerültem az ő sulijába.");
	}

	N("Legjobb barátok voltunk és még mindig azok vagyunk! Ma mindketten az államokban élünk, messze az utálatos családainktól..");
	N("Segítettünk egymásnak túllépni a bizonytalanságokon és felfedezni önmagunkat...");
	N("Büszke bi ribancok.");

	p("Milyen megható történet. Asszem.");
	
	N("És persze egymás szárnysegédei.");

	p(". . .");

	Closure_Story();

}





function Finale_1(){
	
	N("És ez az utolsó coming-out utáni rész!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);
	
	Show("cup",null);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");

	//////////////////////////

	N("Kedves játékos, nem tudtam nem észrevenni, hogy...");
	if($.order_of_stories[0]=="truth"){
		N("Az igazságot választottad először.");
	}else if($.order_of_stories[2]=="truth"){
		N("Az igazságot hagytad utoljára.");
	}else if($.order_of_stories[0]=="lie"){
		N("A hazugságot akartad először hallani.");
	}else{
		N("A hazugságot hagytad utoljára.");
	}
	N("Mit mond ez el rólad?...");
	p(". . .");

	p("Tudod... Általában, ha egy játéknak több lehetséges befejezése is van, nem mindegyik egyszerre játszódik le.");
	N("Haha, azt gondoltad van itt egyáltalán befejezés?");

	Choose({
		"Hadd találgassak... Ez még csak a kezdet?": function(message){
			p(message);
			N("Ez még csak a-- ó. Ja, így van.");
			Finale_2();
		},
		"Hát ja. Na, ennek a játéknak vége, ugye?": function(message){
			p(message);
			N("Igen, de a történet, ami az én személyes történetem, folytatódik.");
			Finale_2();
		},
		"basszus milyen hosszú még ez a játék?.": function(message){
			p(message);
			N("Nyugi, a következő kattintás az utcsó, ígérem.");
			Finale_2();
		}
	});

}

function Finale_2(){

	Show("nicky","coffee_nicky_packup_1");

	N(". . .");
	N("Tudod, ha visszamehetnék és újraélhetnék minden lehetséges döntést ezzel kapcsolatban...");
	N("... amit valamilyen módon meg is tettem ezzel a játékkal...");
	N("... Nem változtatnék semmin.");

	Show("nicky","coffee_nicky_packup_2");

	// SERIOUSNESS.
	PlaySound("sfx","laptop_shut");
	PlaySound("bg","bedroom_1",{loop:-1, volume:0.4});

	p("? ? ?");

	if($.punched){
		N("Az elolvasott smseim. Hogy iskolát kellett váltanom. A pofon.");
	}else if($.father_oblivious==false){
		N("Az elolvasott smseim. Hogy iskolát kellett váltanom. Az összes szóbeli sérelem.");
	}else if($.changing_schools){
		N("Az elolvasott smseim. Hogy iskolát kellett váltanom. A "melegrehab" ötlete Clairrel.");	
	}else{
		N("Az elolvasott smseim. Hogy nincs több szabad órám iskola után. A "melegrehab" ötlete Clairrel.");
	}

	N("A dolog maga Stockholm szindrómás értelmében az egészért hálás vagyok.");

	Choose({
		"mi van?": Finale_3,
		"mi vaan?": Finale_3,
		"mi vaaaaaaaaaaaaaaan?.": Finale_3
	});

}

function Finale_3(message){

	p(message);

	PlaySound("sfx","laptop_pack");
	Show("nicky","coffee_nicky_packup_3");

	N("Igen, nagyon!");
	N("Nem lettem volna ilyen motivált abban, hogy a saját sorsom kovácsa legyek... ha ezt megelőzően nem lett volna az életem totálisan szar.");

	PlaySound("sfx","laptop_pack_2");
	Show("nicky","coffee_nicky_packup_4");

	N("Later in 2010, Dan Savage launched the It Gets Better&trade; campaign.");
	N("A három történetem... Hazugság,  igazság, féligazság... legalább egy dolog igaz mindháromra.");
	N("Hogy idővel jobb lesz.");

	p(". . .");

	N("És...");
	N("Végül...");
	N("Ebben a hosszú, buta és fájdalmas játékban...");
	N("Ahol azok ellen játszottam, akiknek mellettem kellett volna állniuk...");

	p(". . .");

	N("Én nyertem.");
	N(". . .");
	N("Én nyertem.");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	// CUTSCENE -- MY NEW BOYFRIEND
	Wait(1000);
	
	PlaySound("sfx2","laptop_pack");
	Show("nicky","coffee_nicky_date_1");
	Wait(1000);
	
	PlaySound("sfx","step_2");
	Show("nicky","coffee_nicky_date_2");
	Wait(1000);
	
	PlaySound("sfx","step_1");
	Show("nicky","coffee_nicky_date_3");
	Wait(1000);
	
	PlaySound("sfx","step_2",{volume:0.75});
	Show("nicky","coffee_nicky_date_4");
	Wait(1000);

	PlaySound("sfx","step_1",{volume:0.5});
	Show("nicky",null);
	Wait(1000);

	PlaySound("sfx","step_2",{volume:0.25});
	Choose({
		"REPLAY?": Finale_4
	});

}
function Finale_4(message){
	
	p(message);
	N("Real life has no replays.");

	Wait(800);
	queue(function(){
		document.getElementById("game").setAttribute("screen","blank");
	},1000);
	//queue(ClearScene,0); // coz the sound's cool!
	queue(function(){
		document.getElementById("game").setAttribute("screen","credits");
	},0);


}


