const ProductList = [];
let currentId = 0;
let productId = 0;

const productName = document.getElementById('produto');
const productPrice = document.getElementById('preco');
const saveButton = document.getElementById('save-button');

const cleanForm = () => {
  productName.value = '';
  productPrice.value = '';
}

const showProductList = () => {
  const bodyTabela = document.querySelector('#tbody');
  bodyTabela.innerHTML = '';

  ProductList.map(product => {
    bodyTabela.innerHTML += `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>R$ ${product.price}</td>
      <td>
        <img
          onclick="editProductButton(${product.id - 1}, '${product.name}', ${product.price})"
          src="assets/img/edit-dark.svg"
          alt="Editar"
        >
        <img
          onclick="deleteProduct(${product.id})"
          src="assets/img/delete-dark.svg"
          alt="Deletar"
        >
      </td>
    `
  });
}

const saveProduct = () => {
  const id = productId;
  const product = productName.value;
  const price = productPrice.value;
  console.log(id);

  ProductList[id].name = product;
  ProductList[id].price = price;

  showProductList();
  cleanForm();

  saveButton.innerHTML = 'Cadastrar';
  saveButton.setAttribute("onclick", "addProduct()");
}

const editProductButton = (id, product, price) => {
  saveButton.innerHTML = 'Salvar';
  saveButton.setAttribute("onclick", "saveProduct()");

  productIid = id;
  productName.value = product;
  productPrice.value = price;
}

const deleteProduct = (id) => {
  const index = ProductList.findIndex((product) => product.id === id);
  ProductList.splice(index, 1);
  showProductList();
  console.log(ProductList);
}

const addProduct = () => {
  currentId += 1;
  
  ProductList.push({
    id: currentId,
    name: productName.value,
    price: Number(productPrice.value).toFixed(2)}
  );
  
  showProductList();
  cleanForm();

  console.log(ProductList);
}
