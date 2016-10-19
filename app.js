
(function() {
	"use strict"; 
	/*
		Privilégie le ici. De cette manière, dans le scope de ta IIFE, this != window.
		A l'extérieur, le comportement peut différé.
	*/
	
	// Pour éviter de te tromper dans tes chaînes de caractères, créer des constantes
	var STEPS = {
		POMODORO : "pomodoro",
		SHORT_BREAK : "shortBreak",
		// ....
	};
	var app = {
		
		time : 1500,// Cf CodeReview https://github.com/SimplonTlse02/programme-dev-web/wiki/Semaine-07-Projets-Js-avances#mercredi
		intervalID : null,
		step : "pomodoro",

		init : function() {
			this.listeners();
			this.separateTime();
		},

		listeners : function() {
			$("#start").on("click", this.start.bind(this));
			$("#stop").on("click", this.stop.bind(this));
			$("#reset").on("click", this.reset.bind(this));
			// Bien joué avec les arguments sur le bind.
			$("#pomodoro").on("click", this.selectNextStep.bind(this, 1500, STEPS.POMODORO));
			$("#short_break").on("click", this.selectNextStep.bind(this, 300, STEPS.SHORT_BREAK));
			$("#long_break").on("click", this.selectNextStep.bind(this, 600, "longBreak"));
		},

		start : function() {
			if (!this.intervalID) {
				this.intervalID = setInterval(function() {
					this.separateTime();
					this.time--
					console.log(this.time);
					if (this.time < 0) {
						this.stop();
						this.nextStep();
					}
				}.bind(this), 1000);
			}
		},

		nextStep : function() {
			if (this.step === STEPS.POMODORO) {
				swal({ 
					title: 'Pomodoro terminé !',
					text: 'Take a break',
					type: 'success',
					confirmButtonText: 'Short break',
					showCancelButton : true,
					cancelButtonText: 'Long break',
					confirmButtonClass: 'confirm-class',
					cancelButtonClass: 'cancel-class'
				}).done();
				$(".confirm-class").on("click", this.selectNextStep.bind(this, 300, "shortBreak"));
				$(".cancel-class").on("click", this.selectNextStep.bind(this, 600, "longBreak"));
			} else if (this.step === "shortBreak" || this.step === "longBreak") {
				swal({
					title: 'The break is over !',
					text: 'You need to work now',
					type: 'error',
					confirmButtonText: 'Back to the pomodoro',
					confirmButtonClass: 'confirm-class'
				}).done();
				$(".confirm-class").on("click", this.selectNextStep.bind(this, 1500, STEPS.POMODORO));
			}
		},

		separateTime : function() {
			var minutes = Math.floor(this.time / 60);
			var seconds = Math.floor(this.time % 60);
			this.displayTime(minutes, "#minutes");
			this.displayTime(seconds, "#seconds");
		},

		displayTime : function(timeElement, selector) {
			/*
				Voir ligne 105 :
				https://github.com/jordanlefort/tomatoV2/pull/1/files
			*/
			if (timeElement < 10) {
				$(selector).html("0" + timeElement);
			} else {
				$(selector).html(timeElement);
			}
		},

		stop : function() {
			clearInterval(this.intervalID);
			this.intervalID = null;
		},

		reset : function() {
			clearInterval(this.intervalID);
			if (this.step === STEPS.POMODORO) {
				this.time = 1500;
			} else if (this.step === STEPS.SHORT_BREAK) {
				this.time = 300;
			} else {
				this.time = 600;
			}
			this.separateTime();
		},

		selectNextStep : function(timeStep, nameStep) {
			this.time = timeStep;
			console.log(this.time);
			this.separateTime();
			this.step = nameStep;
			console.log(this.step);
		}

	}

	app.init();	
})();
