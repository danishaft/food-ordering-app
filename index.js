import { menuArray } from "./data.js";
const orderedItem = []
const orderedItemText = []
const modal = document.getElementById('modal')
const orderHtml  = document.getElementById('order-container')

document.addEventListener('click', (e)=>{
    if(e.target.dataset.order){
        handleOrderClick(e.target.dataset.order)
    }else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }else if(e.target.id === 'order-now'){
       modal.classList.remove('hidden')
       modal.classList.add('block')
    }else if (e.target.id === 'pay-btn'){
        payMessage()
    }
})

const payMessage = () => {
    let name = ''
    const inputs = document.querySelectorAll('input')
    if(inputs[0].value && inputs[1].value && inputs[2].value !== ''){
        name = document.getElementById('name').value
        modal.classList.remove('block')
        modal.classList.add('hidden')
        inputs[0].value = ''
        inputs[1].value = ''
        inputs[2].value = ''
        orderHtml.innerHTML = `
        <div id="message">
            <p>Thanks, ${name}! Your order is on its way!</p>
        </div>`
    }
    

}
const handleRemoveClick = (param) => {
    const targetMenu = orderedItemText.filter((menu)=>{
        return menu.id === param
    })[0]
    const index = orderedItemText.indexOf(targetMenu)
    orderedItemText.splice(index, 1)
    if(orderedItemText.length === 0){
        location.reload()
    }
    getOrderFeed()
}

const getOrderFeed = () =>{
    let totalOrderPrice = 1
    if(orderedItemText.length === 1){
        totalOrderPrice = orderedItemText[0].price
    }else if(orderedItemText.length === 2){
        totalOrderPrice = orderedItemText[0].price + orderedItemText[1].price
    }else if(orderedItemText.length === 3){
        totalOrderPrice = orderedItemText[0].price + orderedItemText[1].price + orderedItemText[2].price
    }
    let orderFeed =``
    orderedItem.forEach((order)=>{
        let orderItemFeed =``
        orderedItemText.forEach((text)=>{
            orderItemFeed +=`
            <div id="order-item">
                <p class="order-name">${text.name} <span class="rmv-btn" data-remove="${text.id}">remove</span></p>
                <p class="order-price">$${text.price}</p>
            </div>`
        })

        orderFeed = `
        <h3>Your order</h3>
            ${orderItemFeed}
        <div id="total-price">
            <p class="total-price-text">Total Price:</p>
            <p class="total-order-price">$${totalOrderPrice}</p>
        </div>
        <button type="button" class="complete-order-btn" id="order-now">Complete Order</button>`
    })
    orderHtml.innerHTML = orderFeed
}


const handleOrderClick = (param) => {
    const targetMenu = menuArray.filter((menu)=>{
        return menu.id === param
    })[0]
    if(!targetMenu.isOrdered){
        orderedItem.unshift(targetMenu)
        orderedItemText.unshift(targetMenu)
        targetMenu.isOrdered = true
        getOrderFeed()
    }
}

// render menuArray to the html
const getHtmlFeed = () => {
    let htmlFeed =``
    menuArray.forEach((menu)=>{
        htmlFeed +=`
        <div class="food">
            <img src="${menu.image}" alt="${menu.name}">
            <div class="food-details">
                <div class="food-desc">
                    <h3>${menu.name}</h3>
                    <p class="ingredients">${menu.ingredients.toString()}</p>
                    <p class="food-price">$${menu.price}</p>
                </div>
                <div class="order-btn">
                    <i class="fa-light fa-plus" data-order="${menu.id}"></i>
                </div>
            </div>
        </div>`
    })
    const html =document.getElementById('available-food')
    html.innerHTML = htmlFeed
}
getHtmlFeed()