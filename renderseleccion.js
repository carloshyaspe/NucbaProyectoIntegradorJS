let selection = JSON.parse(localStorage.getItem('selection')) || [];
const cardsAsesorias = document.querySelector('.cardasesoria');
const saveLocalStorage = selectionList => {
    localStorage.setItem('selection', JSON.stringify(selectionList));
};

const renderAsesorias = (selection) =>{
    if(!selection.length){
        cardsAsesorias.innerHTML = `<span>No has seleccionado ninguna asesoría, dirigete a 
        <a href="/index.html" class="text-dark stretched-link">Home</a> 
        para seleccionar una!</span>`
        //cartCont.innerHTML= `${0}`
        //btnComprar.style.display = "none";
        return;
    }
    cardsAsesorias.innerHTML = selection.map(renderAsesoria).join('')
    //cartCont.innerHTML= `${products.length}`
    //totalProductsCart.innerHTML=`productos en el carro : ${products.length}`
    //btnComprar.style.display = "block"
}

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
        cantidad
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
                        <footer class="blockquote-footer"> <cite title="Source Title">${advisor}</cite></footer>
                        <p class="card-text"><small class="text-muted">Precio por hora: $${price} pesos </small></p>
                        </blockquote>
                    </div>
                </div>    
            </div>
        </div>
        <div class="row g-0">
        <div class="col-md-4">
           &nbsp;
           <p class="card-text" id="card-price">Has gastado en estas asesorias: $${price*cantidad}</p>
        </div>
        <div class="col-md-8">
        &nbsp;
          <div class="suma-resta">
            <button type="button" class="btn btn-secondary resta" style="border-radius: 50%; padding: 1rem;"
              data-id='${id}'
              data-cantidad='${cantidad}'>-</button>
            <span class ="item-cantidad">${cantidad}</span>
            <button type="button" class="btn btn-secondary suma" style="border-radius: 50%; padding: 1rem;"
              data-id='${id}'
              data-cantidad='${cantidad}' >+</button>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
};


const handleQuantity = e => {
    if (e.target.classList.contains('resta')) {
      const existeItemEnCart = selection.find(item => item.id === e.target.dataset.id);
  
      // Si tocamos en un item que tine una sola cantidad
      if (existeItemEnCart.cantidad===1) {
        if (window.confirm('¿Desea Eliminar la asesoría de su lista?')) {
          selection = selection.filter(prod => prod.id !== existeItemEnCart.id);
          saveLocalStorage(selection);
          renderAsesorias(selection);
          return;
        }
        // Si no
      }
      selection = selection.map(item => {
        return item.id === existeItemEnCart.id
          ? { ...item, cantidad: Number(item.cantidad) - 1 }
          : item;
      });
  
      // Si se toco el boton de up
    } else if (e.target.classList.contains('suma')) {
      const existeItemEnCart = selection.find(item => item.id === e.target.dataset.id);
  
      selection = selection.map(item => {
        return item.id === existeItemEnCart.id
          ? { ...item, cantidad: Number(item.cantidad) + 1 }
          : item;
      });
    }
    // Para todos los casos
    saveLocalStorage(selection);
    renderAsesorias(selection);
  };


function init() {
    document.addEventListener('DOMContentLoaded', renderAsesorias(selection));
    cardsAsesorias.addEventListener('click', handleQuantity);
}
init();