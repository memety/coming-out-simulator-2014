// PLOT BEATS:
// 1) In medias res talking about Inception
// 2) Thanks for movie, we still up to stay over tomorrow night?
// 3) You need to stop hiding... // Can't even CALL.
// Weave in previous bits of convo pieces.
// Also, FULL CIRCLE with the Inception!
// OKAY, TOO CONVOLUTED, CUT OUT THE DIFFERENT FAMILIES & TYPO parts.

function Start_Jack_1(){
	
	/////// SET UP SCENE ////////

	Show("background","bedroom");
	Show("us","bedroom_us_1");
	Show("light","bedroom_light_1",{x:0,y:159});

	PlaySound("bg","bedroom_1",{loop:-1});

	/////////////////////////////

	j("És amikor csak így egyszerűen kijelentette, hogy");
	j("'Vettem egy légitársaságot';");
	j("...az valami zseniális volt!");
	n("Jaa, szóval ezt mondta!");
	n("Én lemaradtam róla, de a nézőtéren mindenki ezen röhögött.");
	j("Akkor vagy nézd ezentúl felirattal a filmeket, vagy pedig moss fület gyakrabban.");
	j("Tényleg, te hogyan értelmezted a pörgettyűs jelenetet a végén? Szerinted azt is csak álmodta, vagy pedig már ébren volt?");

	Choose({
		"Csak álmodta.": Inception_Dream,
		"Szerintem az már a valóságban történt.": Inception_Awake,
		"Nem számít. A lényeg, hogy újra együtt voltak.": Inception_Neither
	});

}

function Inception_Dream(message){

	$.inception_answer = "dream";

	n(message);
	j("Szóval szerinted Saito ajánlata a körözés megszűntetéséről csak hazugság volt?");
	n("Egy nagy, kövér hazugság.");
	j("Kicsit depressziós vagy, nem?");

	Choose({
		"A szívem szinte szétszakad a szüntelen szenvedéstől.": Sadsack,
		"Általában... kivéve, amikor veled vagyok.": function(message){
			$.im_a_poet = true;
			
			n(message);
			j("Jaj Nicky, te kis amatőr költő.");
			n("Hozz francia bagettet és bort, hogy igazán sznob lehessek,");
			n("...mert ez lesz a legfennköltebb dolog, amit valaha mondtam.");
			n("Egyébként...");
			Thanks();
		},
		"Csak szimplán realista vagyok.": function(message){
			$.hippies = true;

			n(message);
			j("Próbáld meg pozitívabban látni a világot.");
			n("Te pedig próbálj meg kevésbé hippi lenni.");
			n("Egyébként...");
			Thanks();
		}
	});

}
function Inception_Awake(message){

	$.inception_answer = "awake";
	$.im_a_poet = true;

	n(message);
	n("Ellenkező esetben az egész film hazugság lenne.");
	n("És mi értelme egy hazugságban leélt életnek?");
	j("Jaj Nicky, te kis amatőr költő.");
	j("Tényleg, összességében hogy tetszett a film?");

	Choose({
		"Jaaaaj, nagyon!": function(message){
			n(message);
			Thanks();
		},
		"Mehhh, hát néhányszor eléggé felkavaró volt.": function(message){
			n(message);
			j("Szerintem ez volt a cél.");
			n("Akkor küldetés teljesítve.");
			n("Egyébként...");
			Thanks();
		},
		"BWOOOOOOOOOOONG": function(message){
			n(message);
			j("Ezt igenként értelmezem.");
			n("Egyébként...")
			Thanks();
		}
	});

}
function Inception_Neither(message){

	$.inception_answer = "neither";

	n(message);
	j("Hmm?");
	n("Nem is érdekelte, hogy eldől-e a toteme.");
	n("Hazugság vagy igazság... Cobbsot már nem érdekelte.");
	n("Végre boldog volt, csak ez számított.");
	j("Vagy nagyon költői vagy, vagy nagyon depresszív.");

	Choose({
		"I'm a poet, and I didn't even know it.": function(message){

			$.im_a_poet = true;

			n("I'm a poet,");
			n("and I wasn't even aware of the fact.");
			j("You're a lyrical miracle, the evidence is empircal.");
			n("That's hysterical.");
			n("Anywho...");
			Thanks();

		},
		"Nah, I'm just a sad sack of sadness.": Sadsack,
		"Or both.":function(message){

			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("POETRY IS PAIN. ART IS SUFFERING.");
			j("You sound like my mother.");
			n("Your parents are <i>such</i> new-age hippies.");
			n("Anywho...");
			Thanks();

		}
	});

}

function Sadsack(message){
	
	$.sadsack = true;

	n(message);
	j("Aw, sorry to hear that.");
	j("I hope our little date at the movies cheered you up?");
	n("Sure did!");
	Thanks();

}

function Thanks(){
	
	n("...szeretném megköszönni, hogy rábeszéltél végül az Eredetre.");
	j("Enyém az öröm.");
	j("Különben meg kellene csinálnod az Eredet paródiáját egy ilyen webes játékban!");
	n("Hmm, végülis...");
	n("Vagy inkább találkozzunk holnap este!");

	j("Hát...");
	n("Remélem meg tudom győzni anyámékat, hogy engedjenek ki éjszakára is.");

	j("Remélem nem azt mondtad nekik megint, hogy csak tanultunk, miközben moziban voltunk.");
	n("Majd úgy teszek, mintha egész éjjel a félévi vizsgákra készültünk volna, jó?");

	j("Egy ilyen kaliberű dologról nem hazudhatsz akármeddig.");
	n("Jack...");

	Choose({
		"Ők sohasem tudhatják meg.": function(message){
			$.coming_out_readiness="no";
			n(message);
			j("Nicky, most komolyan; soha?");
			Hiding();
		},
		"Bár elmondhatnám nekik az igazat.": function(message){
			$.coming_out_readiness="yes";
			n(message);
			Hiding();
		},
		"Még nem készültem fel rá, hogy beavassam őket.": function(message){
			$.coming_out_readiness="maybe";
			n(message);
			j("Szívesen segítek benne, ha gondolod.");
			Hiding();
		}
	});

}

function Hiding(){

	j("Nicky, ez a rejtőzködés felemészti a lelked is.");

	if($.inception_answer=="awake"){
		j("Ahogy te is mondtad az előbb, 'mi értelme egy hazugságban leélt életnek'?");
	}
	if($.inception_answer=="dream"){
		j("Ez így nem egy... hogy is mondtad az előbb? Nem egy nagy, kövér hazugság?");
	}

	if($.sadsack){
		j("Az előbb azt mondtad, hogy a szíved szétszakad a szenvedéstől.");
		j("Tudom, hogy nem csak vicceltél.");
	}

	n("Jaj Jack, ugyan már...");
	j("Én már előbújtam a szüleimnek tavaly.");
	if($.hippies){
		n("That's NOT a fair comparison.");
		n("LIKE I SAID, you and your parents are a bunch of new-age hippies.");
		n("When I'm at your place, I can't tell if all the smoke is incense or marijuana.");
		j("Hey! We only smoke weed every other day!");
		n("Heh.");
		j("The point is, my parents supported my coming out.");
	}else{
		j("And they were very supportive!");
	}

	j("You're in Canada now. A lot of people here are LGBT friendly.");
	j("How do you know your parents won't be supportive of you, too?");

	Choose({
		"Asian parents are usually very homophobic.": Hiding_2,
		"I don't know... I guess I haven't tried...": Hiding_2,
		"They don't support anything but STUDYING.": Hiding_2
	});

}

function Hiding_2(message){
	
	n(message);

	if($.coming_out_readiness=="no"){
		n("Again... They can never, ever know.");
	}

	j("You have trust issues.");
	j("You're even texting me instead of calling...");
	j("...because you think your parents might listen in.");

	n("They would!");

	j("This mode of communication.");
	j("It's imprecise, impersonal, impossible to truly connect.");

	if($.im_a_poet){
		n("Heh. You're an amateur poet like me, apparently.");
	}else{
		n("It's not too bad...");
	}

	if($.coming_out_readiness=="yes"){
		j("You yourself just said you wish you could tell them.");
		j("Tell them.");
	}else{
		j("Nicky.");
	}
	j("Tell them about us. Tonight.");

	Choose({
		"Tonight?! Heck no.": Hiding_3,
		"Sigh... I'll try my best.": Hiding_3,
		"I'll just carefully hint at it.": Hiding_3
	});

}

function Hiding_3(message){
	
	n(message);
	j(". . .");
	n("I don't want to freak them out too much.");
	n("Still need to convince them to let me stay at your place tomorrow night.");
	n("I'll tell 'em I'm studying with you again.");
	j(". . .");
	n("It's dinnertime. I'm heading downstairs now.");

	j("Hey... I agree.");
	n("Huh?");
	j("With your thoughts on the movie ending, that is.");
	switch($.inception_answer){
		case "dream": j("I think Cobbs was still dreaming, living a lie."); break;
		case "awake": j("I think Cobbs reconnected with his real family, in the real world."); break;
		case "neither": j("I think it doesn't matter, as long as Cobbs is happy."); break;
	}
	n("Oh.");
	j("Okay.");
	if($.coming_out_readiness=="maybe"){
		j("Hope you changed your mind about being 'not ready to tell them yet'.");
	}
	j("Good luck. Text me in an hour.");

	var insult = "";
	if($.hippies) insult+=" new-age hippie";
	if($.im_a_poet) insult+=" amateur poet";
	n("See ya.");
	if(insult!=""){
		n("You"+insult+".");
	}else{
		n("You goof.");
	}

	Jack_1_End();

}

function Jack_1_End(){
	Clear();
	Start_Dinner_1();
}
