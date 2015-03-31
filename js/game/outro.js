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
		N("Aztán három hét múlva szakkítottunk.");
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
	N("Ezt a kicsöcsém érdekében tettem, mert ő még annyira ártatlan.");
	N("És az apámat csak visszatettem a történetbe, mert egyébként még 2010 előtt elhagyta a családunkat.");

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
		"Haver, tényleg nem tudom, nyögd már ki!": function(message){
			p(message);
			N("Oké-oké, már is elmondom, mi történt végül.");
			N("...és mi történt azután, meg azután.");
			p("MONDD MÁR!");
			Closure_Story();
		},
		"Nyugtass meg, azért végül jobbra fordultak a dolgok, ugye?": function(message){
			p(message);
			N("Persze! Mindhárom verzióban ez történt.");
			p("DE MI?");
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
			p("Megint jössz a válaszlehetőségekkel, holott így is, úgyis ugyanoda lyukadunk ki...");
		}else{
			p("Miért csináltál több különböző válaszlehetőséget, ha mindegy hová klikkelek, mert csak egyféle vége van a sztorinak?");
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
		"Azt hittem, csak női fehérneműből létezik ehető verzió.": function(message){
			$.outro_convo_lie = 1;
			p(message);
			N("!");
			Tell_Me_A_Lie_2();
		},
		"This story is a fractal of fracked up.": function(message){
			$.outro_convo_lie = 2;
			p(message);
			N("MY STORY. MY RULES.");
			Tell_Me_A_Lie_2();
		},
		"...\"manther\".": function(message){
			$.outro_convo_lie = 3;
			p(message);
			N("Also known as a faguar.");
			Tell_Me_A_Lie_2();
		}
	});
}
function Tell_Me_A_Lie_2(){
	
	N("They took me in as their foster child, and I was their full-time boytoy.");

	if($.outro_convo_lie==1){
		p("...Thanks again to your, uh, flexibility.");
	}

	switch($.top_or_bottom){
		case "top": N("As we know, I like having my partners be 'the woman' of a relationship."); break;
		case "bottom": N("As we know, I'm usually 'the woman' of a relationship."); break;
		case "versatile": N("As we know, I like taking turns at being 'the woman' of a relationship."); break;
	}

	N("They raised me, showed me love, and I grew up to be a productive member of society.");

	switch($.outro_convo_lie){
		case 2: p("And when you zoom in on this fractal, there's MORE fracked-up-ness."); break;
		case 3: p("...\"MANTHER\"."); break;
	}

	N("They were my new family.");
	N("Family... with benefits.");

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

	N("Here it goes.");
	Is_Last_Story();

	N("I took Jack's advice and parodied Inception in my 'odd web game', Reimagine :The Game:.");
	switch($.inception_answer){
		case "awake": N("Didn't say that Cobbs was awake in the ending, though."); break;
		case "dream": N("Didn't say that the movie was all just a dream, though."); break;
		case "neither": N("Still think it doesn't matter if Cobbs was still dreaming."); break;
	}
	N("Reimagine :The Game: got internet-famous-ish! A good portfolio piece.");
	N("A few months later, I landed an internship at Electronic Arts in the Bay Area. Far away from my family in Canada.");

	Choose({
		"Eww, Electronic Arts...?": function(message){
			$.outro_convo_truth = 3;
			p(message);

			N("Yeah, I know, I know.");
			N("I'm now repenting for my sins by making artsy-fartsy indie games like this one.");
			p("Repent harder, dammit.");
			Tell_Me_A_Truth_2();
		},
		"And the Bay Area is very LGBT friendly.": function(message){
			$.outro_convo_truth = 2;
			p(message);

			N("That's why they call it the Gay Area!");
			p("Uh.. nobody calls it that.");
			Tell_Me_A_Truth_2();
		},
		"Oh, I love EA! They make The Sims, right?": function(message){
			$.outro_convo_truth = 1;
			p(message);

			N("Yup! I didn't work on those, though. Our team was making a web game version of--");
			N("[LITERALLY CANNOT DISCLOSE]");
			p("Oh.");
			Tell_Me_A_Truth_2();
		}
	});

}
function Tell_Me_A_Truth_2(){
	
	N("After EA, I went on to go indie.");
	N("But I stayed in touch with friends at EA, and stayed in the Bay Area.");

	N("My technical skills grew.");
	N("My social skills grew.");
	N("And here... I'm finally starting to figure out my identity.");

	switch($.outro_convo_truth){
		case 1: p("Well, I'm looking forward to Literally Cannot Disclose: The Game."); break;
		case 2: p("But seriously, no one calls it the Gay Area."); break;
		case 3: p("But seriously, ew. Electronic Arts."); break;
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

	N("As you wish.");
	Is_Last_Story();

	N("Claire, in an ironic twist of fate, was also bisexual.");
	N("We told each other about it during a "+$.studying_subject+" study session.");

	p("What a twist!");

	N("Claire was insecure about her sexual orientation, like me.");
	N("We were both somewhat inexperienced. Claire's only been with women, and I've only been with Jack.");

	// CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
	// Weave in -- studying what

	Choose({
		"A mirror version of you, but reversed...": function(message){
			$.outro_convo_half_truth = 1;
			p(message);
			N("Well, uh, all mirror images are reversed.");
			p("You know what I mean.");
			N("But yeah, Claire and I shared our experiences with one another.");
			Tell_Me_A_Half_Truth_2();
		},
		"So, you taught each other the other side?": function(message){
			$.outro_convo_half_truth = 3;
			p(message);
			Tell_Me_A_Half_Truth_2();
		},
		"Did you end up having sexytimes together?": function(message){
			$.outro_convo_half_truth = 2;
			p(message);
			N("No. She's like a sister to me. A sister I would not have sex with.");
			p("You... did not need to clarify that.");
			N("But yeah, Claire and I shared our experiences with one another.");
			Tell_Me_A_Half_Truth_2();
		}
	});

}
function Tell_Me_A_Half_Truth_2(){
	
	N("And exchanged tips!");
	N("Like... do a 'come hither' motion with your fingers, or, rub the head against the roof of your mouth.");
	p("T.M.I, dude...");

	if($.changing_schools || !$.father_oblivious){
		N("I did move to her school, in the end.");
	}

	N("We were best friends. We still are! We've now both moved to the US, far away from our hateful families.");
	N("Together, we helped each other overcome our insecurities, and discover who we were...");
	N("Proud bisexual sluts.");

	p("What a touching story. I think.");
	
	N("And of course, we wingman/wingwoman for each other.");

	p(". . .");

	Closure_Story();

}





function Finale_1(){
	
	N("And that's the last of the post-coming-out stories!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);
	
	Show("cup",null);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");

	//////////////////////////

	N("Dear player, I couldn't help but notice...");
	if($.order_of_stories[0]=="truth"){
		N("You went straight for the Truth first.");
	}else if($.order_of_stories[2]=="truth"){
		N("You saved the Truth for last.");
	}else if($.order_of_stories[0]=="lie"){
		N("You wanted to hear the Lie first.");
	}else{
		N("You saved the Lie for last.");
	}
	N("What does that say about you?...");
	p(". . .");

	p("You know... usually when a game gives you multiple endings, they don't do them ALL AT ONCE.");
	N("Hah! You thought these were ENDINGS?");

	Choose({
		"Let me guess... This Is Just The Beginning?": function(message){
			p(message);
			N("This is just the begi-- oh. Okay, yeah.");
			Finale_2();
		},
		"Well yeah. This game's over, right?": function(message){
			p(message);
			N("True... but the story, which is my story, my life, continues.");
			Finale_2();
		},
		"oh god how long IS this damn game.": function(message){
			p(message);
			N("Don't worry. Your next choice is the very last one, I swear.");
			Finale_2();
		}
	});

}

function Finale_2(){

	Show("nicky","coffee_nicky_packup_1");

	N(". . .");
	N("You know, if I could go back and relive all my other possible choices...");
	N("... which in a sense, I did, by writing this game...");
	N("... I wouldn't change a thing.");

	Show("nicky","coffee_nicky_packup_2");

	// SERIOUSNESS.
	PlaySound("sfx","laptop_shut");
	PlaySound("bg","bedroom_1",{loop:-1, volume:0.4});

	p("? ? ?");

	if($.punched){
		N("My texts getting read. Being forced to change schools. Getting punched in the face.");
	}else if($.father_oblivious==false){
		N("My texts getting read. Being forced to change schools. All the verbal abuse.");
	}else if($.changing_schools){
		N("My texts getting read. Being forced to change schools. The attempted 'gay rehab' with Claire.");	
	}else{
		N("My texts getting read. No more after-school hours to myself. The attempted 'gay rehab' with Claire.");
	}

	N("In a Stockholm Syndrome sort of sense... I'm grateful for it all.");

	Choose({
		"what.": Finale_3,
		"whaaat.": Finale_3,
		"whaaaaaaaaaaaaaaat.": Finale_3
	});

}

function Finale_3(message){

	p(message);

	PlaySound("sfx","laptop_pack");
	Show("nicky","coffee_nicky_packup_3");

	N("Yes, really!");
	N("I wouldn't have been so motivated to forge my own life... if my previous life wasn't total utter shit.");

	PlaySound("sfx","laptop_pack_2");
	Show("nicky","coffee_nicky_packup_4");

	N("Later in 2010, Dan Savage launched the It Gets Better&trade; campaign.");
	N("My three stories... Lie, Truth, Half-Truth... they're all at least true about one thing.");
	N("It does get better.");

	p(". . .");

	N("And...");
	N("At the end...");
	N("Of this long, stupid, painful game...");
	N("Where I played against people who should have been on my side...");

	p(". . .");

	N("I won.");
	N(". . .");
	N("I won.");

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


