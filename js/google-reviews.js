const REVIEWS_URL =
"https://script.google.com/macros/s/AKfycbwUHsEd3b_0-pntgxtmPSWLPbbiC_qc29ts-2UdW_DudWms2vuUUHYPChtyFGzwn5ib/exec";

fetch(REVIEWS_URL)
.then(r => r.json())
.then(reviews => {

  const track =
  document.querySelector('#testimonials .tc-track');

  const dotsCont =
  document.querySelector('#testimonials .tc-dots');

  track.innerHTML = '';
  dotsCont.innerHTML = '';

  reviews.forEach((review,index)=>{

    const slide =
    document.createElement('div');

    slide.className =
    'tc-slide';

    if(index === 0)
      slide.classList.add('active');

    slide.innerHTML = `
      <div class="review-card">

        <h3>${review.nome}</h3>

        <div class="stars">
          ${'⭐'.repeat(review.nota)}
        </div>

        <p>
          "${review.comentario}"
        </p>

      </div>
    `;

    track.appendChild(slide);

    const dot =
    document.createElement('div');

    dot.className='tc-dot';

    if(index===0)
      dot.classList.add('active');

    dotsCont.appendChild(dot);

  });

});
