function Start_Dinner_1(){

	/////// SET UP SCENE ////////

	Show("background","dinner");
	Show("clock","clock_ticking",{x:155,y:294});
	Show("clock_time","clock_1855",{x:155+5,y:294+37});
	Show("nicky","dinner_nicky_sit",{x:0,y:300});
	Show("dad",null,{x:0,y:300});
	Show("mom",null,{x:0,y:300});
	Show("table","dinner_table",{x:0,y:420});

	PlaySound("clock","dinner_ticking",{loop:-1});

	////////////////////////////

	Wait(2500);
	n("Hol van mindenki?...");
	n(". . .");

	Choose({
		"Aaaaanyaa?": Waiting_1,
		"Aaaapaa?": Waiting_1,
		"Hé, valaki?": Waiting_1
	});

}

function Waiting_1(message){
	
	$.what_you_called_out = message;
	n(message);

	n(". . .");

	Choose({
		"[enni kezdesz]": function(message){
			$.waiting_action = "eat";
			Waiting_2(message);
		},
		"[tovább vársz]": function(message){
			$.waiting_action = "wait";
			Waiting_2(message);
		},
		"[játszol a kajával]": function(message){
			$.waiting_action = "play";
			Waiting_2(message);
		}
	});

}

function Waiting_2(message){
	
	n(message);
	n(". . .");

	PlaySound("clock","dinner_meowing",{loop:-1});

	Show("clock","clock_meowing");
	Show("clock_time","clock_1900");
	Wait(1000);

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Kussolj el, te kakofón kandúr!": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			if($.im_a_poet){
				m("Egy barátodtól tanulsz költészetet?");
			}else{
				m("Költői.");
			}

			Show("nicky","dinner_nicky_sit");
			n("Ó, szia anya.");
			
			Waiting_End();
		},
		"Uhh, miért vettünk mi ilyesmit?": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			m("Ezt a nagyapád adta nekünk.");

			Show("nicky","dinner_nicky_sit");
			n("Ó, szia anya.");
			
			Waiting_End();
		},
		"Miu! Miu! Miu! Miu!": function(message){
			
			n("Miu.");
			n("Miu!");

			Show("nicky","dinner_nicky_outrage");
			n("MIU!");

			Show("mom","mom_stand");

			m("Nick, mit csinálsz?...");

			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});
			Show("nicky","dinner_nicky_sit");

			n("MIUuuhh nem láttalak. Khm. Szia anya.");

			Waiting_End();
		}
	});

}

function Waiting_End(){
	Start_Dinner_2();
}
