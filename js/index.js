/* 
카카오: ef49ff68e417124e9e441b85809adfd3


*/

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

	var $bgWrapper = $('.bg-wrapper');



	/*************** 사용자 함수 *****************/
	initBg();
	initMap();
	

	function initBg() {
		var d = new Date('2021-05-07 18:33:33');
		time = d.getHours();
		timeDivision = 
		(time >= 2 	&& time < 6	) ? 1 : 
		(time >= 6 	&& time < 10) ? 2 :
		(time >= 10 && time < 14) ? 3 :
		(time >= 14 && time < 18) ? 4 :
		(time >= 18 && time < 22) ? 5 : 6;

		for(var i=1; i<=6; i++) $bgWrapper.removeClass('active'+i);
		$bgWrapper.addClass('active'+timeDivision);
	}

	function initMap() {
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(36.239934, 127.555918),
			level: 13,
			draggable: false,
			zoomable: false,
		};

		var map = new kakao.maps.Map(container, options);
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
	}


	/*************** 이벤트 등록 *****************/



	/*************** 이벤트 콜백 *****************/


});