export class Produto {

    constructor() {
        this.idProduct = 1;
        this.arrayProdutos = [];
    }

    adcionar() {
        let produto = {};
        produto.id = this.idProduct;
        produto.nomeProduto = document.querySelector('#produto').value;
        produto.valorProduto = document.querySelector('#preco').value;       
        return produto
    }

    listarTabela() {
        let corpoTabela = document.querySelector('#tbody');
        corpoTabela.innerHTML = '';

        for(let i in this.arrayProdutos){
            let tr = corpoTabela.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acao = tr.insertCell();

            /* Iserindo os dados de forma dinamica  */

            td_id.innerHTML = this.arrayProdutos[i].id;
            td_produto.innerHTML = this.arrayProdutos[i].nomeProduto;
            td_preco.innerHTML = this.arrayProdutos[i].valorProduto;

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
        }
    }

    validaCampos(produto) {        
        let msgNome = ''
        let msgPreco = '';
        let campoNome = false;
        let campoPreco = false;
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
        let produtoDuplicado = document.querySelector('#produto_duplicado'); 
        
        /* VARIAVEIAS FUNCAO ONFOCUS */
        let inputName = document.querySelector('#produto');
        let inputPreco = document.querySelector('#preco');

        if(produto.nomeProduto == '') {           
            msgNome += 'O nome do produto deve ser informado!';
            campoNome = true;
        }
        if(produto.valorProduto == ''){           
            msgPreco += 'O preço do produto deve ser informado!';
            campoPreco = true
        } 
        
        if(msgNome != '' || msgPreco != '') {
           
            if(campoPreco) {                     
                precoProdutoInvalido.innerHTML= msgPreco;          
                precoProdutoInvalido.style.display = "block";  
                inputPreco.focus();              
            }else {
                msgPreco = '';
                precoProdutoInvalido.style.display = "none"; 
            }

            if(campoNome) {                         
                nomeProdutoInvalido.innerHTML = msgNome;
                nomeProdutoInvalido.style.display = "block"
                inputName.focus();                
            }else {
                msgNome = '';
                nomeProdutoInvalido.style.display = "none" 
            }     
            
            return false;
        } 

         /* VARIAVEL QUE RECEBE ITEM DUPLICADO */
         let itemExistente = this.arrayProdutos.findIndex(item => {
            return item.nomeProduto === produto.nomeProduto;
        });

        /* VERIFICAÇAO DE DUPLICIDADE DE ITEM */
        if(itemExistente != -1) {
            precoProdutoInvalido.style.display = "none";
            nomeProdutoInvalido.style.display = "none"
            produtoDuplicado.style.display = "block"
            inputName.focus();
            return false
        }
       
        return true;          
    }

    novoProduto(produto){        
        this.arrayProdutos.push(produto);
        this.idProduct++;        
    }

    cleanForm() {
        const productName = document.querySelectorAll('input')

        let cadastroProductInfo = document.querySelector('#produto_cadastrado');
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
        let produtoDuplicado = document.querySelector('#produto_duplicado');
        cadastroProductInfo.style.display = "none";
        nomeProdutoInvalido.style.display = "none";
        precoProdutoInvalido.style.display = "none";
        produtoDuplicado.style.display = 'none';

        /* VARIAVEIAS FUNCAO ONFOCUS */
        let inputName = document.querySelector('#produto');

        productName.forEach(input => {
            input.value = '';
        });
        inputName.focus()
    }    
}