import { Produto } from "./produto.js";


const produto = new Produto();

let btnAdcionarProduto = document.querySelector('#salvar');
let btnClearform = document.querySelector('#cleanForm');

btnAdcionarProduto.addEventListener('click', salvar);
btnClearform.addEventListener('click', produto.cleanForm)


function salvar() {
    let produtos = produto.adcionar();

    let cadastroProductInfo = document.querySelector('#produto_cadastrado');
    let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
    let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
    let produtoDuplicado = document.querySelector('#produto_duplicado');
    cadastroProductInfo.style.display = "none";
    produtoDuplicado.style.display = 'none';

   if(produto.validaCampos(produtos)) {
        produto.novoProduto(produtos)
       
        produto.cleanForm();
        cadastroProductInfo.style.display = "block";
        nomeProdutoInvalido.style.display = "none";
        precoProdutoInvalido.style.display = "none";
   }   
   produto.listarTabela();
}