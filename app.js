
(function() {
	"use strict"; 
	
	var steps = {
		pomodoro : "pomodoro",
		shortBreak : "shortBreak",
		longBreak : "longBreak"
	};

	var app = {		
		timeSeconds : 1500,
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
			$("#pomodoro").on("click", this.selectNextStep.bind(this, 1500, steps.pomodoro));
			$("#short_break").on("click", this.selectNextStep.bind(this, 300, steps.shortBreak));
			$("#long_break").on("click", this.selectNextStep.bind(this, 600, steps.longBreak));
		},

		start : function() {
			if (!this.intervalID) {
				this.intervalID = setInterval(function() {
					this.separateTime();
					this.timeSeconds--
					console.log(this.timeSeconds);
					if (this.timeSeconds < 0) {
						this.stop();
						this.nextStep();
					}
				}.bind(this), 1000);
			}
		},

		nextStep : function() {
			if (this.step === steps.pomodoro) {
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
				$(".confirm-class").on("click", this.selectNextStep.bind(this, 300, steps.shortBreak));
				$(".cancel-class").on("click", this.selectNextStep.bind(this, 600, steps.longBreak));
			} else if (this.step === "shortBreak" || this.step === "longBreak") {
				swal({
					title: 'The break is over !',
					text: 'You need to work now',
					type: 'error',
					confirmButtonText: 'Back to the pomodoro',
					confirmButtonClass: 'confirm-class'
				}).done();
				$(".confirm-class").on("click", this.selectNextStep.bind(this, 1500, steps.pomodoro));
			}
		},

		separateTime : function() {
			var minutes = Math.floor(this.timeSeconds / 60);
			var seconds = Math.floor(this.timeSeconds % 60);
			this.displayTime(minutes, "#minutes");
			this.displayTime(seconds, "#seconds");
		},

		displayTime : function(timeElement, selector) {
			if (timeElement < 10) {
				timeElement = "0" + timeElement;
			} 
			$(selector).html(timeElement);
		},

		stop : function() {
			clearInterval(this.intervalID);
			this.intervalID = null;
		},

		reset : function() {
			clearInterval(this.intervalID);
			if (this.step === steps.pomodoro) {
				this.timeSeconds = 1500;
			} else if (this.step === steps.shortBreak) {
				this.timeSeconds = 300;
			} else {
				this.timeSeconds = 600;
			}
			this.separateTime();
		},

		selectNextStep : function(timeStep, nameStep) {
			this.timeSeconds = timeStep;
			this.separateTime();
			this.step = nameStep;
		}

	}

	app.init();	
})();
