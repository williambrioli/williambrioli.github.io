const REVIEWS_URL =
"https://script.google.com/macros/s/AKfycbwUHsEd3b_0-pntgxtmPSWLPbbiC_qc29ts-2UdW_DudWms2vuUUHYPChtyFGzwn5ib/exec";

fetch(REVIEWS_URL)
.then(r => r.json())
.then(reviews => {

  const track =
    document.querySelector('#testimonials .tc-track');

  const dotsCont =
    document.querySelector('#testimonials .tc-dots');

  const prev =
    document.querySelector('#testimonials .tc-prev');

  const next =
    document.querySelector('#testimonials .tc-next');

  track.innerHTML = '';
  dotsCont.innerHTML = '';

  reviews.forEach((review,index)=>{

    const slide =
      document.createElement('div');

    slide.className = 'tc-slide';

    if(index === 0){
      slide.classList.add('active');
    }

    slide.innerHTML = `
<div class="review-card">

  <div class="review-header">

    <div class="review-avatar">
      ${review.nome.charAt(0).toUpperCase()}
    </div>

    <div class="review-user">

      <h3>${review.nome}</h3>

      <span class="review-meta">
        Avaliação Google
      </span>

    </div>

  </div>

  <div class="stars">
    ${'★'.repeat(review.nota)}
  </div>

  <p class="review-text">
    "${review.comentario}"
  </p>

</div>
`;

    track.appendChild(slide);

    const dot =
      document.createElement('div');

    dot.className = 'tc-dot';

    if(index === 0){
      dot.classList.add('active');
    }

    dotsCont.appendChild(dot);

  });

  const slides =
    [...document.querySelectorAll('.tc-slide')];

  const dots =
    [...document.querySelectorAll('.tc-dot')];

  if(slides.length <= 1){
    return;
  }

  let current = 0;

  function goTo(index){

    slides.forEach(slide =>
      slide.classList.remove('active')
    );

    dots.forEach(dot =>
      dot.classList.remove('active')
    );

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    current = index;
  }

  next.addEventListener('click', ()=>{

    let i = current + 1;

    if(i >= slides.length){
      i = 0;
    }

    goTo(i);

  });

  prev.addEventListener('click', ()=>{

    let i = current - 1;

    if(i < 0){
      i = slides.length - 1;
    }

    goTo(i);

  });

  dots.forEach((dot,index)=>{

    dot.addEventListener('click', ()=>{

      goTo(index);

    });

  });

});
