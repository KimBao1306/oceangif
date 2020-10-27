if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}
function isHidden(elem) {
	return !elem.offsetWidth && !elem.offsetHeight;
}
function stickySide(idSticky, idStickyWrap, offset = 0) {
	if (!document.querySelector(idSticky)) return;
	if (!document.querySelector(idStickyWrap)) return;
	let sticky, stickyHeight, stickyWrap, stickyWrapHeight, stickyWrapOffsetTop;
	sticky = document.querySelector(idSticky);
	stickyHeight = sticky.offsetHeight;
	stickyWrap = document.querySelector(idStickyWrap);
	stickyWrapHeight = stickyWrap.offsetHeight;
	stickyWrapOffsetTop = stickyWrap.offsetTop;
	if (
		pageYOffset + offset >= stickyWrapOffsetTop &&
		pageYOffset + offset + stickyHeight <=
			stickyWrapOffsetTop + stickyWrapHeight
	) {
		sticky.style.position = 'relative';
		sticky.style.top = offset + pageYOffset - stickyWrapOffsetTop + 'px';
	} else {
		if (pageYOffset + offset < stickyWrapOffsetTop) {
			sticky.removeAttribute('style');
		}
		if (
			pageYOffset + offset + stickyHeight >
			stickyWrapOffsetTop + stickyWrapHeight
		) {
			sticky.style.top = stickyWrapHeight - stickyHeight + 'px';
		}
	}
}
//wow.js
new WOW().init();
function scrollToTop() {
	if (pageYOffset > 0) {
		window.scrollTo(0, pageYOffset - pageYOffset / 8);
		requestAnimationFrame(scrollToTop);
	}
}
function uploadImage(inputFile, previewImage) {
	inputFile.addEventListener('change', function () {
		const file = this.files[0];
		if (file) {
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				previewImage.setAttribute('src', this.result);
			});
			reader.readAsDataURL(file);
		}
	});
}
function counterUp(target, duration = 5000) {
	const finalNumber = parseInt(target.getAttribute('data-counter'));
	const startTime = performance.now();
	function easeOutExpo(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}
	function updateNumber(currentTime) {
		const elapsedTime = currentTime - startTime;
		if (elapsedTime > duration) {
			target.innerText = finalNumber.toLocaleString();
		} else {
			const timeRate = (1.0 * elapsedTime) / duration;
			const numberRate = easeOutExpo(timeRate);
			const currentNumber = Math.round(numberRate * finalNumber);
			target.innerText = currentNumber.toLocaleString();
			requestAnimationFrame(updateNumber);
		}
	}
	requestAnimationFrame(updateNumber);
}
window.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', (e) => {
		if (e.target.closest('.tab-link')) {
			const tabLink = e.target.closest('.tab-link');
			const tabLinkSilblings = tabLink.parentElement.children;
			const tabContent = document.querySelector(
				tabLink.getAttribute('data-tab')
			);
			const tabContentSilblings = tabContent.parentElement.children;
			for (let i = 0; i < tabLinkSilblings.length; i++) {
				if (tabLinkSilblings[i].classList.contains('active'))
					tabLinkSilblings[i].classList.remove('active');
			}
			tabLink.classList.add('active');
			for (let i = 0; i < tabContentSilblings.length; i++) {
				if (tabContentSilblings[i].classList.contains('active'))
					tabContentSilblings[i].classList.remove('active');
			}
			tabContent.classList.add('active');
		}
	});
	document.querySelectorAll('.upload-image').forEach((el) => {
		const inputFile = el.querySelector('.upload-image-input');
		const previewImage = el.querySelector('.upload-image-preview');
		if (inputFile && previewImage) {
			uploadImage(inputFile, previewImage);
		}
	});
	document.querySelectorAll('.main-menu-nav .dropdown').forEach((el) => {
		const dropdown = el;
		const arrows = document.createElement('i');
		arrows.classList.add('fa', 'fa-angle-down');
		dropdown.querySelector('a').appendChild(arrows);
		arrows.addEventListener('click', (e) => {
			e.preventDefault();
			dropdown.classList.toggle('show-sub-menu');
		});
	});
	if (
		document.querySelectorAll('.main-menu-btn') &&
		document.getElementById('main-menu') &&
		document.getElementById('main-menu-overlay')
	) {
		const mainMenuBtn = document.querySelectorAll('.main-menu-btn');
		const mainMenu = document.getElementById('main-menu');
		const mainMenuOverlay = document.getElementById('main-menu-overlay');
		mainMenuBtn.forEach((b) => {
			b.addEventListener('click', function () {
				this.classList.toggle('active');
				mainMenu.classList.toggle('active');
			});
		});
		mainMenuOverlay.addEventListener('click', function () {
			mainMenuBtn.forEach((b) => {
				b.classList.remove('active');
			});
			mainMenu.classList.remove('active');
		});
	}
	if (document.getElementById('scroll-top')) {
		const scrollTopBtn = document.getElementById('scroll-top');
		pageYOffset >= 100
			? scrollTopBtn.classList.add('show')
			: scrollTopBtn.classList.remove('show');
		window.addEventListener('scroll', function () {
			pageYOffset >= 100
				? scrollTopBtn.classList.add('show')
				: scrollTopBtn.classList.remove('show');
		});
		scrollTopBtn.addEventListener('click', scrollToTop);
	}
	// MONA CONTENT
	document
		.querySelectorAll('.mona-content iframe[src^="https://www.youtube.com/"]')
		.forEach((el) => {
			const wrap = document.createElement('div');
			wrap.classList.add('mona-youtube-wrap');
			el.insertAdjacentElement('afterend', wrap);
			wrap.appendChild(el);
		});
	document.querySelectorAll('.mona-content table').forEach((el) => {
		const wrap = document.createElement('div');
		wrap.classList.add('mona-table-wrap');
		el.insertAdjacentElement('afterend', wrap);
		wrap.appendChild(el);
	});
	document.querySelectorAll('.swiper-init.is-slider').forEach((el) => {
		const slider = el.querySelector('.swiper-container');
		const pagination = el.querySelector('.swiper-pagination');
		const prevBtn = el.querySelector('.swiper-button-prev');
		const nextBtn = el.querySelector('.swiper-button-next');
		new Swiper(slider, {
			speed: 1200,
			autoHeight: false,
			slidesPerView: 'auto',
			autoplay: {
				speed: 6000,
			},
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			loop: true,
		});
	});
	if (document.getElementById('header')) {
		window.addEventListener('load', () => {
			const header = document.getElementById('header');
			const headerHeight = header.offsetHeight;
			const headerOffset = header.offsetTop;
			if (pageYOffset >= headerOffset + headerHeight) {
				header.classList.add('fixed');
				header.nextElementSibling.style.marginTop = headerHeight + 'px';
			} else {
				header.classList.remove('fixed');
				header.nextElementSibling.style.marginTop = '';
			}
			window.addEventListener('scroll', function () {
				if (pageYOffset >= headerOffset + headerHeight) {
					header.classList.add('fixed');
					header.nextElementSibling.style.marginTop = headerHeight + 'px';
				} else {
					header.classList.remove('fixed');
					header.nextElementSibling.style.marginTop = '';
				}
			});
		});
	}
	(function () {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry, index) => {
					if (entry.isIntersecting) {
						console.log(entry.target);
						observer.unobserve(entry.target);
					}
				});
			},
			{rootMargin: '0px 0px 0px 0px'}
		);
		// document.querySelectorAll('.column').forEach(el => { observer.observe(el) });
	})();

	const progressList = document.querySelectorAll('.progress');
	progressList.forEach((x) => {
		const content = x.dataset.content.toUpperCase();
		const endVl = x.dataset.pc / 100;

		const circle = new ProgressBar.Circle(x, {
			color: '#fff',
			strokeWidth: 10,
			trailWidth: 10,
			easing: 'easeInOut',
			duration: 2500,
			text: {
				value: `0% ${content}`,
			},
			from: {color: 'rgba(255,255,255)', width: 15},
			to: {color: '#3f3e3c', width: 15},
			step: function (state, circle) {
				const value = Math.round(circle.value() * 100);
				if (value === 0) {
					circle.setText('');
				} else {
					circle.setText(
						`<p class='main-title text-center'>${value}%</p> <p class='desc'>${content}</p>`
					);
				}
			},
		});

		circle.animate(endVl);
	});

	// SHOW SEARCH FORM
	const iconSearch = document.querySelector('.hd-form  .fa-search');
	iconSearch.addEventListener('click', (e) => {
		e.target.parentElement.nextElementSibling.classList.toggle('show');
	});

	document.body.addEventListener('click', function (e) {
		if (
			!iconSearch.contains(e.target) &&
			!document.querySelector('#f-search').contains(e.target)
		) {
			iconSearch.parentElement.nextElementSibling.classList.remove('show');
		}
	});
	// SHOW SEARCH FORM - END
});
jQuery(document).ready(function ($) {
	$('.open-popup-btn').magnificPopup({
		removalDelay: 500,
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = 'mfp-zoom-in';
			},
		},
		midClick: true,
	});
	$('.open-video-btn').magnificPopup({
		disableOn: 768,
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
		removalDelay: 500,
		preloader: false,
		fixedContentPos: false,
	});

	// click heading will show popup
	0 < $('.timeline-wrap .heading').length &&
		$('.timeline-wrap .heading .main-title').each(function () {
			$(this).on('click', function (e) {
				$(this)
					.parent()
					.toggleClass('show')
					.parent()
					.siblings()
					.children()
					.removeClass('show');
			});
			if ($(window).outerWidth() < 500) {
				$(this).parent().parent().siblings().children().removeClass('show');
			}
		});

	//scroll domestic
	$('.domestic-banner-right .arrow .arrow-overlay').on('click', function () {
		const headerHeight = $('.header').outerHeight(true);
		const paddingPartyFood =
			$(window).outerWidth() > 1024
				? 70
				: $(window).outerWidth() <= 1024 && $(window).outerWidth() > 768
				? 50
				: 30;
		$('html, body').animate(
			{
				scrollTop:
					$('#scrolldown-domestic').offset().top -
					headerHeight +
					paddingPartyFood, //scroll đến vị trí #to
			},
			500
		);
	});
});
