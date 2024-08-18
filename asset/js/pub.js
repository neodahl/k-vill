function checkbox() {
	const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');
	if (checkboxes.length === 0) return;

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				checkbox.checked = !checkbox.checked;
			}
		});
	});
}

function searchbar() {
	const searchContainers = document.querySelectorAll('.typeSearch');
	if (searchContainers.length === 0) return;

	searchContainers.forEach(searchContainer => {
		const searchInput = searchContainer.querySelector('input');
		const searchResult = searchContainer.querySelector('.search-result');

		searchInput.addEventListener('focus', () => {
			searchResult.classList.add('active');
		});

		document.addEventListener('focusin', (event) => {
			if (!searchContainer.contains(event.target)) {
				searchResult.classList.remove('active');
			}
		});
		document.addEventListener('click', (event) => {
			if (!searchContainer.contains(event.target)) {
				searchResult.classList.remove('active');
			}
		});
	});
}


function selectbox() {
	const selectElements = document.querySelectorAll('.selectBox select');
	if (selectElements.length === 0) return;
	const selectedColor = "#000";

	selectElements.forEach(selectElement => {
		selectElement.addEventListener('change', function() {
			if (this.value === "") {
				this.style.color = "#b0b9c2";
			} else {
				this.style.color = selectedColor;
			}
		});
	});
}

function dateFatpickr() {
	// Select all inputs with the class "datepicker"
	const datepickers = document.querySelectorAll(".inputDate input");
	if (datepickers.length === 0) return;

	// Initialize Flatpickr for each input
	datepickers.forEach((input) => {
		flatpickr(input, {
			locale: "ko", 
			disableMobile: "true",
			locale: {
					firstDayOfWeek: 7, // 일요일을 주의 첫날로 설정
					weekdays: {
							shorthand: ["일", "월", "화", "수", "목", "금", "토"], // 요일 단축 이름
							longhand: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] // 요일 전체 이름
					},
					months: {
							shorthand: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], // 월 단축 이름
							longhand: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"] // 월 전체 이름
					}
			},
			dateFormat: "Y-m-d", // Custom date format
			inline: false, // Calendar not inline but in a dropdown
			
			onOpen: function (selectedDates, dateStr, instance) {
				instance.calendarContainer.classList.add("custom-datepicker");
				adjustCalendarPosition(instance);
			},
			onReady: function (selectedDates, dateStr, instance) {
				instance.calendarContainer.classList.add("custom-datepicker");
			},
		});
	});

	function adjustCalendarPosition(instance) {
		const calendarContainer = instance.calendarContainer;
		const input = instance._input;
		const inputRect = input.getBoundingClientRect();
		const calendarRect = calendarContainer.getBoundingClientRect();

		const screenHeight = window.innerHeight;
		const screenWidth = window.innerWidth;

		// Reset the position before calculating
		calendarContainer.style.left = "";
		calendarContainer.style.top = "";

		// Check if the calendar is going off the screen to the right
		if (inputRect.left + calendarRect.width > screenWidth) {
			calendarContainer.style.left = `${
				screenWidth - calendarRect.width - 10
			}px`; // 10px padding from the edge
		}

		// Check if the calendar is going off the screen to the bottom
		if (inputRect.bottom + calendarRect.height > screenHeight) {
			calendarContainer.style.top = `${
				inputRect.top - calendarRect.height
			}px`; // Position above the input
		}
	}
}




function accordionControl_exceptional() {
	// MT101만 사용하는 특별한 케이스로 권장 사용 코드가 아닙니다.
	const btnAccd = document.querySelectorAll('.btnAcdn-exceptional');
	if (btnAccd.length === 0) return;

	btnAccd.forEach(button => {
		button.addEventListener('click', function() {
			const openTargets = this.getAttribute('data-accd-open-target');
			if (openTargets) {
				openTargets.split(' ').forEach(target => {
					document.querySelectorAll(`[data-accd-box="${target}"]`).forEach(targetElement => {
						expandElement(targetElement);
					});
				});
			}
	
			const closeTargets = this.getAttribute('data-accd-close-target');
			if (closeTargets) {
				closeTargets.split(' ').forEach(target => {
					document.querySelectorAll(`[data-accd-box="${target}"]`).forEach(targetElement => {
						collapseElement(targetElement);
					});
				});
			}
		});
	});

	function expandElement(element) {
		element.style.display = 'block';  // 요소가 숨겨져 있을 경우 보여줌
		element.style.height = '0px';
		element.style.opacity = '0';
		element.style.overflow = 'hidden';
	
		const height = element.scrollHeight + 'px';
	
		// 강제로 리플로우를 트리거하여 height 설정이 적용되게 함
		requestAnimationFrame(() => {
			element.style.transition = 'height 0.7s ease, opacity 0.5s ease';
			element.style.height = height;
			element.style.opacity = '1';
	
			// 트랜지션이 끝나면 auto로 설정하여 높이 변경에 유연하게 대응
			element.addEventListener('transitionend', function handler(e) {
				if (e.propertyName === 'height') {
					element.style.height = 'auto';
					element.style.overflow = 'visible';  // 내용이 잘리지 않도록 함
					element.classList.add('active');
					element.removeEventListener('transitionend', handler);
				}
			});
		});
	}
	
	function collapseElement(element) {
		element.style.height = element.scrollHeight + 'px';  // 현재 높이 설정
		element.style.overflow = 'hidden';
	
		// 강제로 리플로우를 트리거하여 height 설정이 적용되게 함
		requestAnimationFrame(() => {
			element.style.transition = 'height 0.7s ease, opacity 0.5s ease';
			element.style.height = '0px';
			element.style.opacity = '0';
	
			element.addEventListener('transitionend', function handler(e) {
				if (e.propertyName === 'height') {
					element.style.display = 'none';  // 트랜지션이 끝나면 요소 숨김
					element.classList.remove('active');
					element.removeEventListener('transitionend', handler);
				}
			});
		});
	}
}

function mt102LayoutHelper() {
	// 이 함수는 단순히 "관리비 > 월별청구내역"에서 레이아웃을 위한 코드입니다.
	const layoutHelper = document.querySelector('.maintenance-header + .layout-helper');
	if (!layoutHelper) return;

	const getComputedValue = (element, property) => parseFloat(window.getComputedStyle(element)[property]);

	// .maintenance-header의 max-height와 padding-top 값 가져오기
	const maintenanceHeader = document.querySelector('.maintenance-header');
	const maintenanceHeaderMaxHeight = getComputedValue(maintenanceHeader, 'maxHeight');
	const maintenanceHeaderPaddingTop = getComputedValue(maintenanceHeader, 'paddingTop');
	const totalMaintenanceHeaderHeight = maintenanceHeaderMaxHeight - maintenanceHeaderPaddingTop;

	// .sub-menu-container의 높이, margin-top, margin-bottom 값 가져오기
	const subMenuContainer = document.querySelector('.sub-menu-container');
	const subMenuContainerHeight = subMenuContainer.offsetHeight;
	const subMenuContainerMarginTop = getComputedValue(subMenuContainer, 'marginTop');
	const subMenuContainerMarginBottom = getComputedValue(subMenuContainer, 'marginBottom');
	const totalSubMenuHeight = subMenuContainerHeight + subMenuContainerMarginTop + subMenuContainerMarginBottom;

	// .bill-history-container의 높이 가져오기
	const billHistoryContainer = document.querySelector('.bill-history-container');
	const billHistoryContainerHeight = billHistoryContainer.offsetHeight;

	// 결과 계산 후 rem 단위로 변환
	const result = Math.abs((totalMaintenanceHeaderHeight - totalSubMenuHeight) - billHistoryContainerHeight);
	const rootFontSize = getComputedValue(document.documentElement, 'fontSize');
	const resultInRem = result / rootFontSize;

	// layoutHelper의 높이 설정
	layoutHelper.style.height = `${resultInRem}rem`;
}



(function init(){
	checkbox();
	searchbar();
	selectbox();
	accordionControl_exceptional();
	mt102LayoutHelper();
	dateFatpickr();
})();

