(function() {
	
	var app = {
		
		time : 1500,
		intervalID : null,
		step : "pomodoro",

		init : function() {
			app.listeners();
			app.displayTime();
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
				app.displayTime();
				app.time--
			}, 1000);
		},

		displayTime : function() {
			var minutes = Math.floor(app.time / 60);
			var seconds = Math.floor(app.time % 60);
			$("#minutes").html(minutes);
			$("#seconds").html(seconds);
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
			app.displayTime();
		},

		pomodoro : function() {
			app.time = 1500;
			app.displayTime();
			app.step = "pomodoro";
		},

		shortBreak : function() {
			app.time = 300;
			app.displayTime();
			app.step = "shortBreak";
		},

		longBreak : function() {
			app.time = 600;
			app.displayTime();
			app.step = "longBreak";
		}

	}

	app.init();	
})();