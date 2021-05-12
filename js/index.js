/* 
카카오: ef49ff68e417124e9e441b85809adfd3
openweathermap.com icon: http://openweathermap.org/img/wn/10d@2x.png
*/

$(function() {

	/*************** 글로벌 설정 *****************/
	var map; // kakao 지도 객체
	var time;
	var timeDivision;
	var mapCenter = { lat: 35.80, lon: 128.7 }
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
	var dailyURL = 'https://api.openweathermap.org/data/2.5/weather';
	var weeklyURL = 'https://api.openweathermap.org/data/2.5/forecast';
	var sendData = { appid: '02efdd64bdc14b279bc91d9247db4722', units: 'metric' };
	var defPath = '//via.placeholder.com/40x40/c4f1f1?text=%20';

	var $bgWrapper = $('.bg-wrapper');
	var $map = $('#map');



	/*************** 사용자 함수 *****************/
	initBg();
	initMap();
	

	function initBg() {
		var d = new Date();
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

		// 윈도우 사이즈가 변경될 때 지도 중심 맞추기
		$(window).resize(onResize).trigger('resize');

		// 도시정보 가져오기
		$.get('../json/city.json', onGetCity)
	}

	// openweathermap의 icon 가져오기
	function getIcon(icon) {
		return '//openweathermap.org/img/wn/' + icon + '@2x.png';
	}
	

	/*************** 이벤트 콜백 *****************/
	function onGetCity(r) {
		r.city.forEach(function(v, i) {
			var content = '';
			content += '<div class="co-wrapper '+(v.minimap ? '' : 'minimap')+'" data-lat="'+v.lat+'" data-lon="'+v.lon+'">';
			content += '<div class="co-wrap '+(v.name == '독도' || v.name == '울릉도' ? 'dokdo' : '')+'">';
			content += '<div class="icon-wrap">';
			content += '<img src="'+defPath+'" class="icon w-100">';
			content += '</div>';
			content += '<div class="temp-wrap">';
			content += '<span class="temp"></span>℃';
			content += '</div>';
			content += '</div>';
			content += v.name;
			content += '</div>';
			var customOverlay = new kakao.maps.CustomOverlay({
					position: new kakao.maps.LatLng(v.lat, v.lon),
					content: content,
					xAnchor: v.anchor ? v.anchor.x : 0.25,
					yAnchor: v.anchor ? v.anchor.y : 0.65,
			});
			customOverlay.setMap(map);
		});
		$('.co-wrapper').mouseenter(onOverlayEnter);
		$('.co-wrapper').mouseleave(onOverlayLeave);
		$('.co-wrapper').click(onOverlayClick);
		$(window).trigger('resize');
	}

	function onResize() {
		var windowHeight = $(window).innerHeight();
		var lat = (windowHeight > 800 || windowHeight < 600) ? mapCenter.lat : mapCenter.lat + 1;
		map.setCenter(new kakao.maps.LatLng(lat, mapCenter.lon));
		if(windowHeight < 800) {
			$('.minimap').hide();
			$('.map-wrapper .co-wrapper').addClass('active');
			map.setLevel(14);
		}
		else {
			map.setLevel(13);
			$('.minimap').show();
			$('.map-wrapper .co-wrapper').removeClass('active');
		}
	}
	

	/*************** 이벤트 등록 *****************/
	function onOverlayClick() {
		
	}

	function onOverlayEnter() {
		// this => .co-wrapper중 클릭당한 넘
		$(this).find('.co-wrap').css('display', 'flex');
		$(this).parent().css('z-index', 1);
		sendData.lat = $(this).data('lat');	// data-lat
		sendData.lon = $(this).data('lon');	// data-lon
		$.get(dailyURL, sendData, onLoad.bind(this));
		function onLoad(r) {
			$(this).find('.temp').text(r.main.temp);
			$(this).find('.icon').attr('src', getIcon(r.weather[0].icon));
		}
	}

	function onOverlayLeave() {
		$(this).parent().css('z-index', 0);
		$(this).find('.co-wrap').css('display', 'none');
	}
});

/* appid: '850ac9f9b1b71ba716eb6bf2cd560849' */
