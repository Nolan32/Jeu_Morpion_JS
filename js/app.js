function afficheJeu(morpArr){
	//vide le contenu des td
	$('table td').html('&nbsp');

	for(var yy =0; yy < morpArr.length; yy++){
		for(var xx = 0; xx< morpArr[yy].length;xx++){
			if(morpArr[yy][xx]!== 0){
				var valString = xx+''+yy;
				$("table td[value='"+valString+"']").html(morpArr[yy][xx]);
			}
		}
	}
}

function checkVictory(morpArr,indJoueur,joueurArr){

	//check ligne
	var ligne1 = morpArr[0].join('');
	var ligne2 = morpArr[1].join('');
	var ligne3 = morpArr[2].join('');

	// check colonne;
	var col1 = morpArr[0][0]+""+morpArr[1][0]+""+morpArr[2][0];
	var col2 = morpArr[0][1]+""+morpArr[1][1]+""+morpArr[2][1];
	var col3 = morpArr[2][0]+""+morpArr[2][1]+""+morpArr[2][2];

	//check Diag

	var diag1 = morpArr[0][0]+""+morpArr[1][1]+""+morpArr[2][2];
	var diag2 = morpArr[2][0]+""+morpArr[1][1]+""+morpArr[0][2];
	// console.log(ligne1);

	// je les mets tous dans n tableau pour les testé a la suite avec include
	var patternArr = [ligne1,ligne2,ligne3,col1,col2,col3,diag1,diag2];

	//le pattern a verifier en fonction du tour du joueur: soit "XXX" ou "OOO"
	var patternToCheck = joueurArr[indJoueur]+""+joueurArr[indJoueur]+""+joueurArr[indJoueur];

	for(var i = 0; i<patternArr.length;i++){
		if(patternArr[i].includes(patternToCheck)){
			return true;
		}
	}

	return false;


}


function bindClick(){
	$('table td').click(function(){
		//determine qu'elle joueur c'est
		var indJoueur= (counter %2 ===0) ? 0 : 1;


		//je recupere mon champ value dans la balise et extrait le premier et deuxieme caractere [0],  [1]
		var posVal = $(this).attr('value');
		var clPosX = posVal[0];
		var clPosY = posVal[1];

		// je me sert d'eux comme index pour chercher la bonne case de mon tableau result[]
		result[clPosY][clPosX] = joueurArr[indJoueur];


		afficheJeu(result);
		$('#compteurTitr').html(counter);

		if(checkVictory(result,indJoueur,joueurArr)){
			alert("joueur "+(indJoueur+1)+" gagne");
			//TODO reset game
			document.location.reload();
		}
		// console.log(counter);
		// console.log(joueur);
		counter++

		//je retire le listenr de ce td, empeche donc de placer deux pions sur la meme case 
		$(this).off();
	});

}
function reset(){
	counter = 0;

	 result= [[0,0,0],
			 [0,0,0],
			 [0,0,0]];

	afficheJeu(result);
	bindClick();
	$('#compteurTitr').html(counter);
}




	var counter =0;	//compteur de tour
	var joueurArr = ['X','O'];
		// joueur 2 affichera O sur ces cases

		//univers de jeu
	var  result= [[0,0,0],
				  [0,0,0],
				  [0,0,0]];
$(document).ready(function(){
	// definition des variable global 

	/// j'ai un peu changer ca pour un tableau de joueur je me sert de l'indice du tableau que j'obtiens grace a ta condition ternaire 
	var joueur;		// joueur a qui c'est le tour de jouer
	var p1 ="X";	// joueur 1 affichera X sur ces cases
	var p2 ="O";




	//reset button listener
	$('#resBut').on('click', function(){
		reset();
	})

	//premiere fonction qui definira le tour des joueur impair sera P1/pair sera P2
	bindClick();

	
});//documents ready


//deuxieme fonction qui creera un tableau en html 3 sur 3

// $('button').click(function(){
	// var buttonL= parseInt($('tbody'))
	// var buttonC= parseInt($('tfoot'))








// });









