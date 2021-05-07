/* 
카카오: ef49ff68e417124e9e441b85809adfd3
openweathermap.com icon: http://openweathermap.org/img/wn/10d@2x.png
*/

$(function() {

	/*************** 글로벌 설정 *****************/
	var map; // kakao 지도 객체
	var time;
	var timeDivision;
	var mapCenter = {lat: 35.80, lon: 127.55}
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
	var $map = $('#map');



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
		var options = {
			center: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lon),
			level: 13,
			draggable: false,
			zoomable: false,
		};
		map = new kakao.maps.Map($map[0], options);
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
		$(window).resize(onResize).trigger('resize');
	}

	/*************** 이벤트 콜백 *****************/
	function onResize() {
		var windowHeight = $(window).innerHeight();
		var lat = (windowHeight > 800 || windowHeight < 600) ? mapCenter.lat : mapCenter.lat + 1;
		map.setCenter(new kakao.maps.LatLng(lat, mapCenter.lon));
		map.setLevel(windowHeight > 800 ? 13 : 14);
	}
	

	/*************** 이벤트 등록 *****************/

});