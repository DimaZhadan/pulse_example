$(document).ready(function () {
   $('.carousel__inner').slick({
      speed: 800,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
      customPaging: function (slick, index) {
         var image = $(slick.$slides[index]).find('.slider__img').attr('src');
         return ''
      },
      responsive: [
         {
            breakpoint: 992,
            settings: {
               dots: true,
               arrows: false
            }
         },
      ]
   });

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      });
   };

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   //MODAL

   $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consaltation').fadeIn()
   });
   $('.modal__close').on('click', function () {
      $('.overlay, #consaltation, #order, #thanks').fadeOut()
   });

   $('.button_mini').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descrition').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn()
      })
   });

   function validateForms(form) {
      $(form).validate({
         rules: {
            name: "required",
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: "Будь ласка, вкажіть своє ім'я",
            phone: {
               required: "Будь ласка, вкажіть ваш телефон",
               phone: "Невірно введений номер телефону"
            },
            email: {
               required: "Нам потрібна ваша електронна адреса, щоб зв'язатися з вами",
               email: "Ваша електронна адреса має бути у форматі name@domain.com"
            }
         }
      });
   };

   validateForms('#consultation-form');
   validateForms('#consaltation form');
   validateForms('#order form');

   $('input[name=phone]').mask("+38 (099) 999-99-99");

   $('form').submit(function (e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }

      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consaltation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn();
         $('form').trigger('reset');
      });
      return false;
   });

   //smooth scroll and page up
   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });

   $("a[href^=#up]").click(function () {
      const _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).ofset().top + "px" });
      return false;
   });



});

new WOW().init();


