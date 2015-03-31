// Denounement
// j("That mode of communication?"); j("It's imprecise, impersonal, impossible to truly connect.");

// Recap what happened.
// Who's to blame.
// All coming towards --> Break up now, or try to stay together?

// Love you, X. Love you, Y.
// IMMEDIATELY CUT TO NOW - WE BROKE UP.

function Start_Jack_2(){

	/////// SET UP SCENE ////////

	Show("background","bedroom_2");
	Show("us","bedroom_us_2");
	Show("light","bedroom_light_2",{x:0,y:159});

	PlaySound("bg","bedroom_2",{loop:-1,volume:0.5});

	if($.punched){
		Show("punch","bedroom_punch",{x:256,y:404});
	}

	/////////////////////////////

	n("Szia.");
	if($.sadsack){
		j("Szia drága. Még mindig szét szeretne szakadni a szíved?");
	}else{
		j("Szia drága.");
	}
	j("Milyen volt előbújni a szüleidnek? Megmondtam, vagy megmondtam?");

	Choose({
		"Jack... ezt rohadtul elbasztuk.": function(message){
			n(message);
			j("Ne. Ne ne ne...");
			j("Csak viccelsz, ugye? Mi történt?");
			What_Happened();
		},
		"Csak egyszerűen szarul alakultak a dolgok.": function(message){
			n(message);
			j("Jaj, nagyon sajnálom.");
			j("Nem számítottam rá, hogy így lesz, mert... mi történt?");
			What_Happened();
		},
		"Fogd be, Jack.": function(message){
			n(message);
			j("Hoppá, ez az, tudtam, hogy igazam lesz!");
			n("Nem. Jack, többé nem találkozhatunk.");
			j("Várj. Mi?!");
			j("Nenenenene, csak viccelsz, ugye? Mi történt?");
			What_Happened();
		}
	});

}

function What_Happened(){

	if($.punched){
		Choose({
			"Apám lekevert egyet.": What_Happened_Abuse,
			"Arra kényszerítenek, hogy iskolát váltsak.": What_Happened_School,
			"Elolvasták az összes üzenetemet.": What_Happened_Texts
		});
	}else if($.father_oblivious==false){
		Choose({
			"Fenyegettek és üvöltöztek velem.": What_Happened_Abuse,
			"Arra kényszerítenek hogy iskolát váltsak.": What_Happened_School,
			"Elolvasták az összes üzenetemet.": What_Happened_Texts
		});
	}else{
		n("Nos, apám még csak elfelejti. De anyám...");
		if($.changing_schools){
			Choose({
				"Arra kényszerít, hogy iskolát váltsak.": What_Happened_School,
				"Össze akar hozni egy lánnyal, akit még sose láttam.": What_Happened_Girl,
				"Elolvasta az összes üzenetemet.": What_Happened_Texts,
			});
		}else{
			Choose({
				"Arra kényszerít, hogy az összes szabadidőmben korrepetálásra járjak.": What_Happened_School,
				"Össze akar hozni egy lánnyal, akit még sose láttam.": What_Happened_Girl,
				"Elolvasta az összes üzenetemet.": What_Happened_Texts,
			});
		}
	}

}

function What_Happened_Abuse(message){
	$.told_jack = "abuse";

	n(message);
	j("Jesszus!");
	j("Nicky, szólnod kell a gyámügyeseknek.");
	n("Mi?! Dehogy. Nem akarom ennyire felfújni a dolgot.");
	j("Oké, de akkor ígérd meg, hogy legalább az iskolapszichológussal beszélsz.");
	n("Megígérem.");
	j(". . .");
	What_Happened_2();
}
function What_Happened_School(message){
	$.told_jack = "school";

	n(message);
	j("Ne, ezt nem tehetik meg!");
	j("Miért?! Mégis mivel indokolják?");
	n("Mert szerintük te és az iskola légköre rossz hatással van rám - vagy valami ilyesmi.");
	n("Igazából csak szét akarnak választani minket.")
	j("Ez borzalmas...");
	What_Happened_2();
}
function What_Happened_Girl(message){
	$.told_jack = "girl";

	n(message);
	j("Ne már, komolyan?");
	n("A csaj neve Claire Akármi. Ő fog korrepetálni.");
	j("Tényleg azt akarják, hogy felszedd a saját korrepetálótanárod?");
	n("Ja."); 
	What_Happened_2();
}
function What_Happened_Texts(message){
	$.told_jack = "texts";

	n(message);
	j("Ez az egész rohadtul durva!");
	j("Várj, akkor ezekkel az üzenetekkel mi lesz?");
	n("Jobban elzárom őket előlük. Anyámék teljesen tech-analfabéták.");
	j("...ez akkor is nagyon durva.");
	What_Happened_2();
}

function What_Happened_2(){
	
	n("És ez még csak az egyik a három nagyon pocsék dologból.");
	j("Nicky...");
	j("Rettentően sajnálom.");
	j("Az én hibám. Én vettelek rá erre az egész hülyeségre. Kretén vagyok.");

	Choose({
		"Ja, tényleg kretén vagy.": function(message){
			$.blame = "jack";

			n(message);
			n("Ha nem jössz azzal, hogy 'ó Nicky, ez jót tenne a a lelkednek is', ez az egész nem következik be...");
			j(". . .");
			n("Sajnálom. Te vagy az egyetlen, akin kitölthetem a dühömet.");
			n("Hát nem egy elbaszott helyzet ez?");
			What_Now();
		},
		"Nem, ez az Ő HIBÁJUK.": function(message){
			$.blame = "parents";

			n(message);
			n("Miután elolvasták az üzeneteimet, mindegy lett volna, mit mondok.");
			if($.told_jack!="texts"){
				j("Várj! Nem is mondtad, hogy elolvasták az üzeneteidet!");
			}else{
				j("Megrekedtek a borzalmasan ódivatú erkölcseiknél; ez szánalmas.");
				n("Valahogy nem tudom őket sajnálni.");
			}
			What_Now();
		},
		"Nem, ez az én hibám.": function(message){
			$.blame = "nicky";

			n(message);
			n("Le kellett volna zárnom a telefonomat, vagy kódolni a beszélgetést, vagy csak jobban elrejteni előlük...");
			if($.told_jack!="texts"){
				j("Az üzeneteidet is elolvasták?");
			}
			j("Nicky, jogod van megbízni bennük, mégiscsak a szüleid. Ők pedig visszaéltek ezzel. De ez nem a te hibád.");
			n("Ja...");
			What_Now();
		}
	});

}

function What_Now(){

	j(". . .");

	n("Tudod, beszélgetni a szüleiddel...");
	n("Ez egy módja a kommunikációnak, ugye?");
	n("Egy üres, jellegtelen, érzéketlen és pontatlan formája.");

	j(". . .");
	j("Most mi lesz?");

	Choose({
		"Szabotálni fogom a szüleim terveit.": function(message){
			n(message);

			if($.told_jack=="texts"){
				n("Csinálok egy új email-t és egy virtuális számot a telefonomra.");
				n("Így többé nem olvasgathatnak bele a beszélgetéseinkbe.");
			}else if($.told_jack=="girl"){
				n("Mindent elmondok Claire-nek. Kis szerencsével talán segít visszavágni.");
			}else{
				n("Csak még ki kell találnom, hogyan...");
			}

			What_Now_2();
		},
		"Holnap meglátogatom az iskolapszichológust.": function(message){
			n(message);

			if($.told_jack=="abuse"){
				n("Ahogy ígértem. Illetve ahogy megígértetted velem.");
			}else if($.told_jack=="school"){
				n("Már a jelenlegi iskolámban persze. Fogalmam sincs, hová íratnak majd át.");
			}else{
				n("Legalább akkor lesz valaki, akin nyugodtan kitölthetem a dühömet.");
			}

			What_Now_2();
		},
		"Lelépek innen.": function(message){
			n(message);

			n("Persze nem elmenekülni akarok. Bár ha megtenném, összeomlanának.");
			n("De tényleg be kell kerülnöm egy bentlakásos iskolába, vagy egy kollégiumba, lehetőleg Amerikában.");
			n("Hogy minél messzebb lehessek ezektől az emberektől.");
			What_Now_2();
		}
	});

}

function What_Now_2(){

	j("Nem, én nem így értettem... Mi lesz velünk?");
	n("Jack...");
	j("Mit tegyünk? Hogyan tovább?");
	n(". . .");

	Choose({
		"Szakítanunk kell.": function(message){
			$.breaking_up_soon = true;

			n(message);

			j("Nenenene...");
			n("Nem tudom ezt tenni veled, Jack. Nem akarlak lehúzni magammal.");
			j("Legalább ne kérd, hogy 'maradjunk barátok'.");
			n("de maradjunk b--");
			n(". . .");
			j("Mert amúgy is azok vagyunk. Tényleg.");
			n(". . .");
			What_Now_3();
		},
		"Együtt maradunk, amíg csak tudunk.": function(message){
			n(message);

			j(". . .");
			j("Amíg csak tudunk.");
			n(". . .");
			What_Now_3();
		},
		"Nem tudom.": function(message){
			$.breaking_up_soon = true;

			n(message);

			j(". . .");
			What_Now_3();
		}
	});

}

function What_Now_3(){

	n("Késő van.");
	n("Most egy hatalmas alvásra van szükségem.");
	j("Oké.");
	j(". . .");
	j("Szeretlek, Nicky.");
	n("Én is szeretlek, Jack.");
	
	var insult = "";
	if($.hippies) insult+=" kis hippi";
	if($.im_a_poet) insult+=" amatőr költők gyöngye";
	if(insult!=""){
		n("Te"+insult+".");
	}else{
		n("Te gyagyás.");
	}

	The_Game_Ends();

}

function The_Game_Ends(){
	Wait(500);
	Start_Outro();
}

