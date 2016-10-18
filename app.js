
"use strict";
(function() {

	
	var app = {
		
		time : 2,
		intervalID : null,
		step : "longBreak",

		init : function() {
			app.listeners();
			app.separateTime();
		},

		listeners : function() {
			$("#start").on("click", app.start);
			$("#stop").on("click", app.stop);
			$("#reset").on("click", app.reset);
			$("#pomodoro").on("click", app.pomodoro);
			$("#short_break").on("click", app.shortBreak);
			$("#long_break").on("click", app.longBreak);
		},

		start : function() {
			app.intervalID = setInterval(function() {
				app.separateTime();
				app.time--
				console.log(app.time);
				if (app.time < 0) {
					app.stop();
					app.nextStep();
				}
			}, 1000);
		},

		nextStep : function() {
			if (app.step === "pomodoro") {
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
				$(".confirm-class").on("click", app.shortBreak);
				$(".cancel-class").on("click", app.longBreak);
			} else if (app.step === "shortBreak" || app.step === "longBreak") {
				swal({
					title: 'The break is over !',
					text: 'You need to work now',
					type: 'error',
					confirmButtonText: 'Back to the pomodoro',
				}).done();
				app.pomodoro();
			}
		},

		separateTime : function() {
			var minutes = Math.floor(app.time / 60);
			var seconds = Math.floor(app.time % 60);
			app.displayTime(minutes, "#minutes");
			app.displayTime(seconds, "#seconds");
		},

		displayTime : function(timeElement, selector) {
			if (timeElement < 10) {
				$(selector).html("0" + timeElement);
			} else {
				$(selector).html(timeElement);
			}
		},

		stop : function() {
			clearInterval(app.intervalID);
		},

		reset : function() {
			clearInterval(app.intervalID);
			if (app.step === "pomodoro") {
				app.time = 1500;
			} else if (app.step === "shortBreak") {
				app.time = 300;
			} else {
				app.time = 600;
			}
			app.separateTime();
		},

		pomodoro : function() {
			app.time = 1500;
			app.separateTime();
			app.step = "pomodoro";
		},

		shortBreak : function() {
			app.time = 300;
			app.separateTime();
			app.step = "shortBreak";
		},

		longBreak : function() {
			app.time = 600;
			app.separateTime();
			app.step = "longBreak";
		}

	}

	app.init();	
})();