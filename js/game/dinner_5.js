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
			f("Így is épp elég nehéz elviselnünk, hogy ilyen rosszul főz. Höhö!");

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
				f("Milyen jegyeket hoztál mostanában "+$.studying_subject"ból és "+$.studying_subject_2+"ból?");
			}else{
				f("Milyen jegyeket hoztál mostanában "+$.studying_subject"ból?");
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
			n("Anya, tudod, <i>megegyeztünk abban</>, hogy nem beszélünk többet erről, mert...");
			if($.tried_talking_about_it){
				m("Igaz, tényleg nem hozom szóba többet és <i>neked sem kell</i>...");
			}
			break;
		case "no":
			n("Anya, megígérted, hogy nem beszélsz erről többet...");
			m("Kettőnk közül pont, hogy te vagy az, aki nem tartja be, amit mond!");
			break;
		case "tit for tat":
			n("Anya, azt mondtad, nem hozod ezt szóba többet, ha én sem hozom szóba, hogy--");
			if($.tried_talking_about_it){
				m("Hogy nem is akarsz igazából semmit se szóba hozni.");
			}
			break;
	}

	f("Mit nem akartok szóba hozni??...");
	f("Ebben a családban én vagyok főnök, ti ketten pedig titkoltok valamit előlem!c.");
	m("Ó.. hát tulajdonképpen csak arról van szó, hogy Nick nagyon-nagyon kedveli Claire-t.");

	Choose({
		"Mi van?! Nem, dehogy!": function(message){
			n(message);
			f("Jaj ne legyél ilyen kis szégyellős.");
			Getting_A_Tutor_2();
		},
		"Végre. Most már végre neked is kezd derengeni a dolog! Claire egyébként nekem is nagyon bejön!": function(message){
			n(message);
			Getting_A_Tutor_2();
		},
		"Már van pasim.": function(message){
			n(message);
			f("Így van fiam! Te leszel a pasija!");
			n("<i>Nekem van</i>. <i>Nekem van</i> pa--");
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
		m("We were also thinking about changing schools for Nick.");
		m("Maybe to Claire's school.");
	}
	if($.studying_subject!=$.studying_subject_2){
		m("Claire will be tutoring Nick every day after school in "+$.studying_subject+" and "+$.studying_subject_2+".");
	}else{
		m("Claire will be tutoring Nick every day after school in "+$.studying_subject+".");
	}

	f("Nick, how does all this sound? Yes or no?");
	m("He loves the ide--");
	f("Shut up, Qi. I asked my son.");
	m(". . .");

	Show("dad","dad_threat");

	f("Mister Nicklaus Liow.");
	if($.changing_schools){
		f("You want to change schools to chase your hot tutor girlfriend?");
	}else{
		f("You want to spend all your after-school hours with your hot tutor girlfriend?");
	}

	n("It's complicated, I--");
	f("No pansy middle-of-the-road answers.");
	f("Yes. Or. No.");

	n(". . .");

	Choose({
		"Yes.": Agree_With_Dad,
		"No.": Argue_With_Dad
	});

}

function Agree_With_Dad(){
	
	n("...Yes.");

	f("Hm.");
	f("You two seem to have made this big life decision very eagerly!");
	f("So eagerly, in fact, you made it in less than an hour, and tried to hide it from me. What a sudden change.");
	m(". . .");
	n(". . .");

	f("Nick, you did something naughty, didn't you?");
	f("What did you do.");

	Choose({
		"I failed my midterms.": function(message){
			
			n(message);

			f("...Oh.");
			f("Yeah, you need to get your grades back up.");

			Show("dad","dad_serious");

			f("Or you'll be stuck in a teaching job like your mother! Haha!");
			n(". . .");
			Agreeable_Ending();

		},
		"I had sex with Jack.": function(message){
			
			n(message);
			
			Show("mom","mom_cry");
			m("[sob]");
			f(". . .");
			Argument_Ending();

		},
		"I had sex with Claire.": function(message){
			
			n(message);
			
			m("...Nick!");
			f(". . .");
			f("   Nnnnnniiiiiiiiice.");
			m("...Dear!");
			f("Wait, uh, you didn't get her pregnant, did you?");
			n("No. I'm not stupid.");
			
			Show("dad","dad_serious");

			f("Good. Otherwise you'd be stuck for the next two decades raising a kid, like me! Haha!");
			n("Ha ha.");
			Agreeable_Ending();

		}
	});

}

function Agreeable_Ending(){

	$.father_oblivious = true;

	f("For a moment there, Nick, I thought you'd been smoking pot with your hippie classmate Jack, or something!");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	f("So!");
	f("Who wants to watch a movie this weekend? I hear Inception is good.");

	Choose({	
		"Let's watch it! I haven't seen it yet.": function(message){
			n(message);
			f("Then it's a plan!");
			f("Hey Nick, you know who's acting in the movie?");
			n("Um. Leonardo DiCaprio?");
			f("No no, Ellen Page.");
			f("Doesn't Claire look a little bit like her?");
			n("I guess.");
			Dinner_Ending();
		},
		"Uh... let's do a different movie...": function(message){
			n(message);
			f("What, Inception too complicated for you?");
			n("Hey...");
			if($.studying_subject!=$.studying_subject_2){
				f("Sure, I understand if you failed "+$.studying_subject+" and "+$.studying_subject_2+"...");
			}else{
				f("Sure, I understand if you failed "+$.studying_subject+"...");
			}
			f("But come on, this is a <i>movie</i>!");
			f("You can't have inherited that much stupid from your mother's side! Haha!");
			n("Ha ha.");
			Dinner_Ending();
		},
		"Oh, I already saw Inception.": function(message){
			n(message);
			f("Oh ho, I see...");
			f("You went on a little movie date with your special friend Claire, didn't you?");
			n("Yeah.");
			n("A date with my special friend.");
			Dinner_Ending();
		}
	});

}

function Argue_With_Dad(){

	n("...No.");

	f("Excuse me?");
	n("No. Mom's doing this so I can't see Jack anymore.");
	f("Jack.");
	n("My friend.");

	Choose({
		"My boyfriend.": function(message){
			
			n(message);

			Show("mom","mom_cry");
			m("[sob]");

			m("Jack did this to our son!");
			f("That kid chose his lifestyle, but I will not have it be yours, Nick.");
			Argument_Ending();
		},
		"Mom hates him, coz he happens to be gay.": function(message){

			n(message);

			Show("mom","mom_cry");
			m("[sob]");

			f("You made your mother cry.");
			if($.hippies){
				m("And his parents are drug addicts!");
			}
			f("Jack chose that lifestyle, but I will not have it be yours, Nick.");
			Argument_Ending();
		},
		"Mom hates him, coz she THINKS he's gay.": function(message){

			n(message);

			Show("mom","mom_cry");
			m("[sob]");

			m("Jack IS gay!");
			if($.hippies){
				m("And his parents are drug addicts!");
			}
			f("Jack chose that lifestyle, but I will not have it be yours, Nick.");
			Argument_Ending();
		}
	});

}

function Argument_Ending(){

	$.father_oblivious = false;

	n(". . .");

	if($.top_or_bottom=="top"){
		m("Jack acts like the woman, not him...");
	}
	switch($.what_are_you){
		case "bisexual":
			m("Nick's not fully gay, he told me himself he's still attracted to girls!");
			n(". . .");
			break;
		case "confused":
			m("Earlier Nick told me he was just confused!");
			f("Oh, clearly he is.");
			n(". . .");
			break;
		case "son":
			n("Look, like I told Mom just now, I'm your SON, isn't that enou--");
			break;
	}
	
	f("Nick, you're changing schools.");
	n(". . .");
	m("huuu... huuu... huuu...");

	f("Your mother and I will do random checks on your texts and emails.");
	n(". . .");
	m("owww... owww...");

	f("I swear, if I have to pay Claire extra to make you realize you're straight, I will.");
	n(". . .");

	Show("mom","mom_sit");
	if($.crying=="anger"){
		m("When I was crying earlier, he accused it of being fake!");
		f("Qi, shut up. We're not talking about you.");
	}
	if($.crying=="mocking"){
		m("When I was crying earlier, he was mocking it!");
		f("Qi, shut up. We're not talking about you.");
	}

	f("So Nick.");
	f("Would you like to say anything, anything at all, about all that?");

	Choose({
		"Yes. Fuck this, and fuck you.": function(message){

			n("Yes.");
			n("FUCK this.");
			n("And FUCK you.");
			
			Show("nicky","dinner_nicky_outrage");
			n("Fuck BOTH of you, you narcissistic slimy pieces of SHI--");
			
			Dinner_Ending_Punch();

		},
		"No. I accept my punishment.": function(message){

			n(message);
			f("Good. At least you're taking this like a man.");
			n(". . .");

			Show("dad","dad_serious");

			m("sniff...");
			f("I'm going out to the bar, and getting something actually edible to eat.");

			Show("dad",null);

			f("Honey sweetie dear? Your cooking is shit.");
			PlaySound("sfx","dinner_door");

			m(". . .");
			
			Show("mom","mom_cry");

			m("BAWWWWW");
			
			Dinner_Ending();

		},
		"You can't hurt me.": function(message){

			n(message);
			f(". . .");
			m("Dear, no...");
			f("Mighty strong words, son.");
			m("Honey, please don't!");
			f("At least you're standing up to me. Like a man.");
			m("Please! It's my fault! Don't--");
			f("Ice keeps the swelling down.");
			m("DEAR!");
			
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

