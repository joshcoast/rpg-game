window.onload = function() {
  // Select fighters
  $(".avatar-shelf div.avatar").click(starWars.selectAvatar);
  $(".avatar-shelf").on("click", "div.avatar", starWars.selectAvatar);
  $(".attack-button").click(starWars.fight);
  $("body").on("click", ".reset-button", starWars.resetGame);
};

// Create Avatar Objects
var avatar0 = {
  name: "Obi-Wan Kenobi",
  hitPoints: 25,
  damage: 6,
  counterAttack: 15,
  imagePath: "assets/images/obi.png",
  cssClass: "avatar-obi",
  dataAttr: "avatar0",
  pronoun: "His"
};
var avatar1 = {
  name: "Darth Vader",
  hitPoints: 150,
  damage: 6,
  counterAttack: 15,
  imagePath: "assets/images/darth.png",
  cssClass: "avatar-darth",
  dataAttr: "avatar1",
  pronoun: "His"
};
var avatar2 = {
  name: "Princes Leia",
  hitPoints: 175,
  damage: 6,
  counterAttack: 15,
  imagePath: "assets/images/princes-leia.png",
  cssClass: "avatar-leia",
  dataAttr: "avatar2",
  pronoun: "Her"
};
var avatar3 = {
  name: "R2-D2",
  hitPoints: 200,
  damage: 6,
  counterAttack: 15,
  imagePath: "assets/images/r2d2.png",
  cssClass: "avatar-r2d2",
  dataAttr: "avatar3",
  pronoun: "Its"
};
var avatar4 = {
  name: "Storm Trouper",
  hitPoints: 925,
  damage: 6,
  counterAttack: 15,
  imagePath: "assets/images/storm.png",
  cssClass: "avatar-obi",
  dataAttr: "avatar4",
  pronoun: "His"
};
var allAvatars = [avatar0, avatar1, avatar2, avatar3, avatar4];

var starWars = {
  // initialize settings
  activeUserAvatar: "avatar0",
  activeOpponentAvatar: "avatar0",
  firstPick: true,
  fightActive: false,
  userDamage: 0,
  userHP: 0,
  opponentDamage: 0,
  opponentHP: 0,

  // -- Reset Game
  resetGame: function() {
    starWars.activeUserAvatar = "avatar0";
    starWars.activeOpponentAvatar = "avatar0";
    starWars.firstPick = true;
    starWars.fightActive = false;
    (starWars.userDamage = 0),
		(starWars.userHP = 0),
		(starWars.opponentDamage = 0),
		(starWars.opponentHP = 0),
		$(".fighting-ring").addClass("hide");
    $(".shelf-title").text("Choose Your Fighter");
    $(".avatar-shelf > div").empty();
    $(".active-user-fighter").empty();
    $(".active-opponent-fighter").empty();
    starWars.buildShelf();
  },

  // -- Return html for an avatar object
  buildAvatarHTML: function(theAvatar) {
    return (
      '<div class="col avatar ' +
      theAvatar.cssClass +
      '" data-avatar="' +
      theAvatar.dataAttr +
      '"> <div class="hit-points">' +
      theAvatar.hitPoints +
      '</div> <img src="' +
      theAvatar.imagePath +
      '"> <span>' +
      theAvatar.name +
      "</span> </div>"
    );
  },

  // -- Place avatars for selection
  buildShelf: function() {
    for (var i = 0; i < allAvatars.length; i++) {
      $(".avatar-shelf > div").append(starWars.buildAvatarHTML(allAvatars[i]));
    }
  },

  // -- Select Avatars
  selectAvatar: function() {
    if (starWars.firstPick) {

      // Select User Fighter
      starWars.activeUserAvatar = $(this).data("avatar");
      starWars.activeUserAvatar = allAvatars[starWars.getAvatarIndex(starWars.activeUserAvatar)];
      $(this).remove().appendTo(".active-user-fighter");
      $(".shelf-title").text("Choose an Opponent");
			$(".fighting-ring").removeClass("hide");
			starWars.userDamage = starWars.activeUserAvatar.damage;
			starWars.userHP = starWars.activeUserAvatar.hitPoints;
      starWars.firstPick = false;
    } else if (!starWars.fightActive) {

      // Select Opponent
      starWars.activeOpponentAvatar = $(this).data("avatar");
      starWars.activeOpponentAvatar = allAvatars[starWars.getAvatarIndex(starWars.activeOpponentAvatar)];
      $(this)
        .remove()
				.appendTo(".active-opponent-fighter");
			starWars.opponentHP = starWars.activeOpponentAvatar.hitPoints;
      starWars.fightActive = true;
    } else {
			
      // Show alert to fight first
      starWars.alertDanger("Time for fighty fighty first!");
    }
  },

  getAvatarIndex: function(objName) {
    var avatarIndex = objName.substr(objName.length - 1);
    return avatarIndex;
  },

  // -- Fight
  fight: function() {
    if (starWars.fightActive) {

      // Attack
      starWars.userDamage = starWars.userDamage + starWars.activeUserAvatar.damage;
      console.log(starWars.userDamage);
      starWars.opponentHP = starWars.opponentHP - starWars.userDamage;
      $(".active-opponent-fighter .hit-points").text(starWars.opponentHP);

      // Counter Attack
      starWars.userHP = starWars.userHP - starWars.activeOpponentAvatar.counterAttack;
      $(".active-user-fighter .hit-points").text(starWars.userHP);

      // Test for Dead
      if (starWars.userHP < 0) {
        // user has lost
				starWars.alertDanger(starWars.activeUserAvatar.name + " is DEAD. (uh, that's you) " + starWars.activeUserAvatar.pronoun + " family will be sad. Thoughts and prayers. Now, try again.");
				starWars.resetGame();
      } else if (starWars.opponentHP < 0) {
        // opponent has lost
				starWars.alertDanger(starWars.activeOpponentAvatar.name + " is DEAD. " + starWars.activeOpponentAvatar.pronoun +" family will be sad.");
				$(".active-opponent-fighter").empty();
				starWars.fightActive = false;
				starWars.opponentHP = 0;
      }
    } else {
      starWars.alertDanger("Pick someone to fight first!");
    }
	},

	alertDanger: function(message) {
    $(".alert-danger")
      .text(message)
      .removeClass("hide");
    setTimeout(function() {
      $(".alert-danger").addClass("hide");
    }, 4000);
  },

};

starWars.buildShelf();
