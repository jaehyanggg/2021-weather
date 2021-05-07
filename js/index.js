$(function() {

	/*************** 글로벌 설정 *****************/
	var time;
	var timeDivision;
	var weatherIcon = {
		i01d: 'bi-brightness-high',
		i02d: 'bi-cloud-sun',
		i03d: 'bi-cloud',
		i04d: 'bi-clouds',
		i09d: 'bi-cloud-rain-heavy',
		i10d: 'bi-cloud-drizzle',
		i11d: 'bi-cloud-lightning',
		i13d: 'bi-cloud-snow',
		i50d: 'bi-cloud-haze',
	}

	var $stageWrapper = $('.stage-wrapper');



	/*************** 사용자 함수 *****************/
	init();
	function init() {
		initBg();
	}

	function initBg() {
		var d = new Date();
		time = d.getHours();
		timeDivision = 
		(time >= 2 	&& time < 6	) ? 1 : 
		(time >= 6 	&& time < 10) ? 2 :
		(time >= 10 && time < 14) ? 3 :
		(time >= 14 && time < 18) ? 4 :
		(time >= 18 && time < 22) ? 5 : 6;

		for(var i=1; i<=6; i++) $stageWrapper.removeClass('active'+i);
		$stageWrapper.addClass('active'+timeDivision);
	}


	/*************** 이벤트 등록 *****************/



	/*************** 이벤트 콜백 *****************/


});