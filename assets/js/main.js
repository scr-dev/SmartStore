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
   listarProduto();
   console.log(produto.arrayProdutos)
}

function listarProduto() {
   let corpoTabela = document.querySelector('#tbody');
   corpoTabela.innerHTML = '';

   for(let i in produto.arrayProdutos){
       let tr = corpoTabela.insertRow();

       let td_id = tr.insertCell();
       let td_produto = tr.insertCell();
       let td_preco = tr.insertCell();
       let td_acao = tr.insertCell();

       /* Iserindo os dados de forma dinamica  */

       td_id.innerHTML = produto.arrayProdutos[i].id;
       td_produto.innerHTML = produto.arrayProdutos[i].nomeProduto;
       td_preco.innerHTML = produto.arrayProdutos[i].valorProduto;

       /*  Alinhando as informaçoes na tabela  */

       td_id.classList.add('center');
       td_acao.classList.add('center');

       /*  Criando os icones de ações  */

       let iconEdit = document.createElement('i');
       let iconDelet = document.createElement('i');

        /*  Adcionando as clases dos icones  */

        iconEdit.classList.add('"uil','uil-edit','table__icon');
        iconDelet.classList.add('uil','uil-times','table__icon');

        /*  Adcionando o elemnto criado ao campo da ações da tabela  */

        td_acao.appendChild(iconEdit);
        td_acao.appendChild(iconDelet);

       /*  Adcionando a funçao deletar dinamicamente  */
       iconDelet.addEventListener("click", auxilioDeletar)

       function auxilioDeletar() {        
         let id = produto.arrayProdutos[i].id        
         produto.deletar(id)
       }      
   }
}


