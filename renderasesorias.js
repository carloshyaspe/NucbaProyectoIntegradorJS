const categories = document.querySelector(".accordion__container")
const cardAsesorias = document.querySelector(".accordion-body");
const cardAsesorias1 = document.querySelector(".accordion-body1");
const cardAsesorias2 = document.querySelector(".accordion-body2");
const cardAsesorias3 = document.querySelector(".accordion-body3");
const cardAsesorias4 = document.querySelector(".accordion-body4");
let selection = JSON.parse(localStorage.getItem('selection')) || [];
const saveLocalStorage = selectionList => {
  localStorage.setItem('selection', JSON.stringify(selectionList));
};


const renderAsesoria = asesoria => {
    const {
        id,
        speFather,
        specialty,
        speDescription,
        advisor,
        advDescription,
        price,
        advImg,
        cardImg,
    } = asesoria;
    return `
    <br>
  <div class="card mb-3" style="max-width: 100rem;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${cardImg}" class="img-fluid rounded-start" alt="${specialty}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${specialty}</h5>
        <p class="card-text">${speDescription}</p>
        <div class="card">
            <div class="card-header">
            Asesor
            </div>
        <div class="card-body">
            <div class="row g-0">
                <div class="col-md-4">
                 <img src="${advImg}" class="img-fluid" style="border-radius: 50%;" alt="${advisor}">
                </div>
                <div class="col-md-8">
                    <blockquote class="blockquote mb-0">
                    <p>${advDescription}</p>
                    <footer class="blockquote-footer"> <cite title="Source Title">${advisor}</cite></footer>
                    <p class="card-text"><small class="text-muted">Precio por hora: $${price} pesos </small></p>
                    </blockquote>
                </div>
            </div>    
        </div>
    </div>
        <div class="position-absolute bottom-0 end-0 p-2">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
               <a type="button" class="btn btn-dark btn-asesoria" href="/asesorias.html"
               data-id='${id}'
               data-specialty='${specialty}'
               data-spefather='${speFather}'
               data-advisor='${advisor}'
               data-advdescription='${advDescription}'
               data-price='${price}'
               data-advimg='${advImg}'
               data-cardimg='${cardImg}'
               data-spedescription='${speDescription}'
               >+ Agregar asesoría</a>
            </div>
       </div>
      </div>
    </div>
  </div>
</div>

    `;
};

const filterProducts = (e) => {
    const categorySelected = e.target.dataset.category;
    const categoryArray = [];
    mydata.forEach(asesoria => {
        if (categorySelected === asesoria.speFather) {
            categoryArray.push(asesoria)
            return;
        }
    })
    cardAsesorias.innerHTML="";
    cardAsesorias1.innerHTML="";
    cardAsesorias2.innerHTML="";
    cardAsesorias3.innerHTML="";
    cardAsesorias4.innerHTML="";
    renderAsesorias(categoryArray,categorySelected);
}

const renderAsesorias = (Asesorias,categorysel) => {
    
    if (categorysel == "Finanzas personales") {
        cardAsesorias.innerHTML = Asesorias.map(renderAsesoria).join('');    
     } else if (categorysel == "Asesoria legal y contable") {
        cardAsesorias1.innerHTML = Asesorias.map(renderAsesoria).join('');    
     } else if (categorysel == "Redes sociales") {
        cardAsesorias2.innerHTML = Asesorias.map(renderAsesoria).join('');    
     } else if (categorysel == "Asesoria de imagen") {
        cardAsesorias3.innerHTML = Asesorias.map(renderAsesoria).join('');    
     } else if (categorysel == "Comercio por internet") {
        cardAsesorias4.innerHTML = Asesorias.map(renderAsesoria).join('');    
     }
    
};


const agregarAsesoria = (e) => {
    if(!e.target.classList.contains('btn-asesoria')) return;
    const asesoriaSel = {
      id: e.target.dataset.id,
      speFather: e.target.dataset.spefather,
      specialty: e.target.dataset.specialty,
      speDescription: e.target.dataset.spedescription,
      advisor: e.target.dataset.advisor,
      price: e.target.dataset.price,
      advImg: e.target.dataset.advimg,
      cardImg: e.target.dataset.cardimg,
      
    }
  
     const existeItemEnSel = selection.find(item => item.id === asesoriaSel.id);
  
     if(existeItemEnSel){
       selection = selection.map((item) => {
           return item.id === asesoriaSel.id
           ? {... item, cantidad: Number(item.cantidad)}
           : item;
          });
     } else { 
       selection = [...selection, { ...asesoriaSel, cantidad: 1 }];
     }
    saveLocalStorage(selection);
    //renderCart(cart);
    //showTotal(cart);
  };


function init() {
    categories.addEventListener("click", filterProducts);
    cardAsesorias.addEventListener('click', agregarAsesoria);
    cardAsesorias1.addEventListener('click', agregarAsesoria);
    cardAsesorias2.addEventListener('click', agregarAsesoria);
    cardAsesorias3.addEventListener('click', agregarAsesoria);
    cardAsesorias4.addEventListener('click', agregarAsesoria);
}
init();