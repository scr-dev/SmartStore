import { Produto } from "./produto.js";


const produto = new Produto();

let btnAdcionarProduto = document.querySelector('#salvar');
let btnClearform = document.querySelector('#cleanForm');

btnAdcionarProduto.addEventListener('click', salvar);
btnClearform.addEventListener('click', produto.cleanForm)


function salvar() {
    let produtos = produto.adcionar()

   if(produto.validaCampos(produtos)) {
        produto.novoProduto(produtos)
   }

   console.log(produto.arrayProdutos)
}
