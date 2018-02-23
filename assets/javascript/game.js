// Declaring Variables
var userHitPoints;
var opponentHitPoints;
var userAttackDamage;
var opponentAttackDamage;
var opponentsLeft;

// -- Reset Game
	// Move all avatars back to choose-your-fighter area
	// Display Instructions
	// Reset all Variables
	// attack-button becomes inactive
	// remove reset button

// -- Select your avatar
	// On click moves avatar to active-user-fighter area
	// All other avatars move to pick-a-fight area
var selectYourAvatar = {
	clickAvatar: function() {
		$('.choose-your-fighter div[class*="avatar"]').on('click', function(){
			$(this).addClass('itsmememe');
			var element = $(this).detach();
			$('.active-user-fighter').append(element);
			$('.fighting-ring').show();
		})
	}
};

selectYourAvatar.clickAvatar();

// -- Select your opponent
	// Onclick moves that avatar to active-opponent-fighter
	// attack-button becomes active

// -- Fight
	// -- Onclick attack-button 
	  // remove userAttackDamage from opponentHitPoints
		// add points to userAttackDamage
		// remove opponentAttackDamage from userHitPoints
		// if userHitPoints < 0 then run Loose
		// elseif opponentHitPoints < 0 then run Win
		// else display stats
	
// -- Win
  // display win message
	// if opponentsLeft > 0 run Select your opponent
	// else display You Win message and reset button

// -- Loose
	// display Loose message
	// display reset button
