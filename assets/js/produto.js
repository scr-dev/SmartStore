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

    validaCampos(produto) {        
        let msgNome = ''
        let msgPreco = '';
        let campoNome = false;
        let campoPreco = false;
        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 

        

        if(produto.nomeProduto == '') {           
            msgNome += 'O nome do produto deve ser informado!';
            campoNome = true;
        }
        if(produto.valorProduto == ''){           
            msgPreco += 'O preço do produto deve ser informado!';
            campoPreco = true
        } 
        
        if(msgNome != '' || msgPreco != '') {

            if(campoNome) {                               
                nomeProdutoInvalido.innerHTML = msgNome;
                nomeProdutoInvalido.style.display = "block"                
            }
            if(campoPreco) {                         
                precoProdutoInvalido.innerHTML= msgPreco;          
                precoProdutoInvalido.style.display = "block"                
            }        
            
            return false;
        } 

       
    //     this.arrayProdutos.forEach(produto => {
    //        if( produto.indexOf(produto.nomeProduto) != -1 ) {
    //         alert('produto ja existe')
    //        }
    //   });

       
        return true;       

       
    }

    novoProduto(produto){        
        this.arrayProdutos.push(produto);
        this.idProduct++;        
    }

    cleanForm() {
        const productName = document.querySelectorAll('input')

        let nomeProdutoInvalido = document.querySelector('#nome_produto_invalido');        
        let precoProdutoInvalido =  document.querySelector('#preco_invalido'); 
        nomeProdutoInvalido.style.display = "none";
        precoProdutoInvalido.style.display = "none";

        productName.forEach(btn => {
            btn.value = '';
        });
    }
}



